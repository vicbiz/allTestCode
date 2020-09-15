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

    var $counterElement = $("#charCounter");
    var $textareaElement = $("#interpretation");
    var maxCt = parseInt($textareaElement.attr("data-maxCt"));
    $textareaElement.limiter(maxCt, $counterElement);

    $counterElement = $("#charCounter-autoFill");
    $textareaElement = $("#autoFillAnswer");
    maxCt = parseInt($textareaElement.attr("data-maxCt"));
    $textareaElement.limiter(maxCt, $counterElement);

    $("form#theForm").on("submit",function(e){
        var clientFacing = $("#clientFacing").val();
        var serviceStandard = $("#serviceStandard").val();

        if(clientFacing === "null") {
            alert("You must select if this standard is client facing!");
            return false;
        }

        if(serviceStandard === "null") {
            alert("You must tag this standard as facility or service!");
            return false;
        }

        return true;

    });

});
