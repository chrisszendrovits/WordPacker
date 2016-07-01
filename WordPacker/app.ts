class AppMain
{
    nextWord: HTMLCanvasElement;
    ctxNextWord: CanvasRenderingContext2D;

    percentFull: HTMLSpanElement;
    pixelsToFill: HTMLSpanElement;
    aspectRadio: number = 0.6;

    constructor(nextWord: HTMLCanvasElement, percentFull: HTMLSpanElement, pixelsToFill: HTMLSpanElement)
    {
        this.nextWord = nextWord;
        this.percentFull = percentFull;
        this.pixelsToFill = pixelsToFill;
    }

    setCanvasSize(width: number, height: number)
    {
        this.nextWord.width = width;
        this.nextWord.height = height;
        this.ctxNextWord = this.nextWord.getContext("2d");
    }

    updateNextWordSize(fontSize: number, numChars: number)
    {
        this.nextWord.height = fontSize;
        this.nextWord.width = (fontSize * this.aspectRadio) * numChars;
    }
}

window.onload = () =>
{
    var nextWord = <HTMLCanvasElement>document.getElementById('nextWord');
    var percentFull = <HTMLSpanElement>document.getElementById('percentfull');
    var pixelsToFill = <HTMLSpanElement>document.getElementById('pixelstogo');
    var app = new AppMain(nextWord, percentFull, pixelsToFill);   
    app.setCanvasSize(25, 25);

    var bin = <HTMLCanvasElement>document.getElementById('wordBin');
    var words = ["asp.net", "dedicated", "team player", "proactive", "problem solver",
        "detail oriented", "javascript", "agile", "full stack", "developer",
        "communicator", "architect", "angularjs", "sql server",
    ];
    var wp = new WordPacker(bin, 1200, 200);
    
    var title: string = "Chris Szendrovits";
    var fontTitle: WordStyle = new WordStyle(32, "#455372", "Verdana", " bold");
    var randX: number = WordPacker.randomNumber(wp.width * 0.25, wp.width * 0.5);
    var randY: number = WordPacker.randomNumber(wp.height * 0.15, wp.height * 0.7);

    wp.pinWord(title, randX, randY, fontTitle);
    wp.packWords(words);
};