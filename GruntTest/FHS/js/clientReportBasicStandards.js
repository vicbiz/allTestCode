$().ready(function(){

    var updateScoreBox = function(){
        var totalOpty = $("#coreStandardTable tbody tr").length;
        var achieved  = $("#coreStandardTable tbody tr .yesNoNaAnswer.Yes").length;
        var naCount   = $("#coreStandardTable tbody tr .yesNoNaAnswer.NA").length;
        var score = 0;
        totalOpty = totalOpty - naCount;
        // totalOpty = 0;
        // achieved = 0;

        if( totalOpty !== 0 && achieved !== 0){
            // score = (((Math.round((achieved / totalOpty) * 100)/100).toFixed(2))*100).toFixed(2);
            score = Math.round((achieved / totalOpty)*10000)/100;
        }
        // console.log("Total :"+totalOpty+" Yes: "+achieved+" Score: "+score);

        $("#pbAchieved").text(achieved);
        $("#pbOpportunities").text(totalOpty);
        $("#pbScore").text(score+"%");
    };


    //$("#coreStandard").selectpicker({style: 'btn-wt form-control', menuStyle: 'dropdown-inverse'});

    var isRatings = $("#coreStandardTable").attr("data-isRatings");
    if(isRatings === "true"){
        var oTable = $("#coreStandardTable").dataTable({
            "sPaginationType": "full_numbers",
            "aoColumnDefs": [
                {
                    bSortable: false,
                    aTargets: [2,4]
                }
            ],
            "aaSorting": [],
            "sDom": '<"H"f>rt',
            "bFilter": true,
            "bInfo": false,
            "iDisplayLength": 1000000,
            "aoColumns": [
                { "sWidth": "0%" }, // 0st column width
                { "sWidth": "10%"}, // 1st column width
                { "sWidth": "35%" }, // 2nd column width
                { "sWidth": "10%" }, // 3rd column width
                { "sWidth": "45%" } // 4th column width
            ]
        });
    } else {
        var oTable = $("#coreStandardTable").dataTable({
            "sPaginationType": "full_numbers",
            "aoColumnDefs": [
                {
                    bSortable: false,
                    aTargets: [2,4]
                }
            ],
            "aaSorting": [],
            "sDom": '<"H"f>rt',
            "bFilter": true,
            "bInfo": false,
            "iDisplayLength": 1000000,
            "aoColumns": [
                { "sWidth": "0%" }, // 0st column width
                { "sWidth": "10%"}, // 1st column width
                { "sWidth": "35%" }, // 2nd column width
                { "sWidth": "10%" }, // 3rd column width
                { "sWidth": "30%" }, // 4th column width
                { "sWidth": "15%", "sType": "percent" } // 5th column width
            ]
        });
    }

    // Dropdown Filter Filtering
    $("#coreStandard").on("change", function(){
        var selectedVal =  $(this).find(":selected").val();
        // console.log("val :"+selectedVal);
        if(selectedVal === "null"){
            oTable.fnFilter( "", 0 );
        } else {
            // Filtering using Regex for Exact data match
            oTable.fnFilter( "^"+selectedVal+"$", 0 , true );
        }
        updateScoreBox();
    });

    // Default Dropdown selection
    $("#coreStandardPage ul.dropdown-menu li:nth-child(2) a").trigger("click");

    var defaultStandardId = $.urlParam('code');
    if(defaultStandardId){
        $('#coreStandard').val(defaultStandardId).trigger('change')
    }
});



