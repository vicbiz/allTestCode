/**
 * @param {number[][]} heightMap
 * @return {number}
 */
var trapRainWater = function(heightMap) {
    var q = new myQueue();
    var visited = [];
    var x = heightMap.length;
    if(!x) {
        return 0;
    }
    var y = heightMap[0].length;
    if(!y) {
        return 0;
    }
    //console.log("X=" + x + ", Y=" + y);
    var sum = 0;
    for(var i = 0; i < x; i++) {
        var temp = Array(y).fill(false);
        visited.push(temp);
    }
    for(var j = 0; j < y; j++) {
        q.push({value: heightMap[0][j], loc: [0, j]});
        visited[0][j] = true;
        q.push({value: heightMap[x-1][j], loc: [x-1, j]});
        visited[x-1][j] = true;
    }
    for(var i = 1; i < x-1; i++) {
        q.push({value: heightMap[i][0], loc: [i, 0]});
        visited[i][0] = true;
        q.push({value: heightMap[i][y-1], loc: [i, y-1]});
        visited[i][y-1] = true;
    }
    //q.print();
    while(!q.empty()) {
        var temp = q.pop();
        //console.log("process " + JSON.stringify(temp));
        var locx = temp.loc[0];
        var locy = temp.loc[1];
        var v = temp.value;
        if(locx !== 0) {
            if(!visited[locx-1][locy]) {
                visited[locx-1][locy] = true;
                if(heightMap[locx-1][locy] > v) {
                    q.push({value:heightMap[locx-1][locy], loc:[locx-1, locy]});
                    //console.log("Push11 " + heightMap[locx][locy+1] + " to [" + locx + ", " + locy + "]" );
                } else {
                    sum += v - heightMap[locx-1][locy];
                    q.push({value:v, loc:[locx-1, locy]});
                    //console.log("Push12 " + v + " to [" + locx + ", " + locy + "]" );
                }
            }
        }
        if(locx !== x-1) {
            if(!visited[locx+1][locy]) {
                visited[locx+1][locy] = true;
                if(heightMap[locx+1][locy] > v) {
                    q.push({value:heightMap[locx+1][locy], loc:[locx+1, locy]});
                    //console.log("Push21 " + heightMap[locx][locy+1] + " to [" + locx + ", " + locy + "]" );
                } else {
                    sum += v - heightMap[locx+1][locy];
                    q.push({value:v, loc:[locx+1, locy]});
                    //console.log("Push22 " + v + " to [" + locx + ", " + locy + "]" );
                }
            }
        }
        if(locy !== 0) {
            if(!visited[locx][locy-1]) {
                visited[locx][locy-1] = true;
                if(heightMap[locx][locy-1] > v) {
                    q.push({value:heightMap[locx][locy-1], loc:[locx, locy-1]});
                    //console.log("Push31 " + heightMap[locx][locy-1] + " to [" + locx + ", " + locy + "]" );
                } else {
                    sum += v - heightMap[locx][locy-1];
                    q.push({value:v, loc:[locx, locy-1]});
                    //console.log("Push32 " + v + " to [" + locx + ", " + locy + "]" );
                }
            }
        }
        if(locy !== y-1) {
            if(!visited[locx][locy+1]) {
                visited[locx][locy+1] = true;
                if(heightMap[locx][locy+1] > v) {
                    q.push({value:heightMap[locx][locy+1], loc:[locx, locy+1]});
                    //console.log("Push41 " + heightMap[locx][locy+1] + " to [" + locx + ", " + locy + "]" );
                } else {
                    sum += v - heightMap[locx][locy+1];
                    q.push({value:v, loc:[locx, locy+1]});
                    //console.log("Push42 " + v + " to [" + locx + ", " + locy + "]" );
                }

            }
        }
    }
    return sum;
};

var myQueue = function() {
    this.cache = [];
}

myQueue.prototype.push = function(n) {
    var i;
    for(i = 0; i < this.cache.length; i++) {
        if(n.value < this.cache[i].value) {
            break;
        }
    }
    this.cache.splice(i, 0, n);
};

myQueue.prototype.pop = function() {
   return this.cache.shift(); 
};

myQueue.prototype.empty = function() {
    return this.cache.length === 0? true:false;
}

myQueue.prototype.print = function() {
    console.log(JSON.stringify(this.cache));
}








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










