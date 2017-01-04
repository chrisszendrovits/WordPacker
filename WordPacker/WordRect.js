/// <summary>
/// WordRect is used to encapsulate all the data needed to display an instance of text.
/// </summary>
var WordRect = (function () {
    /// <summary>
    /// Constructor used to initialize the WordRect. Can be used as a copy constructor.
    /// </summary>
    function WordRect(wordRect) {
        this.width = wordRect.width;
        this.height = wordRect.height;
        this.x = wordRect.x;
        this.y = wordRect.y;
        this.word = wordRect.word;
        this.wordStyle = wordRect.wordStyle;
    }
    /// <summary>
    /// Check if a WordRect fits within another WordRect.
    /// </summary>
    WordRect.prototype.fitsIn = function (rect) {
        return rect.width >= this.width && rect.height >= this.height;
    };
    /// <summary>
    /// Check if a WordRect's dimensions are identical to another WordRect.
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
    /// <summary>
    /// Returns a WordRect interface containing the object's data members.
    /// </summary>
    WordRect.prototype.getWordRect = function () {
        return {
            width: this.width,
            height: this.height,
            x: this.x,
            y: this.y,
            word: this.word,
            wordStyle: this.wordStyle
        };
    };
    return WordRect;
}());
//# sourceMappingURL=WordRect.js.map