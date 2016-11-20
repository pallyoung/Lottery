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
                case red + bule == 7:{
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

function formatCode(code){
    if(parseInt(code)<10){
        return '0'+code;
    }
    return code+'';
}
var controllers =  {
    checkLottery,
    parseOpencode,
    formatCode
}
export  default  controllers ;
