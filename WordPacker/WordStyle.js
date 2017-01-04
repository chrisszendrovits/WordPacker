/// <summary>
/// WordStyle contains the basic styling used when drawing a WordNode.
/// </summary>
var WordStyle = (function () {
    /// <summary>
    /// Constructor used to initialize word style.
    /// </summary>
    function WordStyle(fontSize, fontColor, fontFamily, fontWeight) {
        if (fontWeight === void 0) { fontWeight = ""; }
        this.fontSize = fontSize;
        this.fontColor = fontColor;
        this.fontFamily = fontFamily;
        this.fontWeight = fontWeight;
    }
    /// <summary>
    /// Randomly pick from within a specific RGA color scheme.
    /// </summary>
    WordStyle.rgbaColorScheme = function () {
        var randNumber = Math.random();
        var randAlpha = Math.floor((Math.random() * (7.5 - 1)) + 1) / 10;
        if (randNumber > 0 && randNumber <= 0.1) {
            return "rgba(69, 83, 114, " + randAlpha.toString() + ")"; // R: 69 G: 83 B: 114 = dark blue
        }
        else if (randNumber > 0.1 && randNumber <= 0.4) {
            return "rgba(178, 188, 209," + randAlpha.toString() + ")"; // R: 178 G: 188 B: 209 = light blue
        }
        else if (randNumber > 0.4 && randNumber <= 0.6) {
            return "rgba(220, 220, 220, " + randAlpha.toString() + ")"; //R: 220 G: 220 B: 220 = grey
        }
        else if (randNumber > 0.6 && randNumber <= 0.9) {
            return "rgba(216, 201, 231, " + randAlpha.toString() + ")"; // purple
        }
        else {
            return "rgba(0, 0, 0, " + randAlpha.toString() + ")";
        }
    };
    /// <summary>
    /// Randomly pick an RGA color.
    /// </summary>
    WordStyle.randomColor = function () {
        var color = [0, 0, 0];
        for (var i = 0; i <= 2; i++) {
            if (Math.random() < 0.66666)
                color[i] = Math.floor(32 + Math.random() * 192);
        }
        return 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
    };
    /// <summary>
    /// Convert the WordStyle into a css font style string.
    /// </summary>
    WordStyle.prototype.getFontStyle = function () {
        var style = this.fontWeight + ' ' + this.fontSize.toString() + 'px ' + this.fontFamily;
        return style.trim();
    };
    return WordStyle;
}());
//# sourceMappingURL=WordStyle.js.map