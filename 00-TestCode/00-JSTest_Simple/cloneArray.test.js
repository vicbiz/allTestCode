const { cloneArray } = require("./cloneArray");

test("clone array", () => {
    // expect(cloneArray([1,2,3])).toBe([1,2,3]) // Error
    expect(cloneArray([1,2,3])).toEqual([1,2,3])

    const ary = [1,2,3]
    expect(cloneArray(ary)).toEqual(ary)
})