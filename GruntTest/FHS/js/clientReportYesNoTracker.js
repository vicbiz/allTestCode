$().ready(function(){
    //$("select").selectpicker({style: 'btn-wt form-control', menuStyle: 'dropdown-inverse'});

    $("#selectSection select").on("change", function(){
        var selectedValue = $("option:selected").attr("value");
        var newUrl = window.location.pathname+"?sectionId="+selectedValue;
        window.location = newUrl;
    });


    /// Custom Datatable Filter ************************************************
    var dTsDom = '<"H"f>rt';
    var dTlength = 1000000;
    if($.browser.msie && parseFloat($.browser.version) < 10){
        //"sDom": '<"H"fr>t<"F"ip>', // full option
        //"sDom": '<"H"r>t<"F"ip>',  // without page length pull down option
        dTsDom = '<"H"fr>t<"F"ip>';
        dTlength = 50;
    }

    var oTable = $("#evalTable").dataTable({
        "sPaginationType": "full_numbers",
        "aoColumnDefs": [
            {
                bSortable: false,
                aTargets: [3]
            }
        ],
        "aaSorting": [],
        "sDom": dTsDom,
        "bFilter": true,
        "bInfo": false,
        "iDisplayLength": dTlength,
        "aoColumns": [
            { "sWidth": "0%" },
            { "sWidth": "10%"},
            { "sWidth": "10%"},
            { "sWidth": "20%"},
            { "sWidth": "10%"},
            { "sWidth": "10%"},
            { "sWidth": "10%"},
            { "sWidth": "10%"},
            { "sWidth": "20%", "sType": "percent" },
            { "sWidth": "0%" }
        ]
    });

    // Using Input Field for Filtering
    $("#testFilter").keyup( function () {
        /* Filter on the column (the index) of this element */
//                console.log("this.value :"+this.value);
        oTable.fnFilter( this.value, 1 );
    } );


    // Using Checkbox for Filtering
    $(".tableFilter").on("change", function(){
        var filterS = $("#filterService").is(':checked');
        var filterF = $("#filterFacility").is(':checked');
        var weightedFilter = $("#filterWeighted").is(':checked');

        if(!filterS && !filterF){
            oTable.fnFilter( "SF", 0 );
        } else{
            if(filterS && filterF){
                oTable.fnFilter( "", 0 );
            } else {
                if(filterS){
                    oTable.fnFilter( "S", 0 );
                } else {
                    oTable.fnFilter( "F", 0 );
                }
            }
        }
        if(weightedFilter) {
            oTable.fnFilter( "true", 9);
        } else {
            oTable.fnFilter( "", 9);
        }
    });


    // Using Checkbox for Filtering
    $("#selectClassification select").on("change", function(){
        var selectedText =  $(this).find(":selected").text();
//                console.log("val :"+selectedText);
        if(selectedText === "All"){
            oTable.fnFilter( "", 2 );
        } else {
            oTable.fnFilter( selectedText, 2 );
        }
    });

    /// Custom Datatable Filter END ************************************************

    var helpLink = $("#helpLink");
    if(helpLink.length > 0){
        $("#helpLink:not(.disabled)").click(function(e) {
            e.preventDefault();
            var modalId = "myModal";
            var modalTitle = "Help";
            var modalContent = $("#helpWeightedStandard").html();
            var noTxt = "";
            var yesTxt = "CLOSE";
            e.stopImmediatePropagation();
            fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){
            });
        });
    }
});


