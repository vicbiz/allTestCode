/**
 * @param {number[][]} heightMap
 * @return {number}
 */
var trapRainWater = function(heightMap) {

    if(heightMap.length == 0 || !heightMap) return 0;

    let trappedRain = 0;
    let rowMaxIdx = heightMap.length > 0 ? heightMap.length : 0;
    let colMaxIdx = heightMap[0].length > 0 ? heightMap[0].length : 0;

    if((rowMaxIdx == 0 && colMaxIdx == 0) || heightMap.length == 0 || !heightMap) return 0;


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
    
    let trappedRainCell = [];
    for(let i=0; i < rowMaxIdx; i++){
        for(let j=0; j < colMaxIdx; j++){
            let up = findUpBig(i, j);
            let down = findDownBig(i, j);
            let left = findLeftBig(i, j);
            let right = findRightBig(i, j);

            let trappedCell = Math.min(up,down,left,right) - heightMap[i][j];

            if(trappedCell > 0 ) {
                trappedRainCell.push([i,j]);
            }
        }
    }
    console.log(trappedRainCell,"\n\n\n");

    let isConnected = (c1, c2) => {
        if(c1 && c2){
            if( 
                (c1[0] == c2[0] && c1[1] -1 == c2[1]) || 
                (c1[0] == c2[0] && c1[1] +1 == c2[1]) || 
                (c1[1] == c2[1] && c1[0] -1 == c2[0]) || 
                (c1[1] == c2[1] && c1[0] +1 == c2[0])
            ) return true;
            else return false;
        }
    }

    let finalData = [];
    let idx0 = 0;
    
    for(let idx = 0; idx < trappedRainCell.length; idx++){
        
        let ii = idx;
        let connected = false;
        let tempSet = [];

        tempSet.push(trappedRainCell[ii]);
        
        do{
            connected = isConnected(trappedRainCell[ii],trappedRainCell[ii+1]);
            if(connected){
                // console.log(trappedRainCell[ii],trappedRainCell[ii+1]);
                // console.log("connected",tempSet, " : " , trappedRainCell[ii+1], " : " , tempSet.indexOf(trappedRainCell[ii+1]));

                if(tempSet.indexOf(trappedRainCell[ii+1]) == -1){
                    tempSet.push(trappedRainCell[ii+1]);
                    ii = ii+1;
                }
            } else {

            }
            // console.log("tempSet",tempSet);
        } while (connected)

        
        if(finalData.length > 0){
            for(let i=0; i<finalData.length; i++){
                let intersection = finalData[i].filter(x => tempSet.includes(x));
                if(intersection.length == 0){
                    console.log("\n\nfinalData",finalData[i])
                    console.log("tempSet",tempSet)
                    console.log("intersection",intersection, intersection.length)
                    finalData.push(tempSet);
                    console.log("finalData",finalData[i],"\n\n");
                }
            }
        } else {
            finalData.push(tempSet);
        }

        // console.log(finalData, tempSet, finalData.indexOf(tempSet));
    }

    console.log("finalData",finalData, "\n\n\n");

    finalData.forEach( it => {
        let a1, a2, a3, a4, cc;
        let smallest;
        for(let i=0; i<it.length; i++){
            cc = it[i];
            a1 = findUpBig(cc[0], cc[1]);
            a2 = findDownBig(cc[0], cc[1]);
            a3 = findLeftBig(cc[0], cc[1]);
            a4 = findRightBig(cc[0], cc[1]);

            if(smallest){
                if(Math.min(a1,a2,a3,a4) < smallest){
                    smallest = Math.min(a1,a2,a3,a4);
                };
            } else {
                smallest = Math.min(a1,a2,a3,a4);
            }
        }
        // console.log("aaaa",heightMap[cc[0]][cc[1]]);

        for(let i=0; i<it.length; i++){
            cc = it[i];
            let trappedCell = smallest - heightMap[cc[0]][cc[1]];
            if(trappedCell > 0 ) trappedRain += trappedCell;
    
            console.log(a1,a2,a3,a4,"smallest",smallest,"trappedCell",trappedCell,"trappedRain",trappedRain);
        }

    });


    return trappedRain;
};




data = [];

data = [
    [1,4,3,1,3,2],
    [3,2,1,3,2,4],
    [2,3,3,2,3,1]
] // 4

// data = [
//     [12,13,0,12],
//     [13,4,13,12],
//     [13,8,10,12],
//     [12,13,12,12],
//     [13,13,13,13]    
// ] // 14

data = [
    [9,9,9,9,9],
    [9,2,1,2,9],
    [9,2,8,2,9],
    [9,2,3,2,9],
    [9,9,9,9,9]
] // 57

console.log(trapRainWater(data));



