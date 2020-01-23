require('../css/style.css');

let people = require('./people.js');
let $ = require('jquery');

setTimeout(function(){
    console.log($('h1').html());
    $.each(people, function(key, value){
        console.log(key, value);
        $('#content').append("<h1>"+value.name+"</h1>");
    });
},500);

console.log(people);