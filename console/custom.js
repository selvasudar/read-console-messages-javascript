
if (console.everything === undefined) {
    console.everything = [];
    function TS() {
        return (new Date).toLocaleString("sv", { timeZone: 'UTC' }) + "Z"
    }
    window.onerror = function (error, url, line) {
        console.everything.push({
            type: "exception",
            timeStamp: TS(),
            value: { error, url, line }
        })
        return false;
    }
    window.onunhandledrejection = function (e) {
        console.everything.push({
            type: "promiseRejection",
            timeStamp: TS(),
            value: e.reason
        })
    }

    function hookLogType(logType) {
        const original = console[logType].bind(console)
        return function () {
            console.everything.push({
                type: logType,
                timeStamp: TS(),
                value: Array.from(arguments)
            })
            original.apply(console, arguments)
        }
    }

    ['log', 'error', 'warn', 'debug'].forEach(logType => {
        console[logType] = hookLogType(logType)
    })
}

console.log("selva")
console.log("selvas")
console.log("sudar")
console.log("hello")
// console.log(a)

$(document).ready(function () {
    $("button").on('click', function () {
        console.everything.forEach(function (value, index) {
            document.write("<p>" + console.everything[index].value + "</p>") + "<br />";
        })
    })
});