import { languages } from "./test";
import $ from "jquery";

// setTimeout(function(){
$(document).ready(function(){
    $.each(languages, function(key, value){
        console.log(key+" book name : "+value.name);
        $('body').append("<p>"+value.name+"</p>");
    });
});
// },500);

