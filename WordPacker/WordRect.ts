class WordRect
{
    constructor(public width: number, public height: number,
                public x: number = 0, public y: number = 0,
                public word: string = "", public wordStyle: WordStyle = null)
    {}

    fitsIn(rect: WordRect): boolean
    {
        return rect.width >= this.width && rect.height >= this.height;
    }

    isSizeEqual(rect: WordRect)
    {
        return this.width == rect.width && this.height == rect.height;
    }

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
        
        //var width = (rightA > rightB ? rightB - leftA : rightA - leftB);
        //var height = (bottomA > bottomB ? bottomB - topA : bottomA - topB);

        //return width * height;
    }
}