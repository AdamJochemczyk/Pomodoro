var minutes = 0;
var seconds = 10;
var click = new Audio("click.wav");
var bell = new Audio("gong.wav");
var minutes_interval;
var seconds_interval;
var template = function () {
    document.getElementById("minutes").textContent = minutes.toString();
    document.getElementById("seconds").textContent = seconds.toString();
};
var minutesTimer = function () {
    minutes = minutes--;
    document.getElementById("minutes").textContent = minutes.toString();
};
var secondsTimer = function () {
    seconds = seconds--;
    document.getElementById("seconds").textContent = seconds.toString();
    if (seconds <= 0) {
        if (minutes <= 0) {
            clearInterval(minutes_interval);
            clearInterval(seconds_interval);
            document.getElementById("done").textContent =
                "Session completed! Take a break";
            document.getElementById("done").classList.add("show_message");
            bell.play();
        }
        seconds = 60;
    }
};
var start = function () {
    click.play();
    console.log("start");
    minutes = 24;
    seconds = 59;
    document.getElementById("minutes").textContent = minutes.toString();
    document.getElementById("seconds").textContent = seconds.toString();
    minutes_interval = setInterval(minutesTimer, 60000);
    seconds_interval = setInterval(secondsTimer, 1000);
};
document.getElementById("play").addEventListener("click", function () { return start(); });
//# sourceMappingURL=app.js.map