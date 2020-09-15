/**
 * @param {number[][]} heightMap
 * @return {number}
 */
var trapRainWater = function(heightMap) {

    if(heightMap.length == 0 || !heightMap) return 0;

    let trappedRainTotal = 0;
    let M = heightMap.length > 0 ? heightMap.length : 0;
    let N = heightMap[0].length > 0 ? heightMap[0].length : 0;

    if(M < 3 || N < 3) return 0; // minimum 3x3 matrix


    let visitedArray = [];
    let needToVisit = [];

    let checkVisited = function(x,y){
        let findP = visitedArray.findIndex(it => JSON.stringify(it) == JSON.stringify([x,y]));
        return findP > -1 ? true : false;
    }

    let minArray = [];

    let findBig = function(x,y){
        let h = heightMap[x][y];
        let bigNumbers = [];

        let dir = [[-1,0], [1,0], [0,-1], [0,1]];

        dir.forEach( d => {
            let newX = x + d[0];
            let newY = y + d[1];
            if (!checkVisited(newX,newY) ) { 
                if (heightMap[newX][newY] > h) { 
                    bigNumbers.push(heightMap[newX][newY])
                } else { 
                    if(newX > 0 && newX < M-1 && newY > 0 && newY < N-1){
                        needToVisit.push([newX,newY])
                    }
                }
            }
            console.log(x,y, " - ",newX, newY, "h",h,"heightMap", heightMap[newX][newY],"bigNumbers",bigNumbers, "needToVisit",needToVisit);
        });

        if(!checkVisited(x,y)) {
            visitedArray.push([x,y]);
        }
    
        let a = bigNumbers.length > 0 ? Math.min(...bigNumbers) : 0;
        let b = a > 0 ? a - h : 0;
        // console.log("needToVisit", needToVisit);
        // console.log("bigNumbers", bigNumbers, "h",h,"min",a,"trap",b, "\n\n" );
    }

    for(let i=1; i<M-1 ; i++){
        for(let j=1; j<N-1; j++){

            findBig(i,j);

        }
    }

    console.log("visitedArray", visitedArray);
    // visited(1,3);








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

// data = [
//     [12,13,0,12],
//     [13,4,13,12],
//     [13,8,10,12],
//     [12,13,12,12],
//     [13,13,13,13]    
// ] // 14

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

console.log(data);



console.log("Final Result : ",trapRainWater(data));



