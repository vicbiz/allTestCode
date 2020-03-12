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
    console.log("\n\n","trappedRainCell",trappedRainCell,"\n\n\n");

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

    for(let idx = 0; idx < trappedRainCell.length; idx++){

        let tempSet = [];

        for(let i = idx+1; i < trappedRainCell.length; i++){
            let connected = isConnected(trappedRainCell[idx],trappedRainCell[i]);
            let foundInFinalData = JSON.stringify(finalData).indexOf(JSON.stringify(trappedRainCell[i])) > -1 ? true : false;
            if(connected && !foundInFinalData){
                tempSet.push(trappedRainCell[i]);
            }
        }
        // console.log("\n","finalData",finalData,"trappedRainCell",trappedRainCell[idx],"tempSet",tempSet,"\n");




        if(finalData.length == 0 && tempSet.length > 0){
            tempSet.unshift(trappedRainCell[idx]);
            finalData.push(tempSet);
        } else {
          
            let addNewData = true;

            for(let i=0; i<finalData.length; i++){
                let foundInFinalData = JSON.stringify(finalData[i]).indexOf(JSON.stringify(trappedRainCell[idx])) > -1 ? true : false;
                console.log("finalData",finalData[i],"search",trappedRainCell[idx],"foundInFinalData",foundInFinalData,"tempSet",tempSet);

                if(foundInFinalData){
                    finalData[i] = [...finalData[i], ...tempSet];
                    // finalData[i].concat(tempSet);
                    addNewData = false;
                    // continue;
                    break;
                }
            }

            if(addNewData){
                if(tempSet.length == 0){
                    console.log("11111",trappedRainCell[idx]);
                    tempSet.push(trappedRainCell[idx])
                    finalData.push(tempSet);
                } else {
                    tempSet = [trappedRainCell[idx], ...tempSet ];
                    console.log("22222",tempSet);
                    finalData.push(tempSet);
                }
            }

        }
    }











    console.log("finalData",finalData, "\n\n\n");

    finalData.forEach( it => {
        let a1, a2, a3, a4, cc;
        let smallest;
        for(let i=0; i<it.length; i++){
            cc = it[i];

            console.log("cc",cc);

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


            console.log(heightMap[cc[0]][cc[1]]," --- ", a1,a2,a3,a4,"smallest",smallest);
            // console.log("smallest",smallest,heightMap[cc[0]][cc[1]]);
        }


        for(let i=0; i<it.length; i++){
            cc = it[i];
            let trappedCell = smallest - heightMap[cc[0]][cc[1]];
            if(trappedCell > 0 ) trappedRain += trappedCell;
            // console.log(a1,a2,a3,a4,"smallest",smallest,"trappedCell",trappedCell,"trappedRain",trappedRain);
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

data = [
    [12,13,0,12],
    [13,4,13,12],
    [13,8,10,12],
    [12,13,12,12],
    [13,13,13,13]    
] // 14

data = [
    [9,9,9,9,9],
    [9,2,1,2,9],
    [9,2,8,2,9],
    [9,2,3,2,9],
    [9,9,9,9,9]
] // 57

data = [
    [3,3,4,4,4,2],
    [3,1,3,2,1,4],
    [7,3,1,6,4,1]
] // 5


data = [
    [78,16,94,36],
    [87,93,50,22],
    [63,28,91,60],
    [64,27,41,27],
    [73,37,12,69],
    [68,30,83,31],
    [63,24,68,36]
] // 44

console.log(trapRainWater(data));



