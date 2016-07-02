/// <summary>
/// Initialize the WordPacker and provide it with a list of words to pack.
/// </summary>
window.onload = () =>
{
    var bin = <HTMLCanvasElement>document.getElementById('wordBin');
    var words = ["asp.net", "dedicated", "team player", "proactive", "problem solver",
        "detail oriented", "javascript", "agile", "full stack", "developer",
        "communicator", "architect", "angularjs", "sql server",
    ];
    var wp = new WordPacker(bin, 1200, 200);
    
    var title: string = "Chris Szendrovits";
    var fontTitle: WordStyle = new WordStyle(32, "#455372", "Verdana", " bold");
    var randX: number = WordPacker.randomNumber(wp.width * 0.25, wp.width * 0.5);
    var randY: number = WordPacker.randomNumber(wp.height * 0.15, wp.height * 0.7);

    wp.pinWord(title, randX, randY, fontTitle);
    wp.packWords(words);
};