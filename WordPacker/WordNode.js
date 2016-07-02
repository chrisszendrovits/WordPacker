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
        this.wordRect = null;
        this.filled = false;
        this.isVertical = false;
    }
    /// <summary>Add a WordRect to the node on the right.</summary>
    /// <returns>The WordNode that the WordRect was added to.</returns>
    WordNode.prototype.addRight = function (rect) {
        if (this.rightNode != null) {
            return this.rightNode.addRight(rect);
        }
        else if (this.wordRect == null) {
            this.wordRect = rect;
            return this;
        }
        this.rightNode = new WordNode();
        this.rightNode.wordRect = rect;
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
        if (!rect.fitsIn(this.wordRect))
            return null;
        if (rect.isSizeEqual(this.wordRect)) {
            this.filled = true;
            return this;
        }
        this.leftNode = new WordNode();
        this.rightNode = new WordNode();
        var widthDiff = this.wordRect.width - rect.width;
        var heightDiff = this.wordRect.height - rect.height;
        if (widthDiff > heightDiff) {
            // Split area into left and right, putting the rect on the left
            this.leftNode.wordRect = new WordRect(rect.width, this.wordRect.height, this.wordRect.x, this.wordRect.y, rect.word, rect.wordStyle);
            this.rightNode.wordRect = new WordRect(this.wordRect.width - rect.width, this.wordRect.height, this.wordRect.x + rect.width, this.wordRect.y, rect.word, rect.wordStyle);
        }
        else {
            // Split area into top and bottom, putting rect on top
            this.leftNode.wordRect = new WordRect(this.wordRect.width, rect.height, this.wordRect.x, this.wordRect.y, rect.word, rect.wordStyle);
            this.rightNode.wordRect = new WordRect(this.wordRect.width, this.wordRect.height - rect.height, this.wordRect.x, this.wordRect.y + rect.height, rect.word, rect.wordStyle);
        }
        return this.leftNode.add(rect);
    };
    return WordNode;
})();
//# sourceMappingURL=WordNode.js.map