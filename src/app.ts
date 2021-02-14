let minutes = 0;
let seconds = 10;

const click = new Audio("click.wav");
const bell = new Audio("gong.wav");

let minutes_interval:number;
let seconds_interval:number;

const clockMinutes=document.getElementById("minutes")
const clockSeconds=document.getElementById("seconds")
const done=document.getElementById("done")
const playBtn=document.getElementById("play")
const settingsBtn=document.getElementById("settings")
const settingsForm=document.getElementsByClassName("settingsForm")

const template=()=>{
  clockMinutes.textContent = minutes.toString();
  clockSeconds.textContent = seconds.toString();
}

const minutesTimer=()=> {
  minutes--;
  clockMinutes.textContent = minutes.toString();
}

const secondsTimer=()=> {
    seconds--;
    clockSeconds.textContent = seconds<10 ? `0${seconds}`: `${seconds}`;
    if (seconds <= 0) {
      if (minutes <= 0) {
        clearInterval(minutes_interval);
        clearInterval(seconds_interval);
        done.textContent ="Session completed! Take a break";
        done.classList.add("show_message");
        bell.play()
      }
      seconds = 60;
    }
  }

const start=()=> {
  click.play();
  minutes = 1;
  seconds = 10;
  clockMinutes.textContent = minutes.toString();
  clockSeconds.textContent = seconds.toString();

  minutes_interval = setInterval(()=>minutesTimer(), 60000);
  seconds_interval = setInterval(()=>secondsTimer(), 1000);
}

playBtn.addEventListener("click",()=>start())
settingsBtn.addEventListener("click",()=>{
  settingsForm[0].classList.toggle("settingsForm--show")
})
