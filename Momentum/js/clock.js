const clock = document.querySelector("h2#clock");

int2Str = int => String(int).padStart(2, "0");

function getClock(){
    const date = new Date();
    clock.innerText = `${int2Str(date.getHours())}:${int2Str(date.getMinutes())}:${int2Str(date.getSeconds())}`
}

getClock()
setInterval(getClock, 1000);
