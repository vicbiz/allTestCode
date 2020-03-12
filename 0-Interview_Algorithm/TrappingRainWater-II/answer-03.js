function Heap(less) {
    this.heap = []
    this.less = less
}

Heap.prototype.exch = function(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]
}

Heap.prototype.parent = function(x) {
    return (x-1) >> 1
}

Heap.prototype.swim = function(x) {
    while (x>0) {
        let p = this.parent(x)
        // console.log(this.heap[p], this.heap[x], this.less(this.heap[p],this.heap[x]))
        if (this.less(this.heap[p], this.heap[x])) {
            this.exch(p, x)
            x = p
        } else {
            break
        }
    }
}

Heap.prototype.sink = function(x) {
    while(2*x+1<this.heap.length) {
        let c = 2*x+1
        if (c+1<this.heap.length && this.less(this.heap[c], this.heap[c+1])) {
            c += 1
        } 
        
        if (this.less(this.heap[x], this.heap[c])) {
            this.exch(x, c)
            x = c
        } else {
            break
        }
    }
}

Heap.prototype.push = function(v) {
    this.heap.push(v)
    this.swim(this.heap.length-1)
    // console.log(v, this.heap)
}

Heap.prototype.size = function() {
    return this.heap.length
}

Heap.prototype.peak = function() {
    return this.heap.length > 0 ? this.heap[0] : null
}

Heap.prototype.pop = function() {
    let top = this.heap[0]
    this.heap[0] = this.heap[this.heap.length-1]
    this.heap.pop()
    this.sink(0)
    return top
}
/**
 * @param {number[][]} heightMap
 * @return {number}
 */
var trapRainWater = function(heightMap) {
    if (!heightMap || !heightMap.length) {
        return 0
    }
    let m = heightMap.length
    let n = heightMap[0].length
    
    let marked = Array(m)
    let minHeap = new Heap((v1, v2) => v2[2] < v1[2])
    for (let i=0; i<m; i++) {
        marked[i] = Array(n).fill(false)
        for (let j=0; j<n; j++) {
            if (i===0 || j === 0 || i === m-1 || j=== n-1) {
                minHeap.push([i, j, heightMap[i][j]])
                marked[i][j] = true
            } 
        }
    }
    // console.log(minHeap.heap, marked)
    let res = 0
    let dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]]
    while (minHeap.size()) {
        let c = minHeap.pop()
        for (let d of dirs) {
            dx = c[0] + d[0]
            dy = c[1] + d[1]
            if (dx>=0 && dx<m && dy>=0 && dy<n && !marked[dx][dy]) {
                marked[dx][dy] = true
                res += Math.max(0, c[2] - heightMap[dx][dy])
                minHeap.push([dx, dy, Math.max(c[2], heightMap[dx][dy])])
            }
        }
    }
    
    return res;
    
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

console.log(trapRainWater(data));
















