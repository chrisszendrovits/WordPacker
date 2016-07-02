/// <summary>
/// WordRect is used to encapsulate all the data needed to display an instance of text.
/// </summary>
var WordRect = (function () {
    /// <summary>
    /// Constructor used to initialize the WordRect.
    /// </summary>
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
    /// <summary>
    /// Check if a WordRect fits within another WordRect.
    /// </summary>
    WordRect.prototype.fitsIn = function (rect) {
        return rect.width >= this.width && rect.height >= this.height;
    };
    /// <summary>
    /// Check if a WordRect is equal to another WordRect.
    /// </summary>
    WordRect.prototype.isSizeEqual = function (rect) {
        return this.width == rect.width && this.height == rect.height;
    };
    /// <summary>
    /// Check if a WordRect intersects with another WordRect.
    /// </summary>
    WordRect.prototype.intersects = function (rect) {
        var rightA = this.x + this.width, leftA = this.x, topA = this.y, bottomA = this.y + this.height;
        var rightB = rect.x + rect.width, leftB = rect.x, topB = rect.y, bottomB = rect.y + rect.height;
        if (rightA < leftB || leftA > rightB || bottomA < topB || topA > bottomB) {
            return false;
        }
        else {
            return true;
        }
    };
    return WordRect;
})();
//# sourceMappingURL=WordRect.js.map