/**
 * @param {number[][]} heightMap
 * @return {number}
 */
var trapRainWater = function(heightMap) {

    let trappedRain = 0;
    let rowMaxIdx = heightMap.length > 0 ? heightMap.length : 0;
    let colMaxIdx = heightMap[0].length > 0 ? heightMap[0].length : 0;

    if(rowMaxIdx == 0 && colMaxIdx == 0) return 0;

    console.log("rowMaxIdx",rowMaxIdx,"colMaxIdx",colMaxIdx);

    let findUpBig = function(rowidx, colIdx){
        let bigNumber = 0;
        for(let i=rowidx-1; i >= 0; i--){
            if(heightMap[i][colIdx] >= bigNumber) { bigNumber = heightMap[i][colIdx] }
        }
        return bigNumber;
    }

    let findDownBig = function(rowidx, colIdx){
        let bigNumber = 0;
        for(let i=rowidx+1; i < rowMaxIdx; i++){
            if(heightMap[i][colIdx] >= bigNumber) { bigNumber = heightMap[i][colIdx] }
        }
        return bigNumber;
    }

    let findLeftBig = function(rowidx, colIdx){
        let bigNumber = 0;
        for(let i=colIdx-1; i >= 0; i--){
            if(heightMap[rowidx][i] >= bigNumber) { bigNumber = heightMap[rowidx][i] }
        }
        return bigNumber;
    }
    
    let findRightBig = function(rowidx, colIdx){
        let bigNumber = 0;
        for(let i=colIdx+1; i < colMaxIdx; i++){
            if(heightMap[rowidx][i] >= bigNumber) { bigNumber = heightMap[rowidx][i] }
        }
        return bigNumber;
    }
    

    for(let i=0; i < rowMaxIdx; i++){
        for(let j=0; j < colMaxIdx; j++){
            let up = findUpBig(i, j);
            let down = findDownBig(i, j);
            let left = findLeftBig(i, j);
            let right = findRightBig(i, j);

            let trappedCell = Math.min(up,down,left,right) - heightMap[i][j];

            if(trappedCell > 0 ) trappedRain += trappedCell;
            console.log("[",i,",",j,"]",heightMap[i][j],"trappedCell",trappedCell, "trappedRain",trappedRain);
        }
    }

    return trappedRain;
};



data = [
    [1,4,3,1,3,2],
    [3,2,1,3,2,4],
    [2,3,3,2,3,1]
]

data = [
    [12,13,0,12],
    [13,4,13,12],
    [13,8,10,12],
    [12,13,12,12],
    [13,13,13,13]    
]


trapRainWater(data);





/*
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
*/


