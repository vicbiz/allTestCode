const a = [1,2,3,4];


const a1 = a.map((elemet, idx) => {
    return {
        name : "Jae Moon "+ idx,
        age  : idx + 30
    }
});

console.log(a1);

const sum = a1.reduce( (total, currentVal) => {
    return total + currentVal.age;
}, 0);

console.log(sum);