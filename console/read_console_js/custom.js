
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



// // Set the date we're counting down to
// var countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();

// // Update the count down every 1 second
// var x = setInterval(function () {

//     // Get today's date and time
//     var now = new Date().getTime();

//     // Find the distance between now and the count down date
//     var distance = countDownDate - now;

//     // Time calculations for days, hours, minutes and seconds
//     var days = Math.floor(distance / (1000 * 60 * 60 * 24));
//     var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//     var seconds = Math.floor((distance % (1000 * 60)) / 1000);

//     // Display the result in the element with id="demo"
//     console.log(days + "d " + hours + "h " + minutes + "m " + seconds + "s ");

//     // If the count down is finished, write some text
//     if (distance < 0) {
//         clearInterval(x);
//         console.log("EXPIRED");
//     }
// }, 1000);