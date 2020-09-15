$().ready(function() {

    // ********* Section List View with Edit ***************
    // Edit Answer


    $(window).bind('beforeunload', function() {
        if($(".editViewFrame:visible input.save").length > 0){
            if($(".editViewFrame:visible input.save").attr("disabled") !== "disabled") {
                return 'You have not saved the content you entered on this page.';

            }
        }
    });


    if($("#appEvaluator, #appInternal-App").length > 0) {

        var jumpToUnAnsweredQuestion = function(){
            if($("#appEvaluator .qaBlock.notAnswered, #appInternal-App .qaBlock.notAnswered").length > 0){
                var $notAnswered = $(".qaBlock.notAnswered:first");
                $('html, body').animate({
                    scrollTop: $notAnswered.offset().top -80
                }, 100);

                $(".onlyNotAnsweredItem").show();

            } else {
                $(".onlyNotAnsweredItem").hide();
            }
        };
        setTimeout(function () {
            jumpToUnAnsweredQuestion()
        }, 100);




        var updateNotAnsweredBtn = function(){

            $(".qaBlock.questionHeaderBlock").each(function(){
                if($(this).find(".btnYesNo-No").length > 0) { $(this).addClass("noAnswered"); } else { $(this).removeClass("noAnswered"); }
                if($(this).find(".btnYesNo-Yes").length > 0) { $(this).addClass("YesAnswered"); } else { $(this).removeClass("YesAnswered"); }
                if($(this).find("a.viewComment.commentViewLink").length > 0){ $(this).addClass("hasComment"); } else { $(this).removeClass("hasComment"); }
                if($(this).find(".myFlag").length > 0)      { $(this).addClass("hasMyFlag"); }  else { $(this).removeClass("hasMyFlag"); }
            });

            var filterTerms = [], filterTermsTxt = '.qaBlock', applyFilter = false;

            if($("#showAll").prop("checked")){ applyFilter = true;}
            if($("#onlyNotAnswered").prop("checked")){ filterTerms.push('notAnswered'); applyFilter = true;}
            if($("#NoAnswers").prop("checked")){ filterTerms.push('noAnswered'); applyFilter = true;}
            if($("#YesAnswers").prop("checked")){ filterTerms.push('YesAnswered'); applyFilter = true;}
            if($("#withComments").prop("checked")){ filterTerms.push('hasComment'); applyFilter = true;}
            if($("#myFlags").prop("checked")){ filterTerms.push('hasMyFlag'); applyFilter = true;}

            filterTerms.map(function(filter, idx, arry){
                filterTermsTxt += '.'+filter;
                // if(idx < arry.length-1){
                //     filterTermsTxt += ", ";
                // }
            });

            // console.log("filterTermsTxt :"+filterTermsTxt);

            if(filterTermsTxt == ''){ applyFilter = false; }
            if(applyFilter){
                $(".qaBlock").hide();
                $(filterTermsTxt).show();
            } else {
                $(".qaBlock").show();
            }

            // jumpToUnAnsweredQuestion()
            $('#toTop').trigger("click");
        };
        $("#onlyNotAnswered, #NoAnswers, #YesAnswers, #withComments, #myFlags, #showAll").on("change", function(){
            updateNotAnsweredBtn();
        });
        updateNotAnsweredBtn();





        // if($("#appEvaluator .qaBlock.notAnswered").length > 0){
            $(window).scroll(function(){
                // console.log($(window).scrollTop());
                if ($(window).scrollTop() > 270){
                    $("#onlyNotAnsweredInnerWrap").addClass("fixedPositionFilterBar");
                    // $("#onlyNotAnsweredInnerWrap").css({"top": ($(window).scrollTop()) -230 + "px"});
                } else {
                    $("#onlyNotAnsweredInnerWrap").removeClass("fixedPositionFilterBar");
                    // $("#onlyNotAnsweredInnerWrap").css({"top": ($(window).scrollTop()) +75 + "px"});
                }
            });
        // }



        $('#toTop').on("click",function(e){
            e.preventDefault();
            var percentageToScroll = 100;
            var percentage = percentageToScroll/100;
            var height = $(document).scrollTop();
            var scrollAmount = height * (1 - percentage);

            $('html,body').animate({ scrollTop: scrollAmount }, 'slow', function () {
            });

        });
        $('#toBottom').on("click",function(e) {
            e.preventDefault();
            var percentageToScroll = 100;
            var height = $(document).innerHeight();
            var scrollAmount = height * percentageToScroll/ 100;
            var overheight = $(document).height() - $(window).height();
            $("html, body").animate({scrollTop: scrollAmount}, 900);
        });

    }












    $("#evaluationCMS.internalApp .editAnswer a, #evaluationCMS.evaluator .editAnswer a").on("click", function(e) {
        e.preventDefault();

        var $this = $(this);
        var $targetFrame = $this.parentsUntil('.evalNotes').parent().find(".editViewFrame");
        var targetUrl = $this.attr("href");
        var eId = $this.attr("data-eId");
        var qId = $this.attr("data-qId");
        var $activeAnchor1 = $this.parentsUntil('.questionHeaderBlock').parent();
        var $activeAnchor2 = $this.parentsUntil('.questionHeaderBlock').find(".editAnswer");


        if($(".editViewFrame:visible").length > 0){
            if(!$(".editViewFrame:visible input.save").attr("disabled")) {
                var didConfirm = confirm("You have not saved the content you entered on this page.");
                if (didConfirm == false) {
                    return false;
                } else {
                    for(name in CKEDITOR.instances){
                        if(CKEDITOR.instances[name]){CKEDITOR.instances[name].destroy(true);}
                        $(".editViewFrame").each(function(){ $(this).html("");});
                    }
                }
            }
        }

        for(name in CKEDITOR.instances){
            if(CKEDITOR.instances[name]){CKEDITOR.instances[name].destroy(true);}
        }
        $(".editViewFrame").each(function(){ $(this).html("");});

        $(".editViewFrame:visible").not($targetFrame).hide("fast").html("");
        $this.parentsUntil('.evalNotes').parent().find(".commentViewFrame").hide();

        // Load Edit Content into Div
        // console.log("targetUrl :"+targetUrl);
        $targetFrame.html("");
        $targetFrame.load(targetUrl, function() {
            // Load CKEditor and load Answer Javascript from fhs.js
            var qId = $targetFrame.find("textarea").attr("id");

            var fhsSelectCt = $targetFrame.find(".fhsSelect").length;
            if(fhsSelectCt > 0){
                $(".fhsSelect").selectpicker({style: 'btn-wt form-control', menuStyle: 'dropdown-inverse'});
            }

            if(qId){
                CKEDITOR.replace( qId , {
                    toolbar: [
                        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ], items: [ 'Italic']},
                        { name: 'Redactor', items: [ 'Redactor' ] }
                    ]
                });

                if($("#notes").length === 0){
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
                                editor.focus();
                            });
                        }
                    });
                }
            }


            sectionAnswerJS();

            // Show Loaded Answer Edit Content
            $targetFrame.slideToggle("fast", function(){
                var offsetAdjust = 95;
                if($("#onlyNotAnsweredInnerWrap").hasClass('fixedPositionFilterBar')){
                    offsetAdjust = 55;
                }
                $('html, body').animate({
                    scrollTop: $activeAnchor1.offset().top - offsetAdjust
                }, 100);
            });





            $('[data-toggle="radio"]').each(function () {
                $(this).radio();
            });


            // SAVE Answer Functions
            var $targetSaveBtn  = $targetFrame.find("input.save");
            var $targetCancelBtn  = $targetFrame.find("input.cancel");
            var $targetInput = $targetFrame.find("input");
            var $targetTextarea = $targetFrame.find("textarea");
            var $targetForm  = $targetFrame.find("form");

            $($targetSaveBtn).attr("disabled","disabled");
            $($targetCancelBtn).attr("disabled","disabled");

            $($targetForm).change(function() {
                $($targetForm).data('changed', true);
                $($targetSaveBtn).removeAttr('disabled');
                $($targetCancelBtn).removeAttr('disabled');
            });
            $($targetInput).change(function() {
                $($targetForm).data('changed', true);
                $($targetSaveBtn).removeAttr('disabled');
                $($targetCancelBtn).removeAttr('disabled');
            });

            $("body").on("click",".qAnswerChoice .yesNoBlock .answerSelect, .answerSelectNA .radio, .answerSelect .radio, .qAnswerChoice .answerSelect, .qAnswerChoice li, .qAnswerChoice .postStaySelect label.radio, .qAnswerChoice span input", function(){
                $($targetForm).data('changed', true);
                $($targetSaveBtn).removeAttr('disabled');
                $($targetCancelBtn).removeAttr('disabled');
            });

            $($targetTextarea).keyup(function() {
                var $parentQBlock = $($targetForm).parentsUntil(".qaBlock").parent();
                var isOpenText = $parentQBlock.find(".multiAnswerText[data-qtype='OPEN_TEXT']").length;

                if($parentQBlock.find(".openTextOnlyNA").length > 0){
                    isOpenText = 1;
                }

                if(isOpenText > 0){
                    $targetForm.find("#noAnswer").val("0");
                    $targetForm.find("#noAnswer").removeAttr("checked");
                    $targetForm.find(".answerRadioBtns .answerSelect label.radio").removeClass("checked");
                    $targetForm.find(".answerSelect.bgClassNA").removeClass("bgClassNA");
                }
                $($targetForm).data('changed', true);
                $($targetSaveBtn).removeAttr('disabled');
                $($targetCancelBtn).removeAttr('disabled');
            });


            // Checking Ckeditor Keyup and update Textarea value
            for(var name in CKEDITOR.instances) {
                CKEDITOR.instances[name].on("instanceReady", function() {
                    // Set keyup event
                    this.document.on("keyup", updateValue);
                    // Set paste event
                    this.document.on("paste", updateValue);
                    $(".cke_toolbar").on("click", function(){
                        updateValue();
                    });
                });

                function updateValue() {
                    CKEDITOR.instances[name].updateElement();
                    $('textarea').trigger('keyup');
                }
            }

            // Save Answer AJAX
            $($targetSaveBtn).on("click", function(e) {
                e.preventDefault();
                var $this = $(this);
                var $form = $($this).closest("form");
                var formData = "";

                for(var instanceName in CKEDITOR.instances){
                    CKEDITOR.instances[instanceName].updateElement();
                }

                $.each($('#editAnswerFormBlock form select'), function(index,selectObj){
                    var selectedVal = $(this).val();
                    $(this).find('option[value="'+selectedVal+'"]').prop('selected', true);
                });

                if($($form).find("#noAnswer").val() == 0){
                    formData = $($form).serialize()+"&noAnswer="+$($form).find("#noAnswer").val();
                } else {
                    $form.find("#numericAnswer").val("0");
                    formData = $($form).serialize();
                }


                var $yesNoRadios = $form.find("input:radio");
                var YesNoChecked = false;

                if($form.find(".yesNoBlock").length > 0){
                    $.each($yesNoRadios, function(){
                        if($(this).prop('checked')){
                            YesNoChecked = true;
                        }
                    });
                } else {
                    YesNoChecked = true;
                }


                if(!YesNoChecked){
                    alert("You must select Yes, No or N/A to proceed.");
                } else {

                    $("body").addClass("noScroll");
                    $("body").prepend("<div id='pageLoadingOverlay'><div id='ajaxDataLoading'><span>Saving Data .....</span></div></div>");
                    function blinker() {
                        $('#ajaxDataLoading span').fadeOut(500).fadeIn(500);
                    }
                    setInterval(blinker, 400); //Runs every second


                    $.ajax( {
                        type: "POST",
                        url: "/evaluationResponse/ajaxUpdate?evaluationId="+eId+"&questionId="+qId,
                        data: formData,
                        success: function( response, statusText, xhr, form ) {
                            // Update Question Block with Edited Answer
                            var $targetQ = $($form).parentsUntil(".qaBlock").parent();
                            var $targetE = $($targetQ).find(".evalNoteText");
                            var answerText = "";

                            if($($targetQ).find(".multiAnswerBlock").length === 0){
                                var $targetA = $($targetQ).find(".answerYN");
                                var $targetB = $($targetQ).find(".questionNumber");

                                if(response.noAnswer == true)  {answerText = "N/A"}
                                else if(response.numericAnswer == 1){answerText = "Yes"}
                                else if(response.numericAnswer == 2){answerText = "No"}
                                var $number = $($targetQ).find(".questionNumber");

                                $($targetA).removeClass("btnYesNo-Yes").removeClass("btnYesNo-No").removeClass("btnYesNo-NA").addClass("btnYesNo-"+answerText);
                                $($targetB).removeClass("evalYesNo-Yes").removeClass("evalYesNo-No").removeClass("evalYesNo-NA").addClass("evalYesNo-"+answerText);
                                $($targetA).html(answerText);

                                if(answerText === ""){
                                    $($targetA).removeClass("hidden").addClass("hidden");
                                } else {
                                    $($targetA).removeClass("hidden")
                                }


                            } else {
                                var aTarget = $($targetQ).find(".multiAnswerText");
                                var qType = $(aTarget).attr("data-qtype");
                                var html = $(aTarget).html();
                                var htmlNA = "";
                                if(response.noAnswer == true)  {answerText = "N/A"}

                                if(answerText === "N/A"){
                                    html = "";
                                    htmlNA = '<div class="btnYesNo-N/A btn btn-Rectangle fs1x">N/A</div>';
                                } else {
                                    if(qType === 'ELAPSED_TIME'){
                                        html = $($form).find("#hours").val()+" : "+$($form).find("#minutes").val()+" : "+$($form).find("#seconds").val()+" (H:M:S)";
                                    }
                                    if(qType === 'MULTIPLE_CHOICE'){
                                        html = $($form).find("select#multipleChoice option:selected").text();
                                    }
                                    if(qType === 'CURRENCY_AMOUNT'){
                                        html = $($form).find(".currencyAmount option:selected").val()+" : "+$($form).find(".currencyAmountNumber").val();
                                    }
                                    if(qType === 'OPEN_TEXT' && $("#appInternal-App").length > 0){
                                        html = $($form).find(".notesCkEditor textarea").val();
                                    }
                                    if(qType === 'EMOTIONAL_ENGAGEMENT'){
                                        html = $($form).find("#emotionalEngagement option:selected").text();
                                    }
                                    if(qType === 'POST_STAY'){
                                        html = $($form).find(".postStaySelect .radio.checked").text();
                                    }
                                }
                                $(aTarget).html(html);
                                $($form).parentsUntil(".qaBlock").parent().find(".yesNoNADiv").html(htmlNA);
                            }


                            $($targetE).html(response.notes);
                            $targetFrame.slideToggle("fast");

                            var hideShowNotes = function(){
                                $('.evalNotes').each(function () {
                                    var $this = $(this);
                                    var notesVal = $($this).find(".evalNoteText").html();
                                    if(typeof notesVal !== "undefined"){
                                        if(notesVal.trim() === ""){
                                            $($this).parent().find(".evalNoteTitle").hide();
                                            $($this).parent().find(".evalNoteText").hide();
                                        } else {
                                            $($this).parent().find(".evalNoteTitle").show();
                                            $($this).parent().find(".evalNoteText").show();

                                            $($this).parent().find(".evalNoteText").expander('destroy').expander({
                                                slicePoint: 540,
                                                expandText: '&nbsp;&nbsp;&nbsp; MORE',
                                                expandPrefix: '… ',
                                                userCollapseText: '&nbsp;&nbsp;&nbsp; LESS',
                                                userCollapsePrefix: ' '
                                            });
                                        }
                                    }
                                });
                            };
                            hideShowNotes();

                            $("#ajaxDataLoading, #pageLoadingOverlay").remove();
                            $("body").removeClass("noScroll");

                            $(".editViewFrame:visible input.save").attr("disabled","disabled");

                            for(name in CKEDITOR.instances){
                                if(CKEDITOR.instances[name]){CKEDITOR.instances[name].destroy();}
                            }
                            $targetFrame.html("");
                            // location.reload();

                            $activeAnchor1.removeClass("notAnswered");

                            // jumpToUnAnsweredQuestion();
                            $('html, body').animate({
                                scrollTop: $activeAnchor1.offset().top
                            }, 100);

                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            alert("data submission error, please try again");
                        }

                    } );

                }

            });
















            // Cancel Edit Answer
            var $targetCancelBtn = $targetFrame.find("input.cancel");
            $($targetCancelBtn).on("click", function(e) {
                e.preventDefault();

                if($($targetForm).data('changed')) {
                    var didConfirm = confirm("You have not saved the content you entered on this page.");
                    if (didConfirm === false) {
                        return true;
                    } else {
                        for(name in CKEDITOR.instances){
                            CKEDITOR.instances[name].destroy(true);
                        }
                        // return false;
                    }
                }

                $targetFrame.html("").css("display","none");
            });
        });

    });


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

});