$().ready(function() {

    var datepickerSelector = '#startDate, #endDate, #dueDate, #evaluatorDueDate';
    $(datepickerSelector).datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        dateFormat: "mm-dd-yy",
        yearRange: '-1:+1'
    }).prev('.btn').on('click', function (e) {
            e && e.preventDefault();
            $(datepickerSelector).focus();
    });


    $("body").on("click",".input-group-btn button.calIcon", function() {
        $(this).parent().parent().find("input.hasDatepicker").focus();
    });

    $(datepickerSelector).datepicker('widget').css({'margin-left': -$(datepickerSelector).prev('.btn').outerWidth()});

    //$(".fhsSelectDark").selectpicker({style: 'btn-default', menuStyle: 'dropdown-inverse'});
    //$("#compSetNumber").selectpicker({style: 'btn-wt form-control', menuStyle: 'dropdown-inverse'});

    var checkStandatdYear = function(){

        // Page Loading.................
        pageLoading();

        var $this = $("#standardYear");
        var assetId = $($this).attr("data-assetId");
        var standardYear = $($this).find("option:selected").val();
        $.ajax({
            type: 'GET',
            url: '/evaluation/listEvaluationTypesForAssembly?assetId='+assetId+'&standardYearId='+standardYear,
            dataType: 'json',
            success: function (data, textStatus) {
                var html = '';
                if(data.length > 0){
                    $.each(data, function(i) {
                        html += '<label class="radio col-sm-4"><label class="radio"><input type="radio" id="optionsRadios{'+i+'}" data-toggle="radio" value="'+data[i].id+'" name="evaluationType.id" data-name="'+data[i].name+'"></label>'+data[i].name+'</label>';
                    });
                    $("#selectEvalType").html(html);
                    $('[data-toggle="radio"]').each(function () {
                        $(this).radio();
                    });
                };

                // Remove Page Loading.................
                $('#pageLoadingOverlay').remove();
                $("body").removeClass("noScroll");
            },
            error: function (xhr, err, e) {
            }
        });
    };



    var updateEvalType = function($selected){
        var $this = $selected;
        var selectedId = $($this).find('input').attr('value');
        var selectedName = $($this).find('input').attr('data-name');
        var selectedEvalusation = $(this).text().trim();
        var assetType = $("#evaluationForm").attr("data-assetType");
        var competitive = $("#competitive");
        if(selectedName === "FTG Ratings") {
            competitive.removeClass("hidden");
        } else {
            $("#brandAnalysis").removeAttr("checked");
            $("#brandAnalysis").prop("checked",false);
            $("#brandAnalysis").val("");
            $("#compSetNumber").val("0");
            $("#cpNumberSelect button#compSetNumber .filter-option").text($("#cpNumberSelect ul.dropdown-menu li:first-child").text());
            $("#cpNumberSelect ul.dropdown-menu li").removeClass("selected");
            $("#cpNumberSelect ul.dropdown-menu li:first-child").addClass("selected");
            showCpAssignee();
            competitive.addClass("hidden");
        }



        $(".pickListBlock").prepend("<div id='pickListDataLoading'><span>Loading Data .....</span></div>");
        function blinker() {
            $('#pickListDataLoading span').fadeOut(500).fadeIn(500);
        }
        setInterval(blinker, 400); //Runs every second




        $.ajax({
            type: 'GET',
            url: '/evaluation/listSectionsForEvaluationType?id=' + selectedId + '&assetTypeId=' +assetType,
            dataType: 'html',
            success: function (data, textStatus) {
                $("#selectedEvalTitle").text(selectedEvalusation);
                $("#sections").html(data);
                $('#sections').pickList("destroy");
                $("#sections").pickList({
                    sourceListLabel: 'Available Sections',
                    targetListLabel: "Selected Sections *" ,
                    addAllClass: "btn-dark",
                    addClass: "btn-dark",
                    removeAllClass: "btn-dark",
                    removeClass: "btn-dark",
                    afterAddAll: function() {
                        // to show box in Chrome
                        $(".pickList_list.pickList_sourceList").hide().fadeIn('fast');
                    },
                    afterRemoveAll: function() {
                        // to show box in Chrome
                        $(".pickList_list.pickList_targetList").hide().fadeIn('fast');
                    },
                    afterBuild: function() {
                        //                            alert("after build");
                    }

                });
                $("#pickListDataLoading").remove();
            },
            error: function (xhr, err, e) {
            }
        });
    };




    $( "#standardYear" ).change(function() {
        checkStandatdYear();
        updateEvalType();
    });




    var lockEvalType = true;

    if($(".newEvalForm").length > 0 ){
        lockEvalType = false;
        //            updateEvalType($("#selectEvalType .radio.checked"));
    }


    $('body').on('click','#selectEvalType .radio', function(ev) {
        if($(this).hasClass("disabled")){ return false; }
        var $this = $(this);
        if(lockEvalType){
            if($(".editEvalForm").length > 0){
                var modalId = "myModal";
                var modalTitle = "Are you sure?";
                var modalContent = "Are you sure you want to change Evaluation Type?";
                var noTxt = "No";
                var yesTxt = "Yes";
                ev.stopImmediatePropagation();
                fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){
                    if (result === false) {
                        return false;
                    } else {
                        lockEvalType = false;
                        $($this).trigger("click");
                        updateEvalType($(this));
                    }
                });
            }
        } else {
            updateEvalType($(this));
        }
    });



    var lockStandardYear = true;
    var $standardYearUImenu = $("#standardYear").parent().find(".dropdown-menu li a");

    $($standardYearUImenu).on("click", function(ev){
        var $this = $(this);
        if(lockStandardYear === true){
            if($(".editEvalForm").length > 0){
                var modalId = "myModal";
                var modalTitle = "Are you sure?";
                var modalContent = "Changing the Standards Year will re-set your selected Evaluation Types and Sections below. \n Are you sure you want to change the year?";
                var noTxt = "No";
                var yesTxt = "Yes";
                ev.stopImmediatePropagation();
                fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){
                    if (result === false) {
                        return false;
                    } else {
                        lockStandardYear = false;
                        lockEvalType = false;
                        $($this).trigger("click");
                    }
                });
            }
        } else{
            //                checkStandatdYear();
        }
    });


    $("#topRightActionMenuDropDownCancel").on("click", function(ev){
        ev.preventDefault();
        var $this = $(this);
        var $link = $("#topRightActionMenuDropDownCancel").attr("href");
        var modalId = "myModal";
        var modalTitle = "Cancel Evaluation";
        var modalContent = 'Please provide a short explanation of why you are canceling this evaluation. (i.e. "blown evaluation," "merged with another evaluation," etc.) Maximum Character Limit : 3500<br/><br/><form id="cancelEval" method="post" action="'+$link+'"><textarea maxlength="3500" id="cancelNotes" class="form-control" rows="5" cols="140" placeholder="" name="cancelNotes"/></form>';
        var noTxt = "Exit without Canceling";
        var yesTxt = "Cancel Evaluation";
        ev.stopImmediatePropagation();
        fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){
            if (result === false) {
                return false;
            } else {
                $( "#cancelEval" ).submit();
                //window.location.href = $link;

                /*
                $.ajax({
                    type: "POST",
                    url: $link,
                    data: $("#cancelEval").serialize(),
                    success: function( response, statusText, xhr, form ) {},
                    error: function(jqXHR, textStatus, errorThrown){}
                });
                */

            }
        });
    });



    if($("#selectedEvalTitle").text() == ""){
        var selectedEvalusation = $("#selectEvalType .checked").text().trim();
        $("#selectedEvalTitle").text(selectedEvalusation);
    }

    $("#sections").pickList({
        sourceListLabel: 'Available Sections',
        targetListLabel: "Selected Sections *" ,
        addAllClass: "btn-dark",
        addClass: "btn-dark",
        removeAllClass: "btn-dark",
        removeClass: "btn-dark",
        afterBuild: function() {
            $(".disabled .pickList_controlsContainer button").attr("disabled","disabled");
            $("body").on("click",".disabled .pickList_list li", function(e){
                e.preventDefault();
                return false;
            });
            $(".disabled .pickList_list li").on("dblclick",".disabled .pickList_list li", function(e){
                e.preventDefault();
                return false;
            });
        }
    });


    //$(".fhsDropDown").selectpicker({style: 'btn-default', menuStyle: 'dropdown-inverse'});

    if($(".multiSelectError").length > 0){
        $(".multiSelectError").each(function(){
            $(this).find(".pickList_targetList").addClass("error");
        });
    }

    $("#startDate").on("change",function(){
        var startDate = $.datepicker.parseDate('mm-dd-yy', $("#startDate").val());
        var endDate = $.datepicker.parseDate('mm-dd-yy', $("#endDate").val());
        if((startDate !== null && endDate !== null) && startDate > endDate){
            $("#startDate").addClass("error");
            $("#startDate").parent().find("button").addClass("error");
            alert("Visit End Date has to be after Visit Start Date.");
            //                    $("#startDate").focus();
            //                return false;
        } else {
            $("#startDate").removeClass("error");
            $("#startDate").parent().find("button").removeClass("error");
            //                return true;
        }

    });

    $("#endDate").on("change",function(){
        var startDate = $.datepicker.parseDate('mm-dd-yy', $("#startDate").val());
        var endDate = $.datepicker.parseDate('mm-dd-yy', $("#endDate").val());

        if(endDate === null || endDate === ""){
            return true
        } else {
            if(startDate > endDate || startDate === null){
                //                    $("#startDate").val("").addClass("error");
                $("#startDate").addClass("error");
                $("#startDate").parent().find("button").addClass("error");
            } else {
                $("#startDate").removeClass("error");
                $("#startDate").parent().find("button").removeClass("error");
            }
        }

    });

    $("form#theForm").on("submit",function(e){
        var startDate = $.datepicker.parseDate('mm-dd-yy', $("#startDate").val());
        var endDate = $.datepicker.parseDate('mm-dd-yy', $("#endDate").val());
        var compSetNum = $("#compSetNumber").val();
        var reviewer = $("#compSetReviewer").val();

        if(reviewer == "" && parseInt(compSetNum) > 0) {
            $("#compSetReviewerSelector").addClass("error");
            alert("You must select an Assigned Reviewer when competitive sets are present!");
            return reviewer != "";
        }

        if(endDate !== null && startDate === null){
            $("#startDate").addClass("error");
            $("#startDate").parent().find("button").addClass("error");
            alert("Visit Start Date is required to save Visit End Date");
            $("#startDate").focus();
            return false;
        } else {
            if((startDate !== null && endDate !== null) && startDate > endDate){
                $("#startDate").addClass("error");
                $("#startDate").parent().find("button").addClass("error");
                alert("Visit End Date has to be after Visit Start Date.");
                $("#startDate").focus();
                return false;
            } else {
                var haveError = false;
                $(".AssignableUserType").each(function(){
                    if($(this).val() !== $($(this).attr("data-ref")).attr("data-label")){
                        $(this).addClass("error");
                        haveError = true;
                    }
                });
                if (haveError === true ){
                    return false;
                }
                else{
                    return true;
                }

            }
        }
    });



    //Auto Run when Page Load

    var unDisableSaveButton = function(){
        $("#evaluationForm #submitButtons input#create").removeAttr("disabled");
        $("#evaluationForm #submitButtons input#cancel").val("cancel");
    };
    $("#evaluationForm #submitButtons input#create").attr("disabled","disabled");
    $("body").on("change","#evaluationForm input, #evaluationForm textarea, #evaluationForm select", function(){
        unDisableSaveButton();
    });
    $("body").on("dblclick",".pickList_listContainer", function(){
        unDisableSaveButton();
    });
    $("body").on("click",".pickList_controlsContainer:not(.disabled .pickList_controlsContainer)", function(){
        unDisableSaveButton();
    });
    $("body").on("keyup","textarea#notes", function(){
        unDisableSaveButton();
    });


    $("body").on("click", "#evaluationForm #cancel", function(e){
        e.preventDefault();
        if($("#evaluationForm #submitButtons input#create").attr("disabled") !== 'disabled') {
            var didConfirm = confirm("You have not saved the content you entered on this page.");
            if (didConfirm == true) {
                //                    window.location = "/Internal-App/";
                window.location = "/";
            } else {
                return false;
            }
        } else {
            //                window.location = "/Internal-App/";
            window.location = "/";
        }
    });


    $("#viewAssetNotesLink").click(function(e) {
        e.preventDefault();
        var modalId = "myModal";
        var modalTitle = "Asset Notes";
        if($(".excelLinkContent").attr("data-title") !== "" && typeof($(".excelLinkContent").attr("data-title")) !== "undefined"){
            modalTitle = $(".excelLinkContent").attr("data-title");
        }
        var modalContent = $($(this).attr("data-helpContent")).html();
        modalContent = $.nl2br(modalContent, true);
        var noTxt = "";
        var yesTxt = "CLOSE";
        e.stopImmediatePropagation();
        fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){
        });
    });



    var showCpAssignee = function(){
        var compSetReq = $("#compSetRequired");
        var compSetNum = $("#compSetNumber").val() != "" ? parseInt($("#compSetNumber").val()) : 0;

        if(compSetNum > 0) {
            compSetReq.removeClass("hidden");
        } else {
/*
            $("#brandAnalysis").removeAttr("checked");
            $("#brandAnalysis").prop("checked",false);
            $("#brandAnalysis").val("");
*/
            $("#compSetReviewerSelector").val("");
            $("#compSetReviewer").val("");
            compSetReq.addClass("hidden");
        }
    }
    $("#compSetNumber").on("change", function() {
        showCpAssignee();
    });
    showCpAssignee();

    if($("#compSetReviewerSelector").val() === ""){
        $("#compSetReviewer").val("");
    }

});


