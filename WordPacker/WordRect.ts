/// <summary>
/// WordRect is used to encapsulate all the data needed to display an instance of text.
/// </summary>
class WordRect
{
    /// <summary>
    /// Constructor used to initialize the WordRect.
    /// </summary>
    constructor(public width: number, public height: number,
                public x: number = 0, public y: number = 0,
                public word: string = "", public wordStyle: WordStyle = null)
    {}

    /// <summary>
    /// Check if a WordRect fits within another WordRect.
    /// </summary>
    fitsIn(rect: WordRect): boolean
    {
        return rect.width >= this.width && rect.height >= this.height;
    }

    /// <summary>
    /// Check if a WordRect is equal to another WordRect.
    /// </summary>
    isSizeEqual(rect: WordRect): boolean
    {
        return this.width == rect.width && this.height == rect.height;
    }

    /// <summary>
    /// Check if a WordRect intersects with another WordRect.
    /// </summary>
    intersects(rect: WordRect): boolean
    {
        var rightA = this.x + this.width, leftA = this.x, topA = this.y, bottomA = this.y + this.height;
        var rightB = rect.x + rect.width, leftB = rect.x, topB = rect.y, bottomB = rect.y + rect.height;

        if (rightA < leftB || leftA > rightB || bottomA < topB || topA > bottomB)
        {
            return false;
        }
        else
        {
            return true;
        }
    }
}