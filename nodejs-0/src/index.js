'use strict'

//Returns the fibonacci sequence of a range
const fibonacci = () => {
    let start = 0;
    const finish = 15;
    const result = [];
    for(start; start < finish; start++){
        if (start < 2){
            result.push(start);
        } else {
            result.push(result[start-1] + result[start-2]);
        }
    }
    return(result)
}

//Valid if a number is part of the fibonacci sequence
const isFibonnaci = (num) => {
    let fibList = fibonacci();
    let i = 0;
    for(i in fibList){
        if (fibList[i] === num){
            return true;
        }
    }
    return false;
}

//console.log(isFibonnaci(1));

module.exports = {
    fibonacci,
    isFibonnaci
}