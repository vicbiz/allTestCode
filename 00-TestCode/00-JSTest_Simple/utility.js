function sum(a,b){
    return a+b
}

function subtract(a,b){
    return a-b
}

function multiply(a,b){
    return a*b
}

function cloneArray(array){
    return [...array]
}


/// Pure function...  can be broken 
function alwaysTrue(){
    return true;
}

function kapow(){
    throw new Error('boom !');
}

alwaysTrue(kapow());




exports.sum = sum;
exports.subtract = subtract;
exports.multiply = multiply;
exports.cloneArray = cloneArray;