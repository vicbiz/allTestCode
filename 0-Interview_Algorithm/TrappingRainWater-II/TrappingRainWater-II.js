/**
 * @param {number[][]} heightMap
 * @return {number}
 */
var trapRainWater = function(heightMap) {

    let checkSides = function(idx){
        let current = heightMap[1][idx];
        let a = heightMap[0][idx] > current ? true : false;
        let b = heightMap[2][idx] > current ? true : false;
        let c = heightMap[1][idx-1] > current ? true : false;
        let d = heightMap[1][idx+1] > current ? true : false;

        console.log(current, a,b,c,d);

    }

    for(let i=0; i < data[1].length; i++){
        checkSides(i);
    }
};



data = [
    [1,4,3,1,3,2],
    [3,2,1,3,2,4],
    [2,3,3,2,3,1]
]

trapRainWater(data);


