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

// Tuple
let tp: [string, number] = ["Jae", 1966];
console.log(tp, tp[0]);

let anyType: any = ["a", 1, true, { name: "Jae" }];
console.log(anyType[3].name);

enum Color {
  Red,
  Green,
  Blue,
}
let c: Color = Color.Green;
console.log("enum Color.Green : ", c, typeof c);

let a1: number[] = [1, 2, 3, 4.5];
let a2: Array<number> = [1, 2, 3];

// Type Assertion
let uu: unknown;
// let u1 = (uu as string).toUpperCase();
// let u2 = (uu as number).toExponential();

function hasName(obj: any): obj is { name: string } {
  return !!obj && typeof obj === "object" && "name" in obj;
}
if (hasName(uu)) {
  console.log("u3 hasName:", uu.name);
}

// Multiple Type
let mt: number | string | boolean;
mt = 1;
mt = "1";
mt = true;

// function... (): return type...
function addNum(n1: number, n2: number): number {
  return n1 + n2;
}
console.log(addNum(101, 102));

// function... (): return type...string
function addStr(n1: number, n2: number): string {
  return n1.toString() + n2.toString();
}
console.log(addStr(101, 102));

// optional parameter
function addOpt(n1: number, n2?: number): number {
  return n2 ? n1 + n2 : n1;
}
console.log(addOpt(201));

// Interface..
// ..... without Interface.. hard to use for complicated object... that's why need interface
function fullName(person: { firstName: string; lastName: string }) {
  return `My name is ${person.firstName} ${person.lastName}.`;
}
console.log(fullName({ firstName: "Mr.", lastName: "Moon" }));

// ..... with Interface
interface Address {
  street: string; // not ,
  city: string;
  state: string;
  zip: number;
}

function fullAddress(adrs: Address) {
  return `My Address is ${adrs.street}, ${adrs.city}, ${adrs.state} ${adrs.zip}. `;
}

let myAdrs = {
  street: "1751 Hedington",
  city: "Atlanta",
  state: "GA",
  zip: 30306,
};

console.log(fullAddress(myAdrs));
