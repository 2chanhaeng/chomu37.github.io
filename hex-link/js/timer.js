"use strict";

// make timer
const svgns = "http://www.w3.org/2000/svg";

const timer = document.createElementNS(svgns, 'svg');
for(const [attribute, value] of Object.entries({"id": "timer", "viewBox": "0 0 100 100"})){
    timer.setAttribute(attribute, value);
}

timer.setAttribute('id', 'timer');
const timerBG = document.createElementNS(svgns, 'circle');
for(const [attribute, value] of Object.entries({"cx": "50", "cy": "50", "r": "50"})){
    timerBG.setAttribute(attribute, value);
}

const timerHand = document.createElementNS(svgns, 'path');
for(const [attribute, value] of Object.entries({"fill": "none", "stroke-linecap": "round", "stroke-width": "10", "stroke": "#fff", "stroke-dasharray": "250,250", "d": "M50 10\n a 40 40 0 0 1 0 80\n a 40 40 0 0 1 0 -80"})){
    timerHand.setAttribute(attribute, value);
}

const timerText = document.createElementNS(svgns, 'text');
for(const [attribute, value] of Object.entries({"x": "50" , "y": "50", "text-anchor": "middle" , "dy": "7", "font-size": "20"})){
    timerText.setAttribute(attribute, value);
}
timerText.innerHTML = 'Start';
document.querySelector('#controls').appendChild(timer);

[timerBG, timerHand, timerText].forEach(element => timer.appendChild(element));

let timerInterval;

function startTimer(limit = 60){
    const magni = 100;
    let time = limit * magni;
    let timerId = setInterval(() => {
        time -= 1;
        timer.querySelector('text').innerHTML = time / magni;
        rotateTimerHand(time, limit * magni);
        if(isDebug & time % 10 == 0){console.log(time)}
        if(time <= 0){
            toggleTimer();
            timer.querySelector('text').innerHTML = 0;
            rotateTimerHand(0, limit);
            // mixAllHex();
            alertScore();
            timerText.innerHTML = 'Start';
            rotateTimerHand(limit * magni, limit * magni);
            reset();
        }
    }, 1000 / magni);
    return timerId;
}

function toggleTimer(limit = 60){
    if(timerInterval){
        clearInterval(timerInterval);
        timerInterval = null;
    }else{
        score = 0;
        timerInterval = startTimer(limit);
        start();
    }
}

function rotateTimerHand(currnet, limit, total = 250.2){
    timerHand.setAttribute('stroke-dasharray', `${currnet / limit * total},${total}`);
}

function alertScore(alertedScore = score){
    alert('score : ' + alertedScore);
}
timer.addEventListener('click', () => {toggleTimer(60);});