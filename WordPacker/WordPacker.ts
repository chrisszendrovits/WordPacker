class WordPacker
{
    private ctxCanvas: CanvasRenderingContext2D;
    private firstPackedNode: WordNode = new WordNode();
    private firstPinnedNode: WordNode = new WordNode();

    public canvasArea: number;
    public filledArea: number = 0;
    public minFontSize: number = 10;
    public maxFontSize: number = 20;
    public showRect: boolean = false;

    constructor(private canvas: HTMLCanvasElement, public width: number, public height: number)
    {
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvasArea = width * height;
        this.ctxCanvas = this.canvas.getContext("2d");
        this.firstPackedNode.wordRect = new WordRect(width, height);
    }

    getWordWidth(word: string, wordStyle: WordStyle): number
    {
        this.ctxCanvas.font = wordStyle.getFontStyle();
        var textMetric: TextMetrics = this.ctxCanvas.measureText(word);

        return Math.ceil(textMetric.width);
    }

    static randomNumber(min: number, max: number): number
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    randomRect(word: string, showVertical: boolean = false, x: number = 0, y: number = 0): WordRect
    {
        var randFontSize: number = WordPacker.randomNumber(this.minFontSize, this.maxFontSize);
        var wordStyle: WordStyle = new WordStyle(randFontSize, WordStyle.rgbaColorScheme(), "Arial");

        var rectHeight: number, rectWidth: number;

        if (showVertical)
        {
            rectHeight = this.getWordWidth(word, wordStyle);
            rectWidth = randFontSize;
        }
        else
        {
            rectHeight = randFontSize;
            rectWidth = this.getWordWidth(word, wordStyle);
        }

        return new WordRect(rectWidth, rectHeight, x, y, word, wordStyle);
    }

    pinWord(word: string, x: number, y: number, wordStyle: WordStyle): WordNode
    {
        var rect: WordRect = new WordRect(this.getWordWidth(word, wordStyle),
            wordStyle.fontSize, x, y, word, wordStyle);

        var newNode: WordNode = this.firstPinnedNode.addRight(rect);

        if (newNode)
        {
            if (this.showRect)
            {
                this.ctxCanvas.fillStyle = WordStyle.randomColor();
                this.ctxCanvas.fillRect(rect.x, rect.y, rect.width, rect.height);
            }

            this.ctxCanvas.fillStyle = rect.wordStyle.fontColor;
            this.ctxCanvas.fillText(rect.word, rect.x, rect.y + rect.wordStyle.fontSize);
            this.filledArea += rect.width * rect.height;
        }
        return newNode;
    }

    isPinIntersect(node: WordNode): boolean
    {
        var intersect: boolean = false;
        var iterNode: WordNode = this.firstPinnedNode;

        if (node != null && node.wordRect != null && iterNode != null )
        {
            do
            {
                if (iterNode.wordRect != null)
                {
                    if (iterNode.wordRect.intersects(node.wordRect))
                    {
                        intersect = true;
                        break;
                    }
                }

                iterNode = iterNode.rightNode;
            } while (iterNode != null);
        }
        return intersect;
    }

    horizontalPack(rect: WordRect): WordNode
    {
        var newNode: WordNode = this.firstPackedNode.insert(rect);

        if (this.isPinIntersect(newNode))
        {
            newNode = null;
        }

        if (newNode)
        {
            var nextRect = newNode.wordRect;

            if (this.showRect)
            {
                this.ctxCanvas.fillStyle = WordStyle.randomColor();
                this.ctxCanvas.fillRect(nextRect.x, nextRect.y, nextRect.width, nextRect.height);
            }

            this.ctxCanvas.fillStyle = nextRect.wordStyle.fontColor;
            this.ctxCanvas.fillText(nextRect.word, nextRect.x, nextRect.y + rect.wordStyle.fontSize);

            this.filledArea += nextRect.width * nextRect.height;
        }
        return newNode;
    }

    verticalPack(rect: WordRect): WordNode
    {
        var newNode: WordNode = this.firstPackedNode.insert(rect);

        if (this.isPinIntersect(newNode))
        {
            newNode = null;
        }

        if (newNode)
        {
            var nextRect = newNode.wordRect;

            if (this.showRect)
            {
                this.ctxCanvas.fillStyle = WordStyle.randomColor();
                this.ctxCanvas.fillRect(nextRect.x, nextRect.y, nextRect.width, nextRect.height);
            }
            
            this.ctxCanvas.save();
            this.ctxCanvas.fillStyle = nextRect.wordStyle.fontColor;
            this.ctxCanvas.translate(nextRect.x, nextRect.y);
            this.ctxCanvas.rotate(90*Math.PI/180);
            this.ctxCanvas.fillText(nextRect.word, 0, 0);
            this.ctxCanvas.restore();

            this.filledArea += nextRect.width * nextRect.height;
        }
        return newNode;
    }
    
    packWords(words: string[])
    {
        var i: number = 0, percentCompleted: number, attempts = 0;

        do
        {
            var lastNode: WordNode;
            attempts++

            if (Math.random() > 0.3)
            {
                var rect: WordRect = this.randomRect(words[i++]);
                lastNode = this.horizontalPack(rect);
            }
            else
            {
                var rect: WordRect = this.randomRect(words[i++], true);
                lastNode = this.verticalPack(rect);
            }

            if (lastNode)
            {
                attempts = 0;
            }

            if (i >= words.length)
            {
                i = 0;
            }
            
            percentCompleted = (this.filledArea / this.canvasArea) * 100;

        } while (percentCompleted < 80 && attempts < 100);
    }
}