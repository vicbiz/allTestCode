$(document).ready(function() {

    if($("#showEmbargo").length > 0){
        //e.preventDefault();
        var modalId = "myModal";
        var modalTitle = "Important Message";
        var modalContent = $("#showEmbargo").html();
        var noTxt = "";
        var yesTxt = "CLOSE";
        //e.stopImmediatePropagation();
        fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){});
    }

    $(".cpDetail table").each(function(){
        var colNo = $(this).find("thead tr th").length;
        var aoCol = [null];
        for(var i=0; i < colNo-1; i++){
            aoCol.push({ "sType": "percent" });
        }

       $(this).dataTable({
           "sPaginationType": "full_numbers",
           aoColumnDefs: [
               {
                   bSortable: false,
                   //aTargets: [0,1,2,3,4]
                   aTargets: []
               }
           ],
           "aoColumns": aoCol,
           "aaSorting": [],
           "sDom": '<"H"f>rt',
           "bFilter": false,
           "bInfo": false,
           "iDisplayLength": 100000
       })
    });

});
