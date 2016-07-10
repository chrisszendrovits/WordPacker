/// <summary>
/// WordNode is a single node, in a linked list.
/// </summary>
class WordNode
{
    leftNode: WordNode;
    rightNode: WordNode;
    wordRect: WordRect;
    filled: boolean;
    isVertical: boolean;

    /// <summary>
    /// Constructor used to initialize the a new node.
    /// </summary>
    constructor()
    {
        this.leftNode = null;
        this.rightNode = null;
        this.wordRect = null;
        this.filled = false;
        this.isVertical = false;
    }

    /// <summary>Add a WordRect to the node on the right.</summary>
    /// <returns>The WordNode that the WordRect was added to.</returns>
    addRight(rect: WordRect): WordNode
    {
        if (this.rightNode != null)
        {
            return this.rightNode.addRight(rect);
        }
        else if (this.wordRect == null)
        {
            this.wordRect = rect;
            return this;
        }

        this.rightNode = new WordNode();
        this.rightNode.wordRect = rect;
        this.rightNode.filled = true;
        
        return this.rightNode;
    }

    /// <summary>Recursively add a WordRect to the linked list of nodes.</summary>
    /// <returns>The WordNode that the WordRect was added to.</returns>
    add(rect: WordRect): WordNode
    {
        if (this.leftNode != null)
            return this.leftNode.add(rect) || this.rightNode.add(rect);

        if (this.filled)
            return null;

        if (!rect.fitsIn(this.wordRect))
            return null;
        
        if (rect.isSizeEqual(this.wordRect))
        {
            this.filled = true;
            return this;
        }

        this.leftNode = new WordNode();
        this.rightNode = new WordNode();

        var widthDiff = this.wordRect.width - rect.width;
        var heightDiff = this.wordRect.height - rect.height;

        if (widthDiff > heightDiff)
        {
            // Split area into left and right, putting the rect on the left
            this.leftNode.wordRect = new WordRect({
                width: rect.width,
                height: this.wordRect.height,
                x: this.wordRect.x,
                y: this.wordRect.y, word: rect.word,
                wordStyle: rect.wordStyle
            });
            this.rightNode.wordRect = new WordRect({
                width: this.wordRect.width - rect.width,
                height: this.wordRect.height,
                x: this.wordRect.x + rect.width,
                y: this.wordRect.y,
                word: rect.word,
                wordStyle: rect.wordStyle
            });
        }
        else
        {
            // Split area into top and bottom, putting rect on top
            this.leftNode.wordRect = new WordRect({
                width: this.wordRect.width,
                height: rect.height,
                x: this.wordRect.x,
                y: this.wordRect.y,
                word: rect.word,
                wordStyle: rect.wordStyle
            });
            this.rightNode.wordRect = new WordRect({
                width: this.wordRect.width,
                height: this.wordRect.height - rect.height,
                x: this.wordRect.x,
                y: this.wordRect.y + rect.height,
                word: rect.word,
                wordStyle: rect.wordStyle
            });
        }

        return this.leftNode.add(rect);
    }
}