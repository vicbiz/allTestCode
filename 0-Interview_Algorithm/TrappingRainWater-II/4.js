/**
 * @param {number[][]} heightMap
 * @return {number}
 */
var trapRainWater = function(heightMap) {

    if(heightMap.length == 0 || !heightMap) return 0;

    let trappedRainTotal = 0;
    const M = heightMap.length > 0 ? heightMap.length : 0;
    const N = heightMap[0].length > 0 ? heightMap[0].length : 0;
    const MAX = Number.MAX_VALUE;
    let visitedArray = [];

    if(M < 3 || N < 3) return 0; // minimum 3x3 matrix


    let objData = [];
    for(let i=0; i<M; i++){
        for(let j=0; j<N; j++){
            let obj = {}
            obj.pos = [i,j];
            obj.x = i;
            obj.y = j;
            obj.ht = data[i][j];
            obj.rh = data[i][j];
    
            obj.up = i>0 ? [i-1,j] : null;
            obj.dn = i<heightMap.length-1 ? [i+1, j] : null;
            obj.lt = j>0 ? [i, j-1] : null;
            obj.rt = j<heightMap[0].length-1 ? [i, j+1] : null;
    
            objData.push(obj);
        }
    }

    console.log("heightMap",heightMap);
    // console.log("objData",objData,"\n\n");





    let s = function(){
        let j = 0;
        console.log("------------------------------------");
        for(let i = 0; i<objData.length; i=i+N){
            console.log(objData[i].rh, objData[i+1].rh, objData[i+2].rh, objData[i+3].rh);
        }
        console.log("------------------------------------");
    }


    let findValue = function(d,h){
        let idx = null;
        let val = MAX;
        if(d){
            idx = objData.findIndex( it => {
                return (it.x == d[0] && it.y == d[1]) ? true : false;
            });
            if(objData[idx].rh > h){
                val = objData[idx].rh;
            }
        }
        return val;
    };


    let findBig = function(data){
        let x = data.x;
        let y = data.y;

        let changed = 0;
        if(x > 0 && y > 0){
            let h = data.rh;
            const dir = [[-1,0], [1,0], [0,-1], [0,1]];
            let bigNumbers = [];
    
            let o1 = findValue(data.up, h);
            let o2 = findValue(data.dn, h);
            let o3 = findValue(data.lt, h);
            let o4 = findValue(data.rt, h);

            let min = Math.min(o1,o2,o3,o4);

            // console.log("o1",o1,"o2",o2,"o3",o3,"o4",o4,"min",min);
    
            // let min = Math.min(o1==h ? MAX : o1, o2==h ? MAX : o2, o2==h ? MAX : o2, o3==h ? MAX : o3, o4==h ? MAX : o4);
    
            if(min > h && min != MAX) {
                // console.log("rh",data.rh,"min",min);
                data.rh = min;
                changed ++;
            }

            // console.log("o1",o1,"o2",o2,"o3",o3,"o4",o4,"min",min,"data",data,"changed",changed);
            // console.log("o1",o1,"o2",o2,"o3",o3,"o4",o4,"min",min,"changed",changed);
        }
        return changed;
    }

    let checkRainFall = true;
    do {
        let check = 0;
        // objData.sort( (a,b) => a.rh - b.rh);
        for(let i=0; i<objData.length; i++){
            check += findBig(objData[i]);
        }
        console.log("check",check);
        s();
        if(check == 0){
            checkRainFall = false;
        };
    } while (checkRainFall);

    for(i=0; i<objData.length; i++){
        // console.log(objData[i].rh , objData[i].ht, objData[i].rh-objData[i].ht);
        trappedRainTotal += (objData[i].rh - objData[i].ht);
    }

    // console.log(objData);

    return trappedRainTotal;
};




data = [];
data = [
    [1,4,3,1,3,2],
    [2,3,3,2,3,1]
] // 0
data = [
    [1,4],
    [3,2],
    [2,3]
] // 0



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

// data = [
//     [9,9,9,9,9],
//     [9,2,1,2,9],
//     [9,2,8,2,9],
//     [9,2,3,2,9],
//     [9,9,9,9,9]
// ] // 57

// data = [
//     [3,3,4,4,4,2],
//     [3,1,3,2,1,4],
//     [7,3,1,6,4,1]
// ] // 5


// data = [
//     [78,16,94,36],
//     [87,93,50,22],
//     [63,28,91,60],
//     [64,27,41,27],
//     [73,37,12,69],
//     [68,30,83,31],
//     [63,24,68,36]
// ] // 44




console.log("Final Result : ",trapRainWater(data));



