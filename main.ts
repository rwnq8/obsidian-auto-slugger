import { App, Editor, MarkdownView, Notice, Plugin, TFile, FrontMatterCache, debounce } from 'obsidian';
import { AutoSluggerSettings, DEFAULT_SETTINGS, AutoSluggerSettingTab } from './settings'; // Adjust path

export default class AutoSluggerPlugin extends Plugin {
    settings: AutoSluggerSettings;
    stopWords: Set<string>;

    async onload() {
        await this.loadSettings();
        this.updateStopWords();

        this.addSettingTab(new AutoSluggerSettingTab(this.app, this));

        this.addCommand({
            id: 'generate-slug-current-note',
            name: 'Generate Slug for Current Note',
            editorCallback: (editor: Editor, view: MarkdownView) => {
                if (view.file) {
                    this.generateAndApplySlug(view.file, editor.getValue());
                    new Notice('Slug generated!');
                } else {
                    new Notice('No active file to generate slug for.');
                }
            },
        });

        this.addRibbonIcon('dice', 'Generate Slug', (evt: MouseEvent) => {
            const activeFile = this.app.workspace.getActiveFile();
            if (activeFile) {
                this.app.vault.read(activeFile).then(content => {
                    this.generateAndApplySlug(activeFile, content);
                    new Notice('Slug generated!');
                });
            } else {
                new Notice('No active file to generate slug for.');
            }
        });

        // Debounced function for 'on-change'
        const debouncedGenerate = debounce(async (file: TFile, data: string) => {
            if (this.settings.automaticGeneration && this.settings.triggerEvent === 'on-change') {
                await this.generateAndApplySlug(file, data, true); // true for automatic
            }
        }, 1500, true); // Debounce for 1.5 seconds


        // Automatic generation listeners
        this.registerEvent(
            this.app.workspace.on('editor-change', (editor, info) => {
                if (info.file && this.settings.automaticGeneration && this.settings.triggerEvent === 'on-change') {
                    debouncedGenerate(info.file, editor.getValue());
                }
            })
        );
        
        // This covers "save" (Obsidian auto-saves) and "lose focus"
        this.registerEvent(
            this.app.workspace.on('editor-blur', (editor, info) => {
                 if (info.file && this.settings.automaticGeneration && this.settings.triggerEvent === 'on-save-or-blur') {
                    this.generateAndApplySlug(info.file, editor.getValue(), true); // true for automatic
                }
            })
        );

        // Could also consider 'file-open' or 'active-leaf-change' if slug should be generated
        // when a file without one is opened, but the current triggers are more aligned with the request.
    }

    onunload() {}

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
        this.updateStopWords(); // Re-parse stop words if they changed
    }

    updateStopWords() {
        const defaultStopWords = DEFAULT_SETTINGS.customStopWords.split(',').map(s => s.trim().toLowerCase());
        const userStopWords = this.settings.customStopWords.split(',').map(s => s.trim().toLowerCase()).filter(s => s.length > 0);
        this.stopWords = new Set([...defaultStopWords, ...userStopWords]);
    }

    private getTimestamp(): string {
        const now = new Date();
        const H = String(now.getHours()).padStart(2, '0');
        const M = String(now.getMinutes()).padStart(2, '0');
        const S = String(now.getSeconds()).padStart(2, '0');
        
        if (this.settings.timestampFormat === 'YYMMDDHHMMSS') {
            const Y = String(now.getFullYear()).slice(-2);
            const MO = String(now.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
            const D = String(now.getDate()).padStart(2, '0');
            return `${Y}${MO}${D}${H}${M}${S}`;
        }
        return `${H}${M}${S}`; // Default HHMMSS
    }

    private sanitizeWord(word: string): string {
        return word
            .toLowerCase()
            .replace(/[^\w\s-]/gi, '') // Remove punctuation except hyphens
            .replace(/\s+/g, '-') // Replace spaces with hyphens (though words should be single)
            .trim();
    }

    private getSignificantWords(content: string): string[] {
        // Remove frontmatter before processing content
        const frontmatterRegex = /^---\s*[\s\S]*?^---\s*/m;
        const contentWithoutFrontmatter = content.replace(frontmatterRegex, '');
        
        // Remove code blocks and inline code
        let cleanContent = contentWithoutFrontmatter.replace(/```[\s\S]*?```/g, '');
        cleanContent = cleanContent.replace(/`[^`]+`/g, '');
        
        // Remove HTML tags
        cleanContent = cleanContent.replace(/<[^>]*>/g, '');

        // Remove Markdown links (keep link text)
        cleanContent = cleanContent.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
        
        // Remove other common markdown syntax like bold, italic, headings
        cleanContent = cleanContent.replace(/[*_~#]+/g, '');


        const words = cleanContent
            .split(/[\s\n\r\t.,;:!?"'()[\]{}]+/) // Split by common delimiters
            .map(word => word.toLowerCase().trim())
            .filter(word => {
                return word.length >= this.settings.minWordLength && !/^\d+$/.test(word) && !this.stopWords.has(word);
            });
        
        // Simple frequency counter to prioritize more frequent significant words
        const wordFrequencies: { [key: string]: number } = {};
        words.forEach(word => {
            wordFrequencies[word] = (wordFrequencies[word] || 0) + 1;
        });

        // Sort by frequency (desc), then by original appearance (asc) for tie-breaking
        const uniqueWords = [...new Set(words)]; // Keep original order for tie-breaking
        const sortedWords = uniqueWords.sort((a, b) => {
            const freqDiff = wordFrequencies[b] - wordFrequencies[a];
            if (freqDiff !== 0) return freqDiff;
            return words.indexOf(a) - words.indexOf(b); // Not perfect but simple tie-breaker
        });

        return sortedWords.slice(0, this.settings.significantWordCount).map(this.sanitizeWord);
    }

    public generateSlug(content: string): string {
        const timestamp = this.getTimestamp();
        const significantWords = this.getSignificantWords(content);

        let slug = timestamp;
        if (significantWords.length > 0) {
            slug += '-' + significantWords.join('-');
        }
        return slug;
    }

    async generateAndApplySlug(file: TFile, content: string, isAutomatic: boolean = false) {
        if (!(file instanceof TFile) || !file.path.toLowerCase().endsWith('.md')) {
            // console.log("AutoSlugger: Not a markdown file, skipping.");
            return;
        }

        const newSlug = this.generateSlug(content);

        try {
            await this.app.fileManager.processFrontMatter(file, (frontmatter: FrontMatterCache) => {
                const key = this.settings.slugFrontmatterKey;
                
                // If automatic, only proceed if overwrite is enabled OR slug doesn't exist
                if (isAutomatic && !this.settings.overwriteExistingSlug && frontmatter[key]) {
                    // console.log("AutoSlugger: Slug exists and overwrite is disabled for automatic generation. Skipping.");
                    return; 
                }
                // For manual, or if automatic allows overwrite, or if slug doesn't exist
                if (!isAutomatic || this.settings.overwriteExistingSlug || !frontmatter[key]) {
                    frontmatter[key] = newSlug;
                    // console.log(`AutoSlugger: Applied slug "${newSlug}" to ${file.basename}`);
                }
            });
        } catch (e) {
            new Notice(`Error applying slug: ${e.message}`);
            console.error("AutoSlugger Error: ", e);
        }
    }
}