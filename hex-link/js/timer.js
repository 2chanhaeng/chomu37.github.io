"use strict";

const svgns = "http://www.w3.org/2000/svg";

Element.prototype.setAttributes = function (attrs){
    for(let key in attrs){
        this.setAttribute(key, attrs[key]);
    }
}

let timerInterval;

function initTimer(){
    let prevTimer = document.querySelector('#timer');
    if(prevTimer){prevTimer.remove();}
    stopTimer();
    reset();
}

// make timer
export function makeTimer(){
    initTimer();

    const timer = document.createElementNS(svgns, 'svg');
    timer.setAttributes({"id": "timer", "viewBox": "0 0 100 100", "class": "timer"});
    
    const timerBG = document.createElementNS(svgns, 'path');
    timerBG.setAttributes({'id': 'timerBG'});
    
    const timerHand = document.createElementNS(svgns, 'path');
    timerHand.setAttributes({'id': 'timerHand', "stroke-dasharray": "250,250"});
    
    const timerText = document.createElementNS(svgns, 'text');
    timerText.setAttributes({'id': 'timerText', "x": 50, "y": 50, "dy":7});
    timerText.innerHTML = 'Start';
    
    document.querySelector('#controls').appendChild(timer);
    [timerBG, timerHand, timerText].forEach(element => timer.appendChild(element));

    timer.addEventListener('click', () => {toggleTimer(60);});

}


function startTimer(limit = 60){
    const magni = 100;
    let time = limit * magni;
    let timerId = setInterval(() => {
        time -= 1;
        timer.querySelector('text').innerHTML = Number.parseFloat(time / magni).toFixed(2);
        rotateTimerHand(time, limit * magni);
        if(isDebug & time % 10 == 0){console.log(time)}
        if(time <= 0){
            toggleTimer();
            timer.querySelector('text').innerHTML = 0;
            rotateTimerHand(0, limit);
            alertScore();
            reset();
        }
    }, 1000 / magni);
    return timerId;
}

export function stopTimer(){
    if(timerInterval){
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function toggleTimer(limit = 60){
    if(timer.classList.contains('board')){
        timer.classList.remove('board');
        timer.classList.add('timer');
        timerText.textContent = 'Start';
        timerHand.setAttribute('stroke-dasharray', '250.2,250.2');
    }else{
        if(timerInterval){
            clearInterval(timerInterval);
            timerInterval = null;
        }else{
            score = 0;
            timerInterval = startTimer(limit);
            start();
        }
    }
}

function rotateTimerHand(currnet, limit, total = 250.2){
    timerHand.setAttribute('stroke-dasharray', `${currnet / limit * total},${total}`);
}

function alertScore(alertedScore = score){
    timer.classList.remove('timer');
    timer.classList.add('board');
    timerText.textContent = alertedScore;
}
