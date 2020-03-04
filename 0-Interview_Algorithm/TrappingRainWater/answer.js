const trap = (number) => {
    let len = number.length;
    if(!len) return 0; 
    let result = 0;
    let left = 0, right = len - 1;
    let maxLeft = 0, maxRight = 0;
    
    while(left<=right){
        // console.log("left",left, "maxLeft",maxLeft,"maxRight",maxRight,"right",right);
      if(number[left] <= number[right]){
        if(number[left] >=maxLeft) maxLeft = number[left];
        else result += maxLeft-number[left];
        left++;
      }
      else{
        if(number[right] >= maxRight) maxRight = number[right];
        else result += maxRight-number[right];
        right--;
      }        
    //   console.log("left",left, "maxLeft",maxLeft,"maxRight",maxRight,"right",right);
    }
    return result;
  };

// const data = [];
// const data = [2,0,2];
// const data = [0,1,0,2,1,0,1,3,2,1,2,1];
// const data = [0,3,2,1,2,3,0,2,1,2,1,0];
// const data = [0,1,0,3,2,1,0,1,1,2,4,3,1,0,2,1,0,2,0];
const data = [0,7,1,4,6,0,5,0,2];

console.log(trap(data));

