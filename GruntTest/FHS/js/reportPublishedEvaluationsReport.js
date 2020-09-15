$(document).ready(function() {
    //$(".fhsSelect").selectpicker({style: 'btn-wt form-control', menuStyle: 'dropdown-inverse'});

    var oTable = $("#data").dataTable({
        "sPaginationType": "full_numbers",
        "aoColumns": [
            null,
            null,
            null,
            null,
            {"sType": "percent"},
            {"sType": "percent"},
            {"sType": "percent"},
            {"sType": "percent"},
            {"sType": "percent"},
            {"sType": "percent"},
            {"sType": "percent"},
            null,
            null,
            null
        ],
        aoColumnDefs: [
            {
                aTargets: [-1]
            }
        ],
        "aaSorting": [[3, "desc"]]
    });

    $( "#startDate, #endDate" ).datepicker();
    $(".selectDateWrap button.calIcon").on("click", function(){
        var targetObj = $(this).attr("data-targetInput");
        $(targetObj).datepicker("show");
    });


    $(".publishedFilter select").on("change", function(){
        var selectedText =  $(this).find(":selected").text();
        var selectedColm =  parseInt($(this).attr("data-column"));
        //console.log("val :"+selectedText);
        //console.log("Filter Column :"+selectedColm);

        if(selectedText === "All"){
            oTable.fnFilter( "", selectedColm );
        } else {
            if(selectedText === "BRAND"){
                oTable.fnFilter('^(?!FTG).+', selectedColm, true, false);
            } else {
                oTable.fnFilter("^"+selectedText+"$", selectedColm , true, false); // Exact Match filter
            }
        }
    });
    var updateStandardYear = function(){
        var selectedVal = $("#standardYearId").val();
        oTable.fnFilter(selectedVal, 13);
    };
    $("#standardYearId").on("change", function(){
        updateStandardYear();
    });
    updateStandardYear();

    var updateOnlyEE = function(){
        var onlyEE = $("#onlyEE").prop('checked');
        if(onlyEE){
            oTable.fnFilter("true", 11);
        } else {
            oTable.fnFilter("", 11);
        }
    }

    $("#onlyEE").on("change", function () {
        updateOnlyEE();
    });
    updateOnlyEE();

});
