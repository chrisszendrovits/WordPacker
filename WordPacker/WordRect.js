var WordRect = (function () {
    function WordRect(width, height, x, y, word, wordStyle) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (word === void 0) { word = ""; }
        if (wordStyle === void 0) { wordStyle = null; }
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.word = word;
        this.wordStyle = wordStyle;
    }
    WordRect.prototype.fitsIn = function (rect) {
        return rect.width >= this.width && rect.height >= this.height;
    };
    WordRect.prototype.isSizeEqual = function (rect) {
        return this.width == rect.width && this.height == rect.height;
    };
    WordRect.prototype.intersects = function (rect) {
        var rightA = this.x + this.width, leftA = this.x, topA = this.y, bottomA = this.y + this.height;
        var rightB = rect.x + rect.width, leftB = rect.x, topB = rect.y, bottomB = rect.y + rect.height;
        if (rightA < leftB || leftA > rightB || bottomA < topB || topA > bottomB) {
            return false;
        }
        else {
            return true;
        }
        //var width = (rightA > rightB ? rightB - leftA : rightA - leftB);
        //var height = (bottomA > bottomB ? bottomB - topA : bottomA - topB);
        //return width * height;
    };
    return WordRect;
})();
//# sourceMappingURL=WordRect.js.map