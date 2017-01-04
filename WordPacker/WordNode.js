/// <summary>
/// WordNode is a single node, in a linked list.
/// </summary>
var WordNode = (function () {
    /// <summary>
    /// Constructor used to initialize the a new node.
    /// </summary>
    function WordNode() {
        this.leftNode = null;
        this.rightNode = null;
        this.currentWordRect = null;
        this.targetWordRect = null;
        this.filled = false;
        this.isVertical = false;
    }
    /// <summary>Add a WordRect to the node on the right.</summary>
    /// <returns>The WordNode that the WordRect was added to.</returns>
    WordNode.prototype.addRight = function (rect) {
        if (this.rightNode != null) {
            return this.rightNode.addRight(rect);
        }
        else if (this.targetWordRect == null) {
            this.targetWordRect = rect;
            return this;
        }
        this.rightNode = new WordNode();
        this.rightNode.targetWordRect = rect;
        this.rightNode.filled = true;
        return this.rightNode;
    };
    /// <summary>Recursively add a WordRect to the linked list of nodes.</summary>
    /// <returns>The WordNode that the WordRect was added to.</returns>
    WordNode.prototype.add = function (rect) {
        if (this.leftNode != null)
            return this.leftNode.add(rect) || this.rightNode.add(rect);
        if (this.filled)
            return null;
        if (!rect.fitsIn(this.targetWordRect))
            return null;
        if (rect.isSizeEqual(this.targetWordRect)) {
            this.filled = true;
            return this;
        }
        this.leftNode = new WordNode();
        this.rightNode = new WordNode();
        var widthDiff = this.targetWordRect.width - rect.width;
        var heightDiff = this.targetWordRect.height - rect.height;
        if (widthDiff > heightDiff) {
            // Split area into left and right, putting the rect on the left
            this.leftNode.targetWordRect = new WordRect({
                width: rect.width,
                height: this.targetWordRect.height,
                x: this.targetWordRect.x,
                y: this.targetWordRect.y, word: rect.word,
                wordStyle: rect.wordStyle
            });
            this.rightNode.targetWordRect = new WordRect({
                width: this.targetWordRect.width - rect.width,
                height: this.targetWordRect.height,
                x: this.targetWordRect.x + rect.width,
                y: this.targetWordRect.y,
                word: rect.word,
                wordStyle: rect.wordStyle
            });
        }
        else {
            // Split area into top and bottom, putting rect on top
            this.leftNode.targetWordRect = new WordRect({
                width: this.targetWordRect.width,
                height: rect.height,
                x: this.targetWordRect.x,
                y: this.targetWordRect.y,
                word: rect.word,
                wordStyle: rect.wordStyle
            });
            this.rightNode.targetWordRect = new WordRect({
                width: this.targetWordRect.width,
                height: this.targetWordRect.height - rect.height,
                x: this.targetWordRect.x,
                y: this.targetWordRect.y + rect.height,
                word: rect.word,
                wordStyle: rect.wordStyle
            });
        }
        return this.leftNode.add(rect);
    };
    return WordNode;
}());
//# sourceMappingURL=WordNode.js.map