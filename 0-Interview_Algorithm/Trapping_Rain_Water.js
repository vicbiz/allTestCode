// const data = [];
// const data = [2,0,2];
// const data = [0,1,0,2,1,0,1,3,2,1,2,1];
// const data = [0,3,2,1,2,3,0,2,1,2,1,0];
const data = [0,1,0,3,2,1,0,1,1,2,4,3,1,0,2,1,0,2,0];
// const data = [0,7,1,4,6,0,5,0,2];
             
const dataSegment = [];


for(i=0; i<data.length; i++){
    if(i==0){
        dataSegment[i] = data[i] > 0 ? 1 : 0;
    } else {
        let checkBoundary = data.findIndex( (it,j) => (j > i && it >= data[i]) ? true : false ) ;
        console.log(i, data[i], "checkBoundary",checkBoundary);

        if(data[i] > data[i-1]){
            dataSegment[i] = 1;
            dataSegment[i-1] = 0;


            // if(checkBoundary > -1){
            //     dataSegment[i] = 1;
            //     dataSegment[i-1] = 0;
            // } else {
            //     dataSegment[i] = 1;
            //     dataSegment[i-1] = 0;
            // }
        } else {
            dataSegment[i] = 0;
        }
    }
}
console.log(dataSegment);

let segFrom = dataSegment.findIndex( it => it == 1 ? true : false );
let segTo = 0;
let segmentData = [];

do {
    segTo = dataSegment.findIndex( (it,i) => (it == 1 && i > segFrom) ? true : false );
    if(segTo > -1){
        segmentData.push([segFrom, segTo]);
        segFrom = segTo;
    } else {

    }
    console.log("segFrom",segFrom , "segTo", segTo, "segmentData",segmentData);    
} while (segFrom > -1 && segTo > -1);




















/*
let trappedGrandTotal = 0;
let currentIdx = data.findIndex( it => it > 0 );
let lastIdx = data.length-1;
let notFoundNextIndex = false;

let findNextIdx = function(nIdx, cVal){
    return data.findIndex( (it, idx) => {
        if(idx > nIdx && it >= cVal ) return true;
    });    
}

do {
    let currentVal = data[currentIdx];
    let nextIdx = currentIdx;
    
    nextIdx = findNextIdx(nextIdx, currentVal);
    console.log("currentIdx : ", currentIdx, "lastIdx : ", lastIdx, "nextIdx ", nextIdx);
    
    if(nextIdx > 0){

        let segTotalSpace = 0;
        let segBlockTotal = 0;

        if(notFoundNextIndex){
            segTotalSpace = Math.max(currentVal, data[nextIdx]) * (nextIdx - currentIdx);
            console.log("max : ", Math.max(currentVal, data[nextIdx]), "nextIdx : ", nextIdx, "currentIdx ", currentIdx);
            segBlockTotal = data.reduce( (total, currentValue, i) => {
                if(i >= currentIdx && i < nextIdx){
                    return total + currentValue;
                } else return total;
            },0);
        } else {
            segTotalSpace = Math.min(currentVal, data[nextIdx]) * (nextIdx - currentIdx - 1);
            segBlockTotal = data.reduce( (total, currentValue, i) => {
                if(i > currentIdx && i < nextIdx){
                    return total + currentValue;
                } else return total;
            },0);
        }


        trappedSagTotal = segTotalSpace - segBlockTotal;
        trappedGrandTotal += trappedSagTotal;

        console.log("segTotalSpace",segTotalSpace, "segBlockTotal",segBlockTotal, "trappedSagTotal",trappedSagTotal, "trappedGrandTotal",trappedGrandTotal);
        console.log('-----------------------------------------------------------');
    
        currentIdx = nextIdx;
    
    } else if(nextIdx == -1 && currentIdx < lastIdx){
        currentIdx ++;
        notFoundNextIndex = true;
    }
    else {
        currentIdx = lastIdx;
    }
} while ( currentIdx < lastIdx)

console.log("\n******************************************");
console.log("data :", data);
console.log("Final Trapped Rain Water Total : ", trappedGrandTotal);
console.log("****************************************** \n");
*/


