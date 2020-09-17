/**
 * @param {string} S
 * @return {number}
 */
var minAddToMakeValid = function(S) {

    let temp = S;

    do {
        S = S.replace(/\(\)/g,"");
    } while (S.indexOf("()") != -1);

    console.log(S.length);
    return S.length;

};

// let data = "())"        // 1
// let data = "((("     // 3
// let data = "()"      // 0
let data = "()))(("  // 4

minAddToMakeValid(data);
