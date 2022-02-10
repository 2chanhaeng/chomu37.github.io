"use strict";

const url = new URL(window.location.href);
const isDebug = url.searchParams.get('debug') == 'true';
// 3~63이 랜덤으로 나오는 함수
function rand64(){
    return Math.floor(Math.random() * 61) + 3;
}

const banned = new Set([0, 4, 8, 16, 32,/*1*/ 3, 5, 9, 17, 33,/*2*/ 6, 10, 18, 34,/*4*/ 12, 20, 36,/*8*/ 24, 40,/*16*/ 48]);
// 0, 4, 8, 16, 32 가 아닌 수가 나올 때까지 반복
function getNew(){
    let result = 0
    while(banned.has(result)){
        result = rand64();
    }
    return result;
}

const lenHexes = 19;
const idList = [...Array(lenHexes).keys()].map(i => String.fromCharCode(i + 97));

const connectingCable = {
    "a": {"b":1, "r":2, "q":4, "l":8, "d":16, "e":32},
    "b": {"c":1, "s":2, "r":4, "a":8, "e":16, "f":32},
    "c": {"m":1, "h":2, "s":4, "b":8, "f":16, "g":32},
    "d": {"e":1, "a":2, "l":4, "p":8, "h":16, "i":32},
    "e": {"f":1, "b":2, "a":4, "d":8, "i":16, "j":32},
    "f": {"g":1, "c":2, "b":4, "e":8, "j":16, "k":32},
    "g": {"q":1, "m":2, "c":4, "f":8, "k":16, "l":32},
    "h": {"i":1, "d":2, "p":4, "s":8, "c":16, "m":32},
    "i": {"j":1, "e":2, "d":4, "h":8, "m":16, "n":32},
    "j": {"k":1, "f":2, "e":4, "i":8, "n":16, "o":32},
    "k": {"l":1, "g":2, "f":4, "j":8, "o":16, "p":32},
    "l": {"a":1, "q":2, "g":4, "k":8, "p":16, "d":32},
    "m": {"n":1, "i":2, "h":4, "c":8, "g":16, "q":32},
    "n": {"o":1, "j":2, "i":4, "m":8, "q":16, "r":32},
    "o": {"p":1, "k":2, "j":4, "n":8, "r":16, "s":32},
    "p": {"d":1, "l":2, "k":4, "o":8, "s":16, "h":32},
    "q": {"r":1, "n":2, "m":4, "g":8, "l":16, "a":32},
    "r": {"s":1, "o":2, "n":4, "q":8, "a":16, "b":32},
    "s": {"h":1, "p":2, "o":4, "r":8, "b":16, "c":32},
}

let hexes = idList.reduce((acc,curr) => (acc[curr] = getNew(), acc), {});
let checkedHexes = [];
let score = 0;

// 입력된 리스트에 포함된 수를 인덱스로 가지는 hexes의 요소에 getNew()를 적용하여 새로운 값을 대입
function changeHex(list, obj){
    for (let i in list){
        let id = list[i];
        obj[id] = getNew();
    }
}

// changeHex(idList, hexes)

// 
function writeHexes(obj){
    if(isDebug){

        // 오브젝트에서 key를 뽑아 해당 key를 id로 가지는 요소의 center 클래스에 p 요소에 값을 대입해서 기존 내용에 추가
        for (let id in obj){
            let hexCenter = document.querySelector(`#${id} .center`)
            // 만약 이미 p 태그가 있다면 삭제
            if(hexCenter.querySelector('p')){
                hexCenter.querySelector('p').remove();
            }
            let p = document.createElement("p")
            p.textContent = obj[id];
    
            hexCenter.appendChild(p);
        }
    }   
}
function displayPipes(obj){
    for (let id in obj){
        let hexCenter = document.querySelector(`#${id} .center`)
        hexCenter.querySelectorAll('.pipe').forEach(pipe => pipe.style.display = '');
        paraByCase(obj[id],function(a){hexCenter.querySelector(a).style.display = 'block';},'.z','.y','.x','.w','.v','.u',null);
    }
}

function caseby(para, one, two, four, eight, sixteen, thirtytwo, notofthem){
    if(para & 63){
        if(para & 1){one();}
        if(para & 2){two();}
        if(para & 4){four();}
        if(para & 8){eight();}
        if(para & 16){sixteen();}
        if(para & 32){thirtytwo();}
    }else{
        notofthem;
    }
}

function paraByCase(para, callback, one, two, four, eight, sixteen, thirtytwo, notofthem){
    caseby(para, function(){callback(one);}, function(){callback(two);}, function(){callback(four);}, function(){callback(eight);}, function(){callback(sixteen);}, function(){callback(thirtytwo);}, notofthem);
}

function isConnectable(id1, id2){
    return ((id1 in connectingCable && id2 in connectingCable)?connectingCable[id1][id2]:false) ? true : false;
}

idList.forEach(id => {
    let hex = document.querySelector(`#${id}`);
    hex.addEventListener('mouseover', function(){
        let center = this.querySelector('.center');
        let hexagon = center.querySelector('.hexagon');
        hexagon.style.backgroundColor = '#00ff00';
        if(isDebug){
            let connects = connectingCable[id];
            for(const connected in connects){
                let connectedHex = document.querySelector(`#${connected} .hexagon`);
                connectedHex.style.backgroundColor = '#ff00ff';
            }
        }
    }, false);
    hex.addEventListener('mouseout', function(){
        let center = this.querySelector('.center');
        let hexagon = center.querySelector('.hexagon');
        hexagon.style.backgroundColor = "";
        if(isDebug){
            let connects = connectingCable[id];
            for(const connected in connects){
                let connectedHex = document.querySelector(`#${connected} .hexagon`);
                connectedHex.style.backgroundColor = "";
            }
        }
    }, false);
    let checkbox = hex.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('click', function(e){
        // 이미 체크되어 있던 체크박스는 체크 취소
        if(checkedHexes.includes(id)){
            // 첫 요소 혹은 마지막 요소일 경우에만 체크 취소 가능
                if(checkedHexes.indexOf(id) == 0){
                checkedHexes.shift();
            }else if(checkedHexes.indexOf(id) == checkedHexes.length - 1){
                checkedHexes.pop();
            }else{
                // 첫 원소도, 마지막 원소도 아니면 checkbox의 checked 상태 유지
                checkbox.checked = true;
            }
        }else{
            if(checkedHexes.length == 0){
                checkedHexes.push(id);
            }else if(isConnected(checkedHexes[checkedHexes.length - 1], id)){
            // 체크되지 않은 체크박스는 첫 요소 혹은 마지막 요소와 연결되어 있을 경우에만 체크 가능
                checkedHexes.push(id);
            }else if(isConnected(checkedHexes[0], id)){
                checkedHexes.unshift(id);
            }else{
                checkbox.checked = false;
            }
            if(isRinged(checkedHexes)){
                if(isDebug){console.log(checkedHexes);}
                checkedHexes.forEach(function(id){
                    hexes[id] = getNew();
                });
                scoreUp(checkedHexes);
                if(isCycled()){
                    mixHexes();
                }else{
                    mixAllHex();
                }
            };
        }
        if(isDebug){console.log(checkedHexes);}
    }, false);
});

function isConnected(current, next){
    if(isConnectable(current, next)){
        let currToNext = connectingCable[current][next];
        let nextToCurr = connectingCable[next][current];
        return (hexes[current] & currToNext && hexes[next] & nextToCurr) > 0;
    }
    return false;
}

function chainConnceted(current, next){
    return isConnected(current, next) && next
}

function isRinged(list){
    if(list.length > 2){
        if(isConnected(list[0], list[list.length -1])){
            return list.reduce(chainConnceted) ? true : false;
        }
        return false;
    }
    return false;
}

function scoreUp(list){
    score += list.length ** 2;
    let scoreElement = document.querySelector('#score');
    scoreElement.innerHTML = score;
}

// 모든 체크박스의 체크 상태를 취소합니다.
function cancelAllCheckedCheckbox(){
    idList.forEach(id => {
        let hex = document.querySelector(`#${id}`);
        hex.querySelector('input[type="checkbox"]').checked = false;
    });
    checkedHexes.length = 0;
}

function mixHexes(list = hexes){
    cancelAllCheckedCheckbox();
    writeHexes(list);
    displayPipes(list);
}

function mixAllHex(){
    cancelAllCheckedCheckbox();
    for(let i = 0; i < 100; i++){
        hexes = idList.reduce((acc,curr) => (acc[curr] = getNew(), acc), {});
        connectingTable = makeConnectingTable(connectingCable);
        if(isCycled()){break;}
    }
    writeHexes(hexes);
    displayPipes(hexes);
}

function makeConnectingTable(obj = connectingCable){
    let result = {};
    for(const id in obj){
        result[id] = [];
        let connects = obj[id];
        for(const connected in connects){
            if(isConnected(id, connected)){
                result[id].push(connected);
            }
        };
    };
    return result;
}

let connectingTable = makeConnectingTable(connectingCable);

function isCycled(obj = connectingTable){
    let ersead = 1;
    while(ersead != 0){
        ersead = 0;
        for(const id in obj){
            if(obj[id].length <= 1){
                ersead += 1;
                for(const id2 in obj){
                    if(obj[id2].includes(id)){
                        obj[id2].splice(obj[id2].indexOf(id), 1);
                    }
                }
                delete obj[id];
            }
        }
    }
    length = 0;
    for(const id in obj){length += obj[id].length};
    if(isDebug){console.log(obj);}
    return length > 2;
}

function start(){
    mixAllHex();
    scoreUp([]);
}
start()