/*** Begin : Extending UI-Spinner to show list data */
$.widget("ui.boolspinner", $.ui.spinner, {
    options: {
        min: 0,
        max: 1,
        start: 1
    },
    _parse: function (value) {
        if (typeof value === "string") {
            return (value.toLowerCase() == "ja")?1:0;
        }
        return value;
    },
    _format: function (value) {
        return (value == 1)?"Ja":"Nein";
    }
});

$(function() {
    $("#spinner-testprint").boolspinner();
});


$.widget("ui.formatSpinner", $.ui.spinner, {
    options: {
    },
    _parse: function (value) {
        if (typeof value === "string") {
            return this.options.values.indexOf(value);
        }
        return value;
    },
    _format: function (value) {
        //wrap around
        if (value < 0) {
            value = this.options.count-1;
        }
        if (value > this.options.count-1) {
            value = 0;
        }
        var format = this.options.values[value];
        return format;
    }
});
/*** End : Extending UI-Spinner to show list data  */





$.urlParam = function(name){
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if(results === null){ return "";}
    else {return results[1];}

};


$.IsEmail = function(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
};



// **********  FHS Alert Modal Begin  ************** //
var fhsAlertRemove = function(){
    $(".modal, .modal-backdrop").remove();
    $("body").removeClass("modal-open");
};
var fhsAlert = function(modalId,modalTitle, modalContent, noTxt, yesTxt, callback ){
    fhsAlertRemove();

    var htmlNo = '';
    var htmlYes = '';
    if(noTxt !== "") {htmlNo  = '<a href="#" data-dismiss="modal" class="btn noBtn">'+noTxt+'</a>';}
    if(yesTxt !== ""){htmlYes = '<a href="#" data-dismiss="modal" class="btn btn-primary yesBtn">'+yesTxt+'</a>';}

    var windowOption = "";
    if(modalContent.indexOf("largeSizePopup") >= 0){
        windowOption =  " largeSizePopupWrap";
    }

    var htmldt = '<div class="modal'+ windowOption +'" id="'+modalId+'">' +
        '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>' +
        '<h4 class="modal-title">'+modalTitle+'</h4>' +
        '</div>' +
        '<div class="modal-body">' +
        modalContent +
        '</div>' +
        '<div class="modal-footer">' +
        htmlNo +
        htmlYes +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';

    $('body').append(htmldt);
    var $modalDiv = $('#'+modalId);
    $($modalDiv).modal({
        backdrop: 'static',
        keyboard: false,
//            backdrop: true,
        show:true
    }).css({
        'padding-top': function () {
            return (($(this).height() / 2)-$($modalDiv).find(".modal-dialog").height()/2);
        }
    });
    $(".modal .noBtn").on("click", function(){
        if(callback) callback(false);
    });
    $(".modal .yesBtn").on("click", function(){
        if(callback) callback(true);
    });
    $(".modal .close").on("click", function(){
        if(callback) callback(false);
    });
    $(".modal .etcBtn").on("click", function(){
        if(callback) callback($(this).attr("data-return"));
    });

    $(".modal input").keypress(function(e) {
        if(e.which == 13) {
            return false;
        }
    });


};
// **********  FHS Alert Modal End  ************** //


function replaceURLWithHTMLLinks(text, target) {
//        console.log("target :"+target);
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    var linkHTML = "<a href='$1'target='_self'>$1</a>";
    if(target === "_blank"){
        linkHTML = "<a href='$1'target='_blank'>$1</a>";
    }
    return text.replace(exp,linkHTML);
}

$.fn.autoShorten = function(maxLength) {
    return this.each(function(){
        if ($(this).text().length > maxLength) {
            var words = $(this).text().substring(0,maxLength);
            var shortText = words.slice(0, words.length - 1) + "...";

            $(this).text($(this).text());

            $(this).data('replacementText', $(this).text())
                .text(shortText)
                .css({ cursor: 'pointer' })
                .hover(function() { $(this).css({ textDecoration: 'none' }); var tempText = $(this).text(); $(this).text($(this).data('replacementText')); $(this).data('replacementText', tempText); });
        }
    });
};

$.fn.autoShortenMoreLess = function(maxLength) {
    return this.each(function(){
        if ($(this).text().length > maxLength) {
            var words = $(this).text().substring(0,maxLength);
            var shortText = words.slice(0, words.length - 1) + "...<span class='autoShortenMore'><a href=''>MORE</a></span>";

            $(this).html($(this).text()+" <span class='autoShortenMore'><a href=''>LESS</a></span>");

            $(this).data('replacementText', $(this).html())
                .html(shortText)
                .css({ cursor: 'pointer' })
                .click(function(e) {
                    e.preventDefault();
                    var tempText = $(this).html();
                    $(this).html($(this).data('replacementText'));
                    $(this).data('replacementText', tempText);
                });
        } else {
            var words = $(this).text();
            var shortText = words;
            $(this).html($(this).text());
            $(this).data('replacementText', $(this).html())
                .html(shortText);
        }
    });
};




// Decode an HTML encoded string
var decodeEntities = (function() {
    // this prevents any overhead from creating the object each time
    var element = document.createElement('div');

    function decodeHTMLEntities (str) {
        if(str && typeof str === 'string') {
            // strip script/html tags
            str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
            str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
            element.innerHTML = str;
            str = element.textContent;
            element.textContent = '';
        }

        return str;
    }

    return decodeHTMLEntities;
})();


var filterForNoteOnly = function(oTable, target, tdPosition){
    if($(target).prop('checked')){
        oTable.fnFilter("s+", tdPosition , true, false); // Not Empty Filter.....
    } else {
        oTable.fnFilter("", tdPosition);
    }
}

var filterArchived = function(oTable, target, tdPosition){
    if($(target).prop('checked')){
        oTable.fnFilter("", tdPosition);
    } else {
        oTable.fnFilter("false", tdPosition);
    }
}

var updateFilter = function(oTable, target, tdPosition){
    var filterVal = $(target).val();
    if(filterVal === ""){
        oTable.fnFilter('',tdPosition);
    } else {
        oTable.fnFilter(filterVal,tdPosition);
    }
}


var pageLoading = function() {
    // add the overlay with loading image to the page
    var over = '<div id="pageLoadingOverlay">' +
        //'<img id="loading" src="http://bit.ly/pMtW1K">' +
        '<span id="loading">Loading Data ..... </span>' +
        '</div>';
    //$(over).appendTo('body');
    $(over).prependTo('body');

    $("body").addClass("noScroll");
    // hit escape to close the overlay
    //$(document).keyup(function(e) {
    //    if (e.which === 27) {
    //        $('#pageLoadingOverlay').remove();
    //    }
    //});


    function blinker() {
        $('#pageLoadingOverlay #loading').fadeOut(500).fadeIn(500);
    }
    setInterval(blinker, 400); //Runs every second
};



//*************************************************************************************************************************

    $().ready(function() {
        if($.fn.dataTableExt) {
            // Default Datatable Options *************************
            $.extend( $.fn.dataTable.defaults, {
                "bStateSave": true,
                "processing": true,
                "fnStateLoad": function () {
                    //$(".tableContainerWrap").prepend("<div class='loadingTableData'>Loading Data......</div>");
                },
                "fnInitComplete": function() {
                    $(".tableContainerWrap .loadingTableData").remove();
                    $(".tableContainer").removeClass("hidden");
                },
                "bProcessing": true,
                "bDeferRender": true,
                sAutoWidth: false
            } );
            // **************************************************



            //custom jQuery datatable sort rules
            $.fn.dataTableExt.oSort['text-blankslast-asc'] = function(a,b) {
                if (a == '')
                    return 1;
                else if (b == '')
                    return -1;
                else
                    return (a<b) ? 1 : ((a > b) ? -1 : 0);
            };
            $.fn.dataTableExt.oSort['text-blankslast-desc'] = function(a,b) {
                if (a == '')
                    return 1;
                else if (b == '')
                    return -1;
                else
                    return (a<b) ? -1 : ((a > b) ? 1 : 0);
            };
            $.fn.dataTableExt.oSort['text-blanksfirst-asc'] = function(a,b) {
                if (a == '')
                    return -1;
                else if (b == '')
                    return 1;
                else
                    return (a<b) ? -1 : ((a > b) ? 1 : 0);
            };
            $.fn.dataTableExt.oSort['text-blanksfirst-desc'] = function(a,b) {
                if (a == '')
                    return -1;
                else if (b == '')
                    return 1;
                else
                    return (a<b) ? 1 : ((a > b) ? -1 : 0);
            };
            $.fn.dataTableExt.oSort['overallFirst-asc'] = function(a,b) {
                a = a.toLowerCase().trim();
                b = b.toLowerCase().trim();
                if(a === 'overall' || b === 'overall'){
                    if (a == 'overall')
                        return -1;
                    else if (b == 'overall')
                        return 1;
                } else {
                    if (a == '')
                        return -1;
                    else if (b == '')
                        return 1;
                    else
                        return (a<b) ? -1 : ((a > b) ? 1 : 0);
                }
            };
            $.fn.dataTableExt.oSort['overallFirst-desc'] = function(a,b) {
                a = a.toLowerCase().trim();
                b = b.toLowerCase().trim();
                if(a === 'overall' || b === 'overall'){
                    if (a == 'overall')
                        return -1;
                    else if (b == 'overall')
                        return 1;
                } else {
                    if (a == '')
                        return -1;
                    else if (b == '')
                        return 1;
                    else
                        return (a<b) ? 1 : ((a > b) ? -1 : 0);
                }
            };
            $.fn.dataTableExt.oSort['percent-asc']  = function(a,b) {
                var x = (a == "-") ? 0 : a.replace( /[^0-9.\-]/g, "" );
                var y = (b == "-") ? 0 : b.replace( /[^0-9.\-]/g, "" );
                x = parseFloat( x );
                y = parseFloat( y );
                if(isNaN(x)){
                    if(isNaN(y))
                        return 0;
                    else
                        return 1;
                }
                else if (isNaN(y))
                    return -1;

                return ((x < y) ? -1 : ((x > y) ?  1 : 0));
            };
            $.fn.dataTableExt.oSort['percent-desc'] = function(a,b) {
                var x = (a == "-") ? 0 : a.replace( /[^0-9.\-]/g, "" );
                var y = (b == "-") ? 0 : b.replace( /[^0-9.\-]/g, "" );
                x = parseFloat( x );
                y = parseFloat( y );
                if(isNaN(x)){
                    if(isNaN(y))
                        return 0;
                    else
                        return 1;
                }
                else if (isNaN(y))
                    return -1;

                return ((x < y) ?  1 : ((x > y) ? -1 : 0));
            };



            // negative and percent....
            $.fn.dataTableExt.oSort['negative-num-pre'] = function(a) {
                var x = a.replace( /[^0-9.\-]/g, "");
                return x;
            };
            $.fn.dataTableExt.oSort['negative-num-asc'] = function(a,b) {
                if(isNaN(parseFloat(a)) || a === ""){ a = "999999"};
                if(isNaN(parseFloat(b)) || b === ""){ b = "999999"};
                a = (a=="-" || a==="") ? 0 : a.replace('+','')*1;
                return ((a < b) ? -1 : ((a > b) ? 1 : 0))
            };
            $.fn.dataTableExt.oSort['negative-num-desc'] = function(a,b) {
                if(isNaN(parseFloat(a)) || a === ""){ a = "-999999"};
                if(isNaN(parseFloat(b)) || b === ""){ b = "-999999"};
                a = (a=="-" || a==="") ? 0 : a.replace('+','')*1;
                return ((a < b) ? 1 : ((a > b) ? -1 : 0));
            };




            $.extend( $.fn.dataTableExt.oSort, { "numeric-comma-pre": function ( a ) {
                a = a.substring(0, a.indexOf("</span>"));
                a = a.replace(/(<([^>]+)>)/ig,"");
                var x = (a == "-") ? 0 : a.replace( /,/, "." );
                return parseFloat( x );
            },
                "numeric-comma-asc": function ( a, b ) {
                    return ((a < b) ? -1 : ((a > b) ? 1 : 0));
                },
                "numeric-comma-desc": function ( a, b ) {
                    return ((a < b) ? 1 : ((a > b) ? -1 : 0));
                }
            } );
            $.fn.dataTableExt.oSort['date-blankslast-asc'] = function(a,b) {
                if (a == '')
                    return 1;
                else if (b == '')
                    return -1;
                else
                    return dateSortAsc(a,b);
            };
            $.fn.dataTableExt.oSort['date-blankslast-desc'] = function(a,b) {
                if (a == '')
                    return 1;
                else if (b == '')
                    return -1;
                else
                    return dateSortDesc(a,b);
            };
            $.fn.dataTableExt.oSort['date-blanksfirst-asc'] = function(a,b) {
                if (a == '')
                    return -1;
                else if (b == '')
                    return 1;
                else
                    return dateSortAsc(a,b);
            };
            $.fn.dataTableExt.oSort['date-blanksfirst-desc'] = function(a,b) {
                if (a == '')
                    return -1;
                else if (b == '')
                    return 1;
                else
                    return dateSortDesc(a,b);
            };
            $.fn.dataTableExt.oSort['date-asc']  = function(a,b) {
                return dateSortAsc(a,b)
            };
            $.fn.dataTableExt.oSort['date-desc'] = function(a,b) {
                return dateSortDesc(a, b)
            };
            $.fn.dataTableExt.oSort['select-sort-asc']  = function(a,b) {
                return selectSortAsc(a,b)
            };
            $.fn.dataTableExt.oSort['select-sort-desc'] = function(a,b) {
                return selectSortDesc(a, b)
            };


            var displayDateOrder = ['Jan', 'Feb', 'Mar', 'Q1', 'Apr', 'May', 'Jun', '1st', 'Q2', 'Jul', 'Aug', 'Sep', 'Q3', 'Oct', 'Nov', 'Dec', 'Q4', '2nd'];
            $.fn.dataTableExt.oSort['display-date-asc'] = function(a,b) {
                var displayDateA = a.indexOf(" ") > 0 ? a.trim().substr(0, a.indexOf(" ")) : a;
                var displayDateB = b.indexOf(" ") > 0 ? b.trim().substr(0, b.indexOf(" ")) : b;
                var matchA = a.match(/\(([^)]*)\)/);
                var matchB = b.match(/\(([^)]*)\)/);
                var shopNumberA = matchA ? matchA[1] : "";
                var shopNumberB = matchB ? matchB[1] : "";
                if(displayDateA == displayDateB) {
                    return shopNumberA < shopNumberB ? -1 : shopNumberA > shopNumberB ? 1 : 0;
                } else {
                    return ((displayDateOrder.indexOf(displayDateA) < displayDateOrder.indexOf(displayDateB)) ? -1 : ((displayDateOrder.indexOf(displayDateA) > displayDateOrder.indexOf(displayDateB)) ? 1 : 0));
                }
            };
            $.fn.dataTableExt.oSort['display-date-desc'] = function(a,b) {
                var displayDateA = a.indexOf(" ") > 0 ? a.trim().substr(0, a.indexOf(" ")) : a;
                var displayDateB = b.indexOf(" ") > 0 ? b.trim().substr(0, b.indexOf(" ")) : b;
                var matchA = a.match(/\(([^)]*)\)/);
                var matchB = b.match(/\(([^)]*)\)/);
                var shopNumberA = matchA ? matchA[1] : "";
                var shopNumberB = matchB ? matchB[1] : "";
                if(displayDateA == displayDateB) {
                    return shopNumberA < shopNumberB ? 1 : shopNumberA > shopNumberB ? -1 : 0;
                } else {
                    return ((displayDateOrder.indexOf(displayDateA) < displayDateOrder.indexOf(displayDateB)) ? 1 : ((displayDateOrder.indexOf(displayDateA) > displayDateOrder.indexOf(displayDateB)) ? -1 : 0));
                }
            };




            var displayRatingOrder = ['Rec (W)','Rec (D)','Rec','4 (W)','4 (D)','4','5 (W)','5 (D)','5'];
            $.fn.dataTableExt.oSort['Rating-asc'] = function(a,b) {
                if (a == 'N/A')
                    return 1;
                else if (b == 'N/A')
                    return -1;
                else{
                    var ratingDataA = a;
                    var ratingDataB = b;
                    var matchA = a.match(/\(([^)]*)\)/);
                    var matchB = b.match(/\(([^)]*)\)/);
                    var shopNumberA = matchA ? matchA[1] : "";
                    var shopNumberB = matchB ? matchB[1] : "";
                    if(ratingDataA == ratingDataB) {
                        return shopNumberA < shopNumberB ? -1 : shopNumberA > shopNumberB ? 1 : 0;
                    } else {
                        return ((displayRatingOrder.indexOf(ratingDataA) < displayRatingOrder.indexOf(ratingDataB)) ? -1 : ((displayRatingOrder.indexOf(ratingDataA) > displayRatingOrder.indexOf(ratingDataB)) ? 1 : 0));
                    }
                }
            };
            $.fn.dataTableExt.oSort['Rating-desc'] = function(a,b) {
                if (a == 'N/A')
                    return 1;
                else if (b == 'N/A')
                    return -1;
                else {
                    var ratingDataA = a;
                    var ratingDataB = b;
                    var matchA = a.match(/\(([^)]*)\)/);
                    var matchB = b.match(/\(([^)]*)\)/);
                    var shopNumberA = matchA ? matchA[1] : "";
                    var shopNumberB = matchB ? matchB[1] : "";
                    if(ratingDataA == ratingDataB) {
                        return shopNumberA < shopNumberB ? 1 : shopNumberA > shopNumberB ? -1 : 0;
                    } else {
                        return ((displayRatingOrder.indexOf(ratingDataA) < displayRatingOrder.indexOf(ratingDataB)) ? 1 : ((displayRatingOrder.indexOf(ratingDataA) > displayRatingOrder.indexOf(ratingDataB)) ? -1 : 0));
                    }
                }
            };


            function dateSortAsc(a,b) {
                var x = new Date(a),
                    y = new Date(b);
                return ((x < y) ? -1 : ((x > y) ?  1 : 0));
            }

            function dateSortDesc(a, b) {
                var x = new Date(a),
                    y = new Date(b);
                return ((x < y) ? 1 : ((x > y) ?  -1 : 0));
            }

            function selectSortAsc(a, b) {
                var aVal = a.match(/provisionalScore">([a-zA-Z0-9.-]+)/)[1];
                var bVal = b.match(/provisionalScore">([a-zA-Z0-9.-]+)/)[1];

                if(!isNaN(aVal) && !isNaN(bVal)) {
                    aVal = parseFloat(aVal);
                    bVal = parseFloat(bVal);
                }
                return ((aVal < bVal) ? -1 : ((aVal > bVal) ? 1 : 0));
            }

            function fselectSortDesc(a, b) {
                var aVal = a.match(/provisionalScore">([a-zA-Z0-9.-]+)/)[1];
                var bVal = b.match(/provisionalScore">([a-zA-Z0-9.-]+)/)[1];
                if(!isNaN(aVal) && !isNaN(bVal)) {
                    aVal = parseFloat(aVal);
                    bVal = parseFloat(bVal);
                }
                return ((aVal < bVal) ? 1 : ((aVal > bVal) ? -1 : 0));
            }
        }



        $.fixChromeDropdownArrow = function(){
            if($(".btn-group.select").length > 0){
                $(".btn-group.select button").each(function(){
                    $(this).hide().show(0);
                });
            }
        }

        // replace line break with <br/>
        $.nl2br = function(str, is_xhtml) {
            var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
            return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
        }


        $.fn.extend( {
            limiter: function(limit, elem) {
                $(this).on("keyup focus", function() {
                    setCount(this, elem);
                });
                function setCount(src, elem) {
                    var chars = src.value.length;
                    if (chars > limit) {
                        src.value = src.value.substr(0, limit);
                        chars = limit;
                    }
    //                    elem.html( limit - chars );
                    elem.html( chars );
                }
                setCount($(this)[0], elem);
            }
        });

        //Datatable Header Tooltop
        $.fn.isOnScreen = function(){
            var win = $(window);
            var viewport = {
                top : win.scrollTop(),
                left : win.scrollLeft()
            };
            viewport.right = viewport.left + win.width();
            viewport.bottom = viewport.top + win.height();
            var bounds = this.offset();
            bounds.right = bounds.left + this.outerWidth();
            bounds.bottom = bounds.top + this.outerHeight();
            return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
        };


        $.fn.nl2br = function(str, is_xhtml) {
            var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
            return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
        }


        //************************************************************************************************************************

        if($("nav.mainNav").length > 0){
            $("a.nullLink").on("click", function(e){
                e.preventDefault();
                return true;
            });
        }

        if($("#evaluatorInstructions").length > 0){
            $("#evaluatorInstructions").click(function(e) {
                e.preventDefault();
                var modalId = "myModal";
                var modalTitle = "Evaluation Instructions";
                var modalContent = $("#evaluatorInstructionsContent").html().replace(/\n/g,"<br>");
                modalContent = replaceURLWithHTMLLinks(modalContent, '_blank');
                var noTxt = "";
                var yesTxt = "CLOSE";
                e.stopImmediatePropagation();
                fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){
                });
            });
        }

        if($(".scoreRefreshSection a, .scoreRefreshOverall a, a.refreshOverallScore").length > 0){
            $(".scoreRefreshSection a, .scoreRefreshOverall a, a.refreshOverallScore").on("click", function(){
                var app = $("body").attr("id").replace("app","");
                var eId = $(this).attr("data-eid");
                $.ajax( {
                    type: "GET",
                    url: "/report/regenerateRunningScoreForEvaluation?evalId="+eId,
                    success: function( response ) {
                        window.location.reload(true);
                    }
                } );
            });
        }

        if($(".mainNav.clientNav").length > 0){
            if(window.location.pathname.indexOf("help")>0){ $(".mainNav.clientNav .active").removeClass("active"); $(".mainNav.clientNav #cHelp").addClass("active"); }
            else if(window.location.pathname.indexOf("clientList")>0){ $(".mainNav.clientNav .active").removeClass("active"); $(".mainNav.clientNav #cClientList").addClass("active"); }
        }



        //**********    Browser Waring Modal Begin ************//
        // Detect AppleDevice
        var isAppleDevice = function(){
            return (
            (navigator.userAgent.toLowerCase().indexOf("ipad") > -1) ||
            (navigator.userAgent.toLowerCase().indexOf("iphone") > -1) ||
            (navigator.userAgent.toLowerCase().indexOf("ipod") > -1)
            );
        };

        if($("#login").length > 0){
            $.cookies.del("browserWarning");
        }
        if($("body#reportApp").length === 0 && $("body.CLIENTview").length === 0 && $("#login").length === 0){
            if( typeof $.cookies.get("browserWarning") === "undefined" || $.cookies.get("browserWarning") === null || $.cookies.get("browserWarning") === "" ){
                $.cookies.set("browserWarning", "show");
                $.cookies.setOptions({expiresAt: null});
            }

            // Detect Chrome Browser
            $.browser.chrome = /chrom(e|ium)/.test(navigator.userAgent.toLowerCase());
            // alert("isAppleDevice :"+isAppleDevice());

            if(!$.browser.chrome && $.cookies.get("browserWarning") === 'show' && !isAppleDevice()){
                var modalId = "browserInfo";
                var modalTitle = "IMPORTANT MESSAGE!";
                var modalContent = 'This system is designed exclusively for Chrome. We detect that you are on an unsupported browser, which will cause problems using the system.<br/><br/>'
                        + 'To download Chrome, go to:<br/>'
                        + '<a href="https://www.google.com/intl/en/chrome/browser/" target="_blank">https://www.google.com/intl/en/chrome/browser/</a><br/><br/>'
                        + 'To make Chrome your default browser, please follow these instructions:<br/>'
                        + '<a href="https://support.google.com/chrome/answer/95417" target="_blank">https://support.google.com/chrome/answer/95417</a><br/><br/>'
                        + 'Thank you!<br/><br/>'
                        + '<label class="browserWarning"><input type="checkbox" id="browserWarningCheckBox">&nbsp;&nbsp;Do not show this message until next login</label>'
                    ;
                var noTxt = "";
                var yesTxt = "CLOSE";
                fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){
                });

            }
        }
        if($("#browserWarningCheckBox").length > 0){
            $("#browserWarningCheckBox").on("change", function(){
                if($(this).is(':checked')){
                    $.cookies.set("browserWarning", "hide");
                    $.cookies.setOptions({expiresAt: null});
                } else {
                    $.cookies.set("browserWarning", "show");
                    $.cookies.setOptions({expiresAt: null});
                }
            });
        }
        //***********************************************************//


        // Check Session Timeout every 10 min
        if($("#loginForm").length === 0){
            var checkInterval = 35;  // minutes
            setInterval(function(){
                $.ajax( {
                    type: "GET",
                    url: "/dashboard/isAlive",
                    success: function( response ) {
                    },
                    error: function(xhr, textStatus, errorThrown){
                        window.location.replace("/logout/index");
                    }
                });
            }, 60000 * checkInterval);
        }


        if($(".hasHelpTxt").length > 0){
            $(".hasHelpTxt").on("focus", function(){
                $(this).parent().find(".inputHelpTxt").css("display","inline-block");
            });
            $(".hasHelpTxt").on("focusout", function(){
                $(this).parent().find(".inputHelpTxt").css("display","none");
            });
        }


        if($(".helpPopup").length > 0){
            $(".helpPopup").click(function(e) {
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
        }



        // email Validation
        $(document).on('submit','.manageUsers form',function(){
            if($(this).find("input#email").length > 0){
                var $emailField = $(this).find("input#email");
                var enteredEmail = $emailField.val();
                if($.IsEmail(enteredEmail)){
                    return true;
                } else {
                    $(this).parent().find("h1").after('<div role="status" class="message">Invalid email address</div>');
                    $emailField.focus();
                    return false;
                }
            }
        });




        if($.browser.msie && parseFloat($.browser.version) < 10){
            if ($("<input />").prop("required") === undefined) {
                $(document).on("submit", function(e) {
                    $(this)
                        .find("input, select, textarea")
                        .filter("[required]")
                        .filter(function() { return this.value == ''; })
                        .each(function() {
                            e.preventDefault();
                            $(this).css({ "border-color":"#78d2db" });
                            //alert( $(this).prev('label').html() + " is required!");
                        });
                });
            }
        }

        $.fixChromeDropdownArrow(); // Fix Chrome ver36 Flatui select arrow problem..


        // DataTable Tooltip
        if($("#appInternal-App .table.dataTable").length > 0){
            $(".table.dataTable td").on("mouseover", function(e){
                var $table = $(this).closest('table');
                if(!$table.find('tr:nth-child(1)').isOnScreen() || $(this).hasClass("tdToolTipData")){
                    var tdToolTipData = "";
                    if($(this).hasClass("tdToolTipData") && $.trim($(this).find(".tdToolTipDataText").text()) !== ""){
                        var tdToolTipDataHtml = $(this).find(".tdToolTipDataText").html();
                        tdToolTipData = "<hr>"+ $.nl2br(tdToolTipDataHtml);
                    }


                    if($(this).find(".tdToolTip").length === 0){
                        var cell = $(this).closest('td');
                        var cellIndex = cell[0].cellIndex +1;
                        var thCellTxt = $(this).closest('table').find('th:nth-child('+cellIndex+')').html();
                        var cellWidth = cell.width();
                        var cellHeight = cell.height();


                        // adjust vertical position for no search box, no pagination, and filters.....
                        var adjPosition = 0;
                        if(+$table.parent().children("div").length === 1 && $table.parent().find(".dataTables_processing").length === 1){
                            adjPosition = -40;
                        }


                        if(typeof thCellTxt === "undefined"){thCellTxt = "";}

                        if(thCellTxt.trim() !== ""){
                            $(".tdToolTip").remove();
                            $(this).prepend('<div class="tdToolTip">'+thCellTxt + tdToolTipData+'<div class="tdToolTipArrow arrow-down"></div></div>');

                            var toolTipHeight = $(this).find(".tdToolTip").height() - 17;
                            var tooltipWidth = $(".tdToolTip").width();

                            var toolTipLeftAdj = 0;
                            if($(this).hasClass("tdToolTipData") && tooltipWidth > 80){
                                $(this).find(".tdToolTip").addClass("tdToolTipMoveLeft");
                                toolTipLeftAdj = tooltipWidth;
                            }

                            var tblOffset = $(this).closest("table").offset();
                            var top  = (cell.offset().top  - tblOffset.top)  - toolTipHeight + adjPosition;
                            var left = cell.offset().left - tblOffset.left - (tooltipWidth - cellWidth)/2 -4;

                            var arrowTop = toolTipHeight + 35 + "px";
                            var arrowLeft = tooltipWidth/2 - 5 + "px";

                            if(toolTipLeftAdj != 0){
                                left = left - (toolTipLeftAdj/2) + cellWidth - cellWidth/2;
                                arrowLeft = tooltipWidth - 30 + "px";
                            }
                            $(this).find(".tdToolTipArrow").css("top", arrowTop);
                            $(this).find(".tdToolTipArrow").css("left", arrowLeft);

                            $('.tdToolTip').css({top: top-15,left: left}).css({opacity:0}).animate({
                                top: top,
                                opacity: '1'
                            }, 200, function() {
                            });
                        }

                    }
                }

            });
            $(".table.dataTable td").on("mouseout", function(e) {
                if(!$(this).closest('table').find('tr:nth-child(1)').isOnScreen() || $(".tdToolTip").length > 0) {
                    $(".tdToolTip").remove();
                }
            });
        }

        if($("#standardForm").length > 0){
            var updateOptions = function(){
                if($("#type").val() === "YES_NO"){
                    $("#assetTypeClassification select, select#weight, select#core").removeAttr("disabled");
                    $("#assetTypeClassification button, #assetWeight button, #coreStandard button").removeClass("disabled");

                    $(document).find("#assetTypeClassification .dropdown-menu li").removeClass("disabled");
                    $(document).find("#assetWeight .dropdown-menu li").removeClass("disabled");
                    $(document).find("#coreStandard .dropdown-menu li").removeClass("disabled");
                } else {
                    $("#assetTypeClassification select").attr("disabled","true");
                    $("#assetTypeClassification button").addClass("disabled");
                    $("select#weight").attr("disabled","true");
                    $("button#weight").addClass("disabled");
                    $("#coreStandard select").attr("disabled","true");
                    $("#coreStandard button").addClass("disabled");
                }
            }
            updateOptions();

            $(document).on("change", "#type", function(){
                $(document).find("#assetTypeClassification .dropdown-menu li, #assetWeight .dropdown-menu li").removeClass("selected");
                if($("#type").val() === "YES_NO"){
                    $("#assetTypeClassification select").val("null");
                    $("#weight").val("1.0");

                    $(document).find("#assetTypeClassification .dropdown-menu li:nth-child(1)").addClass("selected");
                    $(document).find("#assetWeight .dropdown-menu li:nth-child(2)").addClass("selected");

                    var val1 = $("#assetTypeClassification select option:nth-child(1)").text();
                    var val2 = $("#assetWeight select option:nth-child(2)").text();

                    $("#assetTypeClassification button .filter-option.pull-left").html(val1);
                    $("#assetWeight button .filter-option.pull-left").html(val2);

                } else {
                    $("#assetTypeClassification select").val("null");
                    $("select#weight").val("0.0");
                    $("#coreStandard select").val("null");

                    $("select#weight option").removeAttr("selected");
                    $("select#weight option:nth-child(1)").attr("selected","selected");

                    $("#coreStandard select option").removeAttr("selected");
                    $("#coreStandard select option:nth-child(0)").attr("selected","selected");
                    $("#coreStandard .dropdown-menu li").removeClass("selected");

                    var val1 = $("#assetTypeClassification select option:nth-child(1)").text();
                    var val2 = $("#assetWeight select option:nth-child(1)").text();
                    var val3 = $("#coreStandard select option:nth-child(1)").text();

                    $("#assetTypeClassification button .filter-option.pull-left").html(val1);
                    $("#assetWeight button .filter-option.pull-left").html(val2);
                    $("#coreStandard button .filter-option.pull-left").html(val3);

                    $(document).find("#assetTypeClassification .dropdown-menu li:nth-child(1)").addClass("selected");
                    $(document).find("#assetWeight .dropdown-menu li:nth-child(2)").addClass("selected");
                    $(document).find("#coreStandard .dropdown-menu li:nth-child(1)").addClass("selected");
                }
                updateOptions();
            });
        }
        if($(".helpTextPopup").length > 0){
            $(".helpTextPopup").click(function(e) {
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
        }


        if($(".evalNoteIcon").length > 0 && $("#evalCalculatorPage").length == 0){
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
                                if(result === 'delete' || newNote === ""){
                                    $this.removeClass("fui-chat").addClass("fui-bubble")
                                    $this.parent().find(".evalNoteText").text("");
                                }
                                else if (result === true) {
                                    $this.removeClass("fui-bubble").addClass("fui-chat")
                                    $this.parent().find(".evalNoteText").text(newNote);
                                }
                                var target_row = $this.closest("tr").get(0);
                                var newHtml = $this.parent().html();
                                oTable.fnUpdate( newHtml, target_row, 18);
                            },
                            error: function(jqXHR, textStatus, errorThrown){}
                        });
                    }
                });
            });
        }

        if($(".fhsSelect").length > 0){
            $(".fhsSelect").selectpicker({style: 'btn-wt form-control', menuStyle: 'dropdown-inverse'});
        }

        if($(".fhsSelectDark").length > 0){
            $(".fhsSelectDark").selectpicker({style: 'btn-default', menuStyle: 'dropdown-inverse'});
        }


        if($.fn.select2){
            $.fn.select2.defaults = $.extend($.fn.select2.defaults, {
                matcher: function(term, text) {
                    if ($.trim(term) === '') {
                        return true;
                    }
                    var term1 = term.replace(/\,/g, '').toUpperCase();
                    var text1 = text.replace(/\,/g, '').toUpperCase();
                    return text1.indexOf(term1)>=0;
                }
            });
        }

        if($(".fhsSelect2").length > 0){
            $(".fhsSelect2").select2({
                placeholder: "Nothing Selected",
                width: 300,
                allowClear: true
            });
        }


        if($("#generateStandardPdfBtn").length > 0){
            $("#generateStandardPdfBtn").on("click", function(e){
                e.preventDefault();
                $('#standardsPDFGenerator form #reloadOption').val("false");
                $('#standardsPDFGenerator form').attr('action', "/standardsReport/generate").submit();
            });
            $("#standardYearId, #assetTypeId").on("change", function(e){
                e.preventDefault();
                $('#standardsPDFGenerator form #reloadOption').val("true");
                $('#standardsPDFGenerator form').attr('action', "/standardsReport/generator").submit();
            });

        }

        // fixing IE9 datatable white space bug
        if($.browser.msie && parseFloat($.browser.version) < 10 && $("table").length > 0){
            var expr = new RegExp('>[ \t\r\n\v\f]*<', 'g');
            $("table").each(function(){
                var tbhtml = $(this).html();
                $(this).html(tbhtml.replace(expr, '><'));
            });
        }

        if($.browser.msie && parseFloat($.browser.version) < 9){
            var modalId = "myModal";
            var modalTitle = "Browser Warning";
            var modalContent = "We detect that you are using an outdated version of Internet Explorer. For the best experience on this website and others, we advise upgrading to Internet Explorer 11, or using Chrome or Firefox. " +
                "Please contact <a href='mailto:support@forbestravelguide.com'>support@forbestravelguide.com</a> if you need assistance.";
            var noTxt = "";
            var yesTxt = "CLOSE";
            fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){});
        }

        $("#sectionTitleForNote").click(function(e) {
            e.preventDefault();
            var modalId = "myModal";
            var modalTitle = "Section Notes";
            var modalContent = $($(this).attr("data-helpContent")).html();
            var noTxt = "";
            var yesTxt = "CLOSE";
            e.stopImmediatePropagation();
            modalContent = $.nl2br(modalContent)
            fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){
            });
        });







        if($(".archiveModalLink").length > 0){
            $(document).on("click", ".archiveModalLink", function(e) {
                e.preventDefault();
                var $this = $(this);
                var modalId = "archiveModal";
                var action = $this.attr("data-action");
                var modalTitle = action + " Asset";
                var linkUrl = $this.attr("href");
                var evalTitle = $this.parents("tr").find(".evalTitle a").text();
                var noTxt = "CANCEL";
                var yesTxt = "YES";
                var modalForm = '<br/>Are you sure you want to <span class="allLowerCase">'+action+'</span> this asset?<br/><br/><br/>';

                e.stopImmediatePropagation();
                fhsAlert(modalId,modalTitle, modalForm, noTxt, yesTxt, function(result){
                    if (result === false) {
                        return false;
                    } else {
                        window.location.href = linkUrl;
                    }
                });
            });
        }




        if($("#evaluationCMS .editAnswer").length > 0){
            CKEDITOR.config.height = 100;
            CKEDITOR.config.width = 'auto';
            $(document).on("click",".answerSelect .radio", function(){
                var $form = $(this).closest("form");
                var ckId = $form.find("textarea.form-control").attr("id");
                var noteTextVal = CKEDITOR.instances[ckId].getData();
                var autoFillText = $form.find(".autoFillData").attr("data-autoFill");
                var status = $form.find(".autoFillData").attr("data-status");
                var isYes = false;
                if($form.find(".bgClassYes").length > 0){
                    isYes = true;
                }

                // console.log("text val :"+noteTextVal);
                // console.log("autoFillText :"+autoFillText);
                // console.log("status :"+status);
                // console.log("isYes :"+isYes);

                // if(status === "EVALUATION_IN_PROGRESS" || status === "APPROVED_PUBLISHED"){
                //     if(isYes && noteTextVal === ""){
                //         CKEDITOR.instances[ckId].setData(autoFillText);
                //     }
                // } else {

                if(autoFillText){
                    if(isYes && noteTextVal === ""){
                        CKEDITOR.instances[ckId].setData(autoFillText);
                    }
                    if(isYes && noteTextVal !== ""){
                        var confirmAutofill = confirm("Auto-fill text will overwrite this answer. Do you want to proceed?");
                        if (confirmAutofill == true) {
                            CKEDITOR.instances[ckId].setData(autoFillText);
                        }
                    }
                }
                // }
            });
        }







    });







