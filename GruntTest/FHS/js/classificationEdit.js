$(function() {
    $(".cancelBtn").on("click", function(e){
        e.preventDefault();
        history.back(1);
    });
});
