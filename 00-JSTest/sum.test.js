const { sum } = require("./sum");

test("adding two numbers", () => {
    expect(sum(1,2)).toBe(3);
})