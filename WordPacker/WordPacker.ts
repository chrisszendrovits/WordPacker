/// <summary>
/// Word Packer, which is based on a simple packing algorithm, will insert text, 
/// both horizontally and vertically, into a canvas area.
/// </summary>
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

    /// <summary>
    /// Constructor used to initialize the canvas area.
    /// </summary>
    /// <param name="canvas">The HTML5 canvas element, used by Word Packer.</param>
    /// <param name="width">The width of the canvas.</param>
    /// <param name="height">The height of the canvas.</param>
    constructor(private canvas: HTMLCanvasElement, public width: number, public height: number)
    {
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvasArea = width * height;
        this.ctxCanvas = this.canvas.getContext("2d");
        this.firstPackedNode.wordRect = new WordRect(width, height);
    }

    /// <summary>
    /// Randomly generate a number within the specified range.
    /// </summary>
    static randomNumber(min: number, max: number): number
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /// <summary>
    /// Gets the length of a word, in pixels.
    /// </summary>
    /// <param name="word">The word that needs to be measured.</param>
    /// <param name="wordStyle">The font styling of the word.</param>
    getWordWidth(word: string, wordStyle: WordStyle): number
    {
        this.ctxCanvas.font = wordStyle.getFontStyle();
        var textMetric: TextMetrics = this.ctxCanvas.measureText(word);

        return Math.ceil(textMetric.width);
    }

    /// <summary>
    /// Creates a WordRect within a randomly selected range of font sizes.
    /// </summary>
    /// <param name="word">The text used to create the WordRect.</param>
    /// <param name="showVertical">Display the word vertically.</param>
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

    /// <summary>
    /// Pin text to the canvas. A pinned WordNode will appear at specific
    /// coordinates (x,y) on the canvas, and will not intersect with any packed words.
    /// </summary>
    /// <param name="word">The text used to pin to the canvas.</param>
    /// <param name="x">The x coordinate of the pin.</param>
    /// <param name="y">The y coordinate of the pin.</param>
    /// <param name="wordStyle">The font styling on the text.</param>
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

    /// <summary>
    /// Check if a node intersects will any existing pinned words.
    /// </summary>
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
    
    /// <summary>
    /// Attempt to add, or pack, a new node into the node list.
    /// </summary>
    /// <returns>
    /// The new node if successful. Or null, if unable to find space for the WordRect.
    /// </returns>
    insertWordNode(rect: WordRect): WordNode
    {
        var newNode: WordNode = this.firstPackedNode.add(rect);

        if (this.isPinIntersect(newNode))
        {
            newNode = null;
        }

        if (newNode)
        {
            this.filledArea += newNode.wordRect.width * newNode.wordRect.height;
        }
        return newNode;
    }
    
    /// <summary>
    /// Draw a WordNode on the canvas.
    /// </summary>
    drawNode(node: WordNode)
    {
        var nextRect = node.wordRect;

        if (node.isVertical)
        {
            if (this.showRect)
            {
                this.ctxCanvas.fillStyle = WordStyle.randomColor();
                this.ctxCanvas.fillRect(nextRect.x, nextRect.y, nextRect.width, nextRect.height);
            }

            this.ctxCanvas.save();
            this.ctxCanvas.fillStyle = nextRect.wordStyle.fontColor;
            this.ctxCanvas.translate(nextRect.x, nextRect.y);
            this.ctxCanvas.rotate(90 * Math.PI / 180);
            this.ctxCanvas.fillText(nextRect.word, 0, 0);
            this.ctxCanvas.restore();
        }
        else
        {
            if (this.showRect)
            {
                this.ctxCanvas.fillStyle = WordStyle.randomColor();
                this.ctxCanvas.fillRect(nextRect.x, nextRect.y, nextRect.width, nextRect.height);
            }

            this.ctxCanvas.fillStyle = nextRect.wordStyle.fontColor;
            this.ctxCanvas.fillText(nextRect.word, nextRect.x, nextRect.y + nextRect.wordStyle.fontSize);
        }
    }

    /// <summary>
    /// Draw a WordNode on the canvas.
    /// </summary>
    animateNode(node: WordNode)
    {
        var nextRect = node.wordRect;

        if (node.isVertical)
        {
            if (this.showRect)
            {
                this.ctxCanvas.fillStyle = WordStyle.randomColor();
                this.ctxCanvas.fillRect(nextRect.x, nextRect.y, nextRect.width, nextRect.height);
            }

            this.ctxCanvas.save();
            this.ctxCanvas.fillStyle = nextRect.wordStyle.fontColor;
            this.ctxCanvas.translate(nextRect.x, nextRect.y);
            this.ctxCanvas.rotate(90 * Math.PI / 180);
            this.ctxCanvas.fillText(nextRect.word, 0, 0);
            this.ctxCanvas.restore();
        }
        else
        {
            if (this.showRect)
            {
                this.ctxCanvas.fillStyle = WordStyle.randomColor();
                this.ctxCanvas.fillRect(nextRect.x, nextRect.y, nextRect.width, nextRect.height);
            }

            this.ctxCanvas.fillStyle = nextRect.wordStyle.fontColor;
            this.ctxCanvas.fillText(nextRect.word, nextRect.x, nextRect.y + nextRect.wordStyle.fontSize);
        }
    }

    /// <summary>
    /// Pack an array of words, both vertically and horizontally, into the canvas.
    /// </summary>
    packWords(words: string[])
    {
        var i: number = 0, percentCompleted: number, attempts = 0;

        do
        {
            var isVertical: boolean = (Math.random() <= 0.3) ? true : false;
            var rect: WordRect = this.randomRect(words[i++], isVertical);
            var newNode: WordNode = this.insertWordNode(rect);

            attempts++

            if (newNode)
            {
                attempts = 0;
                newNode.isVertical = isVertical;
                this.drawNode(newNode);
            }

            if (i >= words.length)
            {
                i = 0;
            }
            
            percentCompleted = (this.filledArea / this.canvasArea) * 100;

        } while (percentCompleted < 80 && attempts < 100);
    }
}