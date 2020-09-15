    $().ready(function(){
        var manageSubMenu = function(obj){
            var targetSub = $(obj).find(".leftMenuText a").attr("data-submenu");
            var targetMore = $(obj).find(".leftMenuMore");
            if(targetSub !== "" && typeof targetSub !== "undefined"){
                $(".clientSubMenu").slideUp();
                $(".leftMenuMore").text("+");
                if(targetSub !== "" && !$(targetSub).is(":visible")){
                    $(targetSub).slideDown("fast");
                    $(targetMore).text("-");
                }
            }
        };

        if($("#clientLeftMenu").length > 0){
            var currentURL = window.location.pathname;
            var menuId = "#"+$("#clientLeftMenu").attr("data-activemenu");
            $(menuId).addClass("active");
            if($(menuId).parents(".clientSubMenu").length >0 ){
                var $mObj = $(menuId).parentsUntil(".clientSubMenu").parent().prev(".leftMenuList");
                manageSubMenu($mObj);
            }
        }

        $("#clientLeftMenu .leftMenuList").on("click", function(e){
            var targetSub = $(this).find(".leftMenuText a").attr("data-submenu");
            if(targetSub !== "" && typeof targetSub !== "undefined"){
                e.preventDefault();
                manageSubMenu($(this));
            }
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

        $("#iconPdfDownload").click(function(e) {
            e.preventDefault();
            var modalId = "myModal";

            var modalTitle = "PDF Download";
            if($(".pdfLinkContent").attr("data-title") !== "" && typeof($(".pdfLinkContent").attr("data-title")) !== "undefined"){
                modalTitle = $(".pdfLinkContent").attr("data-title");
            }


            var modalContent = $($(this).attr("data-helpContent")).html();
            var noTxt = "";
            var yesTxt = "CLOSE";
            e.stopImmediatePropagation();
            fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){
            });
        });


        if($(".autoShorten").length > 0){
            $(".autoShorten").each(function(){
                var maxChar = parseInt($(this).attr("data-maxtext"));
                if($("body#reportApp").length > 0){
                    maxChar = 999999999;
                }
                $(this).autoShortenMoreLess(maxChar);
            });
        }


        /************************************************************************************/
        if($(".contactUsLink").length > 0){
            $(".contactUsLink").click(function(e) {
                e.preventDefault();
                var modalId = "contactUsModal";
                var modalTitle = "Contact Us";
                var modalContent = $($(this).attr("data-helpContent")).html();
                var noTxt = "";
                var yesTxt = "CLOSE";
                e.stopImmediatePropagation();
                fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){
                });
            });
        }
        $("#footerContactLink").click(function(e) {
            e.preventDefault();
            var modalId = "contactUsModal";
            var modalTitle = "Contact Us";
            var modalContent = $($(this).attr("data-helpContent")).html();
            var noTxt = "";
            var yesTxt = "CLOSE";
            e.stopImmediatePropagation();
            fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){
            });
        });
        /************************************************************************************/

        if($(".successUpdating").length > 0){
            setTimeout(function() {
                $(".successUpdating").fadeOut('slow');
            }, 3000);
        }


        var skipAcknowledgePage = function(){
            $("#myModal #hEmbargo").addClass("hidden");
            $("#myModal #popupNav").removeClass("hidden");
            $("#myModal #h1").show().addClass("current");
        }
        $("#helpButton").click(function(e) {
            e.preventDefault();
            var modalId = "myModal";
            var modalTitle = "Help";
            var $targetObj = $($(this).attr("data-helpContent"));
            var modalContent = $targetObj.html();
            var noTxt = "";
            var yesTxt = "CLOSE";
            if($targetObj.attr("data-title")){
                modalTitle = $targetObj.attr("data-title");
            }
            e.stopImmediatePropagation();
            fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){
            });

            if($(this).attr("data-userhasacknowledged") === "true"){
                skipAcknowledgePage();
            }
        });


        if($("#helpButton").attr("data-userhasacknowledged") === "false"){
            $("#helpButton").trigger("click");
        }

        if($(".dashboardHelpModal #acknowledgeBtn").length > 0){
            $(document).on("click","#myModal #acknowledgeBtn", function(){
                $.ajax({
                    type: "POST",
                    url: "/dashboard/acknowledge",
                    data: $("#acknowledgeForm").serialize(),
                    success: function( response ) {

                    },
                    error: function(jqXHR, textStatus, errorThrown){
                        //alert("Error...");
                        console.log("Error...");
                    }
                });
                skipAcknowledgePage();
            });



            var updateNavBtn = function($newCurrent){
                $("#myModal #popupNav #navPrev,#myModal #popupNav #navNext").removeClass("disabled");
                $(".modal-header button, .modal-footer").css("display","none");

                if($newCurrent.attr("data-prev") === ""){
                    $("#myModal #popupNav #navPrev").addClass("disabled");
                }
                if($newCurrent.attr("data-next") === ""){
                    $("#myModal #popupNav #navNext").addClass("disabled");
                    $(".modal-header button, .modal-footer").toggle();
                }
            }

            var updateModal = function(targetId){
                if(targetId === ""){ return; }
                else{
                    $(".hContent").css("display","none").removeClass("current");
                    $("#myModal #"+targetId).css("display","block").addClass("current");
                    updateNavBtn($("#myModal #"+targetId));
                }
            }

            $(document).on("click","#myModal #popupNav span", function(){
                var $current = $("#myModal .dashboardHelpModal .current");

                if($(this).hasClass("navNext")){
                    updateModal($current.attr("data-next"));
                } else {
                    updateModal($current.attr("data-prev"));
                }
            });
        }














        $("#whatIsThis").click(function(e) {
            e.preventDefault();
            var modalId = "myModal";
            var modalTitle = "Help";
            var $targetObj = $($(this).attr("data-helpContent"));
            var modalContent = $targetObj.html();
            var noTxt = "";
            var yesTxt = "CLOSE";
            if($targetObj.attr("data-title")){
                modalTitle = $targetObj.attr("data-title");
            }
            e.stopImmediatePropagation();
            fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){
            });
        });

        $("#gsrpRatingsContactButton").click(function(e) {
            e.preventDefault();
            var modalId = "myModal";
            var modalTitle = "Rating Contact";
            var $targetObj = $($(this).attr("data-helpContent"));
            var modalContent = $($(this).attr("data-content")).html();
            var noTxt = "";
            var yesTxt = "CLOSE";
            if($targetObj.attr("data-title")){
                modalTitle = $targetObj.attr("data-title");
            }
            e.stopImmediatePropagation();
            fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){
            });
        });

    });