let defaultMinutes=24;
let defaultSeconds=59;
let defaultLongBreak=15;
let defaultBreak=5;
let defaultSessions=4;

let currentSessions=defaultSessions;
let isSession=true;
let minutes:number=defaultMinutes;
let seconds:number=defaultSeconds;

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

const breakTimeInput=document.querySelector("input[name='break']");
const longBreakInput=document.querySelector("input[name='longBreak']");
const sessionsInput=document.querySelector("input[name='sessions']");
const sessionsTimeInput=document.querySelector("input[name='sessionsTime']");
const setConfigBtn=document.getElementById("config")

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
        isSession=!isSession;
        currentSessions--;
        if(currentSessions<0){
          currentSessions=defaultSessions;
        }
        document.getElementById("sessionsToBreak").textContent=`Sessions to long break: ${currentSessions}`;
        bell.play()
      }
      seconds = 60;
    }
  }

const start=()=> {
  click.play();
  if(currentSessions===0){
    minutes=defaultLongBreak
  }else if(isSession){
    minutes = defaultMinutes;
  }else{
    minutes=defaultBreak
  }
  seconds = defaultSeconds;

  clockMinutes.textContent = minutes.toString();
  clockSeconds.textContent = seconds.toString();

  minutes_interval = setInterval(()=>minutesTimer(), 60000);
  seconds_interval = setInterval(()=>secondsTimer(), 1000);
}

playBtn.addEventListener("click",()=>start())

settingsBtn.addEventListener("click",()=>{
  settingsForm[0].classList.toggle("settingsForm--show")
})

breakTimeInput.addEventListener("change",e=>{
  let breakTime=parseInt((e.currentTarget as HTMLInputElement).value);
    if(breakTime<=0){
      breakTime=1;
    }else if(breakTime>=30){
      breakTime=30;
    }
  (breakTimeInput as HTMLInputElement).value=breakTime.toString()
})
longBreakInput.addEventListener("change",e=>{
  let longBreakTime=parseInt((e.currentTarget as HTMLInputElement).value);
    if(longBreakTime<=15){
      longBreakTime=15;
    }else if(longBreakTime>=45){
      longBreakTime=45;
    }
  (longBreakInput as HTMLInputElement).value=longBreakTime.toString()
})
sessionsInput.addEventListener("change",e=>{
  let sessionsCount=parseInt((e.currentTarget as HTMLInputElement).value);
    if(sessionsCount<=2){
      sessionsCount=2;
    }else if(sessionsCount>=6){
      sessionsCount=6;
    }
  (sessionsInput as HTMLInputElement).value=sessionsCount.toString()
})
sessionsTimeInput.addEventListener("change",e=>{
  let sessionsTime=parseInt((e.currentTarget as HTMLInputElement).value);
    if(sessionsTime<=25){
      sessionsTime=25;
    }else if(sessionsTime>=45){
      sessionsTime=45;
    }
  (sessionsTimeInput as HTMLInputElement).value=sessionsTime.toString()
})

const validateInputData=(input:number,minValue:number)=>{
  return (input!==null && !isNaN(input)) ? input : minValue; 
}

const getDataFromInputElement =(element:Element)=>{
  return parseInt((element as HTMLInputElement).value);
}

const setFormInputs=(element:Element, value:number)=>{
  (element as HTMLInputElement).value=value.toString();
}

setConfigBtn.addEventListener("click",()=>{
  const breakTime=getDataFromInputElement(breakTimeInput);
  const longBreakTime=getDataFromInputElement(longBreakInput);
  const sessionsCount=getDataFromInputElement(sessionsInput);
  const sessionsTime=getDataFromInputElement(sessionsTimeInput);

  const breakTimeVal=validateInputData(breakTime,1);
  const longBreakTimeVal=validateInputData(longBreakTime,15);
  const sessionsCountVal=validateInputData(sessionsCount,2);
  const sessionsTimeVal=validateInputData(sessionsTime,25);

  defaultMinutes=sessionsTimeVal;
  defaultBreak=breakTimeVal;
  defaultLongBreak=longBreakTimeVal;
  defaultSessions=sessionsCountVal;

  setFormInputs(breakTimeInput,breakTimeVal);
  setFormInputs(longBreakInput,longBreakTimeVal);
  setFormInputs(sessionsInput,sessionsCountVal);
  setFormInputs(sessionsTimeInput,sessionsTimeVal);

  document.getElementById("sessionsToBreak").textContent=`Sessions to long break: ${sessionsCountVal}`;
  settingsForm[0].classList.toggle("settingsForm--show")
})

document.getElementById("sessionsToBreak").textContent=`Sessions to long break: ${defaultSessions}`;