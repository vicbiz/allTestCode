class Point {
  private x: number;
  private y: number;

  constructor(x?: number, y?: number) {
    this.x = x;
    this.y = y;
  }
  draw() {
    console.log(this.x, this.y);
  }
}

let point: Point = new Point(3, 4);
point.draw();
