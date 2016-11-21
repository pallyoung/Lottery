'use strict'
function checkLottery(lottery) {
    let list = SM.ssqList.list;
    let expect = lottery.expect;
    let red = 0;
    let blue = 0;
    for (let i = list.length - 1; i >= 0; i--) {
        let item = list[i];
        if (item.expect == expect) {
            let opencodeArr = parseOpencode(item.opencode);
            let opencodeArrBuy = parseOpencode(lottery.opencode);
            for (let l = 0; l < 6; l++) {
                for (let b = 0; b < 6; b++) {
                    if (parseInt(opencodeArr[b]) == parseInt(opencodeArrBuy[l])) {
                        red++;
                        break;
                    }
                }
            }
            if (opencodeArrBuy[6] == opencodeArr[6]) {
                blue = 1;
            }
            switch (true) {
                case red == 0 && bule == 1: {
                    return 6;
                }
                case red + blue == 4: {
                    return 5;
                }
                case red + blue == 5: {
                    return 4;
                }
                case red == 5 && blue == 1: {
                    return 3;
                }
                case red == 6 && bule == 0: {
                    return 2;
                }
                case red + bule == 7: {
                    return 1;
                }
            }
        }
    }
    return 0;
}
function parseOpencode(opencode) {
    var buleBall = opencode.slice(balls.indexOf('+') + 1);
    var redBalls = opencode.slice(0, balls.indexOf('+')).split(',');
    return redBalls.push(buleBall);
}

function formatCode(code) {
    if (parseInt(code) < 10) {
        return '0' + code;
    }
    return code + '';
}
function checkTimeout(time) {
    if (time.getHours() >= 19 && time.getMinutes() >= 20) {
        return true;
    }
    return false;
}
function getWeekCount() {
    var now = new Date();
    var day = now.getDay();
    var year = new Date(now.getFullYear(), 0, 1, 0, 0, 0);
    var firstWeekDayCount = year.getDay();
    day = day == 0 ? 7 : day;
    firstWeekDayCount =  firstWeekDayCount == 0 ? 7 : firstWeekDayCount;
    var restDayCount = Math.ceil((now.getTime() - year.getTime()) / 86400000) + firstWeekDayCount - 7;
    var weekCount = Math.ceil(restDayCount / 7) + 1;
    return weekCount;
}
function getCodeOfWeek(day) {
    switch (true) {
        case day == 3 || day == 4:
            return 1;
        case day == 5 || day == 6 || day == 7:
            return 2;
        default:
            return 0;
    }
}
function getNextExpect() {
    var now = new Date();
    var day = now.getDay();
    var year = new Date(now.getFullYear(), 0, 1, 0, 0, 0);
    var firstWeekDayCount = year.getDay();
    day = day == 0 ? 7 : day;
    firstWeekDayCount =  firstWeekDayCount == 0 ? 7 : firstWeekDayCount;
    var restDayCount = Math.ceil((now.getTime() - year.getTime()) / 86400000) + firstWeekDayCount -7;
    var restWeekCount = Math.floor(restDayCount / 7);
    var opencode = (restWeekCount) * 3 - getCodeOfWeek(firstWeekDayCount)+getCodeOfWeek(day);
    if((day==2||day==4||day==7)&&checkTimeout(now)){
        opencode++;
    }
    //下一期
    opencode++;
    var opencodeString = '000';
    opencode = opencodeString.slice(0,3-String(opencode).length)+opencode;
    return '' + now.getFullYear() + opencode ;
}
function getOpencodeByRand(){
    var opencode = [];
    while(opencode.length<6){
        let code = formatCode(Math.round(Math.random()*32+1));
        if(opencode.indexOf(code)<0){
            opencode.push(code);
        }
    }
    opencode.sort();
    let code = formatCode(Math.round(Math.random()*15+1));
    opencode.push(code);
    return opencode;
}
var controllers = {
    checkLottery,
    parseOpencode,
    formatCode,
    getNextExpect,
    getOpencodeByRand
}
export default controllers;
