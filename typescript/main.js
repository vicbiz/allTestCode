var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.draw = function () {
        console.log(this.x, this.y);
    };
    return Point;
}());
var point = new Point(3, 4);
point.draw();
// Tuple
var tp = ["Jae", 1966];
console.log(tp, tp[0]);
var anyType = ["a", 1, true, { name: "Jae" }];
console.log(anyType[3].name);
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
console.log("enum Color.Green : ", c, typeof c);
var a1 = [1, 2, 3, 4.5];
var a2 = [1, 2, 3];
// Type Assertion
var uu;
// let u1 = (uu as string).toUpperCase();
// let u2 = (uu as number).toExponential();
function hasName(obj) {
    return !!obj && typeof obj === "object" && "name" in obj;
}
if (hasName(uu)) {
    console.log("u3 hasName:", uu.name);
}
// Multiple Type
var mt;
mt = 1;
mt = "1";
mt = true;
// function... (): return type...
function addNum(n1, n2) {
    return n1 + n2;
}
console.log(addNum(101, 102));
// function... (): return type...string
function addStr(n1, n2) {
    return n1.toString() + n2.toString();
}
console.log(addStr(101, 102));
// optional parameter
function addOpt(n1, n2) {
    return n2 ? n1 + n2 : n1;
}
console.log(addOpt(201));
// Interface..
// ..... without Interface.. hard to use for complicated object... that's why need interface
function fullName(person) {
    return "My name is " + person.firstName + " " + person.lastName + ".";
}
console.log(fullName({ firstName: "Mr.", lastName: "Moon" }));
function fullAddress(adrs) {
    return "My Address is " + adrs.street + ", " + adrs.city + ", " + adrs.state + " " + adrs.zip + ". ";
}
var myAdrs = {
    street: "1751 Hedington",
    city: "Atlanta",
    state: "GA",
    zip: 30306
};
console.log(fullAddress(myAdrs));
