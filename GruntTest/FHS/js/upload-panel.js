$().ready(function() {
    //$("select").selectpicker({style: 'btn-wt form-control', menuStyle: 'dropdown-inverse'});
    $('[data-toggle="checkbox"]').each(function () {
        $(this).checkbox();
    });


    var unlockAllSubmit = function(){
        var activeFormCount = $(".filePanelWrap form input.save:enabled").length;
        if(activeFormCount > 0){
            $("#saveAll").removeAttr("disabled");
        } else {
            $("#saveAll").attr("disabled","disabled");
        }
    };

    var unlockAllSaving = function(){
        var activeFormCount = $(".filePanelWrap form input.save:enabled").length;
        if(activeFormCount > 0){
            $("#saveAll").val("Saving ....").removeAttr("disabled");
        } else {
            $("#saveAll").val("Save All").attr("disabled","disabled");
        }
    };

    $("#saveAll").on("click", function(e){
        e.preventDefault();
        $(".filePanelWrap form input.save:enabled").each(function(){
            $(this).trigger("click");
        });
        // $("#saveAll").attr("disabled","disabled");
    });



    $(".filePanelWrap .cancel").on("click", function(e){
        e.preventDefault();
        var didConfirm = confirm("Are you sure you want to discard this change?");
        if (didConfirm == true) {
            $(this).closest("form")[0].reset();
            var $sectionSelect = $(this).closest("form").find("select");
            var sectionName = $($sectionSelect).parent().attr("data-section");
            $(this).closest("form").find("select option[value='"+sectionName+"']").prop('selected', true);
            $(this).closest("form").find("select").selectpicker('render');
            $(this).closest("form").find("input.save, input.cancel").attr('disabled','disabled');
        }
        unlockAllSubmit();
    });


    $(".uploaderFormBlock form input#description").keyup(function(){
        $(this).removeClass("error");
    });
    $(".filePanelWrap .save").on("click", function(e){
        e.preventDefault();

        if($(this).closest("form").find("#description").val() === ""){
            $(this).closest("form").find("#description").focus().addClass("error");
            return false;
        }

        var $this = $(this);
        var uploadUrl = "/evaluationFile/updateEvaluationImage/";
        if($(".uploaderFormBlock.attachment").length > 0){
            uploadUrl = "/evaluationFile/updateEvaluationAttachment/";
        }
        $($this).attr("value","Saving");

        unlockAllSaving();
        $.ajax( {
            type: "POST",
            url: uploadUrl,
            data: $(this).closest("form").serialize(),
            success: function( response, statusText, xhr, form ) {
                setTimeout(function() {
                    $($this).attr("value","Save");
                    $($this).attr('disabled','disabled');
                    $($this).parent().find("input.cancel").attr('disabled','disabled');
                    unlockAllSaving();
                }, 1000);
            }
        });
    });
    $(".filePanelWrap .xBtnWrap").on("click", function(e){
        e.preventDefault();
        var $this = $(this);

        var didConfirmTxt = "Are you sure you want to delete this photo?";
        var deleteUrl = "/evaluationFile/deleteEvaluationImage/";
        if($(".uploaderFormBlock.attachment").length > 0){
            didConfirmTxt = "Are you sure you want to delete this attachment?";
            deleteUrl = "/evaluationFile/deleteEvaluationAttachment/";
        }
        var didConfirm = confirm(didConfirmTxt);
        if (didConfirm == true) {
            $.ajax( {
                type: "POST",
                url: deleteUrl,
                data: $(this).closest("form").serialize(),
                success: function( response, statusText, xhr, form ) {
                    $($this).closest(".filePanelWrap").remove();
                }
            });
        } else {
            return false;
        }
    });



    if($(".attachDownloadLink").length > 0){
        $('.attachDownloadLink a').autoShorten(33);
    }


    $(window).bind('beforeunload', function() {
        var totalSaveBtnCount  = $("input.save").length;
        var disabledCount = $("input.save[disabled]").length;
        if(disabledCount < totalSaveBtnCount){
                return 'You have not saved the content you entered on this page.';
        }
    } );


    var activateButtons = function($this){
        $this.closest('form').data('changed', true);
        $this.closest('form').find("input").removeAttr("disabled");
        unlockAllSubmit();
    };

    $("form :input").change(function() {
        var $this = $(this);
        activateButtons($this);
    });

    $("form textarea").keyup(function() {
        var $this = $(this);
        activateButtons($this);
    });

    $("form input").keyup(function() {
        var $this = $(this);
        activateButtons($this);
    });
});