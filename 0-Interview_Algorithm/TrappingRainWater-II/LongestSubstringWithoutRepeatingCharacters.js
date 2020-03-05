/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {

    // let longest = 0;
    // let start = 0;
    // const seen = {};
  
    // [...s].forEach((char, i) => {
    //   if (char in seen && start <= seen[char]) {
    //     longest = Math.max(i - start, longest);
    //     start = seen[char] + 1;
    //   }
  
    //   seen[char] = i;
    // });
    // console.log(seen);
    // return Math.max(s.length - start, longest);


    let len = s.length
    if (len <= 1) return len
    
    let tempData = new Map()
    let max = 0
    let start = 0
    
    for (let i = 0; i < len; i++) {
        let c = s.charAt(i)
        
        if (tempData.has(c) && (tempData.get(c) >= start)) {
            start = tempData.get(c) + 1;
        }
        
        tempData.set(c, i)
        console.log(tempData);
        
        max = Math.max(max, i - start + 1)
    }
    
    return max;


};

// let data = "abcabcbb";
let data = "bbbbb";
// let data = "pwwkew";

let index = lengthOfLongestSubstring(data);
console.log(index);
