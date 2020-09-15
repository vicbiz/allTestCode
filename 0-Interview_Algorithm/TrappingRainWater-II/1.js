

// let a = [ [ 1, 2 ], [ 2, 1 ] ];
// let b = [ 1, 2 ];
// let intersection = finalData[i].filter(x => trappedRainCell[idx].includes(x));

// console.log(a,b,a.includes(b));
// console.log(a,b,JSON.stringify(a).indexOf(JSON.stringify(b)));

// a = [[1],[2],[3]];
// a = [3];
// b = [3];

// console.log(a,b,JSON.stringify(a)===JSON.stringify(b));

// let intersection = a.filter(x => {
//     let ccc = b.includes(x);
//     console.log("x",x,"b",b,"ccc",ccc);
//     return x == b;
//     // return ccc;
// });

// console.log(intersection);


let trappedRainTotal = 0;
let objData = [];


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



let heightMap = data;

let maxX = data[0].length;
let maxY = data.length;


// let findNextBig = function(x, y, dir){
//     switch(dir){
//         case 'up' :
//             return x > 0 ? heightMap[x-1][y] : null;
//             break;
//         case 'dn' :
//             return x<maxX-1 ? heightMap[x+1][y] : null;
//             break;
//         case 'lt' :
//             return y > 0 ? heightMap[x][y-1] : null;
//             break;
//         case 'rt' :
//             return y<maxY-1 ? heightMap[x][y+1] : null;
//             break;
//     }
// }


let findBigAround = function(x, y){
    let dirctions = ['up','dn','lt','rt'];
    let current = heightMap[x][y];
    let foundDir = null;
    let b1,b2,b3,b4;
    
    dirctions.forEach(dir => {
        switch(dir){
            case 'up' :
                b1 = (x > 0 &&  heightMap[x-1][y] > current) ? dir : null;
                break;
            case 'dn' :
                b2 = (x<maxX-1 && heightMap[x+1][y] > current) ? foundDir = dir : null;
                break;
            case 'lt' :
                b3 = (y > 0 && heightMap[x][y-1] > current) ? foundDir = dir : null;
                break;
            case 'rt' :
                b4 = (y<maxY-1 && heightMap[x][y+1] > current )? foundDir = dir : null;
                break;
        }
    });

    return foundDir;
}



let findBig = function(data){
    let x = data.pos[0];
    let y = data.pos[1];

    let b1 = b2 = b3 = b4 = data.ht;

    console.log("start", data.ht);

    let path;
    do {
        let a = findBigAround(x,y);
        if(a === null) break;
        path = a;
        console.log(data.ht, "path", path);
        x = data[path][0];
        y = data[path][1];
        console.log(x,y);
    } while (true)

    // console.log(data.ht, "path", path,"\n\n");

}





for(let i=0; i<heightMap.length; i++){
    for(let j=0; j<heightMap[0].length; j++){
        let obj = {}
        obj.pos = [i,j];
        obj.x = i;
        obj.y = j;
        obj.ht = data[i][j];

        obj.up = i>0 ? [i-1,j] : null;
        obj.dn = i<heightMap.length-1 ? [i+1, j] : null;
        obj.lt = j>0 ? [i, j-1] : null;
        obj.rt = j<heightMap[0].length-1 ? [i, j+1] : null;

        // obj.up = i>0 ? heightMap[i-1][j] : null;
        // obj.dn = i<heightMap.length-1 ? heightMap[i+1][j] : null;
        // obj.lt = j>0 ? heightMap[i][j-1] : null;
        // obj.rt = j<heightMap[0].length-1 ? heightMap[i][j+1] : null;

        objData.push(obj);
    }
}

// objData = objData.sort( (a,b) => (a.ht > b.ht) ? 1 : -1 );
// console.log(objData);


for(let i=0; i<objData.length; i++){
    findBig(objData[i])


    // let z1 = findNextBig(objData[i].pos[0], objData[i].pos[1], 'up');
    // let z2 = findNextBig(objData[i].pos[0], objData[i].pos[1], 'dn');
    // let z3 = findNextBig(objData[i].pos[0], objData[i].pos[1], 'lt');
    // let z4 = findNextBig(objData[i].pos[0], objData[i].pos[1], 'rt');
    // let min = Math.min(z1,z2,z3,z4)
    // console.log(z1,z2,z3,z4);

    // let obj = objData[i];
    // if(obj.up && obj.dn && obj.lt && obj.rt){
    //     let min = Math.min(obj.up,obj.dn,obj.lt,obj.rt) - obj.ht;
    //     obj.fill = min > 0 ? min : 0 ;
    // } else {
    //     obj.fill = 0;
    // }
    // trappedRainTotal += obj.fill;
}





// let a = objData.sort( (a,b) => (a.ht > b.ht) ? 1 : -1 );
// let a = objData.sort( (a,b) => (a.ht <= b.ht) ? 1 : -1 );

// console.log(a);

console.log(trappedRainTotal);


