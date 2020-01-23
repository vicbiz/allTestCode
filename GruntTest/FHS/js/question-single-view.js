$().ready(function() {
    var saveBtnClicked = false;

    $(window).bind('beforeunload', function() {
        //if(saveBtnClicked === false && $("input.save").length > 0){
            if( saveBtnClicked === false  && (!$(".saveNextBtnGroup input.save").attr("disabled") || $("#notes.ckeditor").closest("form").data('changed')) ) {
                return 'You have not saved the content you entered on this page.';
            }
        //}
    } );



    $("#setNAall").on("click", function(e){

        fhsAlert('myModal',
            'Warning',
            '<p>Setting “N/A to all” will overwrite any answers you have entered, and cannot be undone. Are you sure you want to set N/A to all questions in this section?</p>',
            'CANCEL',
            'YES',
            function(result){
                //console.log("result :"+result);
                if (result == true) {
                    $("#naToAllform").submit();
                } else {
                    return false;
                }
            }
        );
        return false;
    });

    $(".saveNextBtnGroup input.save").on("click", function(){
        saveBtnClicked = true;
    });

    $(".qaSingleView .saveNextBtnGroup input.save").attr('disabled','disabled');

    $(".qaSingleView .nextQuestionLink").on("click", function(e){
        e.preventDefault();

        if($(this).closest('form').data('changed')) {
            var didConfirm = confirm("You have not saved the content you entered on this page.");
            if (didConfirm == true) {
                window.location = $(this).attr("data-link");
            } else {
                return false;
            }
        } else {
            window.location = $(this).attr("data-link");
        }
    });

    $(".qaSingleView  #jumpToQuestion").on("click",function() {
        $(this).select();
    });
    $(".qaSingleView  #jumpToQuestion").keypress(function( event ) {
        if ( event.which == 13 ) {
            var isNum = $("#jumpToQuestion").val().replace(/[^\d\.]/g, '')
            var maxNum = parseInt($(".qNavTotal").html());

            if(isNum !== "" && isNum <= maxNum){
                window.location = $(this).attr("data-link")+(isNum);
            } else {
                //console.log("NO Number enter pressed, isNum:"+isNum);
            }
        }
    });


});