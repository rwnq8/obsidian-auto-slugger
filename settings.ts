import { App, PluginSettingTab, Setting } from 'obsidian';
import AutoSluggerPlugin from './main'; 

export interface AutoSluggerSettings {
    automaticGeneration: boolean;
    triggerEvent: 'on-change' | 'on-save-or-blur'; 
    slugFrontmatterKey: string;
    overwriteExistingSlug: boolean;
    significantWordCount: number;
    minWordLength: number;
    timestampFormat: 'HHMMSS' | 'YYMMDDHHMMSS'; 
    customStopWords: string; 
    enableStemming: boolean;
}

export const DEFAULT_SETTINGS: AutoSluggerSettings = {
    automaticGeneration: false,
    triggerEvent: 'on-save-or-blur',
    slugFrontmatterKey: 'slug',
    overwriteExistingSlug: false,
    significantWordCount: 2,
    minWordLength: 4,
    timestampFormat: 'HHMMSS',
    customStopWords: 'a,able,about,above,abroad,according,accordingly,across,actually,adj,after,afterwards,again,against,ago,ahead,ain\'t,all,allow,allows,almost,alone,along,alongside,already,also,although,always,am,amid,amidst,among,amongst,an,and,another,any,anybody,anyhow,anyone,anything,anyway,anyways,anywhere,apart,appear,appreciate,appropriate,are,aren\'t,around,as,a\'s,aside,ask,asking,associated,at,available,away,awfully,b,back,backward,backwards,be,became,because,become,becomes,becoming,been,before,beforehand,begin,behind,being,believe,below,beside,besides,best,better,between,beyond,both,brief,but,by,c,came,can,cannot,cant,can\'t,caption,cause,causes,certain,certainly,changes,clearly,c\'s,co,co.,com,come,comes,concerning,consequently,consider,considering,contain,containing,contains,corresponding,could,couldn\'t,course,currently,d,dare,daren\'t,date,definitely,described,despite,did,didn\'t,different,directly,do,does,doesn\'t,doing,done,don\'t,down,downwards,during,e,each,edu,eg,eight,eighty,either,else,elsewhere,end,ending,enough,entirely,especially,et,etc,even,ever,evermore,every,everybody,everyone,everything,everywhere,ex,exactly,example,except,f,fairly,far,farther,few,fewer,fifth,first,five,followed,following,follows,for,forever,former,formerly,forth,forward,found,four,from,further,furthermore,g,get,gets,getting,given,gives,go,goes,going,gone,got,gotten,greetings,h,had,hadn\'t,half,happens,hardly,has,hasn\'t,have,haven\'t,having,he,he\'d,he\'ll,hello,help,hence,her,here,hereafter,hereby,herein,here\'s,hereupon,hers,herself,he\'s,hi,him,himself,his,hither,hopefully,how,howbeit,however,hundred,i,i\'d,ie,if,ignored,i\'ll,i\'m,immediate,in,inasmuch,inc,inc.,indeed,indicate,indicated,indicates,inner,inside,insofar,instead,into,inward,is,isn\'t,it,it\'d,it\'ll,its,it\'s,itself,i\'ve,j,just,k,keep,keeps,kept,know,known,knows,l,last,lately,later,latter,latterly,least,less,lest,let,let\'s,like,liked,likely,likewise,little,look,looking,looks,low,lower,ltd,m,made,mainly,make,makes,many,may,maybe,mayn\'t,me,mean,meantime,meanwhile,merely,might,mightn\'t,mine,minus,miss,more,moreover,most,mostly,mr,mrs,much,must,mustn\'t,my,myself,n,name,namely,nd,near,nearly,necessary,need,needn\'t,needs,neither,never,neverf,neverless,nevertheless,new,next,nine,ninety,no,nobody,non,none,nonetheless,noone,no-one,nor,normally,not,nothing,notwithstanding,novel,now,nowhere,o,obviously,of,off,often,oh,ok,okay,old,on,once,one,ones,one\'s,only,onto,opposite,or,other,others,otherwise,ought,oughtn\'t,our,ours,ourselves,out,outside,over,overall,own,p,particular,particularly,past,per,perhaps,placed,please,plus,possible,post,presumably,probably,provided,provides,q,que,quite,qv,r,rather,rd,re,really,reasonably,recent,recently,regarding,regardless,regards,relatively,respectively,right,round,s,said,same,saw,say,saying,says,second,secondly,see,seeing,seem,seemed,seeming,seems,seen,self,selves,sensible,sent,serious,seriously,seven,several,shall,shan\'t,she,she\'d,she\'ll,she\'s,should,shouldn\'t,since,six,so,some,somebody,someday,somehow,someone,something,sometime,sometimes,somewhat,somewhere,soon,sorry,specified,specify,specifying,still,sub,such,sup,sure,t,take,taken,taking,tell,tends,th,than,thank,thanks,thanx,that,that\'ll,thats,that\'s,that\'ve,the,their,theirs,them,themselves,then,thence,there,thereafter,thereby,there\'d,therefore,therein,there\'ll,there\'re,theres,there\'s,thereupon,there\'ve,these,they,they\'d,they\'ll,they\'re,they\'ve,thing,things,think,third,thirty,this,thorough,thoroughly,those,though,three,through,throughout,thru,thus,till,to,together,too,took,toward,towards,tried,tries,truly,try,trying,t\'s,twice,two,u,un,under,underneath,undoing,unfortunately,unless,unlike,unlikely,until,unto,up,upon,upwards,us,use,used,useful,uses,using,usually,v,value,various,versus,very,via,viz,vs,w,want,wants,was,wasn\'t,way,we,we\'d,welcome,well,we\'ll,went,were,we\'re,weren\'t,we\'ve,what,whatever,what\'ll,what\'s,what\'ve,when,whence,whenever,where,whereafter,whereas,whereby,wherein,where\'s,whereupon,wherever,whether,which,whichever,while,whilst,whither,who,who\'d,whoever,whole,who\'ll,whom,whomever,who\'s,whose,why,will,willing,wish,with,within,without,wonder,won\'t,would,wouldn\'t,x,y,yes,yet,you,you\'d,you\'ll,your,you\'re,yours,yourself,yourselves,you\'ve,z,zero',
    enableStemming: true,
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
                    this.display(); 
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
            .setDesc('If enabled, will overwrite an existing slug. Otherwise, only adds if one doesn\'t exist (for automatic).')
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
            .setDesc('How many significant words to extract from the note content (1-5).')
            .addSlider(slider => slider
                .setLimits(1, 5, 1)
                .setValue(this.plugin.settings.significantWordCount)
                .setDynamicTooltip()
                .onChange(async (value) => {
                    this.plugin.settings.significantWordCount = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Minimum Word Length for Slug')
            .setDesc('Minimum length for a (potentially stemmed) word to be considered "significant" (2-10).')
            .addSlider(slider => slider
                .setLimits(2, 10, 1)
                .setValue(this.plugin.settings.minWordLength)
                .setDynamicTooltip()
                .onChange(async (value) => {
                    this.plugin.settings.minWordLength = value;
                    await this.plugin.saveSettings();
                }));
        
        new Setting(containerEl) 
            .setName('Enable Word Stemming')
            .setDesc('Reduce words to their root form (e.g., "running" to "run"). Can make slugs more concise.')
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.enableStemming)
                .onChange(async (value) => {
                    this.plugin.settings.enableStemming = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Custom Stop Words')
            .setDesc('Comma-separated list of words to ignore (case-insensitive). Applied before stemming.')
            .addTextArea(text => text
                .setPlaceholder('e.g., project, task, mycustomword')
                .setValue(this.plugin.settings.customStopWords)
                .onChange(async (value) => {
                    this.plugin.settings.customStopWords = value; // User can override the extensive default list here
                    await this.plugin.saveSettings();
                }));
    }
}
