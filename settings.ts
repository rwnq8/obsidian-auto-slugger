import { App, PluginSettingTab, Setting } from 'obsidian';
import AutoSluggerPlugin from './main'; // Adjust path if needed

export interface AutoSluggerSettings {
    automaticGeneration: boolean;
    triggerEvent: 'on-change' | 'on-save-or-blur'; // 'on-save-or-blur' will be a pragmatic choice
    slugFrontmatterKey: string;
    overwriteExistingSlug: boolean;
    significantWordCount: number;
    minWordLength: number;
    timestampFormat: 'HHMMSS' | 'YYMMDDHHMMSS'; // Adding more flexibility
    customStopWords: string; // Comma-separated
}

export const DEFAULT_SETTINGS: AutoSluggerSettings = {
    automaticGeneration: false,
    triggerEvent: 'on-save-or-blur',
    slugFrontmatterKey: 'slug',
    overwriteExistingSlug: false,
    significantWordCount: 2,
    minWordLength: 4,
    timestampFormat: 'HHMMSS',
    customStopWords: 'a,an,the,is,are,was,were,be,been,being,have,has,had,do,does,did,will,would,should,can,could,may,might,must,i,you,he,she,it,we,they,me,him,her,us,them,my,your,his,its,our,their,mine,yours,hers,ours,theirs,myself,yourself,himself,herself,itself,ourselves,yourselves,themselves,and,but,or,nor,for,so,yet,at,by,in,on,to,up,of,with,from,into,onto,upon,out,over,under,again,further,then,once,here,there,when,where,why,how,all,any,both,each,few,more,most,other,some,such,no,not,only,own,same,too,very,s,t,just,don,shouldve,now,d,ll,m,o,re,ve,y,ain,aren,couldn,didn,doesn,hadn,hasn,haven,isn,ma,mightn,mustn,needn,shan,shouldn,wasn,weren,won,wouldn',
};

export class AutoSluggerSettingTab extends PluginSettingTab {
    plugin: AutoSluggerPlugin;

    constructor(app: App, plugin: AutoSluggerPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();
        containerEl.createEl('h2', { text: 'Auto Slugger Settings' });

        new Setting(containerEl)
            .setName('Automatic Slug Generation')
            .setDesc('Enable to automatically generate slugs based on the trigger event.')
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.automaticGeneration)
                .onChange(async (value) => {
                    this.plugin.settings.automaticGeneration = value;
                    await this.plugin.saveSettings();
                    this.display(); // Re-render to show/hide conditional settings
                }));

        if (this.plugin.settings.automaticGeneration) {
            new Setting(containerEl)
                .setName('Trigger Event for Automatic Generation')
                .setDesc('When to automatically generate the slug.')
                .addDropdown(dropdown => dropdown
                    .addOption('on-change', 'On Note Change (debounced)')
                    .addOption('on-save-or-blur', 'On Note Save/Focus Lost')
                    .setValue(this.plugin.settings.triggerEvent)
                    .onChange(async (value: 'on-change' | 'on-save-or-blur') => {
                        this.plugin.settings.triggerEvent = value;
                        await this.plugin.saveSettings();
                    }));
        }

        new Setting(containerEl)
            .setName('Slug Frontmatter Key')
            .setDesc('The key used in frontmatter to store the slug.')
            .addText(text => text
                .setPlaceholder('e.g., slug or alias')
                .setValue(this.plugin.settings.slugFrontmatterKey)
                .onChange(async (value) => {
                    this.plugin.settings.slugFrontmatterKey = value.trim() || DEFAULT_SETTINGS.slugFrontmatterKey;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Overwrite Existing Slug')
            .setDesc('If enabled, will overwrite an existing slug in the frontmatter. Otherwise, it will only add a slug if one doesn\'t exist.')
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.overwriteExistingSlug)
                .onChange(async (value) => {
                    this.plugin.settings.overwriteExistingSlug = value;
                    await this.plugin.saveSettings();
                }));
        
        new Setting(containerEl)
            .setName('Timestamp Format')
            .setDesc('Format for the timestamp prefix.')
            .addDropdown(dropdown => dropdown
                .addOption('HHMMSS', 'HHMMSS (e.g., 104538)')
                .addOption('YYMMDDHHMMSS', 'YYMMDDHHMMSS (e.g., 231027104538)')
                .setValue(this.plugin.settings.timestampFormat)
                .onChange(async (value: 'HHMMSS' | 'YYMMDDHHMMSS') => {
                    this.plugin.settings.timestampFormat = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Number of Significant Words')
            .setDesc('How many significant words to extract from the note content for the slug.')
            .addSlider(slider => slider
                .setLimits(1, 5, 1)
                .setValue(this.plugin.settings.significantWordCount)
                .setDynamicTooltip()
                .onChange(async (value) => {
                    this.plugin.settings.significantWordCount = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Minimum Word Length')
            .setDesc('Minimum length for a word to be considered "significant".')
            .addSlider(slider => slider
                .setLimits(2, 10, 1)
                .setValue(this.plugin.settings.minWordLength)
                .setDynamicTooltip()
                .onChange(async (value) => {
                    this.plugin.settings.minWordLength = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Custom Stop Words')
            .setDesc('Comma-separated list of words to ignore (in addition to common English stop words). Case-insensitive.')
            .addTextArea(text => text
                .setPlaceholder('e.g., project, task, mycustomword')
                .setValue(this.plugin.settings.customStopWords)
                .onChange(async (value) => {
                    this.plugin.settings.customStopWords = value;
                    await this.plugin.saveSettings();
                }));
    }
}