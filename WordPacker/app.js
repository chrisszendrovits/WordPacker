var AppMain = (function () {
    function AppMain(nextWord, percentFull, pixelsToFill) {
        this.aspectRadio = 0.6;
        this.nextWord = nextWord;
        this.percentFull = percentFull;
        this.pixelsToFill = pixelsToFill;
    }
    AppMain.prototype.setCanvasSize = function (width, height) {
        this.nextWord.width = width;
        this.nextWord.height = height;
        this.ctxNextWord = this.nextWord.getContext("2d");
    };
    AppMain.prototype.updateNextWordSize = function (fontSize, numChars) {
        this.nextWord.height = fontSize;
        this.nextWord.width = (fontSize * this.aspectRadio) * numChars;
    };
    return AppMain;
})();
window.onload = function () {
    var nextWord = document.getElementById('nextWord');
    var percentFull = document.getElementById('percentfull');
    var pixelsToFill = document.getElementById('pixelstogo');
    var app = new AppMain(nextWord, percentFull, pixelsToFill);
    app.setCanvasSize(25, 25);
    var bin = document.getElementById('wordBin');
    var words = ["asp.net", "dedicated", "team player", "proactive", "problem solver",
        "detail oriented", "javascript", "agile", "full stack", "developer",
        "communicator", "architect", "angularjs", "sql server",
    ];
    var wp = new WordPacker(bin, 1200, 200);
    var title = "Chris Szendrovits";
    var fontTitle = new WordStyle(32, "#455372", "Verdana", " bold");
    var randX = WordPacker.randomNumber(wp.width * 0.25, wp.width * 0.5);
    var randY = WordPacker.randomNumber(wp.height * 0.15, wp.height * 0.7);
    wp.pinWord(title, randX, randY, fontTitle);
    wp.packWords(words);
};
//# sourceMappingURL=app.js.map