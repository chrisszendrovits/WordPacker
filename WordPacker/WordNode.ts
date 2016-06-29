class WordNode
{
    leftNode: WordNode;
    rightNode: WordNode;
    wordRect: WordRect;
    filled: boolean;

    constructor()
    {
        this.leftNode = null;
        this.rightNode = null;
        this.wordRect = null;
        this.filled = false;
    }

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

    insert(rect: WordRect): WordNode
    {
        if (this.leftNode != null)
            return this.leftNode.insert(rect) || this.rightNode.insert(rect);

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

        var insertRect: string = '';

        if (widthDiff > heightDiff)
        {
            // Split area into left and right, putting the rect on the left
            this.leftNode.wordRect = new WordRect(rect.width, this.wordRect.height, this.wordRect.x, this.wordRect.y, rect.word, rect.wordStyle);
            this.rightNode.wordRect = new WordRect(this.wordRect.width - rect.width, this.wordRect.height, this.wordRect.x + rect.width, this.wordRect.y, rect.word, rect.wordStyle);
            insertRect += 'left';
        }
        else
        {
            // Split area into top and bottom, putting rect on top
            this.leftNode.wordRect = new WordRect(this.wordRect.width, rect.height, this.wordRect.x, this.wordRect.y, rect.word, rect.wordStyle);
            this.rightNode.wordRect = new WordRect(this.wordRect.width, this.wordRect.height - rect.height, this.wordRect.x, this.wordRect.y + rect.height, rect.word, rect.wordStyle);
            insertRect += 'top';
        }

        insertRect += " leftNode: " + this.leftNode.wordRect.x + ', ' + this.leftNode.wordRect.y + ', ' + this.leftNode.wordRect.width + ', ' + this.leftNode.wordRect.height;
        //console.log(insertRect);

        return this.leftNode.insert(rect);
    }
}