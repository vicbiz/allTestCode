$(document).ready(function() {

    if($("#reportApp").length === 0){
        $(".groupPopIcon").each(function(){
            var ct = $(this).attr("data-popData");
            if(!$(this).hasClass("tooltipstered")){
                $(this).tooltipster({
                    //content: $('<span><strong>This text is in bold case !This text is in bold case !This text is in bold case !This text is in bold case !This text is in bold case !</strong></span>'),
                    content: ct,
                    contentAsHTML: true,
                    animation: 'fade',
                    delay: 100,
                    touchDevices: false,
                    maxWidth: 300,
                    trigger: 'hover'
                });
            }
        });
    }


    var interval = null;
    var taskId=$("#cpHeader").attr("data-userid");
    var checkStatus = function(){
        $.ajax( {
            type: "GET",
            url: "/corporateReport/checkAggregationStatus?taskId="+taskId,
            success: function( response ) {
                if(response === "true"){

                    if($(".se-pre-con").is(":visible")){
                        window.location = window.location.href.split("?")[0];
                    } else {
                        $(".se-pre-con").hide();
                        clearInterval(interval); // stop the interval
                    }

                } else {
                    $(".se-pre-con").show();
                }
            }
        } );
    };
    interval = setInterval(function() {
        checkStatus();
    }, 5000); //check every 5 seconds
    checkStatus();






});
