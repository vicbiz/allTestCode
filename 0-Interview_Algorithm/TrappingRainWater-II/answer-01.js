/**
 * @param {number[][]} heightMap
 * @return {number}
 */
var trapRainWater = function(heightMap) {
    let water = 0, minh = Array(heightMap.length).fill([]);
    for(let i in minh) minh[i] = new Array(heightMap[0].length).fill(0);
    // return minh;
    if(heightMap.length<3||heightMap[0].length<3) return water;
	for(let i=0;i<heightMap.length;i++){
		minh[i][0] = heightMap[i][0];
		minh[i][heightMap[0].length-1] = heightMap[i][heightMap[0].length-1]; 
	}
	for(let j=0;j<heightMap[0].length;j++){
		minh[0][j] = heightMap[0][j];
		minh[heightMap.length-1][j] = heightMap[heightMap.length-1][j];    			
	}
    console.log("minh",minh);
	for(let i=1;i<heightMap.length-1;i++)
		for(let j=1;j<heightMap[0].length-1;j++){
			let min = Number.MAX_VALUE;
			if(minh[i-1][j]!==0) min = Math.min(min, minh[i-1][j]);
			if(minh[i+1][j]!==0) min = Math.min(min, minh[i+1][j]);
			if(minh[i][j+1]!==0) min = Math.min(min, minh[i][j+1]);
			if(minh[i][j-1]!==0) min = Math.min(min, minh[i][j-1]);    			
			minh[i][j] = Math.max(heightMap[i][j], min);
			//pass by
			dfs(heightMap, minh, minh[i][j], i-1, j);    	 
	    	dfs(heightMap, minh, minh[i][j], i, j-1);    	    	
		}
	
	for(let i=1;i<heightMap.length-1;i++)
		for(let j=1;j<heightMap[0].length-1;j++){
            // console.log(minh[i][j], heightMap[i][j], minh[i][j]-heightMap[i][j]);
			water += minh[i][j]-heightMap[i][j];
		}
    
    console.log("heightMap",heightMap);
    // console.log("minh",minh);
    return water;
};

var dfs = function(matrix, minh, h, i, j){
	if(i===0||i==matrix.length-1||j===0||j==matrix[0].length-1) return;
	if(minh[i][j]===0) return;
	if(minh[i][j]>h&&minh[i][j]!=matrix[i][j]){
		minh[i][j] = Math.max(matrix[i][j], h); 
		dfs(matrix, minh, minh[i][j], i-1, j);
    	dfs(matrix, minh, minh[i][j], i+1, j);
    	dfs(matrix, minh, minh[i][j], i, j-1);
    	dfs(matrix, minh, minh[i][j], i, j+1);
	}    	
};




data = [
    [78,16,94,36],
    [87,93,50,22],
    [63,28,91,60],
    [64,27,41,27],
    [73,37,12,69],
    [68,30,83,31],
    [63,24,68,36]
] // 44

data = [
    [1,4,3,1,3,2],
    [3,2,1,3,2,4],
    [2,3,3,2,3,1]
] // 4

console.log(trapRainWater(data));










