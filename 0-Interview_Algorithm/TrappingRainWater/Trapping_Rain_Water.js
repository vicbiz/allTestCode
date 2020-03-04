var trap = function(height) {
    let trappedRain = 0;

    let findLeftBig = function(idx){
        let bigL = 0;
        for(let i=idx-1; i >= 0; i--){
            if(height[i] >= bigL) { bigL = height[i] }
        }
        return bigL;
    }
    
    let findRightBig = function(idx){
        let bigR = 0;
        for(let i=idx+1; i < height.length; i++){
            if(height[i] >= bigR) { bigR = height[i] }
        }
        return bigR;
    }
    
    for(let i=0; i<height.length; i++){
        let a = findLeftBig(i);
        let b = findRightBig(i);
        let c = Math.min(a,b) - height[i];
        if(c > 0 ) trappedRain += c;
        // console.log(i, height[i], "left",a, "right",b,"rain",c, "trappedRain",trappedRain);
    }
    return trappedRain;
}





// const data = [];
// const data = [2,0,2];
// const data = [0,1,0,2,1,0,1,3,2,1,2,1];
// const data = [0,3,2,1,2,3,0,2,1,2,1,0];
// const data = [0,1,0,3,2,1,0,1,1,2,4,3,1,0,2,1,0,2,0];
const data = [0,7,1,4,6,0,5,0,2];



console.log(trap(data));


