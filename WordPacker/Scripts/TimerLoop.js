/// <summary>
/// TimerLoop is a wrapper class that will maintain the context of Typescript class members when executing 
/// either setInterval or setTimeout calls.
/// </summary>
var TimerLoop = (function () {
    function TimerLoop() {
    }
    /// <summary>Wrapper function for setInterval that maintains Typescript class member context.</summary>
    /// <param name="code">Function to be call by setInterval.</param>
    /// <param name="delay">Interval delay, in milliseconds.</param>
    /// <param name="context">Context that needs to be maintained. Passing 'this' as a parameter will maintain Typescript class members.</param>
    TimerLoop.setIntervalWithContext = function (code, delay, context) {
        return setInterval(function () {
            code.call(context);
        }, delay);
    };
    /// <summary>Wrapper function for setTimeout that maintains Typescript class member context.</summary>
    /// <param name="code">Function to be call by setTimeout.</param>
    /// <param name="delay">Timeout delay, in milliseconds.</param>
    /// <param name="context">Context that needs to be maintained. Passing 'this' as a parameter will maintain Typescript class members.</param>
    TimerLoop.setTimeoutWithContext = function (code, delay, context) {
        return setTimeout(function () {
            code.call(context);
        }, delay);
    };
    return TimerLoop;
})();
//# sourceMappingURL=TimerLoop.js.map