/**
 * @param {number[][]} heightMap
 * @return {number}
 */
var trapRainWater = function(heightMap) {

	if(heightMap.length == 0 || !heightMap) return 0;
	
	let trappedRain = 0;
	let minArray = Array(heightMap.length).fill([]);
	let M = heightMap.length;
	let N = heightMap[0].length;

	for(let i in minArray) {
		minArray[i] = new Array(heightMap[0].length).fill(0);
	}

	if(M<3 || N<3) return trappedRain;

	for(let i=0; i<M; i++){
		minArray[i][0] = heightMap[i][0];
		minArray[i][N-1] = heightMap[i][N-1]; 
	}

	for(let j=0;j<heightMap[0].length;j++){
		minArray[0][j] = heightMap[0][j];
		minArray[M-1][j] = heightMap[M-1][j];    			
	}


	let getRainFalls = function(data, minArray, h, i, j){
		if(i===0 || i==data.length-1 || j===0 || j==data[0].length-1) return;
		if(minArray[i][j]===0) return;
		if(minArray[i][j]>h && minArray[i][j]!=data[i][j]){
			minArray[i][j] = Math.max(data[i][j], h); 
			getRainFalls(data, minArray, minArray[i][j], i-1, j);
			getRainFalls(data, minArray, minArray[i][j], i+1, j);
			getRainFalls(data, minArray, minArray[i][j], i, j-1);
			getRainFalls(data, minArray, minArray[i][j], i, j+1);
		}    	
	};


	for(let i=1; i<M-1; i++)
		for(let j=1; j<N-1; j++){
			let min = Number.MAX_VALUE;
			if(minArray[i-1][j]!==0) min = Math.min(min, minArray[i-1][j]);
			if(minArray[i+1][j]!==0) min = Math.min(min, minArray[i+1][j]);
			if(minArray[i][j+1]!==0) min = Math.min(min, minArray[i][j+1]);
			if(minArray[i][j-1]!==0) min = Math.min(min, minArray[i][j-1]);    			
			minArray[i][j] = Math.max(heightMap[i][j], min);
			getRainFalls(heightMap, minArray, minArray[i][j], i-1, j);    	 
	    	getRainFalls(heightMap, minArray, minArray[i][j], i, j-1);    	    	
		}
	
	for(let i=1; i<M-1; i++)
		for(let j=1; j<N-1; j++){
			trappedRain += minArray[i][j]-heightMap[i][j];
		}
    
    return trappedRain;
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

// data = [
//     [12,13,0,12],
//     [13,4,13,12],
//     [13,8,10,12],
//     [12,13,12,12],
//     [13,13,13,13]    
// ] // 14

// data = [
//     [1,4,3,1,3,2],
//     [3,2,1,3,2,4],
//     [2,3,3,2,3,1]
// ] // 4

console.log(trapRainWater(data));










