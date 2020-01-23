    $().ready(function() {

        $("#submitEvaluationApprovedNotPublished").on("click", function(ev){
            ev.preventDefault();
            var $this = $(this);
            var $link = $("#submitEvaluationApprovedNotPublished").attr("href");
            var modalId = "myModal";
            var modalTitle = "Are you sure?";
            var modalContent = "Are you sure you want to approve this evaluation report?";
            var noTxt = "Exit without approving";
            var yesTxt = "Approve Evaluation Report";
            ev.stopImmediatePropagation();
            fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){
                if (result === false) {
                    return false;
                } else {
                    window.location.href = $link;
                }
            });
        });

        $("#submitEvaluationApprovedPublished").on("click", function(ev){
            ev.preventDefault();
            var $this = $(this);
            var $link = $("#submitEvaluationApprovedPublished").attr("href");
            var modalId = "myModal";
            var modalTitle = "Are you sure?";
            var modalContent = "Are you sure you want to publish this evaluation report?";
            var noTxt = "Exit without publishing";
            var yesTxt = "Publish Evaluation Report";
            ev.stopImmediatePropagation();
            fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){
                if (result === false) {
                    return false;
                } else {
                    window.location.href = $link;
                }
            });
        });


        // Show/Hide Header Site Brand Div
        $("#hideHeaderTop").click(function() {
            $("#headerBlock" ).slideToggle( "slow", function() {
                if($("#headerBlock").is(':visible')){
                    $.cookies.set("headerTop", "shown");
                    $("#hideHeaderTop").text("-");
                    $("#headerBlock").removeClass('hidden');
                } else {
                    $("#headerBlock").removeClass('hidden');
                    $.cookies.set("headerTop", "hidden");
                    $("#hideHeaderTop").text("+");
                }
            });
        });
        //console.log("cookie1 :"+ $.cookies.get("headerTop"));
        if( typeof $.cookies.get("headerTop") === "undefined" || $.cookies.get("headerTop") === null || $.cookies.get("headerTop") === "" ){
            $.cookies.set("headerTop", "shown");
            $.cookies.setOptions({expiresAt: null});
        //console.log("cookie2 :"+ $.cookies.get("headerTop"));
        }

        // Expand More/Less function for Answer Note
        $(".evalNoteText").expander({
            slicePoint: 540,
            expandText: '&nbsp;&nbsp;&nbsp; MORE',
            expandPrefix: '… ',
            userCollapseText: '&nbsp;&nbsp;&nbsp; LESS',
            userCollapsePrefix: ' '

        });

        // Total Evaluation Progress Bar - Text Help toggle
        $("#evalTotalProgressBar, #evalTotalProgressTxt").on('click', function(){
            $("#evalTotalProgressBar").toggle();
            $("#evalTotalProgressTxt").toggle();
        });


        var showFlyingoutSubMenu = function($this,$targetSubmenu){
            $("#leftIconMenuBlock .iconMenu").removeClass("active");
            $this.addClass("active")
            $("#leftFlyOutMenu .flyOutMenu").hide();
            $($targetSubmenu).show();
        };
        if($("#leftIconMenuBlock .iconMenu.active").length == 0){
            $("#leftIconMenuBlock .iconMenu:first-child").addClass("active");
        }

        if (window.location.pathname.indexOf("showPhotoUploader") > 0){
            $("#leftIconMenuBlock .iconMenu").removeClass("active");
            $("#leftIconMenuBlock #menu-2").addClass("active")
        }
        if (window.location.pathname.indexOf("showAttachmentUploader") > 0){
            $("#leftIconMenuBlock .iconMenu").removeClass("active");
            $("#leftIconMenuBlock #menu-4").addClass("active")
        }



        //**** initial Scroll Fix for Section Title & Sidebar Menu Loding time
//        if($('#leftIconMenuBlock, #leftFlyOutMenu').length > 0){
//            $('#leftIconMenuBlock, #leftFlyOutMenu').scrollToFixed();
//        }
//        if($('#sectionTitleBlock').length > 0){
//            $('#sectionTitleBlock').scrollToFixed({
//                    preFixed: function() {
//                        $("#leftMenuWrap").css('z-index',"0");
//                        $("#leftFlyOutMenu").css('top',"0");
//                    }
//                    ,postFixed: function() {
//                        $("#leftFlyOutMenu").css('top',"0");
//                    }
//                }
//            );
//        }

        var initSectionTitleFixedPosition = function(){
//            if($('#leftIconMenuBlock, #leftFlyOutMenu').length > 0){
//                $('#leftIconMenuBlock, #leftFlyOutMenu').trigger('detach.ScrollToFixed');
//                $('#leftIconMenuBlock, #leftFlyOutMenu').scrollToFixed();
//            }
//
//            if($('#sectionTitleBlock').length > 0){
//                $('#sectionTitleBlock').trigger('detach.ScrollToFixed');
//                $('#sectionTitleBlock').scrollToFixed({
//                        preFixed: function() {
//                            $("#leftMenuWrap").css('z-index',"0");
//                            $("#leftFlyOutMenu").css('top',"0");
//                        }
//                        ,postFixed: function() {
//                            $("#leftFlyOutMenu").css('top',"0");
//                        }
//                    }
//                );
//            }
        };

        var resizeFlyoutCloseView = function(){

            $("#mainContentArea").removeClass("col-md-8").addClass("col-md-11");
            $("#mainContentArea").removeClass("col-sm-7").addClass("col-sm-11");

//            $("form.commentForm fieldset.buttons").removeClass("col-sm-12").addClass("col-sm-9");
//            $("#mainContentArea .commentViewFrame .commentText").removeClass("col-sm-7").addClass("col-sm-5");
//            $("#mainContentArea .commentViewFrame .col-sm-offset-1").removeClass("col-sm-offset-1").addClass("col-sm-offset-2");
//            $(".commentAdd").removeClass("col-sm-offset-2").addClass("col-sm-offset-3");
//            $("form.commentForm .col-sm-11").removeClass("col-sm-11").addClass("col-sm-9");
            $(".commentViewFrame").removeClass("sizeN");
        };





        var updateCurrentSection = function(){
            var sId = $("#leftFlyOutMenu").attr("data-currentSectionId");
            $(".sectionListMenu [data-sectionId='"+sId+"']").addClass("currentSection");
        };


        $("body").on("click", "#leftIconMenuBlock .iconMenu", function(e) {
            e.preventDefault();

            var $this = $(this);
            var subMenu = $this.attr("id")+"-1";
            var $targetSubmenu = $("#"+subMenu);
            var isActive = $($this).hasClass("active");
//            var app = $("body").attr("id").replace("app","");
            var app = "/";
            var eId = $("#leftFlyOutMenu").attr("data-evaluationId");
            var sId = $("#leftFlyOutMenu").attr("data-currentSectionId");
            var isOriginal = $this.attr("data-original");

            if(subMenu == "menu-2-1"){
                var originalParam = "";
                if(isOriginal){
                    originalParam = "?originalEvaluation=true";
                }
                $.ajax( {
                    type: "GET",
//                    url: "/"+app+"/sectionList/photo/"+eId,
                    url: "/sectionList/photo/"+eId+originalParam,
                    success: function( response ) {
                        $("#leftFlyOutMenu #menu-2-1").html(response);
                        if($(".uploaderFormBlock.photo").length > 0){
                            updateCurrentSection();
                        }
                    }
                } );
            }


            if(subMenu == "menu-3-1"){
                var originalParam = "";
                if(isOriginal){
                    originalParam = "&originalEvaluation=true";
                }
                $.ajax( {
                    type: "GET",
                    url: "/evaluationComment/getSectionCommentHeader?evaluationId="+eId+originalParam,
                    success: function( response ) {
                        $("#leftFlyOutMenu #menu-3-1").html(response);
                        if (window.location.pathname.indexOf("showSectionComments") > 0){
                            updateCurrentSection();
                        }
                    }
                } );
            }

            if(subMenu == "menu-4-1"){
                var originalParam = "";
                if(isOriginal){
                    originalParam = "?originalEvaluation=true";
                }
                $.ajax( {
                    type: "GET",
                    url: "/sectionList/attachment/"+eId+originalParam,
                    success: function( response ) {
                        $("#leftFlyOutMenu #menu-4-1").html(response);
                        if($(".uploaderFormBlock.attachment").length > 0){
                            updateCurrentSection();
                        }
                    }
                } );
            }



            if($("#leftFlyOutMenu").is(":hidden")){
                $("#leftFlyOutMenu").show("slow", function(){
                    showFlyingoutSubMenu($this,$targetSubmenu);
                    $("#flyOutCloseBtn").show();
                    initSectionTitleFixedPosition();
                });

                $("#mainContentArea").removeClass("col-md-11").addClass("col-md-8");
                $("#mainContentArea").removeClass("col-sm-11").addClass("col-sm-7");

//                $("form.commentForm fieldset.buttons").removeClass("col-sm-9").addClass("col-sm-12");
//                $("#mainContentArea .commentViewFrame .commentText").removeClass("col-sm-5").addClass("col-sm-7");
//                $("#mainContentArea .commentViewFrame .col-sm-offset-2").removeClass("col-sm-offset-2").addClass("col-sm-offset-1");

//                $(".commentAdd").removeClass("col-sm-offset-3").addClass("col-sm-offset-2");
//                $("form.commentForm .col-sm-9").removeClass("col-sm-9").addClass("col-sm-11");
                $(".commentViewFrame").addClass("sizeN");

            } else {
                if(isActive){
                    $("#leftFlyOutMenu .flyOutMenu").hide();
                    if($("#leftFlyOutMenu").next().html() === ""){
                        $("#leftFlyOutMenu").next().hide();
                    }
                    $("#leftFlyOutMenu").hide("slow", function(){
                        resizeFlyoutCloseView();
                        initSectionTitleFixedPosition();
                    });
                } else {
                    showFlyingoutSubMenu($this,$targetSubmenu);
                }
            }
        });

        $("#flyOutCloseBtn").click(function(e) {
            e.preventDefault();
            $("#leftFlyOutMenu .flyOutMenu, #flyOutCloseBtn").hide();
            $("#leftFlyOutMenu").hide("slow", function(){
                resizeFlyoutCloseView();
                initSectionTitleFixedPosition();
            });
        });

        $("#leftIconMenuBlock .iconMenuInfo").click(function(e) {
            e.preventDefault();
            var modalId = "myModal";
            var modalTitle = "Info";
            var modalContent = $("#leftFlyOutMenu #menu-5-1").html();
            var noTxt = "";
            var yesTxt = "CLOSE";
            e.stopImmediatePropagation();
            fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){
            });
        });

        var popPanel = $.urlParam('popPanel');

        if(popPanel){
            $("#leftIconMenuBlock div[data-panel='"+popPanel+"']").trigger("click");
        } else {
            if($("#mainContentArea.qaListView").length > 0){
                $("#leftIconMenuBlock div[data-panel='section']").trigger("click");
            } else {
                if($("#evaluatorInstructionsContent").length > 0 && $("#evaluatorInstructionsContent").attr("data-sectionprogess") == "0.0"){
                    $("#leftIconMenuBlock div[data-panel='section']").trigger("click");
                }
            }
        }


        $(".questionHelpIcon").on("click", function(){
            var $targetHelpContent = $(this).parentsUntil(".questionHeaderBlock").parent().find(".questionHelpText");
            $($targetHelpContent).slideToggle("fast");
        });

        if($("#flashShowMessage .evaluationCompleted").length > 0){
            var modalId = "myModal";
            var modalTitle = "Evaluation Completed";
            var modalContent = "You have completed the evaluation! <br/>Select a section to review or click the Submit button to send your evaluation to the editor.";
            var noTxt = "";
            var yesTxt = "CLOSE";
            fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){
            });
        }

        var hideShowNotes = function(){
            $('.evalNotes').each(function () {
                var notesVal = $(this).find(".evalNoteText").html();
                if(typeof notesVal !== "undefined"){
                    if(notesVal.trim() === ""){
                        $(this).parent().find(".evalNoteTitle").hide();
                        $(this).parent().find(".evalNoteText").hide();
                    } else {
                        $(this).parent().find(".evalNoteTitle").show();
                        $(this).parent().find(".evalNoteText").show();
                    }
                }
            });
        };

        hideShowNotes();











        // Question Commenting ******************************************************************
        var updateCommentList = function($targetFrame, app, qId, eId, cDisabled, fromWhere){
            var paramOriginalEvaluation = "";
            if($(".originalEvaluation").length > 0){
                paramOriginalEvaluation = "&originalEvaluation=true";
            }
            $.ajax({
                type: 'GET',
//                url: '/'+app+'/evaluationComment/listByQuestion?questionId='+qId+"&evaluationId="+eId,
                url: '/evaluationComment/listByQuestion?questionId='+qId+"&evaluationId="+eId+paramOriginalEvaluation+"&isCommentingDisabled="+cDisabled,
                dataType: 'html',
                success: function (data, textStatus) {
                    $(".commentTextField").val("");
                    $($targetFrame).find('.commentList').html(data);

                    var iconSrc = "";
                    var targetCommentCount = $($targetFrame).find(".commentList .row").length;

                    if(targetCommentCount > 0){
                        $($($targetFrame).parent().find('.viewComment a')).html("VIEW COMMENTS ("+targetCommentCount+")").removeClass("addComment").addClass("viewComment");
                        iconSrc = $($targetFrame).parent().find('.commentIcon img').attr("src");
                        iconSrc = iconSrc.replace("icon-add-commnet.png","icon-view-commnet.png");
                        $($targetFrame).parent().find('.commentIcon img').attr("src",iconSrc);
                    } else {
                        $($($targetFrame).parent().find('.viewComment a')).html("ADD COMMENT").removeClass("viewComment").addClass("addComment");
                        iconSrc = $($targetFrame).parent().find('.commentIcon img').attr("src");
                        iconSrc = iconSrc.replace("icon-view-commnet.png","icon-add-commnet.png");
                        $($targetFrame).parent().find('.commentIcon img').attr("src",iconSrc);
                    }


//                    $(".commentText.editable").editable("/"+app+"/evaluationComment/update?questionId="+qId+"&evaluationId="+eId, {
                    $(".commentText.editable").editable("/evaluationComment/update?questionId="+qId+"&evaluationId="+eId, {
                        indicator : 'Saving...',
                        tooltip   : 'Click to edit...',
                        data    : function(string) {
                            string = string.replace(/<br\s*[\/]?>/gi, "\n");

                            return $.trim(string)
                        },
                        type      : "autogrow",
                        submit    : 'OK',
                        cancel    : 'Cancel',
                        tooltip   : "Click to edit...",
                        onblur    : "ignore",
                        name      : "text",
                        onsubmit: function(settings, td) {
                            $(".commentViewFrame .commentList .row .commentText").html("");
//                            updateCommentList($targetFrame, app, qId, eId, "submit");
                        },
                        callback : function(value, settings) {
//                            var json = $.parseJSON(value);
                            $(".commentViewFrame .commentList .row .commentText").html("");
                            updateCommentList($targetFrame, app, qId, eId, cDisabled, "submit");
                        },
                        autogrow : {
                            lineHeight : 36,
                            minHeight  : 32
                        }
                    });

                    /* Add Delete Comment Button */
                    $('.commentText').on('click', function() {
                        var $this = $(this);
                        if($($this).find('.cmtDelete').length === 0){
                            $($this).find('form').append('<button type="delete" class="cmtDelete">Delete</button>');
                            $($this).find('form button').addClass('btn btn-default');
                        }
                    });
                    /* ************************ */


                    $(".commentText").each(function(){
                        var newHtml = $(this).html().replace(/\n/g, "<br/>");
                        //newHtml = newHtml.replace(/<br\/>/g, " ");
                        newHtml = newHtml.replace(/<br\s*[\/]?>/, "");
                        $(this).html(newHtml);
                    });


                    if($($targetFrame).css('display') == 'none' || fromWhere == "commentTextField"){
                        $($targetFrame).slideToggle("fast");
                    }
                },
                error: function (xhr, err, e) {
                }
            });
        };



        /**************** Delete Comment  ****************/
        $("body").on("click",".cmtDelete",function(e){
            e.preventDefault();

            var cmtId = $(this).parentsUntil(".commentText").parent().attr("id");
            var $this = $(this).parentsUntil('.evalNotes').parent().find(".commentViewLink");

            var $targetFrame = $(this).parentsUntil('.evalNotes').parent().find(".commentViewFrame");


            var qId = $($this).attr("qId");
            var eId = $($this).attr("eId");
            var cDisabled = $($this).attr("cDisabled");
            var app = $("body").attr("id").replace("app","");
//            var app = $($this).attr("data-app");

            var modalId = "confirm";
            var modalTitle = "Delete Comment";
            var modalContent = "Are you sure you want to delete this comment?";
            var noTxt = "No";
            var yesTxt = "Yes";

            e.stopImmediatePropagation();

            fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){
                if (result === false) {
                    return false;
                } else {
                    $.ajax( {
                        type: "POST",
//                        url: "/"+app+"/evaluationComment/delete?questionId="+qId+"&evaluationId="+eId+"&id="+cmtId,
                        url: "/evaluationComment/delete?questionId="+qId+"&evaluationId="+eId+"&id="+cmtId,
                        //data: $targetForm.serialize(),
                        success: function( response ) {
                            updateCommentList($targetFrame, app, qId, eId, cDisabled, "submit");
                        }
                    } );
                }
            });
            return false;
        });
        /**************** Delete Comment End ****************/



        $(".commentViewLink").click(function(e) {
            e.preventDefault();

            var $this = $(this);
            var $targetFrame = $this.parentsUntil('.evalNotes').parent().find(".commentViewFrame");
            var qId = $($this).attr("qId");
            var eId = $($this).attr("eId");
            var cDisabled = $($this).attr("cDisabled");
            var app = $("body").attr("id").replace("app","");
//            var app = $(this).attr("data-app");
            $($this).parentsUntil('.evalNotes').parent().find(".editViewFrame").hide();

            if($($this).hasClass("addComment")){
                $(".commentTextField").val("");
            }
            if($($this).hasClass("viewComment")){
                $(".commentTextField").val("");
                updateCommentList($targetFrame, app, qId, eId, cDisabled, "viewLink");
            }

            $(".commentViewFrame").not($targetFrame).slideUp();
            $($targetFrame).slideToggle("fast", function(){
                if($("#leftFlyOutMenu").is(":visible") && $(".commentViewFrame").is(":visible")){
                    $(".commentViewFrame").addClass("sizeN");
//                    $("#mainContentArea .commentViewFrame .commentText").removeClass("col-sm-5").addClass("col-sm-7");
//                    $("#mainContentArea .commentViewFrame .col-sm-offset-2").removeClass("col-sm-offset-2").addClass("col-sm-offset-1");
                }
                $($targetFrame).find(".commentTextField").focus();
            });
        });


        $(".commentViewFrame .commentAdd .submitcommentBtn").click(function(e) {
            e.preventDefault();

            var $this = $(this);
            var $targetFrame = $($this).parentsUntil('.evalNotes').parent().find(".commentViewFrame");
            var qId = $($this).attr("qId");
            var eId = $($this).attr("eId");
            var cDisabled = $($this).attr("cDisabled");
            var app = $("body").attr("id").replace("app","");
            var $targetForm = $(this).closest("form");
            var $commentField = $($targetForm).find(".commentTextField");

            if($($commentField).val() == ""){
                $($commentField).addClass("error");
                return false;
            } else {
                $.ajax( {
                    type: "POST",
//                    url: "/"+app+"/evaluationComment/save",
                    url: "/evaluationComment/save",
                    data: $targetForm.serialize(),
                    success: function( response ) {
                        updateCommentList($targetFrame, app, qId, eId, cDisabled, "submit");
                    }
                } );
            }

        });

        if($("#notes").length > 0){
            CKEDITOR.on('instanceReady', function(event) {
                var editor = event.editor;
                if(typeof(editor) !== 'undefined') {
                    editor.focus();
                    var element = editor.document.getBody();
                    var range = editor.createRange();
                    if(range) {
                        range.moveToElementEditablePosition(element, false);
                        range.select();
                    }
                    // refocus to have cursor for PC Chrome
                    editor.document.on('click', function(){
//                        console.log("reFocused2");
                        editor.focus();
                    });
                }
            });
        }



        $("body").on("click",".makeCommentRead", function(){
            var $this = $(this);
            var app = $("body").attr("id").replace("app","");
            var qId = $($this).attr("qId");
            var eId = $($this).attr("eId");
            $.ajax( {
                type: "POST",
//                url: "/"+app+"/evaluationComment/markAllAsRead?questionId="+qId+"&evaluationId="+eId,
                url: "/evaluationComment/markAllAsRead?questionId="+qId+"&evaluationId="+eId,
                success: function( response ) {
                    $($this).hide();
                    $($this).parentsUntil(".evalNotes").parent().find(".commentIconNew").hide();
                }
            } );
        });


        $("body").on("change","#feViewCommentCheckBox", function(){
            var app = $("body").attr("id").replace("app","");
            var eId = $(this).attr("data-eId");
            $.ajax( {
                type: "POST",
//                url: "/"+app+"/evaluationComment/toggleEvaluatorAccessToCommentsReport?evaluationId="+eId+"&canEvaluatorAccessCommentsReport="+$(this).prop('checked'),
                url: "/evaluationComment/toggleEvaluatorAccessToCommentsReport?evaluationId="+eId+"&canEvaluatorAccessCommentsReport="+$(this).prop('checked'),
                success: function( response ) {
                }
            } );
        });





    });


    var sectionAnswerJS = function(){


        // elapsed format & Validation
        if($(".qAnswerChoice .elapsedTime").length > 0){
            $(".qAnswerChoice .elapsedTime input").each(function(){
                var inputVal = parseInt($(this).val());
                if(inputVal === ''){ inputVal = 0; }
                if(inputVal < 10){
                    var tempVal = "0"+inputVal;
                    $(this).val(tempVal);
                }
            });

            $(".qAnswerChoice .elapsedTime input").on("click", function () {
                $(this).select();
            });
            $(".qAnswerChoice .elapsedTime input").on("blur", function (e) {
                var $this = $(this);
                var inputVal = parseFloat($(this).val());
                var maxLimit = 59;

                if(inputVal === ''){ inputVal = 0; }
                if($(this).hasClass("elapsedTimeHour")){ maxLimit = 23; }
                if(inputVal >= 0 && inputVal <= maxLimit){
                    if(inputVal*10%10 !== 0) {
                        alert("Invalid time format");
                        $($this).addClass("error");
                        setTimeout(function () {
                            $($this).focus().select();
                        }, 50);
                    } else {
                        if(inputVal < 10){
                            var tempVal = "0"+parseInt($(this).val());
                            $(this).val(tempVal);
                        }
                    }
                } else {
                    alert("Invalid time");
                    $($this).addClass("error");
                    setTimeout(function () {
                        $($this).focus().select();
                    }, 50);
                }
            });
        }




        // Currency Amount Answer
        if($("select.currencyAmount").length > 0){
            //$(".currencyAmount").selectpicker({style: 'btn-primary', menuStyle: 'dropdown-inverse'});
            $(".currencyAmountBlock input.currencyAmountNumber").on("click", function () {
                $(this).select();
            });
            $(".currencyAmountBlock input.currencyAmountNumber").on("blur", function (e) {
                var $this = $(this);
                var inputStr = $(this).val();
                var inputVal = parseFloat(inputStr);
                var intRegex = /^\d+$/;
                var floatRegex = /^((\d+(\.\d *)?)|((\d*\.)?\d+))$/;

                if(intRegex.test(inputStr) || floatRegex.test(inputStr)) {
                } else {
                    alert("Invalid Currency Format.");
                    $($this).addClass("error");
                    setTimeout(function () {
                        $($this).focus().select();
                    }, 50);
                }

            });
        }


        // Adjust Selected Style for Back button pressed -- begin
        if($("#qFormBlock .qAnswerChoice .yesNoBlock").length > 0) {
            var $onloadYNBlockObj  = $("#qFormBlock .qAnswerChoice .yesNoBlock label.radio.checked input");
            var onloadYNSelected   = parseInt($onloadYNBlockObj.attr("value"));
            var onloadYNSelectedId = $onloadYNBlockObj.attr("id");
            var $onloadYNSelectedObj = $onloadYNBlockObj.parentsUntil(".answerSelect").parent();
            var $onloadNAobj = $("#qFormBlock .qAnswerChoice .yesNoBlock label.radio.checked input#noAnswer");

//            console.log("onloadYNSelectedId :"+onloadYNSelectedId);
//            console.log("onloadYNSelected :"+onloadYNSelected);
//            $onloadYNSelectedObj.css("border","3px solid #ff0000");

            $("#qFormBlock .qAnswerChoice .yesNoBlock .answerSelect").removeClass("bgClassYes bgClassNo bgClassNA");

            if($onloadNAobj.length > 0){
                $onloadNAobj.parentsUntil(".answerSelect").parent().addClass("bgClassNA");
                $("#qFormBlock .qAnswerChoice .yesNoBlock .radio.checked").removeClass("checked");
                $onloadNAobj.parent().addClass("checked");
            } else {
                if(onloadYNSelected === 1){ $onloadYNSelectedObj.addClass("bgClassYes"); }
                if(onloadYNSelected === 2){ $onloadYNSelectedObj.addClass("bgClassNo"); }
                $onloadYNSelectedObj.parent().addClass("checked");
            }
        }
        /////////////////////////////////////////////////////////////////////



        $("body").on("click",".qAnswerChoice .answerSelect, .qAnswerChoice .answerSelect, .qAnswerChoice li, .qAnswerChoice .postStaySelect label.radio, .qAnswerChoice span input", function(){
            $(this).closest('form').data('changed', true);
            $(".saveNextBtnGroup input.save, .saveNextBtnGroup input.cancel").removeAttr('disabled');

            var $target = $(this);

            var checkedRadioCt = 0;
            if($($target).hasClass("bgClassYes") || $($target).hasClass("bgClassNo")){
                checkedRadioCt = 1;
            }

            if(checkedRadioCt === 0){
                $.each($('.qAnswerChoice .answerSelect'), function(index,answerEl){
                    $(this)[0].className = $(this)[0].className.replace(/\bbgClass.*?\b/g, '');
                });

                $(".qAnswerChoice .answerSelect .radio.checked").removeClass("checked");
                var val = $($target).find("input").val();
                var answerVal = $.trim($($target).find(".answerValue").html());
                var $NAElement = $($target).closest("form").find("input#noAnswer");
                var $YesNoElement = $($target).closest("form").find("#numericAnswer");

                if(answerVal === "N/A"){
                    answerVal="NA";
                    $($NAElement).val("1").attr("checked","checked");
                    $($NAElement).closest("form").find(".postStaySelect .radio.checked").removeClass('checked');

                    var $parentQBlock = $($NAElement).closest("form").parentsUntil(".qaBlock").parent();
                    var isOpenText = $parentQBlock.find(".multiAnswerText[data-qtype='OPEN_TEXT']").length;

                    if($target.find(".openTextOnlyNA").length > 0){
                        isOpenText = 1;
                    }
                    // console.log("isOpenText:"+isOpenText);

                    if(isOpenText > 0){
                        for(var i in CKEDITOR.instances) {
                            CKEDITOR.instances[i];
                            CKEDITOR.instances[i].name;
                            CKEDITOR.instances[i].value;
                            CKEDITOR.instances[i].setData('');
                            CKEDITOR.instances[i].updateElement();
                            CKEDITOR.instances[i].on('key', function () {
                                $($NAElement).closest("form").find(".bgClassNA .radio.checked").removeClass("checked");
                                $($NAElement).closest("form").find(".bgClassNA").removeClass("bgClassNA");
                                $($NAElement).closest("form").find("#noAnswer").val("0");
                                $($NAElement).closest("form").find("#noAnswer").removeAttr("checked");
                                CKEDITOR.instances[i].updateElement();
                            });
                        }
                    }

                } else {
                    if(answerVal === "Yes"){
                        $YesNoElement.val("1");
                    }
                    $($NAElement).parentsUntil(".answerSelectNA.bgClassNA").removeClass("bgClassNA");
                    $($NAElement).val("0").removeAttr("checked");
                    $(".editViewFrame").find("#noAnswer").val("0").removeAttr("checked");
                }
                $($target).addClass("bgClass"+answerVal);

                $($target).find("input:radio").prop("checked",true);
                $($target).find("label.radio").addClass("checked");
            }


        });

        //$(".fhsSelect").selectpicker({style: 'btn-default', menuStyle: 'dropdown-inverse'});



        $("#showUnansweredQuestions").on("click", function(e){
            e.preventDefault();
            var evalId=$(this).attr("data-evalId");
            $.ajax( {
                type: "GET",
                url: "/evaluationCMS/showUnanswered/"+evalId,
                success: function( response ) {
                    var modalId = "myModal";
                    var modalTitle = "Unanswered Questions";
                    var modalContent = response;
                    var noTxt = "";
                    var yesTxt = "CLOSE";
                    e.stopImmediatePropagation();
                    fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){
                    });
                }
            } );
        });

    };