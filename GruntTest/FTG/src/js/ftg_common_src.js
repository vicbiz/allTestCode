// (function($) {
//
//     // Matches trailing non-space characters.
//     var chop = /(\s*\S+|\s)$/;
//
//     // Matches the first word in the string.
//     var start = /^(\S*)/;
//
//     // Return a truncated html string.  Delegates to $.fn.truncate.
//     $.truncate = function(html, options) {
//         return $('<div></div>').append(html).truncate(options).html();
//     };
//
//     // Truncate the contents of an element in place.
//     $.fn.truncate = function(options) {
//         if ($.isNumeric(options)) options = {length: options};
//         var o = $.extend({}, $.truncate.defaults, options);
//
//         return this.each(function() {
//             var self = $(this);
//
//             if (o.noBreaks) self.find('br').replaceWith(' ');
//
//             var text = self.text();
//             var excess = text.length - o.length;
//
//             if (o.stripTags) self.text(text);
//
//             // Chop off any partial words if appropriate.
//             if (o.words && excess > 0) {
//                 var truncated = text.slice(0, o.length).replace(chop, '').length;
//
//                 if (o.keepFirstWord && truncated === 0) {
//                     excess = text.length - start.exec(text)[0].length - 1;
//                 } else {
//                     excess = text.length - truncated - 1;
//                 }
//             }
//
//             if (excess < 0 || !excess && !o.truncated) return;
//
//             // Iterate over each child node in reverse, removing excess text.
//             $.each(self.contents().get().reverse(), function(i, el) {
//                 var $el = $(el);
//                 var text = $el.text();
//                 var length = text.length;
//
//                 // If the text is longer than the excess, remove the node and continue.
//                 if (length <= excess) {
//                     o.truncated = true;
//                     excess -= length;
//                     $el.remove();
//                     return;
//                 }
//
//                 // Remove the excess text and append the ellipsis.
//                 if (el.nodeType === 3) {
//                     // should we finish the block anyway?
//                     if (o.finishBlock) {
//                         $(el.splitText(length)).replaceWith(o.ellipsis);
//                     } else {
//                         $(el.splitText(length - excess - 1)).replaceWith(o.ellipsis);
//                     }
//                     return false;
//                 }
//
//                 // Recursively truncate child nodes.
//                 $el.truncate($.extend(o, {length: length - excess}));
//                 return false;
//             });
//         });
//     };
//
//     $.truncate.defaults = {
//
//         // Strip all html elements, leaving only plain text.
//         stripTags: false,
//
//         // Only truncate at word boundaries.
//         words: false,
//
//         // When 'words' is active, keeps the first word in the string
//         // even if it's longer than a target length.
//         keepFirstWord: false,
//
//         // Replace instances of <br> with a single space.
//         noBreaks: false,
//
//         // if true always truncate the content at the end of the block.
//         finishBlock: false,
//
//         // The maximum length of the truncated html.
//         length: Infinity,
//
//         // The character to use as the ellipsis.  The word joiner (U+2060) can be
//         // used to prevent a hanging ellipsis, but displays incorrectly in Chrome
//         // on Windows 7.
//         // http://code.google.com/p/chromium/issues/detail?id=68323
//         ellipsis: '\u2026' // '\u2060\u2026'
//
//     };
//
// })(jQuery);
//


// FTG CMS Common Utility Functions ***********************************************
    var ftgUtil = {
        init : function(){

            ftgUtil.jqExtend();

        },


        // updateFilterizeHeight: function(){
        //     setTimeout(function(){
        //         var newHeight = $('.filter-container').height();
        //         $('.filter-container > div').each(function(){
        //             newHeight += $(this).height();
        //         });
        //         $('.filter-container').height(newHeight+50);
        //         // console.log("newHeight: "+newHeight);
        //     },500);
        // },

        updateEmptyFilter: function(){
            var totalCategory = 0;
            $(".filter-container .propFilter a").each(function(){
                var filter = $(this).attr("data-filter");
                var count = $(".filter-container .propBox[data-category='"+filter+"']").length;
                // console.log("count : "+filter+" count : "+count);
                $(this).attr("data-filterCounter",count);
                if(count == 0){
                    $(this).hide();
                } else {
                    totalCategory++;
                }
            });
            // console.log("totalCategory :"+totalCategory);
            if(totalCategory < 2){
                $(".filter-container .propFilter").hide();
            }
        },



        sortProperty: function(sortItem, sortBy, sortWrap){
            // $(sortItem).fadeTo("fast" , 0);
            var divList = $(sortItem);
            divList.sort(function(a, b){
                return String.prototype.localeCompare.call($(a).data(sortBy).toLowerCase(), $(b).data(sortBy).toLowerCase());
            });
            $(sortWrap).html(divList);
            // setTimeout(function(){
            //     $(sortItem).fadeTo("slow" , 1);
            // },200);
        },

        filterProperty: function(filterItem, filterBy){
            $(filterItem).hide().removeClass("show hidden");
            $(filterItem).parent().find("[data-category='" + filterBy + "']").fadeIn(500);
            if($(".destinationFilter").length >0){
                if($(".destinationFilter ul li").length < 3){
                    $(".destinationFilterWrap").remove();
                } else {
                    $(".destinationFilter ul li").hide().removeClass("visible");
                    $(".destinationFilter ul li").each(function(){
                        var dest = $(this).attr('value');
                        if($("#propertyList .propBox."+dest+":visible").length > 0 || dest === 'All'){
                            $(this).show().addClass("visible");
                        }
                    });
                }
            }
        },

        updateCounter: function(filterItem, counterId){
            var count = $(filterItem+":visible").length;
            var countTxt = ' PROPERTIES';
            $(counterId).text(count < 2 ? count+ ' PROPERTY' : count+ ' PROPERTIES');
        },

        updateFilterSort: function(filter1){
            if($(".filterSort").length > 0){

                $(document).on("click",".filterSortSelected", function () {
                    if($(this).hasClass('destinationSelected')){
                        $(this).parent().parent().find(".filterSortMenu").toggle();
                    } else {
                        $(this).parent().find(".filterSortMenu").toggle();
                    }
                });
                $(document).on("click",".filterSortMenu li", function () {
                    var $this = $(this);
                    var hasActiveClass = $(this).hasClass('active');
                    var sortVal = $(this).attr("value");
                    var $targetSortMenu = $(this).closest(".filterSortMenu");
                    var isDestinationFilter = $targetSortMenu.hasClass('destinationFilter');
                    var currentPropertyType;

                    switch($("#filterButtonWrap a.active").attr("data-filter")) {
                        case '1':
                            currentPropertyType = 'HOTEL';
                            break;
                        case '2':
                            currentPropertyType = 'RESTAURANT';
                            break;
                        case '3':
                            currentPropertyType = 'SPA';
                            break;
                        default:
                            currentPropertyType = '';
                    }

                    $targetSortMenu.find("li").removeClass("active");
                    $this.addClass("active");

                    if(!isDestinationFilter){
                        if(filter1){
                            filter1.filterizr('sort', sortVal, 'asc');
                        }

                        if(!hasActiveClass){
                            var filterItem = $(this).attr('value');
                            ftgUtil.sortProperty("#propertyList .filtr-item", filterItem, "#propertyList");
                        };

                    } else {
                        var destinationVal =  (sortVal == 'All' ? '' : '.'+sortVal);
                        var filterTxt = "#propertyList .propBox."+currentPropertyType+destinationVal;
                        $('#propertyList .propBox').hide();
                        $(filterTxt).show();
                        ftgUtil.updateCounter("#propertyList .filtr-item", ".filterDisplayingCount");

                    }
                    updateFilterSort();
                    $targetSortMenu.hide();
                });

                var updateFilterSort = function(){
                    $(".filterSort").each(function(){
                        var selectedText = $(this).find(".filterSortMenu li.active").text();
                        $(this).find(".filterSortSelected").text(selectedText);
                    });
                    $(".filterSortMenu").hide();
                }
                updateFilterSort();

                $(".filterSort").mouseleave(function(){
                        $(".filterSortMenu").hide();
                });

            }
        },


        getUrlParameter : function(sParam){
            var sPageURL = decodeURIComponent(window.location.search.substring(1)),
                sURLVariables = sPageURL.split('&'),
                sParameterName,
                i;

            for (i = 0; i < sURLVariables.length; i++) {
                sParameterName = sURLVariables[i].split('=');
                if (sParameterName[0] === sParam) {
                    return sParameterName[1] === undefined ? true : sParameterName[1];
                }
            }
        },

        loadJS :  function(u){
            var r=document.getElementsByTagName("script")[ 0 ],s=document.createElement("script");s.src=u;r.parentNode.insertBefore(s,r);
        },

        htmlSubstring : function(s, n) {
            var m, r = /<([^>\s]*)[^>]*>/g,
                stack = [],
                lasti = 0,
                result = '';

            //for each tag, while we don't have enough characters
            while ((m = r.exec(s)) && n) {
                //get the text substring between the last tag and this one
                var temp = s.substring(lasti, m.index).substr(0, n);
                //append to the result and count the number of characters added
                result += temp;
                n -= temp.length;
                lasti = r.lastIndex;

                if (n) {
                    result += m[0];
                    if (m[1].indexOf('/') === 0) {
                        //if this is a closing tag, than pop the stack (does not account for bad html)
                        stack.pop();
                    } else if (m[1].lastIndexOf('/') !== m[1].length - 1) {
                        //if this is not a self closing tag than push it in the stack
                        stack.push(m[1]);
                    }
                }
            }

            //add the remainder of the string, if needed (there are no more tags in here)
            result += s.substr(lasti, n);

            //fix the unclosed tags
            while (stack.length) {
                result += '</' + stack.pop() + '>';
            }

            return result;
        },

        stripHtml : function(str){
            return str.replace(/<\/?[^>]+(>|$)/g, "");
        },






        jqExtend : function(){
            // Matches trailing non-space characters.
            var chop = /(\s*\S+|\s)$/;

            // Matches the first word in the string.
            var start = /^(\S*)/;

            // Return a truncated html string.  Delegates to $.fn.truncate.
            $.truncate = function(html, options) {
                return $('<div></div>').append(html).truncate(options).html();
            };

            // Truncate the contents of an element in place.
            $.fn.truncate = function(options) {
                if ($.isNumeric(options)) options = {length: options};
                var o = $.extend({}, $.truncate.defaults, options);

                return this.each(function() {
                    var self = $(this);

                    if (o.noBreaks) self.find('br').replaceWith(' ');

                    var text = self.text();
                    var excess = text.length - o.length;

                    if (o.stripTags) self.text(text);

                    // Chop off any partial words if appropriate.
                    if (o.words && excess > 0) {
                        var truncated = text.slice(0, o.length).replace(chop, '').length;

                        if (o.keepFirstWord && truncated === 0) {
                            excess = text.length - start.exec(text)[0].length - 1;
                        } else {
                            excess = text.length - truncated - 1;
                        }
                    }

                    if (excess < 0 || !excess && !o.truncated) return;

                    // Iterate over each child node in reverse, removing excess text.
                    $.each(self.contents().get().reverse(), function(i, el) {
                        var $el = $(el);
                        var text = $el.text();
                        var length = text.length;

                        // If the text is longer than the excess, remove the node and continue.
                        if (length <= excess) {
                            o.truncated = true;
                            excess -= length;
                            $el.remove();
                            return;
                        }

                        // Remove the excess text and append the ellipsis.
                        if (el.nodeType === 3) {
                            // should we finish the block anyway?
                            if (o.finishBlock) {
                                $(el.splitText(length)).replaceWith(o.ellipsis);
                            } else {
                                $(el.splitText(length - excess - 1)).replaceWith(o.ellipsis);
                            }
                            return false;
                        }

                        // Recursively truncate child nodes.
                        $el.truncate($.extend(o, {length: length - excess}));
                        return false;
                    });
                });
            };

            $.truncate.defaults = {
                // Strip all html elements, leaving only plain text.
                stripTags: false,

                // Only truncate at word boundaries.
                words: false,

                // When 'words' is active, keeps the first word in the string
                // even if it's longer than a target length.
                keepFirstWord: false,

                // Replace instances of <br> with a single space.
                noBreaks: false,

                // if true always truncate the content at the end of the block.
                finishBlock: false,

                // The maximum length of the truncated html.
                length: Infinity,

                // The character to use as the ellipsis.  The word joiner (U+2060) can be
                // used to prevent a hanging ellipsis, but displays incorrectly in Chrome
                // on Windows 7.
                // http://code.google.com/p/chromium/issues/detail?id=68323
                ellipsis: '\u2026' // '\u2060\u2026'
            };
        },




        readMore : function(){
            var moreText = "READ MORE";
            var lessText = "LESS";

            $('.readMore').each(function() {
                var $this = $(this);

                var showChar = $(this).attr("data-maxChar");
                var content = $(this).html();

                if(content.length > showChar) {
                    var shortenContent = $.truncate(content, {
                        length: showChar,
                        ellipsis: ' ...',
                        words: true
                    });
                    var html = '<span class="fullContent hidden">'+content+'</span><span class="shortContent">'+shortenContent+'</span><a href="" class="morelink">' + moreText + '</a>';
                    // console.log("length : "+$("#destinationTravelGuidePage").length);
                    if($("#destinationTravelGuidePage").length > 0){
                        html = '<span class="fullContent hidden">'+content+'<a href="" class="morelink less">' + lessText + '</a></span><span class="shortContent">'+shortenContent+'<a href="" class="morelink">' + moreText + '</a></span>';
                    }
                    $(this).html(html);
                }
                $this.css("max-height","none");
            });

            $(".morelink").click(function(){
                if($("#destinationTravelGuidePage").length == 0) {
                    if ($(this).hasClass("less")) {
                        $(this).removeClass("less");
                        $(this).html(moreText);
                    } else {
                        $(this).addClass("less");
                        $(this).html(lessText);
                    }
                }
                $(this).parent().parent().find(".fullContent, .shortContent").toggleClass("hidden");
                return false;
            });
        },
    };

    ftgUtil.init();


    $.fn.isOnScreen = function(test){

        var height = this.outerHeight();
        var width = this.outerWidth();

        if(!width || !height){
            return false;
        }

        var win = $(window);

        var viewport = {
            top : win.scrollTop(),
            left : win.scrollLeft()
        };
        viewport.right = viewport.left + win.width();
        viewport.bottom = viewport.top + win.height();

        var bounds = this.offset();
        bounds.right = bounds.left + width;
        bounds.bottom = bounds.top + height;

        var showing = {
            top : viewport.bottom - bounds.top,
            left: viewport.right - bounds.left,
            bottom: bounds.bottom - viewport.top,
            right: bounds.right - viewport.left
        };

        if(typeof test == 'function') {
            return test(showing);
        }

        return showing.top > 0
            && showing.left > 0
            && showing.right > 0
            && showing.bottom > 0;
    };