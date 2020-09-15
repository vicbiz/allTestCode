
let trappedRainTotal = 0;
let objData = [];


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


let heightMap = data;



const rowMax = data.length;
const colMax = data[0].length;

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

let findNextBig = function(d){
    // console.log("d",d);
    let b1 = b2 = b3 = b4 = 0;
    let x = d.pos[0];
    let y = d.pos[1];
    let h = d.ht;

    if(x == 0)        { b1 = null; }
    if(x == rowMax-1) { b2 = null; }
    if(y == 0)        { b3 = null; }
    if(y == colMax-1) { b4 = null; }

    let s1 = [], s2 = [], s3 = [], s4 = [];

    for(let i=x-1; i >= 0; i--)      { if(heightMap[i][y] <= h){s1.push([i,y])}; if (heightMap[i][y] > h && heightMap[i][y] > b1) { b1 = heightMap[i][y]; break;}}
    for(let i=x+1; i < rowMax; i++)  { if(heightMap[i][y] <= h){s2.push([i,y])}; if (heightMap[i][y] > h && heightMap[i][y] > b2) { b2 = heightMap[i][y]; break;}}
    for(let i=y-1; i >= 0; i--)      { if(heightMap[x][i] <= h){s3.push([x,i])}; if (heightMap[x][i] > h && heightMap[x][i] > b3) { b3 = heightMap[x][i]; break;}}
    for(let i=y+1; i < colMax; i++)  { if(heightMap[x][i] <= h){s4.push([x,i])}; if (heightMap[x][i] > h && heightMap[x][i] > b4) { b4 = heightMap[x][i]; break;}}

    let dir = "";
    let a = [b1, b2, b3, b4];
    let b = Math.min(b1, b2, b3, b4);
    let c = a.findIndex( it => it == b);
    let q = [];

    if(b1 != null && b2 != null && b3 != null && b4 != null && b1 != 0 && b2 != 0 && b3 != 0 && b4 != 0){
        q.push(...s1, ...s2, ...s3, ...s4);
        console.log("\n\ns1",s1);
        console.log("s2",s2);
        console.log("s3",s3);
        console.log("s4",s4);
        console.log(`[${x}, ${y}]`, d.ht, " : ", b1, b2, b3, b4, "min",b, "index",c, "q",q, "\n\n" );

        // if(q.length > 0){
        //     let nextObj = objData.find( it => it.x == q[0][0] && it.y == q[0][1]);
        //     console.log(q[0],"nextObj",nextObj);
        //     findNextBig(nextObj);
        // } else {
            return [b1, b2, b3, b4, q];
        // }
    }
};

let gTotal = 0;
for(let i=0; i<objData.length; i++){
    let bigsArray = [];
    let bigs = findNextBig(objData[i]);

    if(bigs && bigs[4]){
        let q = bigs[4];

        console.log("q",q);
    }


    if(bigs){
        // do {
        //     a = findNextBig(objData[i]);
        //     let nextObj = objData.find( it => it.x == q[0][0] && it.y == q[0][1]);
        //     mins.push(a[0], a[1], a[2], a[3]);
        // } while (a[4].length > 0);
    
        // console.log("mins", mins);

        // let total = Math.min(mins) - objData[i].ht;
        // console.log("total",total);
        // gTotal += total;
    }
}

console.log("gTotal",gTotal);

console.log(trappedRainTotal);

