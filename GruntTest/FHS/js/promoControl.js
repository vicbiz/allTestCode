$(document).ready(function() {
    $("#edit-promo form input").on("change", function(){
        $(".cancelBtn").removeClass("disabled");
    });
    $("#edit-promo form input").on("keyup", function(){
        $(".cancelBtn").removeClass("disabled");
    });
});