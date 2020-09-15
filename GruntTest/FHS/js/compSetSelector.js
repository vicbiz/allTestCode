$().ready(function(){


    if($("#cpAssetTable").length > 0){

        var getTotalAvailabeSlot = function(){
            var totalSelectedCt = $("#selectedTable").find("div").length;
            var availableSlot = 10-totalSelectedCt;
            return availableSlot;
        };

        var updateSlotMsg = function(){
            var availTotalSlot = getTotalAvailabeSlot();
            $("#selectedBucket td").each(function(){
                var selectedCt = $(this).find(".selectedPropName").length;
                var msg = "&nbsp;";
                var avalTypeCt = 3-selectedCt;
                if(selectedCt > 2){
                    msg = "<span class='sGood'>&nbsp;</span>";
                } else {
                    if(selectedCt > 0 ){
                        msg = "<span class='sError'>Please select at least (3) properties at this rating level.</span>";
                    }
                    if(avalTypeCt > availTotalSlot && selectedCt > 0){
                        msg = "<span class='sError'>Sorry, not enough slots for this selection. <a href='' id='cDetail'>DETAILS</a></span>";
                    }
                }
                $("#"+$(this).attr("id")+"Msg").html(msg);
            })
        }

        var updateBucketMsg = function(ratingType){
            var availableSlot = getTotalAvailabeSlot();
            var selectedCt = $("#selectedTable .selectedPropName").length;
            var msg2 = "<span class='sError'>Minimum is not met.</span>"
            if(selectedCt > 6){
                msg2 = "";
            }
            $("#slotAvailMsg").html("You have selected: "+selectedCt+" (Minimum 7, Maximum 10) "+msg2);

            updateSlotMsg();

            if(selectedCt > 6 && $("#selectedTable .sError").length === 0){
                if(selectedCt === 10){
                    $("#selectedTable .selMsg").each(function(){
                        $(this).html("<span class='sGood'>No more slots available.</span>");
                    });
                }
                $("#btnGroup #cpSubmit").removeClass("disabled");
            } else {
                $("#btnGroup #cpSubmit").removeClass("disabled").addClass("disabled");
            }
            updateBtnMsg();
        };

        var getRating = function(rating){
            if(rating === "Five Star"){ return "5" }
            if(rating === "Four Star"){ return "4" }
            if(rating === "Recommended"){ return "R" }
        };

        var addAssetToBucket = function($this){
            var ratingType = getRating($this.attr("data-rating"));
            var pId = $this.attr("data-ratingId");

            if($("#selectedTable #pId"+pId).length > 0){
                $("#selectedTable #pId"+pId).remove();
            } else {
                var propName = $this.parent().parent().find("td.pName").text();
                var tempHtml = '<div id="pId'+pId+'" class="selectedPropName" data-rating="'+ratingType+'" data-pId="'+pId+'"><span class="removeX">X</span>'+propName+'</div>';
                $("#selectedTable #selection"+ratingType).append(tempHtml);
            }
            updateBucketMsg(ratingType);
        }

        var updateCkBxValForSorting = function($this){
            // var $pObj = $this.parent();
            // var bxVal = $this.attr('checked');
            // var target_row = $this.closest("tr").get(0);
            // var newHtml = $this.parent().html();
            // if(typeof bxVal === 'undefined'){
            //     bxVal = false;
            // }
            // oTable.fnUpdate( newHtml, target_row, 0);
            // $pObj.find("input").attr("checked",bxVal);
            // $pObj.find("input").prop('checked',bxVal);
        }

        var updateBucketOnLoad = function(){
            // console.log("length :"+$("#cpAssetTable .selectCBox").length);
            $("#cpAssetTable .selectCBox").each(function(){
                var newDt = "";
                var ratingType = getRating($(this).attr("data-rating"));
                if($(this).is(':checked')){
                    newDt = "<div class='hidden ckBx'>checked</div>";
                    addAssetToBucket($(this));
                } else {
                    newDt = "<div class='hidden ckBx'></div>";
                }
                $(this).parent().prepend(newDt);
                updateCkBxValForSorting($(this));
                updateBucketMsg(ratingType);
            });
        }


        var getDt = function(){
            var dataList = "";
            var dSize = $("#selectedBucket .selectedPropName").length;
            $("#selectedBucket .selectedPropName").each(function(idx){
                dataList += $(this).attr("data-pId");
                if(idx < dSize-1){
                    dataList += ",";
                }
            });
            //console.log(dataList);
            return dataList;
        }


        var ajaxFormSumit = function(sType){
            var postData = $("#sectedBucketBlock form").serializeArray();
            $.ajax(
                {
                    url : "/compSet/"+sType,
                    type: "POST",
                    data : postData,
                    success:function(data, textStatus, jqXHR)
                    {
                        //console.log("success "+sType);
                        $("#sectedBucketBlock form #cpSave").removeClass("disabled").addClass("disabled");

                        var cpName = $("#compSetMenu .compSetListItem.active .compSet").text();
                        var cpNameInput = $("#cpDisplayName").val();
                        if(cpNameInput.trim() !== ""){
                            cpName += ' ("'+cpNameInput+'")';
                        }

                        if(sType === "submit"){
                            //var cpName = $("#cpName").text();
                            var modalId = "myModal";
                            var modalTitle = "Thank you!";
                            var modalContent = cpName+" has been submitted for review. You will be notified when your Competitive Analysis report is published.<br/><br/>NOTE: Each Competitive Set must be submitted separately";
                            var noTxt = "";
                            var yesTxt = "OK";
                            fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){
                                if(result){
                                    window.location.reload(true);
                                }
                            });
                        } else if(sType === "approve"){
                            //var cpName = $("#cpName").text();
                            var modalId = "myModal";
                            var modalTitle = "Approved";
                            var cpId = $("#sectedBucketBlock form input:hidden[name=compSetId]").val();
                            var evalId = $("#sectedBucketBlock #btnGroup").attr("data-evalid");
                            var modalContent = cpName+" has been approved.<br/><br/> Dashboard URL :  http://"+document.domain+"/compSetReport/dashboard/"+evalId+"/?compSetId="+cpId+"<br/>";
                            var noTxt = "";
                            var yesTxt = "OK";
                            fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){
                                if(result){
                                    window.location.reload(true);
                                }
                            });
                        } else {
                            //var cpName = $("#cpName").text();
                            var modalId = "myModal";
                            var modalTitle = "Competitive Set Saved";
                            var modalContent = cpName+" has been saved successfully.";
                            var noTxt = "";
                            var yesTxt = "OK";
                            fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){
                                if(result){
                                    window.location.reload(true);
                                }
                            });
                        }
                    },
                    error: function(jqXHR, textStatus, errorThrown)
                    {
                        var cpName = $("#compSetMenu .compSetListItem.active .compSet").text();
                        var modalId = "myModal";
                        var modalTitle = "Error";
                        var modalContent = "System couldn't "+sType+" "+cpName+".<br/> Please check list again and try to save again .";
                        var noTxt = "";
                        var yesTxt = "OK";
                        fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){
                            if(result){
                                if(sType === "submit"){
                                    $("#sectedBucketBlock form #cpSave").removeClass("disabled");
                                }
                            } else if(sType === "approve"){
                                $("#sectedBucketBlock form #cpSubmit").removeClass("disabled");
                            }
                        });
                    }
                });
        }

        var processFormData = function(sType){
            $("#sectedBucketBlock form input:hidden[name=displayName]").val($("#cpDisplayName").val().trim());
            $("#sectedBucketBlock form input:hidden[name=allowClientView]").val($("#cpAllowClientView").prop('checked'));
            $("#sectedBucketBlock form input:hidden[name=cpSelected]").val(getDt());
            $("#sectedBucketBlock form input:hidden[name=postType]").val(sType);
            if(sType === "save") {
                var status = "INCOMPLETE";
                if (!$("#sectedBucketBlock #btnGroup #cpSubmit").hasClass("disabled")) {
                    status = "SAVED";
                }
                $("#sectedBucketBlock form input:hidden[name=status]").val(status);
            }
            ajaxFormSumit(sType);
        };

        var updateBtnMsg = function(){
            if(!$("#sectedBucketBlock #btnGroup #cpSubmit").hasClass("disabled")){
                //console.log("complete");
                var submitTypeText = "Submit";
                if($("#cpSubmit").hasClass("cpApprove")){
                    submitTypeText = "Approve";
                }


                if(assigneeView == "true" && initState == "SUBMITTED"){
                    $("#btnGroup #btnMsg").html('This Comp Set is ready for review.');
                }
                else if(assigneeView == "true" && initState == "APPROVED"){
                    $("#btnGroup #btnMsg").html('This Comp Set has been published. Any changes will affect client’s report.');
                }
                else {
                    $("#btnGroup #btnMsg").html('When your selections are final, please click "'+submitTypeText+'".');
                }


            }
            else if(!$("#btnGroup #cpSave").hasClass("disabled")){
                //console.log("save");
                $("#btnGroup #btnMsg").html('Click "Save" to complete your selections later.');
            }
        };

        var updateDisaplayNameMsg = function(){
            var activeCpName = $("#compSetMenu .compSetListItem.active .compSet").text().replace("Comp","Competitive");
            if(($("#cpDisplayName").val() === activeCpName) || $("#cpDisplayName").val() === ""){
                $("#cpNameMsg").show();
            } else {
                $("#cpNameMsg").hide();
            }
        }




        var assigneeView = $("#btnGroup").attr("data-assigneeView");
        var initState = $("#btnGroup").attr("data-initState");
//                if(assigneeView == "true" && initState == "APPROVED"){
//                    $("#btnGroup #btnMsg").html('This Comp Set has been published. Any changes will affect client’s report.');
//                }
//                if(assigneeView == "true" && initState == "SUBMITTED"){
//                    $("#btnGroup #btnMsg").html('This Comp Set is ready for review.');
//                    alert("a");
//                }



        $("#selectedTable").on("click", ".selectedPropName", function(){
            var pId = $(this).attr("id").replace("pId","");
            var ratingType = getRating($(this).attr("data-rating"));
            $("#cpAssetTable input[data-ratingId='"+pId+"']").prop('checked', false);
            $(this).remove();
            updateBucketMsg(ratingType);
            $("#btnGroup #cpSave").removeClass("disabled");
        });

        $("#selectedTable").on("mouseover", ".removeX", function(){
            $(this).parent().prepend("<span class='tooltip' style='opacity: 1;'>Remove this hotel</span>")
        });
        $("#selectedTable").on("mouseout", ".removeX", function(){
            $(this).parent().find(".tooltip").remove();
        });




        $(document).on("click",".selectCBox", function(){
            $(this).parent().find(".ckBx").remove();
            if($(this).is(':checked') && getTotalAvailabeSlot() < 1){
                $(this).attr('checked', false);
                var modalId = "myModal";
                var modalTitle = "Sorry...";
                var modalContent = "You have reached your maximum of 10 hotels. To add this hotel, please delete a property in Your Selections (above).";
                var noTxt = "";
                var yesTxt = "CLOSE";
                // e.stopImmediatePropagation();
                fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){
                });


                return false;
            } else {
                var newDt = "";
                if($(this).is(':checked')){
                    newDt = "<div class='hidden ckBx'>checked</div>";
                } else {
                    newDt = "<div class='hidden ckBx'></div>";
                }
                $(this).parent().prepend(newDt)

                addAssetToBucket($(this));
                updateCkBxValForSorting($(this));
            }
            $("#btnGroup #cpSave").removeClass("disabled");
            var ratingType = getRating($(this).attr("data-rating"));
            updateBucketMsg(ratingType);
        });


        $("#cpDisplayName").bind("keyup",function() {
            $("#btnGroup #cpSave").removeClass("disabled");
            updateBtnMsg();
        });

        $("#cpAllowClientView").bind("click",function(){
            $("#btnGroup #cpSave").removeClass("disabled");
            updateBtnMsg();
        });

        $(document).on("click","#cDetail", function(e) {
            e.preventDefault();
            var modalId = "myModal";
            var modalTitle = "Help";
            var modalContent = $("#cDetailMsg").html();
            var noTxt = "";
            var yesTxt = "CLOSE";
            e.stopImmediatePropagation();
            fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){
            });
        });

        $(document).on("click","#cpSave", function(e){
            e.preventDefault();
            processFormData("save");
        });

        $(document).on("click","#cpSubmit.cpSubmit", function(e){
            e.preventDefault();
            var modalId = "myModal";
            var modalTitle = "Are you sure?";
            var modalContent = "You will not be able to make changes to your Competitive Set  after you submit.";
            var noTxt = "STAY ON THIS PAGE";
            var yesTxt = "SUBMIT";
            fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){
                if(result){
                    processFormData("submit");
                } else {
                    return false;
                }
            });
        });

        $(document).on("click","#cpSubmit.cpApprove", function(e){
            e.preventDefault();
            var modalId = "myModal";
            var modalTitle = "Are you sure?";
            var modalContent = "Note: Comp Set will be approved, but clients are not notified. Clients cannot access the Comp Set unless you click \"Grant client access\" checkbox on the Selector.<br><br>If you grant client access, C-Supers will see \"Competitive\" in nav. Please e-mail C-Supers to notify them that the report is available.";
            var noTxt = "EXIT WITHOUT APPROVING";
            var yesTxt = "APPROVE";
            fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){
                if(result){
                    processFormData("approve");
                } else {
                    return false;
                }
            });
        });

        $(document).on("click","#cpApptove", function(e){
            e.preventDefault();
            processFormData("approve");
        });

        $(window).bind('beforeunload', function() {
            if($("#sectedBucketBlock form #cpSave").hasClass("disabled") === false){
                return 'You have not saved the content you entered on this page.';
            }
        } );



        updateBucketOnLoad();
        updateDisaplayNameMsg();

        $('#sectedBucketBlock').scrollToFixed();
        var oTable = $("#cpAssetTable").dataTable({
            "sPaginationType": "full_numbers",
            aoColumnDefs: [
                {
                    bSortable: false,
                    aTargets: [0]
                }
            ],
            "aaSorting": [[1, "asc"]],
            //"sDom": '<"H"f>rt',
            "iDisplayLength": 25
        });




        $(".chkFilter").on("click", function(){
            var filters = "";
            $("#cpDropboxWrap .chkFilter").each(function(){
                if($(this).prop('checked')){
                    filters += $(this).val() + "|";
                }
            });
            filters = filters.substring(0,filters.length-1);
            if(filters === ""){
                filters = "NOSelection";
            }
            oTable.fnFilter(filters, 5, true, false, true, true); // multi value filter using OR condition
        });


        // Update DataTable for Filter click and Page Draw
        $(oTable).bind( 'draw', function(){
            var selectedLength = $("#selectedTable .selectedPropName").length;
            var listLength = $("#cpAssetTable .selectCBox").length;
            if(selectedLength > 0 ){
                $('#cpAssetTable .selectCBox:checkbox').removeAttr('checked');
                $("#selectedTable .selectedPropName").each(function(){
                    $("#cpAssetTable .selectCBox[data-ratingid="+$(this).attr("data-pid")+"]").attr("checked",true);
                    $("#cpAssetTable .selectCBox[data-ratingid="+$(this).attr("data-pid")+"]").prop('checked',true);
                });

            } else {
                $('#cpAssetTable .selectCBox:checkbox').removeAttr('checked');
            }
        });

    }



    $(document).on("click",".compSetListItem", function(){
        window.location.href = "/compSet/selector/"+$(this).attr("data-cpId");
    })

    $("#helpButton").click(function(e) {
        e.preventDefault();
        var modalId = "myModal";
        var modalTitle = "Help";
        var modalContent = $($(this).attr("data-helpContent")).html();
        var noTxt = "";
        var yesTxt = "CLOSE";
        e.stopImmediatePropagation();
        fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){
        });
    });
    $("#iconBigDownload").click(function(e) {
        e.preventDefault();
        var modalId = "myModal";
        var modalTitle = "Excel";
        if($(".excelLinkContent").attr("data-title") !== "" && typeof($(".excelLinkContent").attr("data-title")) !== "undefined"){
            modalTitle = $(".excelLinkContent").attr("data-title");
        }
        var modalContent = $($(this).attr("data-helpContent")).html();
        var noTxt = "";
        var yesTxt = "CLOSE";
        e.stopImmediatePropagation();
        fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){
        });
    });
});

