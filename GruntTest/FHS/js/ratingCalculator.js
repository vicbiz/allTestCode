$(document).ready(function() {

    //$(".calculatorMenuWrap select").not("#downloadReport select").selectpicker({style: 'btn-wt form-control', menuStyle: 'dropdown-inverse'});
    //$("#downloadReport select").selectpicker({style: 'btn-default', menuStyle: 'dropdown-inverse'});

    var isReport = $("#calculatorMenu").attr("data-isReport");
    if(isReport === "true"){
        var oTableOptions = {
            "sPaginationType": "full_numbers",
            "aoColumns": [
                null,
                null,
                null,
                null,
                {"sType": "date"},
                {"sType": "percent"},
                {"sType": "percent"},
                {"sType": "percent"},
                {"sType": "percent"},
                null,
                null,
                null,
                {"sType": "percent"},
                null,
                {"bSortable" : false},
                null,
                null,
                null,
                null,
                {"sType": "percent"},
                {"bSortable" : false},
                null,
                null,
                null,
                null,
                null,
                null
            ],
            "aaSorting": [[1, "desc"], [0, "asc"]],
            "iDisplayLength": 100
        };
    } else {
        var oTableOptions = {
            "sPaginationType": "full_numbers",
            "aoColumns": [
                null,
                null,
                null,
                null,
                {"sType": "date"},
                {"sType": "percent"},
                {"sType": "percent"},
                {"sType": "percent"},
                {"sType": "percent"},
                null,
                null,
                {"bSortable" : false},
                {"sType": "percent"},
                null,
                {"bSortable" : false},
                null,
                null,
                null,
                null,
                {"sType": "percent"},
                {"bSortable" : false},
                null,
                null,
                null,
                null,
                null,
                null
            ],
            "aaSorting": [[1, "desc"], [0, "asc"]],
            "iDisplayLength": 100
        };
    }
    var oTable = $("#data").dataTable(oTableOptions);


    // 0<th>Evaluation Title</th>
    // 1<th>Display Date</th>
    // 2<th>Asset Name</th>
    // 3<th>Country</th>
    // 4<th>Approved Date</th>
    // 5<th>Final Service</th>
    // 6<th>67% Service</th>
    // 7<th>Final Facility</th>
    // 8<th>30% Facility</th>
    // 9<th>Final Post-Stay</th>
    // 0<th>Final High Impact</th>
    // 1<th>Provisional</th>
    // 2<th>Final Composite with PS/HI/Prov</th>
    // 3<th>System Rating</th>
    // 4<th>Assign As Final Rating</th>
    // 5<th>Client Sees</th>
    // 6<th>Previous Rating</th>
    // 7<th class="hidden">Status</th>
    // 8<th class="hidden">Rating Changes</th>
    // 9<th>Previous Composite</th>
    // 0<th>Notes</th>
    // 1<th class="hidden">Rating Status</th>
    // 2<th class="hidden">GSRP Partner</th>
    // 3<th class="hidden">region filter</th>
    // 4<th class="hidden">sub region filter</th>
    // 5<th class="hidden">archived</th>


    //*********************************************************************
    var filterByEvaluationStatus = function() {
        /* Filter on the column assigned published status Only */
        var publishedCheckValue = $("#published").prop('checked');
        var notPublishedCheckValue = $("#notPublished").prop('checked');
        var canceledCheckValue = $("#canceled").prop('checked');
        var checks = [];

        if(publishedCheckValue) { checks.push("Published") }
        if(notPublishedCheckValue) { checks.push("Approved") }
        if(canceledCheckValue) { checks.push("Canceled") }

        if(checks.length == 0) {
            oTable.fnFilter('*****NO*SELECTION*****',17);
        } else {
            var filterBy = checks.join('|');
            oTable.fnFilter(filterBy, 17, true);
        }
    }

    $("#published, #notPublished, #canceled").on("change", function () {
        filterByEvaluationStatus(oTable);
    });

    filterByEvaluationStatus(oTable);
    //*********************************************************************


    //*********************************************************************
    var filterByregion = function() {
        var filterBy = $("#filterByregion").val().replace("&","").trim();
        var v1 = 23, v2= 24;

        if(filterBy === ""){
            oTable.fnFilter('', v1);
            oTable.fnFilter('', v2);
        } else {
            var filterArray = filterBy.split('|');
            if(filterBy.indexOf("|") > -1){
                if(filterBy === "The Americas|USA -"){
                    oTable.fnFilter('', v1);
                    oTable.fnFilter(filterArray[1], v2);
                } else {
                    oTable.fnFilter('', v1);
                    oTable.fnFilter("^"+filterArray[1]+"$", v2, true, false); // Exact Match filter
                }
            } else {
                oTable.fnFilter("^"+filterArray[0]+"$", v1, true, false); // Exact Match filter
                oTable.fnFilter('', v2);
            }
        }
    }

    $("#filterByregion").on("change", function () {
        filterByregion(oTable);
    });

    filterByregion(oTable);
    //*********************************************************************






    //*********************************************************************
    // $("#noteOnly").on("change", function(){ filterForNoteOnly(oTable, "#noteOnly", 20); });
    // filterForNoteOnly(oTable, "#noteOnly", 20);

    var updateNoteOnlyList = function(){
        if($("#noteOnly").prop('checked')){
            oTable.fnFilter('true', 26);
        } else {
            oTable.fnFilter("", 26);
        }
    }
    $("#noteOnly").on("change", function(){
        updateNoteOnlyList();
    });
    updateNoteOnlyList();

    //*********************************************************************



    //*********************************************************************
    // Using Select Field for Filtering
    $("#displayDate").on("change", function () {
        /* Filter on the column (the index) of this element */
        var displayDate = this.value;
        if(displayDate) {
            oTable.fnFilter(displayDate,1);
        } else {
            oTable.fnFilter('',1);
            oTable.fnFilter('');
        }
    });
    //*********************************************************************



    //*********************************************************************
    // UPDATE DATATABLE FOR SORTING.....
    var updateDTable = function(currentObj, targetId, newVal){
        var target_row = $(currentObj).closest("tr").get(0);
        var pos = $(targetId).index();
        $(targetId).index(newVal);
        oTable.fnUpdate( newVal, target_row, pos);
    };

    var assignRating = function(evalId, select){
        var selValue = $(select).val();
        $.ajax( {
            type: "POST",
            url: "/rating/assign/"+evalId+"?ratingStatus="+selValue,
            success: function( response ) {
                if(response === "false") {
                    fhsAlert('myModal',
                        'Error',
                        '<p>Error. This asset already has an assigned rating for this standards year. To change the rating, please un-select the other assigned rating in this table.</p>',
                        '',
                        'OK',
                        function(result){});
                    $(select).val(null);
                } else if(response === "error") {
                    fhsAlert('myModal',
                        'System Error',
                        '<p>An error has occurred while trying to assign a rating. Please contact support.</p>',
                        '',
                        'OK',
                        function(result){});
                } else {
                    var idx = $(select).attr("data-idx");

                    updateDTable(select, '#final-rating-data-'+idx, response);
                    updateDTable(select, '#ratingStausText-'+idx, selValue);

                }
            }
        } );
    }


    $(document).on("change", ".assignFianlRatingDropdown", function () {
        var evalId = $(this).attr("data-evalId");
        assignRating(evalId,this);
    });


    $(document).on("change", "#downloadReport #filter", function () {
        var newVal = $(this).val();
        var selectedYear = $(this).attr("data-selectedYear");
        var assetType = $(this).attr("data-assetType");
        window.location.href = '/download/ratingsCalculatorSpreadsheet?id='+selectedYear+'&assetType='+assetType+'&filter='+newVal;
    });



    //*********************************************************************
    $(document).on("change","#filterByPartnerStatus", function(){ updateFilter(oTable, "#filterByPartnerStatus",22); });
    updateFilter(oTable, "#filterByPartnerStatus",22);
    //*********************************************************************


    //*********************************************************************
    var updateFilterByFinalRatingStatus = function(){
        var filterVal = $("#filterByFinalRatingStatus").val();
        if(filterVal === ""){
            oTable.fnFilter('',21);
        } else {
            oTable.fnFilter("^"+filterVal+"$",21 , true, false); // Exact Match filter
        }
    }
    $(document).on("change","#filterByFinalRatingStatus", function(){
        updateFilterByFinalRatingStatus();
    });
    updateFilterByFinalRatingStatus();
    //*********************************************************************


    //*********************************************************************
    var updateFilterByPreviousRating = function(){
        var filterVal = $("#filterByPreviousRating").val();
        if(filterVal === "changed"){
            oTable.fnFilter(filterVal, 18 , true, false);
        } else {
            oTable.fnFilter("", 18 , true, false);
            if(filterVal === ""){
                oTable.fnFilter('', 16);
            } else {
                if(filterVal === "^$"){
                    oTable.fnFilter(filterVal, 16 , true, false); //Empty Data .. need exact match filter
                } else {
                    oTable.fnFilter(filterVal, 16);
                }
            }
        }
    }
    $(document).on("change","#filterByPreviousRating", function(){
        updateFilterByPreviousRating();
    });
    updateFilterByPreviousRating();
    //*********************************************************************


    $(document).on("change", ".provisionalScoreSelect", function () {
        var newVal = $(this).val();
        var idx = $(this).attr("data-idx");
        var evalId = $(this).attr("data-evalId");
        var selectVal = $('#assignFianlRating-'+idx).val();

        $.ajax({
            type:'POST',
            data:'provisional=' + newVal,
            url:'/rating/editProvisional/'+evalId+"?ratingStatus="+selectVal,
            success:function(data,textStatus){
                $('#final-composite-data-'+idx).html(data.score);

                // update Client Sees Value
                if(selectVal){
                    $('#final-rating-data-'+idx).html(data.rating);
                }

                // update System rating
                jQuery('#system-rating-data-'+idx).html(data.systemRating);


            },error:function(XMLHttpRequest,textStatus,errorThrown){}
        });

        var newVal = $(this).val();
        $(this).parent().find(".provisionalScore").text(newVal);
        $(this).find("option").removeAttr("selected");
        $(this).find("option[value='"+newVal+"']").attr("selected","selected").prop('selected', true);

        var target_row = $(this).closest("tr").get(0);
        var newHtml = $(this).parent().html();

        oTable.fnUpdate( newHtml, target_row, 1);
    });



    $(document).on("click", ".evalNoteIcon", function(e) {
        var isViewOnly = $(this).hasClass("viewOnly");
        if(isViewOnly && $(this).hasClass("fui-bubble")){ return false; }

        e.preventDefault();
        var $this = $(this);
        var modalId = "evalNoteModal";
        var modalTitle = "Rating Calculator Notes";
        var modalContent = $(this).parent().find(".evalNoteText").text();
        var $link = "/rating/modifyRatingNotes/"+$(this).attr("data-evalId");
        var deleteHtml = '';
        var evalTitle = $this.parents("tr").find(".evalTitle a").text();
        var noTxt = "CANCEL";
        var yesTxt = "SAVE";
        var textAreaDisable = "";

        if(modalContent !== ""){
            deleteHtml = '<a class="btn btn-primary etcBtn" data-return="delete" data-dismiss="modal" href="#">Delete Note</a>';
        }


        if($("#evalReportPage").length > 0 || isViewOnly){
            var noTxt = "";
            var yesTxt = "CLOSE";
            deleteHtml = "";
            textAreaDisable = "disabled";
        }

        var modalForm =
            'Note for <span class="evalTitle">'+evalTitle+'</span><br/><br/>'
            + '<form id="evalNote" action="'+$link+'"><textarea id="ratingNotes" '+textAreaDisable+' class="form-control" rows="5" cols="140" placeholder="" name="ratingNotes" >'+modalContent+'</textarea></form>'+deleteHtml;

        e.stopImmediatePropagation();
        fhsAlert(modalId,modalTitle, modalForm, noTxt, yesTxt, function(result){
            if (result === false) {
                return false;
            } else {
                if(result === 'delete'){ $("#evalNote #ratingNotes").val(null); }
                $.ajax({
                    type: "POST",
                    url: $link,
                    data: $("#evalNote").serialize(),
                    success: function( response, statusText, xhr, form ) {
                        var newNote = $("#evalNote #ratingNotes").val();

                        var updateNoteData = function(hasNote, $noteObj){
                            if(hasNote === '') {
                                $noteObj.removeClass("fui-chat").addClass("fui-bubble");
                                $noteObj.parent().removeClass("tdToolTipData");
                                $noteObj.parent().find(".evalNoteText").text("").removeClass("tdToolTipDataText");
                                $noteObj.parent().parent().find(".hasNote").text("");
                            } else {
                                $noteObj.removeClass("fui-bubble").addClass("fui-chat")
                                $noteObj.parent().addClass("tdToolTipData");
                                $noteObj.parent().find(".evalNoteText").text(newNote).addClass("tdToolTipDataText");
                                $noteObj.parent().parent().find(".hasNote").text("true");
                            }
                        };

                        var hasNote = '';
                        if(result === 'delete' || newNote === ""){
                            updateNoteData(hasNote, $this);
                        }
                        else if (result === true) {
                            hasNote = 'true';
                            updateNoteData(hasNote, $this);
                        }
                        var target_row = $this.closest("tr").get(0);
                        var newHtml = $this.parent().html();

                        oTable.fnUpdate( newHtml, target_row, 20);
                        oTable.fnUpdate( hasNote, target_row, 26);
                        oTable.fnDraw();
                    },
                    error: function(jqXHR, textStatus, errorThrown){}
                });
            }
        });
    });

});

