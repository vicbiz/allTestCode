const puppeteer = require('puppeteer');
const { sum, subtract, multiply, cloneArray } = require("./utility")

test("add 2 numbers", () => {
    expect(sum(1,2)).toBe(3)
})

test("subtract 2 numbers", () => {
    expect(subtract(3,1)).toBe(2)
})

test("multiply 2 numbers", () => {
    expect(multiply(3,2)).toBe(6)
})

test("cloneArray", () => {
    const ary = [1,2,3,4,5]
    expect(cloneArray(ary)).toEqual(ary)
    expect(cloneArray(ary)).not.toBe(ary) // cloned array is not exact same array.. new array with same values
})

test("click search", async() => {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo : 80,
        args: ['--window-size=1920,1080']
    })
    const page = await browser.newPage();
    await page.goto("https://www.forbestravelguide.com/");
    await page.click("input.searchInput");
    // await page.click($$(`${selector} > *`));
    
}, 1000000);
