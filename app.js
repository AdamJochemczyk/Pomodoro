var defaultMinutes = 24;
var defaultSeconds = 59;
var defaultLongBreak = 15;
var defaultBreak = 5;
var defaultSessions = 4;
var currentSessions = defaultSessions;
var isSession = true;
var playBlock = false;
var minutes = defaultMinutes;
var seconds = defaultSeconds;
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
var breakTimeInput = document.querySelector("input[name='break']");
var longBreakInput = document.querySelector("input[name='longBreak']");
var sessionsInput = document.querySelector("input[name='sessions']");
var sessionsTimeInput = document.querySelector("input[name='sessionsTime']");
var setConfigBtn = document.getElementById("config");
var sessionsToBreak = document.getElementById("sessionsToBreak");
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
            done.textContent = (isSession ? "Session" : "Break") + " completed! " + (isSession ? "Take a break" : "Start new session");
            done.classList.add("show_message");
            isSession = !isSession;
            currentSessions--;
            if (currentSessions < 0) {
                currentSessions = defaultSessions;
            }
            sessionsToBreak.textContent = "Sessions to long break: " + currentSessions;
            playBlock = false;
            bell.play();
        }
        seconds = 60;
    }
};
var start = function () {
    if (!playBlock) {
        playBlock = true;
        console.log("Start");
        click.play();
        done.textContent = "";
        if (currentSessions === 0) {
            minutes = defaultLongBreak;
        }
        else if (isSession) {
            minutes = defaultMinutes;
        }
        else {
            minutes = defaultBreak;
        }
        seconds = defaultSeconds;
        clockMinutes.textContent = minutes.toString();
        clockSeconds.textContent = seconds.toString();
        minutes_interval = setInterval(function () { return minutesTimer(); }, 60000);
        seconds_interval = setInterval(function () { return secondsTimer(); }, 1000);
    }
};
playBtn.addEventListener("click", function () { return start(); });
settingsBtn.addEventListener("click", function () {
    settingsForm[0].classList.toggle("settingsForm--show");
});
breakTimeInput.addEventListener("change", function (e) {
    var breakTime = parseInt(e.currentTarget.value);
    if (breakTime <= 0) {
        breakTime = 1;
    }
    else if (breakTime >= 30) {
        breakTime = 30;
    }
    breakTimeInput.value = breakTime.toString();
});
longBreakInput.addEventListener("change", function (e) {
    var longBreakTime = parseInt(e.currentTarget.value);
    if (longBreakTime <= 15) {
        longBreakTime = 15;
    }
    else if (longBreakTime >= 45) {
        longBreakTime = 45;
    }
    longBreakInput.value = longBreakTime.toString();
});
sessionsInput.addEventListener("change", function (e) {
    var sessionsCount = parseInt(e.currentTarget.value);
    if (sessionsCount <= 2) {
        sessionsCount = 2;
    }
    else if (sessionsCount >= 6) {
        sessionsCount = 6;
    }
    sessionsInput.value = sessionsCount.toString();
});
sessionsTimeInput.addEventListener("change", function (e) {
    var sessionsTime = parseInt(e.currentTarget.value);
    if (sessionsTime <= 25) {
        sessionsTime = 25;
    }
    else if (sessionsTime >= 45) {
        sessionsTime = 45;
    }
    sessionsTimeInput.value = sessionsTime.toString();
});
var validateInputData = function (input, minValue) {
    return (input !== null && !isNaN(input)) ? input : minValue;
};
var getDataFromInputElement = function (element) {
    return parseInt(element.value);
};
var setFormInputs = function (element, value) {
    element.value = value.toString();
};
setConfigBtn.addEventListener("click", function () {
    var breakTime = getDataFromInputElement(breakTimeInput);
    var longBreakTime = getDataFromInputElement(longBreakInput);
    var sessionsCount = getDataFromInputElement(sessionsInput);
    var sessionsTime = getDataFromInputElement(sessionsTimeInput);
    var breakTimeVal = validateInputData(breakTime, 5);
    var longBreakTimeVal = validateInputData(longBreakTime, 15);
    var sessionsCountVal = validateInputData(sessionsCount, 2);
    var sessionsTimeVal = validateInputData(sessionsTime, 24);
    defaultMinutes = sessionsTimeVal;
    defaultBreak = breakTimeVal;
    defaultLongBreak = longBreakTimeVal;
    defaultSessions = sessionsCountVal;
    setFormInputs(breakTimeInput, breakTimeVal);
    setFormInputs(longBreakInput, longBreakTimeVal);
    setFormInputs(sessionsInput, sessionsCountVal);
    setFormInputs(sessionsTimeInput, sessionsTimeVal);
    sessionsToBreak.textContent = "Sessions to long break: " + sessionsCountVal;
    settingsForm[0].classList.toggle("settingsForm--show");
});
sessionsToBreak.textContent = "Sessions to long break: " + defaultSessions;
//# sourceMappingURL=app.js.map