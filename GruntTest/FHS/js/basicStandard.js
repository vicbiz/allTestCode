$(document).ready(function() {
    var dataTable = $("#data");
    if(dataTable[0]) {
        dataTable.dataTable({
            "sPaginationType": "full_numbers",
            aoColumnDefs: [
                {
                    bSortable: false,
                    aTargets: [-1]
                }
            ],
            "aaSorting": [[0, "asc"]]
        });        
    }
    
    $(function() {
        $(".cancelBtn").on("click", function(e){
            e.preventDefault();
            history.back(1);
        });
    });    
});
