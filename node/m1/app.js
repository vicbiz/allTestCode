const fs = require('fs');
const cls = require('clear');

cls();

const path = './';
console.log("__dirname :" + __dirname);


let allFiles = fs.readdirSync(path);

let allFilesWithDetail = allFiles.map( fileName => {
    fileLocation = __dirname + '/' + fileName;
    const size = fs.statSync(fileLocation).size;

    return {
        name : fileName,
        size : size
    }
});

console.log(allFilesWithDetail);

// const totalSize = allFilesWithDetail.reduce( (accumulator, currentValue) => accumulator.size + currentValue );

const totalSize = allFilesWithDetail.reduce( function(total, currentValue, currentIndex, array) {
    // console.log(currentValue.size);
    return total + currentValue.size
  }, 0);

console.log("totalSize  : "+totalSize);
console.log("------------------------------------");



const people = [
    { name: 'Jae Moon', age: 25 },
    { name: 'YunHo Jeon', age: 22 },
    { name: 'Krunal', age: 25 },
    { name: 'Rushikesh', age: 25 },
    { name: 'Ankit', age: 24 }
  ];
  
  const groupBy = (objectArray, property) => {
      return objectArray.reduce(function (total, obj) {
          let key = obj[property];
          console.log("key : ", key);
          if (!total[key]) {
              total[key] = [];
          }
          total[key].push(obj);
          console.log("total : ", total);
          return total;
      }, {});
  }
  
  let groupedPeople = groupBy(people, 'age');
  
  console.log(groupedPeople);





  const myObject = {
    dog: "🐕",
    cat: "🐈",
    koala: "🐨",
    count: 3
  };
  
  console.log(JSON.stringify(myObject));
  // result: {"dog":"🐕","cat":"🐈","koala":"🐨","count":3}
  
  console.log(JSON.parse(JSON.stringify(myObject)));
  // result: Object {dog: "🐕", cat: "🐈", koala: "🐨", count: 3}
  

