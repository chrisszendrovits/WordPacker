var WordPacker = (function () {
    function WordPacker(canvas, width, height) {
        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this.firstPackedNode = new WordNode();
        this.firstPinnedNode = new WordNode();
        this.filledArea = 0;
        this.minFontSize = 10;
        this.maxFontSize = 20;
        this.showRect = true;
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvasArea = width * height;
        this.ctxCanvas = this.canvas.getContext("2d");
        this.firstPackedNode.wordRect = new WordRect(width, height);
    }
    WordPacker.prototype.getWordWidth = function (word, wordStyle) {
        this.ctxCanvas.font = wordStyle.getFontStyle();
        var textMetric = this.ctxCanvas.measureText(word);
        return Math.ceil(textMetric.width);
    };
    WordPacker.randomNumber = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    WordPacker.prototype.randomRect = function (word, showVertical, x, y) {
        if (showVertical === void 0) { showVertical = false; }
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        var randFontSize = WordPacker.randomNumber(this.minFontSize, this.maxFontSize);
        var wordStyle = new WordStyle(randFontSize, WordStyle.rgbaColorScheme(), "Arial");
        var rectHeight, rectWidth;
        if (showVertical) {
            rectHeight = this.getWordWidth(word, wordStyle);
            rectWidth = randFontSize;
        }
        else {
            rectHeight = randFontSize;
            rectWidth = this.getWordWidth(word, wordStyle);
        }
        return new WordRect(rectWidth, rectHeight, x, y, word, wordStyle);
    };
    WordPacker.prototype.pinWord = function (word, x, y, wordStyle) {
        var rect = new WordRect(this.getWordWidth(word, wordStyle), wordStyle.fontSize, x, y, word, wordStyle);
        var newNode = this.firstPinnedNode.addRight(rect);
        if (newNode) {
            if (this.showRect) {
                this.ctxCanvas.fillStyle = WordStyle.randomColor();
                this.ctxCanvas.fillRect(rect.x, rect.y, rect.width, rect.height);
            }
            this.ctxCanvas.fillStyle = rect.wordStyle.fontColor;
            this.ctxCanvas.fillText(rect.word, rect.x, rect.y + rect.wordStyle.fontSize);
            this.filledArea += rect.width * rect.height;
        }
        return newNode;
    };
    WordPacker.prototype.isPinIntersect = function (node) {
        var intersect = false;
        var iterNode = this.firstPinnedNode;
        if (node != null && node.wordRect != null && iterNode != null) {
            do {
                if (iterNode.wordRect != null) {
                    if (iterNode.wordRect.intersects(node.wordRect)) {
                        intersect = true;
                        break;
                    }
                }
                iterNode = iterNode.rightNode;
            } while (iterNode != null);
        }
        return intersect;
    };
    WordPacker.prototype.horizontalPack = function (rect) {
        var newNode = this.firstPackedNode.insert(rect);
        if (this.isPinIntersect(newNode)) {
            newNode = null;
        }
        if (newNode) {
            var nextRect = newNode.wordRect;
            if (this.showRect) {
                this.ctxCanvas.fillStyle = WordStyle.randomColor();
                this.ctxCanvas.fillRect(nextRect.x, nextRect.y, nextRect.width, nextRect.height);
            }
            //var wp = this;
            //setTimeout(this.drawWord, Math.floor(Math.random() * (1000 - 1 + 1)) + 1, this.ctxCanvas, nextRect);
            this.ctxCanvas.fillStyle = nextRect.wordStyle.fontColor;
            this.ctxCanvas.fillText(nextRect.word, nextRect.x, nextRect.y + rect.wordStyle.fontSize);
            this.filledArea += nextRect.width * nextRect.height;
        }
        return newNode;
    };
    //drawWord(canvas: CanvasRenderingContext2D, rect: WordRect) : void 
    //{
    //    canvas.fillStyle = rect.wordStyle.fontColor;
    //    canvas.fillText(rect.word, rect.x, rect.y + rect.wordStyle.fontSize);
    //}
    WordPacker.prototype.verticalPack = function (rect) {
        var newNode = this.firstPackedNode.insert(rect);
        if (this.isPinIntersect(newNode)) {
            newNode = null;
        }
        if (newNode) {
            var nextRect = newNode.wordRect;
            if (this.showRect) {
                this.ctxCanvas.fillStyle = WordStyle.randomColor();
                this.ctxCanvas.fillRect(nextRect.x, nextRect.y, nextRect.width, nextRect.height);
            }
            var wp = this;
            //setTimeout(function ()
            //{
            //    wp.ctxCanvas.save();
            //    wp.ctxCanvas.fillStyle = nextRect.wordStyle.fontColor;
            //    wp.ctxCanvas.translate(nextRect.x, nextRect.y);
            //    wp.ctxCanvas.rotate(90 * Math.PI / 180);
            //    wp.ctxCanvas.fillText(nextRect.word, 0, 0);
            //    wp.ctxCanvas.restore();
            //}, Math.floor(Math.random() * (1000 - 1 + 1)) + 1);
            this.ctxCanvas.save();
            this.ctxCanvas.fillStyle = nextRect.wordStyle.fontColor;
            this.ctxCanvas.translate(nextRect.x, nextRect.y);
            this.ctxCanvas.rotate(90 * Math.PI / 180);
            this.ctxCanvas.fillText(nextRect.word, 0, 0);
            this.ctxCanvas.restore();
            this.filledArea += nextRect.width * nextRect.height;
        }
        return newNode;
    };
    WordPacker.prototype.packWords = function (words) {
        var i = 0, percentCompleted, attempts = 0;
        do {
            var lastNode;
            //var wp: WordPacker = this;
            attempts++;
            if (Math.random() > 0.3) {
                var rect = this.randomRect(words[i++]);
                lastNode = this.horizontalPack(rect);
            }
            else {
                var rect = this.randomRect(words[i++], true);
                lastNode = this.verticalPack(rect);
            }
            if (lastNode) {
                attempts = 0;
            }
            if (i >= words.length) {
                i = 0;
            }
            percentCompleted = (this.filledArea / this.canvasArea) * 100;
        } while (percentCompleted < 80 && attempts < 100);
    };
    WordPacker.prototype.sleep = function (ms) {
        var max_sec = new Date().getTime();
        var elapsed = false;
        do {
            if (new Date().getTime() > max_sec + ms) {
                elapsed = true;
            }
        } while (elapsed == false);
    };
    return WordPacker;
})();
//# sourceMappingURL=WordPacker.js.map