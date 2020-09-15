$(document).ready(function() {
    var oTable = $("#userTable").dataTable({
        "sPaginationType": "full_numbers",
        "sDom": '<"H"f>rt',
        "bInfo": false,
        "iDisplayLength": 1000000,
        aoColumnDefs: [
            {
                bSortable: false,
                aTargets: [0]
            }
        ],
        "aaSorting": [[1, "asc"],[2, "asc"]]
    });

    var updateAllCheckbox = function(){
        var allChkbox = $("#userTable .selsectUserChkBx").length;
        var checkedBx = $("#userTable .selsectUserChkBx:checked").length;
        if(allChkbox === checkedBx){
            $("#userTable #all").prop("checked",true);
        } else {
            $("#userTable #all").prop("checked",false);
        }
    };

    $("#userTable #all").on("click", function(){
        if($(this).prop("checked")){
            $("#userTable .selsectUserChkBx").prop("checked",true);
        } else {
            $("#userTable .selsectUserChkBx").prop("checked",false);
        }
    });

    $("#userTable .selsectUserChkBx").on("click", function(){
        updateAllCheckbox();
    });



    var updateEmaiBtn = function(){
        if($("#userTable .selsectUserChkBx:checked").length > 0){
            $("#sendEmailToUsersBtn").removeClass("disabled");
        } else {
            $("#sendEmailToUsersBtn").removeClass("disabled").addClass("disabled");
        }
    }
    $("#userTable input").on("click", function(){
        updateEmaiBtn();
    });
    updateEmaiBtn();

    $("#sendEmailToUsersBtn").on("click", function(){
        if($("#userTable .selsectUserChkBx:checked").length === 0){ return false;}
        else {
            var $this = $(this);
            var emailList = "mailto:";
            $("#userTable .selsectUserChkBx:checked").each(function(){
                emailList += $(this).attr("data-email")+";";
            });
            location.href = emailList;
        }
    });
});

