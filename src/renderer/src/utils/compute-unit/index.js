export function compute(value,left,right){
    left = left ?? '';
    right = right ?? '';
    const str = BigInt(value).toString()
    const digit = str.length
    if(digit >= 5){
        const e = Math.floor((digit - 1) / 8)
        const w = (digit - 1) % 8 >= 4 ? 1 : 0
        const ex = str.substr(digit - 2,2).replace(/\b(0+)/gi,"")
        return `${str.substr(0,digit - e * 8 - w * 4)}${overAndOver('w',w)}${overAndOver('e',e)}${ex == '' ? '' : left + ex + right}`
    }else{
        return value
    }
}

function overAndOver(str,num){
    let newStr = ''
    for(let i = 0;i < num && i < 50;i++){
        newStr += str;
    }
    return newStr;
}
