var minutes = 0;
var seconds = 10;
var click = new Audio("click.wav");
var bell = new Audio("gong.wav");
var minutes_interval;
var seconds_interval;
var clockMinutes = document.getElementById("minutes");
var clockSeconds = document.getElementById("seconds");
var done = document.getElementById("done");
var playBtn = document.getElementById("play");
var settingsBtn = document.getElementById("settings");
var settingsForm = document.getElementsByClassName("settingsForm");
var template = function () {
    clockMinutes.textContent = minutes.toString();
    clockSeconds.textContent = seconds.toString();
};
var minutesTimer = function () {
    minutes--;
    clockMinutes.textContent = minutes.toString();
};
var secondsTimer = function () {
    seconds--;
    clockSeconds.textContent = seconds < 10 ? "0" + seconds : "" + seconds;
    if (seconds <= 0) {
        if (minutes <= 0) {
            clearInterval(minutes_interval);
            clearInterval(seconds_interval);
            done.textContent = "Session completed! Take a break";
            done.classList.add("show_message");
            bell.play();
        }
        seconds = 60;
    }
};
var start = function () {
    click.play();
    minutes = 1;
    seconds = 10;
    clockMinutes.textContent = minutes.toString();
    clockSeconds.textContent = seconds.toString();
    minutes_interval = setInterval(function () { return minutesTimer(); }, 60000);
    seconds_interval = setInterval(function () { return secondsTimer(); }, 1000);
};
playBtn.addEventListener("click", function () { return start(); });
settingsBtn.addEventListener("click", function () {
    settingsForm[0].classList.toggle("settingsForm--show");
});
//# sourceMappingURL=app.js.map