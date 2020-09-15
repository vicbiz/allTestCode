$(function() {
    $(".cancelBtn").on("click", function(e){
        e.preventDefault();
        history.back(1);
    });
});

$(document).ready(function() {
    //$("select").selectpicker({style: 'btn-wt form-control', menuStyle: 'dropdown-inverse'});

    var multipleChoiceDiv = $("#multiple-choice");
    var autoFillDiv = $("#auto-fill");
    var questionType = $("#type");

    toggleMultipleChoice(questionType.val());
    toggleAutoFillAnswer(questionType.val());

    questionType.on("change", function(){
        toggleMultipleChoice($(this).val());
        toggleAutoFillAnswer($(this).val());
    });

    function toggleMultipleChoice(selectedVal) {
        if(selectedVal === "MULTIPLE_CHOICE") {
            multipleChoiceDiv.removeClass("hidden")
        } else {
            multipleChoiceDiv.addClass("hidden")
        }
    }

    function toggleAutoFillAnswer(selectedVal) {
        if(selectedVal === "YES_NO") {
            autoFillDiv.removeClass("hidden")
        } else {
            autoFillDiv.addClass("hidden")
        }
    }    

    $("#archiveStandardLink a").on("click",function(e){
        e.preventDefault();
        var openUrl = $(this).attr("href");
        var title = $(this).attr("data-title");
        fhsAlert('myModal',title+' Standard','NOTE: Do not change the status except while preparing for the new standards year. Changing status during active standards year will cause problems. Are you sure you want to change archive status?','NO','YES', function(result){
            if (result === false) {
                return false;
            } else {
                window.location.href = openUrl;
            }
        });
    });

    var $counterElement = $("#charCounter");
    var $textareaElement = $("#interpretation");
    var maxCt = parseInt($textareaElement.attr("data-maxCt"));
    $textareaElement.limiter(maxCt, $counterElement);

    $counterElement = $("#charCounter-autoFill");
    $textareaElement = $("#autoFillAnswer");
    maxCt = parseInt($textareaElement.attr("data-maxCt"));
    $textareaElement.limiter(maxCt, $counterElement);

});
