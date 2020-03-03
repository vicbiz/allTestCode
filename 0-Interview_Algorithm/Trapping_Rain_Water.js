const data = [0,3,2,1,2,3,0,2,1,2,1,0];


let trappedTotal = 0;
let currentIdx = data.findIndex( it => it > 0 );
let lastIdx = data.length-1;


do {
    let currentVal = data[currentIdx];
    let nextIdx = currentIdx;
    
    nextIdx = data.findIndex( (it, idx) => {
        // if(idx > nextIdx && it >= currentVal ) return true;
        if(idx > nextIdx && it <= currentVal ) return true;
    })
    console.log("currentIdx : ", currentIdx, "lastIdx : ", lastIdx, "nextIdx ", nextIdx);
    
    if(nextIdx > 0){
        let segTotalSpace = Math.min(currentVal, data[nextIdx]) * (nextIdx - currentIdx - 1);
        let segBlockTotal = data.reduce( (total, currentValue, i) => {
            if(i > currentIdx && i < nextIdx){
                return total + currentValue;
            } else return total;
        })
    
        trappedTotal += (segTotalSpace - segBlockTotal);
        console.log("segTotalSpace",segTotalSpace, "segBlockTotal",segBlockTotal, "trappedTotal",trappedTotal);
    
        currentIdx = nextIdx;
    
    } else {
        currentIdx = lastIdx;
    }
} while ( currentIdx < lastIdx)

