$(document).ready(function(){
    $(".iframe").colorbox({iframe:true, width:"660px;", height:"300px"});

    var remember_me = $.cookie("remember_me");
    var userName = $.cookie("userName");

    if(!remember_me){remember_me = false;}
    if(userName == null){userName = "";}

    // console.log("remember_me :"+remember_me+" userName:"+userName);

    if(remember_me && userName !== ""){
        $("#remember_me").attr('checked',"checked").prop('checked');
        $("#username").val(userName);
    }


    $(document).on("change", "#remember_me", function(){
        var loginCheck = $("#remember_me").is(':checked');
        $.cookie("remember_me", loginCheck, { path: '/', expires:60 });
    });


    window.onbeforeunload = function (event) {
        if (typeof event == 'undefined') {
            event = window.event;
        }
        if (event) {
            var loginCheck = $("#remember_me").is(':checked');
            var userName = $("#username").val();
            $.cookie("remember_me", loginCheck, { path: '/', expires:60 });
            $.cookie("firstTimeDashboard", true, { path: '/', expires:60 });
            if(loginCheck){
                $.cookie("userName", userName, { path: '/', expires:60 });
            } else {
                $.cookie("userName", "", { path: '/', expires:60 });
            }
        }
    };

});