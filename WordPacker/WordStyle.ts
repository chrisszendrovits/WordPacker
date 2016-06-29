class WordStyle
{
    constructor(public fontSize: number, public fontColor: string,
                public fontFamily: string, public fontWeight: string = "")
    {}

    getFontStyle(): string
    {
        var style: string = this.fontWeight + ' ' + this.fontSize.toString() + 'px ' + this.fontFamily;
        return style.trim();   
    }

    static rgbaColorScheme(): string
    {
        var randNumber: number = Math.random();
        var randAlpha: number = Math.floor((Math.random() * (7.5 - 1)) + 1) / 10;

        if (randNumber > 0 && randNumber <= 0.1)
        {
            return "rgba(69, 83, 114, " + randAlpha.toString() + ")" // R: 69 G: 83 B: 114 = dark blue
        }
        else if (randNumber > 0.1 && randNumber <= 0.4)
        {
            return "rgba(178, 188, 209," + randAlpha.toString() + ")" // R: 178 G: 188 B: 209 = light blue
        }
        else if (randNumber > 0.4 && randNumber <= 0.6)
        {
            return "rgba(220, 220, 220, " + randAlpha.toString() + ")" //R: 220 G: 220 B: 220 = grey
        }
        else if (randNumber > 0.6 && randNumber <= 0.9)
        {
            return "rgba(216, 201, 231, " + randAlpha.toString() + ")" // purple
        }
        else 
        {
            return "rgba(0, 0, 0, " + randAlpha.toString() + ")"
        }
    }

    static randomColor(): string
    {
        var color = [0, 0, 0];

        for (var i = 0; i <= 2; i++)
        {
            if (Math.random() < 0.66666)
                color[i] = Math.floor(32 + Math.random() * 192);
        }
        return 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
    }
}