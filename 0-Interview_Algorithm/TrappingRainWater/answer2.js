const { Array2DTracer } = require("algorithm-visualizer")

const heights = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1];

// visualize the elevation

const rows = Math.max(...heights);
const cols = heights.length;

const elevation = Array.from({ length: rows }, () =>
  Array.from({ length: cols }, () => " ")
);

const elevationTracer = new Array2DTracer("Elevation").set(elevation);

// initialize the elevations using patching, i.e. mark them as red and give them blank values
let temp = heights.slice();
let r = rows - 1;
while (r >= 0) {
  for (let i = 0; i < cols; i++) {
    const val = temp[i] === 0 ? 0 : 1;
    if (val > 0) {
      elevationTracer.patch(r, i, " ");
    }
  }
  temp = temp.map(n => (n === 0 ? 0 : n - 1));
  r -= 1;
}

function TrappingRainWater() {
  let left = 0;
  let leftMax = 0;
  let right = heights.length - 1;
  let rightMax = 0;
  let result = 0;

  while (left <= right) {
    if (leftMax < rightMax) {

      leftMax = Math.max(leftMax, heights[left]);
      result += leftMax - heights[left];

      if (leftMax - heights[left] > 0) {
        for (let i = 0; i < leftMax - heights[left]; i++) {
          // mark the solution in blue via selection
          elevationTracer.select(rows - 1 - heights[left] - i, left);
        }
      }

      left++;
    } else {

      rightMax = Math.max(rightMax, heights[right]);

      result += rightMax - heights[right];

      if (rightMax - heights[right] > 0) {
        for (let i = 0; i < rightMax - heights[right]; i++) {
          // mark the solution in blue via selection
          elevationTracer.select(rows - 1 - heights[right] - i, right);
        }
      }

      right--;
    }
  }

  return result;
}

TrappingRainWater();