import { App, Editor, MarkdownView, Notice, Plugin, TFile, FrontMatterCache, debounce, TAbstractFile, Workspace, Vault } from 'obsidian'; // Added Workspace, Vault for explicit typing
import { AutoSluggerSettings, DEFAULT_SETTINGS, AutoSluggerSettingTab } from './settings';

export default class AutoSluggerPlugin extends Plugin {
    settings: AutoSluggerSettings;
    stopWords: Set<string>;
    private debouncedGenerateForOnChange: (file: TFile, data: string) => void;


    async onload() {
        await this.loadSettings();
        this.updateStopWords();

        this.addSettingTab(new AutoSluggerSettingTab(this.app, this));

        this.addCommand({
            id: 'generate-slug-current-note',
            name: 'Generate Slug for Current Note',
            editorCallback: (editor: Editor, view: MarkdownView) => {
                if (view.file) {
                    this.generateAndApplySlug(view.file, editor.getValue(), false); 
                    new Notice('Slug generated!');
                } else {
                    new Notice('No active file to generate slug for.');
                }
            },
        });

        this.addRibbonIcon('dice', 'Generate Slug for Current Note', (evt: MouseEvent) => {
            const activeFile = this.app.workspace.getActiveFile();
            if (activeFile) {
                this.app.vault.read(activeFile).then(content => {
                    this.generateAndApplySlug(activeFile, content, false); 
                    new Notice('Slug generated via ribbon!');
                });
            } else {
                new Notice('No active file to generate slug for.');
            }
        });
        
        this.debouncedGenerateForOnChange = debounce(async (file: TFile, data: string) => {
            await this.generateAndApplySlug(file, data, true); 
        }, 1500, true);

        // Corrected event listeners with explicit types
        this.registerEvent(
            this.app.workspace.on('editor-change', (editor: Editor, info: MarkdownView | TFile) => { // More specific type for info if possible
                // The 'info' type for 'editor-change' can be MarkdownView or TFile depending on context.
                // We need to ensure 'info.file' exists and is a TFile.
                let currentFile: TFile | null = null;
                if (info instanceof MarkdownView) {
                    currentFile = info.file;
                } else if (info instanceof TFile) {
                    currentFile = info;
                }

                if (currentFile && this.settings.automaticGeneration && this.settings.triggerEvent === 'on-change') {
                    this.debouncedGenerateForOnChange(currentFile, editor.getValue());
                }
            })
        );
        
        // 'editor-blur' is not a standard documented event for app.workspace.on.
        // Let's use 'active-leaf-change' and check if focus is lost, or rely on 'file-close' or 'layout-change'.
        // For simplicity and directness, 'editor-save' (if it existed) or 'file-save' (from vault) is better.
        // 'editor-blur' is not a reliable event name here.
        // We will rely on the vault 'save' event for the 'on-save-or-blur' trigger.
        // If you specifically need blur, it would require more complex DOM event handling on editor instances.

         this.registerEvent(
            this.app.vault.on('modify', (file: TAbstractFile) => { // 'modify' is often used for save-like events
                if (file instanceof TFile && file.extension === "md" && 
                    this.settings.automaticGeneration && 
                    this.settings.triggerEvent === 'on-save-or-blur') {
                    // 'modify' can fire frequently. Consider if 'editor-blur' was intended.
                    // Using 'modify' as a proxy for save/blur.
                    this.app.vault.cachedRead(file).then(content => { // Use cachedRead for potentially faster access
                        this.generateAndApplySlug(file, content, true); 
                    });
                }
            })
        );
    }

    onunload() {}

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
        this.updateStopWords(); 
    }

    updateStopWords() {
        const baseStopWords = (this.settings.customStopWords.trim() === '') ? DEFAULT_SETTINGS.customStopWords : this.settings.customStopWords;
        const stopWordsArray = baseStopWords.split(',').map(s => s.trim().toLowerCase()).filter(s => s.length > 0);
        this.stopWords = new Set(stopWordsArray);
    }

    private getTimestamp(): string {
        const now = new Date();
        const H = String(now.getHours()).padStart(2, '0');
        const M = String(now.getMinutes()).padStart(2, '0');
        const S = String(now.getSeconds()).padStart(2, '0');
        
        if (this.settings.timestampFormat === 'YYMMDDHHMMSS') {
            const Y = String(now.getFullYear()).slice(-2);
            const MO = String(now.getMonth() + 1).padStart(2, '0'); 
            const D = String(now.getDate()).padStart(2, '0');
            return `${Y}${MO}${D}${H}${M}${S}`;
        }
        return `${H}${M}${S}`; 
    }

    private sanitizeWord(word: string): string {
        return word
            .toLowerCase()
            .replace(/[^\w\s-]/gi, '') 
            .replace(/\s+/g, '-') 
            .trim();
    }

    private stemWord(word: string): string {
        if (word.length < 3) return word; 
    
        if (word.endsWith('sses') || word.endsWith('ies')) {
            word = word.substring(0, word.length - 2);
        } else if (word.endsWith('ss')) {
        } else if (word.endsWith('s') && word.length > 1 && word[word.length-2] !== 's') {
            word = word.substring(0, word.length - 1);
        }

        if (word.endsWith('ational')) { word = word.substring(0, word.length - 7) + 'ate'; } 
        else if (word.endsWith('tional')) { word = word.substring(0, word.length - 6) + 'tion'; } 
        else if (word.endsWith('enci')) { word = word.substring(0, word.length - 4) + 'ence'; } 
        else if (word.endsWith('anci')) { word = word.substring(0, word.length - 4) + 'ance'; } 
        else if (word.endsWith('izer')) { word = word.substring(0, word.length - 4) + 'ize'; } 
        else if (word.endsWith('abli')) { word = word.substring(0, word.length - 4) + 'able'; } 
        else if (word.endsWith('alli')) { word = word.substring(0, word.length - 4) + 'al'; } 
        else if (word.endsWith('entli')) { word = word.substring(0, word.length - 5) + 'ent'; } 
        else if (word.endsWith('eli')) { word = word.substring(0, word.length - 3) + 'e'; } 
        else if (word.endsWith('ousli')) { word = word.substring(0, word.length - 5) + 'ous'; } 
        else if (word.endsWith('ization')) { word = word.substring(0, word.length - 7) + 'ize'; } 
        else if (word.endsWith('ation')) { word = word.substring(0, word.length - 5) + 'ate'; } 
        else if (word.endsWith('ator')) { word = word.substring(0, word.length - 4) + 'ate'; } 
        else if (word.endsWith('alism')) { word = word.substring(0, word.length - 5) + 'al'; } 
        else if (word.endsWith('iveness')) { word = word.substring(0, word.length - 7) + 'ive'; } 
        else if (word.endsWith('fulness')) { word = word.substring(0, word.length - 7) + 'ful'; } 
        else if (word.endsWith('ousness')) { word = word.substring(0, word.length - 7) + 'ous'; } 
        else if (word.endsWith('aliti')) { word = word.substring(0, word.length - 5) + 'al'; } 
        else if (word.endsWith('iviti')) { word = word.substring(0, word.length - 5) + 'ive'; } 
        else if (word.endsWith('biliti')) { word = word.substring(0, word.length - 6) + 'ble'; } 
        
        if (word.length > 4 && word.endsWith('ing')) {
            if (word.length > 4 && word[word.length-4] === word[word.length-5] && !(['l','s','z'].includes(word[word.length-4]))) {
                 word = word.substring(0, word.length - 4);
            } else if (word.length > 3) { 
                 word = word.substring(0, word.length - 3);
            }
        } else if (word.length > 3 && word.endsWith('ed')) {
             if (word.length > 3) { 
                word = word.substring(0, word.length - 2);
            }
        } else if (word.length > 3 && word.endsWith('ly')) {
            word = word.substring(0, word.length - 2);
        }
        
        if (word.length > 2 && word[word.length-1] === word[word.length-2] && !(['l','s','z'].includes(word[word.length-1]))) {
            word = word.substring(0, word.length -1);
        }
        return word;
    }

    private getSignificantWords(content: string): string[] {
        const frontmatterRegex = /^---\s*[\s\S]*?^---\s*/m;
        let cleanContent = content.replace(frontmatterRegex, '');
        
        cleanContent = cleanContent.replace(/```[\s\S]*?```/g, ''); 
        cleanContent = cleanContent.replace(/`[^`]+`/g, ''); 
        cleanContent = cleanContent.replace(/<[^>]*>/g, ''); 
        cleanContent = cleanContent.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1'); 
        cleanContent = cleanContent.replace(/[*_~#]+/g, ''); 

        let words: string[] = cleanContent.match(/\b[a-zA-Z0-9']+\b/g) || []; // Explicitly type as string[]
        words = words.map(word => word.toLowerCase().trim());
            
        words = words.filter(word => {
            return !/^\d+$/.test(word) && !this.stopWords.has(word); 
        });

        let processedWordsForIndexing: string[] = [...words];  // Explicitly type as string[]

        if (this.settings.enableStemming) {
            words = words.map(word => this.stemWord(word));
            processedWordsForIndexing = processedWordsForIndexing.map(word => this.stemWord(word)); 
        }

        words = words.filter(word => word.length >= this.settings.minWordLength);
        processedWordsForIndexing = processedWordsForIndexing.filter(word => word.length >= this.settings.minWordLength);
        
        if (words.length === 0) return [];

        const wordFrequencies: { [key: string]: number } = {};
        words.forEach(word => {
            wordFrequencies[word] = (wordFrequencies[word] || 0) + 1;
        });

        const uniqueWords: string[] = [...new Set(words)]; // Explicitly type as string[]
        
        uniqueWords.sort((a, b) => {
            const freqDiff = wordFrequencies[b] - wordFrequencies[a];
            if (freqDiff !== 0) return freqDiff;
            const indexA = processedWordsForIndexing.indexOf(a);
            const indexB = processedWordsForIndexing.indexOf(b);
            // Handle cases where a word might not be in processedWordsForIndexing (should be rare if logic is aligned)
            if (indexA === -1 && indexB === -1) return 0;
            if (indexA === -1) return 1; // Put words not found at the end
            if (indexB === -1) return -1; // Keep words found at the beginning
            return indexA - indexB; 
        });

        return uniqueWords.slice(0, this.settings.significantWordCount).map(w => this.sanitizeWord(w)).filter(w => w.length > 0);
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

    async generateAndApplySlug(file: TFile, content: string, isAutomatic: boolean) {
        if (!(file instanceof TFile) || !file.path.toLowerCase().endsWith('.md')) {
            return;
        }

        const newSlug = this.generateSlug(content);
        const justTimestamp = newSlug === this.getTimestamp(); 

        if (!newSlug || (justTimestamp && this.settings.significantWordCount > 0 && this.getSignificantWords(content).length === 0) || newSlug.startsWith('-') || newSlug.endsWith('-')) { 
            if (!isAutomatic && !(justTimestamp && this.settings.significantWordCount > 0 && this.getSignificantWords(content).length === 0)) { 
                 new Notice('Slug generation resulted in an empty or invalid slug. Check content and settings.');
            }
            return;
        }

        try {
            await this.app.fileManager.processFrontMatter(file, (frontmatter: FrontMatterCache) => {
                const key = this.settings.slugFrontmatterKey.trim();
                if (!key) {
                    if (!isAutomatic) new Notice('Slug frontmatter key is not configured properly.');
                    return; 
                }
                
                const currentSlug = frontmatter[key];

                if (isAutomatic) {
                    if (!this.settings.overwriteExistingSlug && currentSlug) {
                        return; 
                    }
                    frontmatter[key] = newSlug;
                } else { 
                    frontmatter[key] = newSlug;
                }
            });
        } catch (e: any) {
            new Notice(`Error applying slug: ${e.message}`);
            console.error("AutoSlugger Error applying slug: ", e);
        }
    }
}
