
// Todo : need to adjust when images re-organized
// Lazyload Dynamic Image Size ************************************************
// Property page using data-srcset for image
window.lazySizesConfig = window.lazySizesConfig || {};
window.lazySizesConfig.preloadAfterLoad = true;
window.lazySizesConfig.customMedia = {
    '--small':	'(max-width: 10px)',
    '--medium': '(max-width: 20px)',
    '--large':	'(max-width: 30px)',
    '--xlarge': '(max-width: 9900px)',
};

$(function(){
    // $(window).load(function(){  // Run JS after all components loaded
    $(document).ready(function() {

        // update onClick google Analytics callback to fix Safari new tab open problem
        var isIMobile = false;
        if(navigator.platform == 'iPad' || navigator.platform == 'iPhone' || navigator.platform == 'iPod') {
            isIMobile = true;
        }
        var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

        if(!isIMobile && is_safari) {
            $('[onclick]').each(function(){
                var newfn = "window.open('"+this.href+"', '_blank'); return false;";
                if(this.outerHTML.indexOf("_blank") == -1){
                    newfn = "document.location = '"+this.href+"'; return false;";
                }
                this.outerHTML = this.outerHTML.replace("return false;", newfn);
                // console.log("updated : "+this.outerHTML);
            });

        }


        $(this).scrollTop(0); // Force page scroll position to top at page refresh in HTML

        var isBlog = false;
        var globalImageBase = "";
        var blogSearchServer = "";


        if($("#ftgNavWrap").length > 0){
            isBlog = true;


            var blogTargetServer = ftgUtil.getUrlParameter("blog");

            switch(blogTargetServer) {
                case "local":
                    blogSearchServer = "http://localhost:8080";
                    break;
                case "qa":
                    blogSearchServer = "https://www.qa.forbestravelguide.com";
                    break;
                case "stage":
                    blogSearchServer = "https://www.stage.forbestravelguide.com";
                    break;
                default:
                    blogSearchServer = "https://www.forbestravelguide.com";
                    break;
            }

            globalImageBase = blogSearchServer+"/src";
            var formAction = $(".globalSearchForm").attr("action");
            $("#navbar-ftgLogo").attr("href", blogSearchServer);
            $(".globalSearchForm").attr("action", formAction);

            $.ajax({
                url: blogSearchServer+"/news.json",
                data: { format: 'json'},
                type: 'GET',
                dataType: 'json',
                success: function(data) {

                    // console.log(data);

                    // ** Header **
                    $("#blogNavDest").attr("href",blogSearchServer+"/destinations").text(data.headerInclude.destinationsLabel);
                    $("#blogStories").text(data.headerInclude.storiesLabel);
                    $("#blogNavAward").attr("href",blogSearchServer+"/award-winners").text(data.headerInclude.awardWinnersLabel);
                    $("#blogNavOffers").attr("href",blogSearchServer+"/special-offers").text(data.headerInclude.offersLabel);

                    if(data.headerInclude.offersLabel !== ""){
                        $("#blogNavOffersWrap").removeClass("hidden");
                    }

                    // Todo : delete below when SSL stable....
                    // $("#navbar-ftgLogo .topMobileDefault").attr("src",globalImageBase+"/images/ftg-logo.svg")
                    // $("#navbar-ftgLogo .topMobileActive").attr("src",globalImageBase+"/images/ftg-logoo-white.svg")

                    // ** Footer **
                    $("#instagramFeed").attr("data-token", data.template.instagramToken);
                    $(".step1").text(data.footerInclude.signUpButtonText);
                    $(".step2 input").attr("placeholder", data.footerInclude.enterEmailText);
                    $(".step2 .searchArrow").attr("src", globalImageBase+"/images/searchArrow.svg");
                    $(".step3 .btnRoundPurple").text(data.footerInclude.confirmationText);

                    for(var i=0; i<8; i++){
                        var j=i+1;
                        if( data.footerInclude.linkUrls[i] === "https://store.forbestravelguide.com/"){
                            $("#ftgFooter #fnLink"+j).attr("href",data.footerInclude.linkUrls[i]).text(data.footerInclude.linkText[i]);
                        } else {
                            $("#ftgFooter #fnLink"+j).attr("href",blogSearchServer+data.footerInclude.linkUrls[i]).text(data.footerInclude.linkText[i]);
                        }
                    }

                    for(var i=0; i<4; i++){
                        var j=i+1;
                        $("#ftgFooter #fsLink"+j).attr("href",data.footerInclude.socialUrls[i]); $("#ftgFooter #fsLink"+j+" img").attr("src",data.footerInclude.socialIconUrls[i]);
                    }


                    var signUpTextHTML = data.footerInclude.signUpText + '<p class="checkboxWrap"><input type="checkbox" id="newsAgreeFooter" class="newsLetterCheckBox"> <label for="newsAgreeFooter">'+data.footerInclude.checkboxText+'</label></p>';
                    $(".legalTextWrap").html(signUpTextHTML);

                    signUpTextHTML = data.footerInclude.signUpText + '<p class="checkboxWrap"><input type="checkbox" id="newsAgreePopup" class="newsLetterCheckBox"> <label for="newsAgreePopup">'+data.footerInclude.checkboxText+'</label></p>';
                    $(".popupNewsLetter .legalTextWrap").html(signUpTextHTML);

                    $(".errMsg").html(data.footerInclude.errorText);
                    $("#ftgFooter .footerLegal").html("©"+(new Date).getFullYear()+"&nbsp;"+data.footerInclude.legalText);
                    $("#ftgFooter .footerNote a").attr("href",data.footerInclude.helpUrl).text(data.footerInclude.helpText);



                    $("#signUpNewsLetterPopWrap h2").html(data.footerInclude.popupTitle);
                    $("#signUpNewsLetterPopWrap .signupText").html(data.footerInclude.popupText);

                    var updateCBox = function(){
                        if($(document).find("#cboxLoadedContent").length > 0){
                            $.colorbox.resize();
                        }
                    };
                    $(document).find(".newsLetterCheckBox").on("change", function(){
                        var $this = $(this);
                        var $targetWrap = $this.parentsUntil(".newsLetterBlock").parent();
                        var $errMsgWrap = $targetWrap.find(".errMsg");

                        $targetWrap.find('input[name="email"]').focus();

                        if($(this).is(":checked")){
                            $errMsgWrap.addClass("hidden");
                            updateCBox();
                        } else {
                            $errMsgWrap.removeClass("hidden");
                            updateCBox();
                        }
                    });


                    $("#ftgNavWrap, #ftgFooter").show();

                    var adjustInstaFeedImages = function(){
                        var instaBlockWidth = $("#instagramFeed .inastagramImgWrap").width();
                        $("#instagramFeed .inastagramImgWrap").css("height",instaBlockWidth+"px");
                        $("#instagramFeed .inastagramImg").each(function(){
                            var imgHeight = $(this).height();
                            if(imgHeight < instaBlockWidth){
                                $(this).css("height",instaBlockWidth+"px");
                            }
                        });
                    };

                    if($("#instagramFeed").length > 0){
                        var token = $("#instagramFeed").attr("data-token");
                        var instagramAPI = 'https://api.instagram.com/v1/users/435201892/media/recent?access_token='+token;
                        $.ajax({
                            type: "GET",
                            dataType: "jsonp",
                            url: instagramAPI,
                            success: function(result) {
                                if(result.meta.code == 400){
                                    console.log("instagram access code error...");
                                } else {
                                    var html = '';
                                    for(var i=0; i<4; i++){
                                        var item = result.data[i];
                                        // console.log(item);
                                        var linkUrl = item.link;
                                        var imgUrl = item.images.standard_resolution.url;
                                        html = '<div class="inastagramImgWrap col-xs-6 col-sm-3 col-md-3" id="instaFeed$'+i+'">';
                                        html += '<a href="'+linkUrl+'?taken-by=forbestravelguide" target="_blank"><img class="inastagramImg" src="'+imgUrl+'" data-pin-nopin="true"></a>';
                                        html += '<img class="iconInstagram" src="'+globalImageBase+'/images/icon-instagram.png" data-pin-nopin="true">';
                                        html += '</div>';
                                        $("#instagramFeed").append(html);
                                    };

                                    adjustInstaFeedImages();

                                }
                            },
                            error: function(jqXHR, textStatus, errorThrown) {
                                // console.log('<p>status code: '+jqXHR.status+'</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>'+jqXHR.responseText + '</div>');
                                console.log('jqXHR:');
                                console.log(jqXHR);
                                console.log('textStatus:');
                                console.log(textStatus);
                                console.log('errorThrown:');
                                console.log(errorThrown);
                            },
                        });

                        $(window).resize(function() {
                            adjustInstaFeedImages();
                        });
                    }

                },
                error: function() {
                }
            });

            setTimeout(function(){
                $.colorbox.resize();
            },500);
        } else {
            globalImageBase = $("body").attr("data-globalImageBase");
        }
        // console.log("isBlog : "+isBlog);
        // Todo: *********************************************************************



        /*
         // Todo: *********************************************************************
         var userAgent = window.navigator.userAgent.toLowerCase(),
         safari = /safari/.test( userAgent ),
         ios = /iphone|ipod|ipad/.test( userAgent );

         var deviceOS = "";
         if( ios ) {
         if ( safari ) {
         deviceOS = "iOSBrowser";
         } else if ( !safari ) {
         deviceOS = "webview";
         // alert("found webview _blank: "+$("a[target='_blank']").length);
         // $("a[target='_blank']").attr("target","_system");// Not working......
         };
         } else {
         deviceOS = "notIOS";
         };
         */


        var updateAccoladePosition  = function($accoladeWrap){
            $accoladeWrap.each(function(){
                var $accolade = $(this).find(".accolade");
                var positionTop = $accolade.outerHeight(true);
                // fix Firefox outerHeight problem
                if (positionTop % 2 === 1){
                    positionTop = positionTop -1;
                }
                $accolade.css("top","-"+positionTop+"px");
                // console.log("new outerHeight top","-"+positionTop+"px");
            });
        };
        if($(".accoladeWrap").length > 0){
            updateAccoladePosition($(".accoladeWrap"));
        }


        var ftg = {

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            init : function(){

                // Device Detection ***************************************
                var isMobile = false; //initiate as false
                if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
                    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;
                // alert("Is this mobile device : "+isMobile);
                if(isMobile){
                    $("body").addClass("mobileDevice");
                }

                if(isMobile && $(".onlyMobile").length > 0){
                    $(".onlyDesktop").hide();
                    $(".onlyMobile").show();
                }
                // *******************************************************



                // NewsLetter Popup
                var newsLetterPopup = function(isMobile){
                    $(".step2 input").val("");
                    Cookies.set("newsLetterPopupDone",true, { expires: 7 });
                    $.colorbox({
                        href:"#signUpNewsLetterPopWrap",
                        inline:true, width:"500px",
                        maxWidth:"95%",
                        minWidth:"90%",
                        onClosed: function() {
                            if(isMobile){

                            }
                        },
                        onComplete: function(){
                            $(document).find("#popupNSEmail").focus();
                        }
                    });
                };
                if(isMobile){
                    var popupDone = Cookies.get("newsLetterPopupDone");
                    if(!popupDone){
                        newsLetterPopup(isMobile);
                    }
                } else {
                    $( "#homeNavWrap, #topMainNavWrap" ).mousemove(function( event ) {
                        var popupDone = Cookies.get("newsLetterPopupDone");
                        if(!popupDone){
                            if(event.clientY < 17){
                                newsLetterPopup(isMobile);
                            }
                        }
                    });
                }





                // ColorBox prevent background scroll
                $(document).on('cbox_open',function(){
                    $(document.body).css('overflow','hidden');
                }).on('cbox_closed',function(){
                    $(document.body).css('overflow','');
                });

                $(document).on('click', '#colorbox, #cboxWrapper', function(e) {
                    if (e.target !== this) return;
                    $.colorbox.close();
                });

                if($(".videoBgWrap").length > 0){
                    var isIOS = /iPad|iPhone|iPod/.test(navigator.platform);
                    // alert("isIOS : "+isIOS);
                    // if (isIOS) {
                    if (isMobile) {
                        // Disable Video Backgrond iOS device.
                        $(".videoBg video").remove();
                        $(".video-responsive .video, .video-responsive .canvas, .heroLinkBottom").hide();
                        $(".fullWidth.videoBgWrap").removeClass("videoBgWrap");
                        $(".videoBgWrap").css("background-image","url("+$(".videoBgWrap").attr("data-bgFallBack")+")");
                        $("#heroLinkBottom").remove();

                        // function iOSversion() {
                        //     if (/iP(hone|od|ad)/.test(navigator.platform)) {
                        //         // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
                        //         var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
                        //         return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
                        //     }
                        // }
                        // var iOSver = iOSversion();
                        // var iHeight = window.screen.height;
                        // if(iHeight > 480 && iOSver[0] > 9) {
                        //     // alert("ios : "+iOSver[0]+" height:"+iHeight);
                        //     // console.log('iOS verion 10 or above...');
                        //     var videos = document.querySelectorAll('video');
                        //     videos[0].play();
                        // } else {
                        //     $(".videoBg video").remove();
                        //     $(".video-responsive .video, .video-responsive .canvas, .heroLinkBottom").hide();
                        //     $(".fullWidth.videoBgWrap").removeClass("videoBgWrap");
                        //     $(".videoBgWrap").css("background-image","url("+$(".videoBgWrap").attr("data-bgFallBack")+")");
                        // }
                    }else {
                        // Use HTML5 video
                        $(".video-responsive .canvas").hide();
                        // document.querySelectorAll('.canvas')[0].style.display = 'none';
                    }
                }


                window.addEventListener("orientationchange", function() {
                    if($("#filterButtonWrap").length > 0){
                        $("#filterButtonWrap a.active").trigger("click");
                    }
                }, false);



                $(document).on("click",".filterSort .filterSortTriangle", function(){
                    $(this).parent().find(".filterSortSelected").trigger("click");
                });
                $(document).on("click","#searchResultContent .filterSortTriangle", function(){
                    $("#selectedTxt").trigger("click");
                });
                $(document).on("click",".filterSort .filterSortSelected", function(){
                    if($(this).hasClass('destinationSelected')){
                        $(this).parent().parent().find(".filterSortTriangle").toggleClass("opened");
                    } else {
                        $(this).parent().find(".filterSortTriangle").toggleClass("opened");
                    }
                });
                $(document).on("click",".filterSortMenu li", function(){
                    $(".filterSortTriangle").removeClass("opened");
                });

                $("#peopleList .morePeople .viewMore").on("click", function(){
                    $(this).closest(".peopleBlock").find(".midImageWrap.extraList").show();
                    $(this).hide();
                    $(this).parent().find(".viewLess").show();
                });
                $("#peopleList .morePeople .viewLess").on("click", function(){
                    $(this).closest(".peopleBlock").find(".midImageWrap.extraList").hide();
                    $(this).hide();
                    $(this).parent().find(".viewMore").show();
                });

                var shareEmailBody = $("#shareEmailBody").val();
                var body = shareEmailBody ? shareEmailBody + "\n\n" + window.location.href : window.location.href

                if($("#shareGroupBlock").length > 0){
                    var url = "https://assets.pinterest.com/js/pinit.js";
                    $.getScript( url, function() {
                        // Share Social Group  ************************************************
                        $("#shareGroupBox").jsSocials({
                            showLabel: false,
                            shareIn: "popup",
                            showCount: false,
                            shares: [
                                { share: "facebook", logo: globalImageBase+"/images/icon-social-facebook.svg"},
                                { share: "twitter", logo: globalImageBase+"/images/icon-social-tweeter.svg" },
                                // { share: "pinterest", logo: globalImageBase+"/images/icon-social-pintrest.svg"},
                                { share: "email", logo: globalImageBase+"/images/icon-social-email.svg", shareUrl: "mailto:?subject="+encodeURIComponent($(document).attr('title'))+"&body="+encodeURIComponent(body)}
                            ]
                        });
                        var pinterestHtml = '<div class="jssocials-share jssocials-share-pinterest"><a class="jssocials-share-link" data-pin-custom="true" data-pin-do="buttonBookmark" href="https://www.pinterest.com/pin/create/button/"><img class="jssocials-share-logo" src="/src/images/icon-social-pintrest.svg"></a></div>';
                        $("#shareGroupBox .jssocials-share-twitter").after(pinterestHtml);
                    });
                }


                $("#topMobileButton").on("click", function(){
                    var isMenuClosed = $("#navbar-collapsed").hasClass("in");
                    if(isMenuClosed){
                        $("#topMobileButton").show();
                        $("#closeMobileMenuX").hide();
                        setTimeout(function(){
                            $("#topMainNavWrap").removeClass("mobileMenuBg");
                            $(".topMobileDefault").show();
                            $(".topMobileActive").hide();
                            $("#navbar-collapsed").removeClass("in");
                            $("#ftgNavWrap").removeClass("fullWidth");
                            $("#topSearchIcon").show();
                        },450);
                    } else {
                        $("#topMainNavWrap").addClass("mobileMenuBg");
                        $(".topMobileDefault").hide();
                        $(".topMobileActive").show();
                        $("#topMobileButton").hide();
                        $("#closeMobileMenuX").show();
                        $("#ftgNavWrap").addClass("fullWidth");
                        $("#topSearchIcon").hide();
                    }
                });

                $("#closeMobileMenuX").on("click", function(){
                    $("#topMobileButton").trigger("click");
                });















                // News Letter Sign Up *************************************************************************************

                $(".signUpNewsLetterWrap .step1").on("click", function(e){
                    var $targetWrap = $(this).parentsUntil(".newsLetterBlock").parent();
                    var isFooter = false;
                    if($(e.target).is("footer *")){
                        isFooter = true;
                    }

                    $targetWrap.find(".step1").show();
                    $targetWrap.find(".step2").hide();

                    $targetWrap.find(".step1").hide();
                    $targetWrap.find(".step2").show();

                    $targetWrap.find(".step2 .signUpNewsLetterInput input").focus();
                    if(isFooter){
                        $(".footerNav, .footerSocialIcons").hide();
                    }
                    $(this).parent().parent().find(".newsLetterLegal").removeClass("hidden");
                });


                // Form Validation - News Letter Signup  ************************************************
                $.fn.validator.Constructor.DEFAULTS = 'focus:false';
                $.fn.validator.Constructor.INPUT_SELECTOR = ':input:not([type="submit"], [type="reset"], button, .search-field input):enabled, .chosen-select, .select2';

                var updateCBox = function(){
                    if($(document).find("#cboxLoadedContent").length > 0){
                        $.colorbox.resize();
                    }
                };

                $('.signUpNewsLetter').validator().on('submit', function (e) {
                    var $form = $(this);
                    var $targetWrap = $form.parentsUntil(".newsLetterBlock").parent();
                    var $agreeCheckbox = $targetWrap.find("input.newsLetterCheckBox");
                    var $errMsgWrap = $targetWrap.find(".errMsg");
                    var agreed = $agreeCheckbox.is(":checked");


                    if (e.isDefaultPrevented()) {
                        // console.log("error to submit");
                        return false;
                    } else {
                        e.preventDefault();
                        // console.log("good to submit");
                        if(agreed){
                            var formData = $form.serialize();
                            $targetWrap.find(".signUpNewsLetterInput").html("<span>Just a moment, please .....</span>");

                            $errMsgWrap.addClass("hidden");
                            if(!$targetWrap.hasClass("popupNewsLetter")){
                                $targetWrap.find(".legalTextWrap").addClass("hidden");
                            }
                            $(".newsLetterLegal").hide();
                            updateCBox();

                            $.ajax({
                                type: "POST",
                                url: blogSearchServer+'/api/newsletter/sign-up',
                                data: formData,
                                success: function(result) {
                                    $(".step1, .step2").hide();
                                    $(".step3").show();
                                    $(".signUpNewsLetterWrap").css({"border" : "none" , "width": "auto"});

                                    $(".footerNav, .footerSocialIcons").show();
                                    if(!$targetWrap.hasClass("popupNewsLetter")){
                                        $(".newsLetterLegal").addClass("hidden");
                                    }
                                    Cookies.set("newsLetterPopupDone",true, { expires: 365 });
                                },
                                error: function(jqXHR, textStatus, errorThrown) {
                                    // console.log('<p>status code: '+jqXHR.status+'</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>'+jqXHR.responseText + '</div>');
                                    console.log('jqXHR:');
                                    console.log(jqXHR);
                                    console.log('textStatus:');
                                    console.log(textStatus);
                                    console.log('errorThrown:');
                                    console.log(errorThrown);
                                },
                            });
                        } else {
                            $errMsgWrap.removeClass("hidden");
                            updateCBox();
                            return false;
                        }
                    }
                });

                $(".newsLetterBlock .newsLetterCheckBox").on("change", function(){
                    var $this = $(this);
                    var $targetWrap = $this.parentsUntil(".newsLetterBlock").parent();
                    var $errMsgWrap = $targetWrap.find(".errMsg");

                    $targetWrap.find('input[name="email"]').focus();

                    if($(this).is(":checked")){
                        $errMsgWrap.addClass("hidden");
                        updateCBox();
                    } else {
                        $errMsgWrap.removeClass("hidden");
                        updateCBox();
                    }
                });


                $(".signUpNewsLetter .searchArrow").on("click", function(){
                    $(this).closest("form").submit();
                });


                $(document).on("click", function(e){
                    var newsLetterSignUpClicked = $(e.target).is('.signUpNewsLetterWrap *, .signUpNewsLetterWrap, .newsLetterLegal *, .errMsg');
                    if(!newsLetterSignUpClicked){
                        if($("footer .step2").is(":visible")){
                            $("footer .step2").hide();
                            $("footer .step1").show();
                            $("footer .footerNav, footer .footerSocialIcons").show();
                            $("footer .newsLetterLegal").addClass("hidden");
                        }
                        if($("#signUpNewsLetterStatic .step2").is(":visible")){
                            $("#signUpNewsLetterStatic .step2").hide();
                            $("#signUpNewsLetterStatic .step1").show();
                            $("#signUpNewsLetterStatic .newsLetterLegal").addClass("hidden");
                        }
                    } else {
                        if($("#cboxLoadedContent .step2").is(":visible")){
                            $(document).find("#cboxLoadedContent .step2 input").focus();
                        }
                    }
                });


                $(document).on("keyup", ".signUpNewsLetterWrap .step2 .signUpNewsLetterInput input", function(e){
                    if (e.keyCode == 27) {
                        var isFooter = false;
                        if($(e.target).is("footer *")){
                            isFooter = true;
                        }
                        var $targetWrap = $(this).parentsUntil(".newsLetterBlock").parent();
                        $(this).val("").blur();
                        $targetWrap.find(".step2").hide();
                        $targetWrap.find(".step1").show();
                        if(isFooter){
                            $("footer .footerNav, .footerSocialIcons").show();
                        }
                        $targetWrap.find(".newsLetterLegal").addClass("hidden");
                    }
                });















                // Instagram Feed ************************************************
                // FTG Instagram user Id : 435201892
                // Access code : 435201892.1677ed0.da7b7948110048c9ba97cd492a4e7861
                // 435201892.1677ed0.da7b7948110048c9ba97cd492a4e7861
                // FTG https://api.instagram.com/v1/users/435201892/media/recent?access_token=435201892.1677ed0.da7b7948110048c9ba97cd492a4e7861

                var adjustInstaFeedImages = function(){
                    var instaBlockWidth = $("#instagramFeed .inastagramImgWrap").width();
                    $("#instagramFeed .inastagramImgWrap").css("height",instaBlockWidth+"px");
                    $("#instagramFeed .inastagramImg").each(function(){
                        var imgHeight = $(this).height();
                        if(imgHeight < instaBlockWidth){
                            $(this).css("height",instaBlockWidth+"px");
                        }
                    });
                };

                if($("#instagramFeed").length > 0){
                    var token = $("#instagramFeed").attr("data-token");
                    var instagramAPI = 'https://api.instagram.com/v1/users/435201892/media/recent?access_token='+token;
                    $.ajax({
                        type: "GET",
                        dataType: "jsonp",
                        url: instagramAPI,
                        success: function(result) {
                            if(result.meta.code == 400){
                                console.log("instagram access code error...");
                            } else {
                                var html = '';
                                for(var i=0; i<4; i++){
                                    var item = result.data[i];
                                    // console.log(item);
                                    var linkUrl = item.link;
                                    var imgUrl = item.images.standard_resolution.url;
                                    html = '<div class="inastagramImgWrap col-xs-6 col-sm-3 col-md-3" id="instaFeed$'+i+'">';
                                    html += '<a href="'+linkUrl+'?taken-by=forbestravelguide" target="_blank"><img class="inastagramImg" src="'+imgUrl+'" data-pin-nopin="true"></a>';
                                    html += '<img class="iconInstagram" src="'+globalImageBase+'/images/icon-instagram.png" data-pin-nopin="true">';
                                    html += '</div>';
                                    $("#instagramFeed").append(html);
                                };

                                adjustInstaFeedImages();

                            }
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            // console.log('<p>status code: '+jqXHR.status+'</p><p>errorThrown: ' + errorThrown + '</p><p>jqXHR.responseText:</p><div>'+jqXHR.responseText + '</div>');
                            console.log('jqXHR:');
                            console.log(jqXHR);
                            console.log('textStatus:');
                            console.log(textStatus);
                            console.log('errorThrown:');
                            console.log(errorThrown);
                        },
                    });

                    $(window).resize(function() {
                        adjustInstaFeedImages();
                    });
                }


                // Mouse Over Show Sub Purple Box Content ************************************************
                if($(".innerBoxWrap.hasHiddenBox").length >0){
                    $(".midImageWrap")
                        .mouseenter(function() {
                            $(this).find(".innerBoxWrap.hasHiddenBox").stop().animate({"opacity": 1},"fast");
                        })
                        .mouseleave(function() {
                            $(this).find(".innerBoxWrap.hasHiddenBox").stop().animate({"opacity": 0},"slow");
                        });
                }


                // Init Fix for  Bootstrap Dialog Modal Position Center of Window ***************************************
                if($(".modal").length > 0){
                    function setModalMaxHeight(element) {
                        this.$element     = $(element);
                        this.$content     = this.$element.find('.modal-content');
                        var borderWidth   = this.$content.outerHeight() - this.$content.innerHeight();
                        var dialogMargin  = $(window).width() < 768 ? 20 : 0;
                        var contentHeight = $(window).height() - (dialogMargin + borderWidth);
                        var headerHeight  = this.$element.find('.modal-header').outerHeight() || 0;
                        var footerHeight  = this.$element.find('.modal-footer').outerHeight() || 0;
                        var maxHeight     = contentHeight - (headerHeight + footerHeight);

                        this.$content.css({
                            'overflow': 'hidden'
                        });

                        this.$element
                            .find('.modal-body').css({
                            'max-height': maxHeight,
                            'overflow-y': 'auto'
                        });
                    }
                    $('.modal').on('show.bs.modal', function() {
                        $(this).show();
                        setModalMaxHeight(this);
                        // console.log('show.bs.modal');
                    });
                    // $('.modal').on('hide.bs.modal', function(){
                    //     console.log('hide.bs.modal');
                    //     // $('body').css({overflow: ''});
                    // });
                    // $(document).on("click","div[data-toggle='modal']", function(){
                    //     $("body").css("overflow","hidden");
                    // });

                    $(window).resize(function() {
                        if ($('.modal.in').length != 0) {
                            setModalMaxHeight($('.modal.in'));
                        }
                    });
                }


                // Init for colorbox Popup ***************************************
                $(".popupBoxLink").colorbox({
                    rel:'group1',
                    inline:true,
                    loop: false,
                    href:$(this).attr('href'),
                    current: "{current} of {total} pages" ,
                    // title: function(){
                    //     var url = $(this).attr('href');
                    //     return '<a href="' + url + '" target="_blank">Open In New Window</a>';
                    // }
                });



                // Init Read More.... ********************************************
                if($(".readMore").length > 0){
                    ftgUtil.readMore();
                }

                // Prevent Dropdown css broken click too fast......
                setTimeout(function(){
                    // $(".topNavSearch .globalSearchForm").css("opacity","1");
                    $(".topNavSearch .globalSearchForm, #heroSearch .globalSearchForm").fadeTo("fast",1, function(){
                        $(".topNavSearch .globalSearchForm .searchInput").removeAttr("disabled");
                    });
                },200);


                var globalSearch = {
                    init: function(){

                        $(document).on("click", ".mobileClose", function(e){
                            e.preventDefault();
                            $(".topNavSearch").removeClass("in");
                            $('.globalSearchWrap input.searchInput').val('').trigger("blur");
                            $("body").removeClass("activeMobileSearch");
                        });

                        $(document).on("blur", ".globalSearchWrap input", function(){
                            if($(".activeMobileSearch .topNavSearch .searchActive").length == 0){
                                if(!ftg.isMobile()){
                                    var $this = $(this);
                                    setTimeout(function(){
                                        var $globalSearchBlock = $this.closest(".globalSearchBlock");
                                        var isTopNav = globalSearch.isTopNav($this);
                                        if(isTopNav){
                                            $globalSearchBlock.css("z-index","");
                                        } else{
                                            var $outerSearch = $this.closest(".outerSearch");
                                            $outerSearch.css("z-index","");
                                        }
                                        $globalSearchBlock.find("form").removeClass("searchActive");
                                        $globalSearchBlock.find(".mobileSearchInfo, .globalSearchMenu").hide();
                                        $(".searchArrow").show();
                                    }, 300);
                                } else {
                                    $("#heroSearchWrap .globalSearchMenu").hide();
                                }
                            }
                        });


                        // $('.globalSearchForm .searchInput').val("");

                        // Wait for function till user stops typing
                        var timer = 0;
                        $(document).on("keydown", ".topNavSearch input, #heroSearch input", function(e){
                            var $this = $(this);

                            if(e.keyCode == 13 || e.keyCode == 27 || e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 13){
                                if(e.keyCode == 13){
                                    if($(".globalSearchMenu li.active").length > 0){
                                        if($(".globalSearchMenu li.active a").hasClass("viewAllResultLink")){
                                            $(".viewAllResultLink").trigger("click");
                                        }
                                        window.location.href = $(".globalSearchMenu li.active a").attr("href");
                                        e.preventDefault();
                                    }
                                } else {
                                    if (e.keyCode == 27) {
                                        $('.globalSearchWrap input').trigger("blur");
                                    } else {
                                        if(e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 13){
                                            if(e.keyCode == 40){
                                                if($(".globalSearchMenu .active").length === 0){
                                                    $(".globalSearchMenu li:first-child").addClass("active");
                                                } else {
                                                    var $activeLi = $(".globalSearchMenu li.active");
                                                    $(".globalSearchMenu li").removeClass("active");
                                                    $activeLi.next().addClass("active");
                                                }
                                            }
                                            if(e.keyCode == 38){
                                                if($(".globalSearchMenu .active").length === 0){
                                                    $(".globalSearchMenu li:first-child").addClass("active");
                                                } else {
                                                    var $activeLi = $(".globalSearchMenu li.active");
                                                    $(".globalSearchMenu li").removeClass("active");
                                                    $activeLi.prev().addClass("active");
                                                }
                                            }
                                        }
                                    }
                                }
                            } else {
                                if (timer) {
                                    clearTimeout(timer);
                                }
                                timer = setTimeout(function(){
                                    var query = $this.val();
                                    var isTopNav = globalSearch.isTopNav($this);
                                    var $dropDownObj = $this.closest("form").find(".globalSearchMenu");

                                    // console.log("query : "+query+" length : "+query.length+" isTopNav : "+isTopNav);

                                    $(".topNavSearch input.searchInput, #heroSearch input.searchInput").val(query);
                                    if(query.length > 1){
                                        globalSearch.getAjaxData(query, $dropDownObj, isTopNav);
                                    } else {
                                        globalSearch.getLocalStorageData($dropDownObj, isTopNav);
                                        $(".mobileSearchInfo").hide();
                                    }
                                }, 300);
                            }

                        });



                        // Prevent iOs auto Zoom & Scroll
                        $("#mobileSearch .globalSearchInputWrap input").on("focus", function(){
                            window.scrollTo(0, 0);
                            document.body.scrollTop = 0;
                        });

                        $("#heroSearch .fakeInput").on("click", function(){
                            if(ftg.isMobile()){
                                $("#topMainNavWrap #topSearchIcon").trigger("click");
                            }
                        });

                        $(".globalSearchInputWrap input").on("focus", function(){
                            var $this = $(this);
                            var $globalSearchForm = $(this).closest(".globalSearchForm");
                            var $globalSearchBlock = $(this).closest(".globalSearchBlock");
                            var isTopNav = globalSearch.isTopNav($this);
                            var existingQuery = $this.val();
                            var $dropDownObj = $(this).closest("form").find(".globalSearchMenu");

                            if(isTopNav){
                                $globalSearchForm.addClass("searchActive");
                                $globalSearchBlock.css("z-index","100");
                            } else{
                                $globalSearchForm.addClass("searchActive");
                            }

                            // if(existingQuery){
                            //     $this.trigger("keydown");
                            // }
                            $this.trigger("keydown");

                            // if (timer) {
                            //     clearTimeout(timer);
                            // }
                            // timer = setTimeout(function(){
                            //     var query = $this.val();
                            //     $(".topNavSearch input.searchInput, #heroSearch input.searchInput").val(query);
                            //
                            //     if(query.length > 1){
                            //         globalSearch.getAjaxData(query, $dropDownObj, isTopNav);
                            //     } else {
                            //         globalSearch.getLocalStorageData($dropDownObj, isTopNav);
                            //         $(".mobileSearchInfo").hide();
                            //     }
                            // }, 200);


                        });

                        $(document).on("click", ".globalSearchWrap input", function(){
                            $(this).closest("form").find('input.searchInput').trigger("keyup");
                        });

                        $(document).on("click", ".viewAllResultLink", function(e){
                            e.preventDefault();
                            $(".topViewAll, #heroViewAll").val("true");
                            $('.globalSearchForm').submit();
                        });



                        $(document).on("click","#topMobileButton", function(){
                            $('.navbar-collapse').collapse('hide');
                        });

                        $(document).on("click", "#topSearchIcon", function(e){
                            e.preventDefault();

                            if($("#closeMobileMenuX").is(":visible")){
                                $("#closeMobileMenuX").trigger("click");
                            }

                            $("body").addClass("activeMobileSearch");
                            $("#mobileSearch #topMainNavWrap .globalSearchForm").css("min-height",$(window).height());

                            $("#mobileSearch .topNavSearch .globalSearchForm").addClass("searchActive");

                            if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
                                window.scrollTo(0,1);
                            }
                            $("#mobileSearch .topNavSearch .globalSearchForm .globalSearchInputWrap input").trigger("click");
                            $("#mobileSearch .topNavSearch .globalSearchForm .globalSearchInputWrap input").focus();
                        });

                        $(document).on("submit",".globalSearchForm", function(){
                            var inputData = $(this).find("input.searchInput").val();
                            if(inputData.length > 1){
                                return true;
                            } else {
                                return false;
                            }
                        });

                        $(document).on("click",".i, .viewAllResultLink", function(){
                            $(this).closest("form").trigger("submit");
                        });

                    },
                    isTopNav : function($searchInput){
                        return $searchInput.hasClass("topNav");
                    },
                    getAjaxData : function(query, $dropDownObj, isTopNav){

                        var searchUrl = '/api/global-search/type-ahead?phrase='+query;

                        if(isBlog){
                            searchUrl = blogSearchServer + searchUrl;
                        }

                        $.ajax({
                            url: searchUrl,
                            data: {
                                format: 'json'
                            },
                            type: 'GET',
                            dataType: 'json',
                            success: function(data) {
                                var resultHtml = globalSearch.getResultHtml(data.searchResults, isTopNav, query);
                                $dropDownObj.find("li").remove();
                                $dropDownObj.prepend(resultHtml);

                                // var showingCt = $dropDownObj.find(".globalSearchMenuItem").length;
                                // $dropDownObj.closest("form").find(".showingCount").text("SHOWING "+showingCt+"");

                                if(data.totalSearchResults > 0){
                                    $dropDownObj.parent().parent().find(".mobileSearchInfo").show();
                                    $dropDownObj.show();
                                } else {
                                    $dropDownObj.parent().parent().find(".mobileSearchInfo").hide();
                                    $dropDownObj.hide();
                                }

                                // Hide Mobile Keyboard when scroll down
                                $('body').on({
                                    'touchmove': function(e) {
                                        $('.topNav.searchInput').blur();

                                        // if($(".topNav.searchInput").isOnScreen()){
                                        //     $('.topNav.searchInput').focus();
                                        // } else {
                                        //     $('.topNav.searchInput').blur();
                                        // }
                                    }
                                });


                            },
                            error: function() {
                            }
                        });
                    },
                    getResultHtml: function(ftgData, isTopNav, query){
                        var searchData = [];
                        var colorScheme = "";
                        if(isTopNav){
                            colorScheme = "-white";
                        }
                        var resultHtml = '<li class="globalSearchMenuItem">'+$(".globalSearchInputWrap .mobileSearchInfo").html()+'</li>';
                        if(ftgData) {
                            ftgData.forEach(function(data){
                                var searchType = data.type;
                                var searchTypeDisplay = data.display;
                                var results = data.results;
                                var propCount = data.count;
                                var viewAll = searchType === "stories" || searchType === "collections";
                                resultHtml += '<li class="searchGroup"><img class="searchGroupIcon" src="'+globalImageBase+'/images/ic-'+searchType+colorScheme+'.svg" data-pin-nopin="true"><a href="'+blogSearchServer+'/search?phrase='+query+'&type='+searchType+'&viewAll='+viewAll+'">'+searchTypeDisplay+' ('+propCount+')</a></li>';

                                var blogServerUrl = blogSearchServer;
                                if(searchType === "stories"){
                                    blogServerUrl = "";
                                }

                                if(results) {
                                    results.forEach(function(result){
                                        searchData.push({name: result.name, link: result.link});
                                        resultHtml += '<li class="globalSearchMenuItem" data-original-index="1" class="">';
                                        resultHtml += '<a tabindex="0" href="'+blogServerUrl+result.link+'" class="">';
                                        resultHtml += '<span class="text">'+result.name+'</span>';
                                        resultHtml += '</a></li>';
                                    });
                                }
                            });
                        }
                        return resultHtml;
                    },
                    getLocalStorageData: function($dropDownObj, isTopNav) {
                        var colorScheme = "";
                        if(isTopNav){
                            colorScheme = "-white";
                        }
                        var resultHtml = '';
                        var recentlyViewedProperties = localStorage.getItem("recentlyViewedProperties");
                        var recentProps = [];
                        if(recentlyViewedProperties) {
                            recentProps = JSON.parse(recentlyViewedProperties);
                            recentProps.sort(function(a,b) {return (a.viewedOn < b.viewedOn) ? 1 : ((b.viewedOn < a.viewedOn) ? -1 : 0);} );

                            resultHtml += '<li class="searchGroup recentlyViewed"><img class="searchGroupIcon" src="'+globalImageBase+'/images/ic-recent'+colorScheme+'.svg" data-pin-nopin="true">' + $('#viewedPropertiesText').val() + ' ('+recentProps.length+')</li>';
                            recentProps.forEach(function (prop) {
                                resultHtml += '<li class="globalSearchMenuItem" data-original-index="1" class="">';
                                resultHtml += '<a tabindex="0" href="'+blogSearchServer+prop.link+'" class="">';
                                resultHtml += '<span class="text">'+prop.name+'</span>';
                                resultHtml += '</a></li>';
                            });
                            $dropDownObj.find("li").remove();
                            $dropDownObj.prepend(resultHtml);
                            $dropDownObj.show();
                        }
                    }
                };
                globalSearch.init();





            },

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            isMobile : function(){
                return $("#topMobileButton").css("display") != "none";
            },

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            decodeEntities: function(encodedString){
                var textArea = document.createElement('textarea');
                textArea.innerHTML = encodedString;
                return textArea.value;
            },

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            loadingOverlay : function(text, status) {
                $('#loadingOverlay').remove();
                $("body").removeClass("fixedScrollBody")
                if(status === 'on'){
                    var over = '<div id="loadingOverlay">' +
                        // '<div id="loading"><img src="'+globalImageBase+'/images/ajax-loader.gif"><br/><span class="blink_me">' + text +'</span></div>'+
                        '<div id="loading"><span class="blink_me">' + text +'</span></div>'+
                        '</div>';
                    $(over).appendTo('body');
                    $("body").addClass("fixedScrollBody")
                }
            },

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            processingFilterMessage : function(text, status){
                $('#procssingOverlay').remove();
                if(status === 'on'){
                    var over = '<div id="procssingOverlay">' +
                        '<div id="loading" class="aCenter"><span class="blink_me">' + text +'</span></div>'+
                        '</div>';
                    $('#awardFilters').hide();
                    $(over).appendTo('.filterItemWrap');
                } else {
                    $('#awardFilters').show();
                }
            },

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            homepage : function(){
                // Fix Position for Top Navigation ************************************************
                $(window).scroll(function(){
                    // console.log($(window).scrollTop());
                    if ($(window).scrollTop() > 500){
                        $("#homeNavWrap").addClass("fixedNav");
                        $("#propCircleButtons").addClass("fixedPosition");
                        // $("#heroSearch").hide();

                        if ($(window).scrollTop() > 501){
                            $("#homeNavWrap").addClass("showSearch");
                            if(!$("body").hasClass("activeMobileSearch")){
                                // $(".globalSearchMenu").hide();
                                // $(".mobileSearchInfo").hide();
                            }

                            if($("#topMobileButton").is(":visible")){
                                $("#topSearchIcon").addClass("showSearchIcon");
                            }
                        } else {
                            if(!$("body").hasClass("activeMobileSearch")){
                                $("#homeNavWrap").removeClass("showSearch");
                                $("#topSearchIcon").removeClass("showSearchIcon");
                                $("#heroSearch").show();
                            }
                        }
                    } else {
                        if(!$("body").hasClass("activeMobileSearch")){
                            $("#homeNavWrap").removeClass("fixedNav showSearch");
                            $("#propCircleButtons").removeClass("fixedPosition");
                            $("#heroSearch").show();
                        }
                    }
                });
            },

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            propertyPage : function(){

                var equalStoryImageHeight = function(){
                    if($(".itemBox").length > 0){
                        $(".imgThumbnailWrap, .thumbTitle").css("width","auto");
                        $(".imgThumbnailWrap, .imgThumbnail").css("height","auto");
                        var w = $(".itemBox").width();
                        var h = w * 0.55;
                        $(".imgThumbnailWrap, .thumbTitle").width(w);
                        $(".imgThumbnailWrap, .imgThumbnail").height(h);
                    }
                };
                equalStoryImageHeight();

                // Property Page, Different Scroll Speed and Fixed Position ************************************************
                if($(".scrollContainer .scrollItem").length > 0){
                    var attachScrollFix = function(){
                        if($(window).width() > 991){
                            // $("#contentRight").show();
                            $("#scrollSpeedContainer #contentLeft, #scrollSpeedContainer #contentRight").stick_in_parent();
                            $('.scrollContainer .scrollItem')
                                .on('sticky_kit:bottom', function(e) {
                                    $(this).parent().css('position', 'static');
                                })
                                .on('sticky_kit:unbottom', function(e) {
                                    $(this).parent().css('position', 'relative');
                                });
                            // console.log("attached");
                        } else {
                            // console.log("detatched");
                            $(".scrollContainer .scrollItem").trigger("sticky_kit:detach");
                        }
                    };
                    setTimeout(function(){
                        attachScrollFix();
                    },200);
                }


                if($('.filter-container').length > 0){
                    if($(document).find(".filter-container .propBox").length >0){

                        ftgUtil.updateFilterSort();

                        $('.filter-buttons a').click(function(e) {
                            e.preventDefault();
                            // if(!$(this).hasClass("active")){
                            $('.filter-buttons a').removeClass("active");
                            $(this).addClass('active');
                            var filterItem = $(this).data('filter');
                            ftgUtil.filterProperty("#propertyList .filtr-item", filterItem);
                            ftgUtil.updateCounter("#propertyList .filtr-item", "#filterDisplayingCount");
                            $(document.body).trigger("sticky_kit:recalc");
                            // };
                        });

                        // $(".filterSortMenu li").on("click", function(){
                        //     if(!$(this).hasClass("active")){
                        //         var filterItem = $(this).attr('value');
                        //         ftgUtil.sortProperty("#propertyList .filtr-item", filterItem, "#propertyList");
                        //     };
                        // });

                        $('.filter-buttons a').first().addClass("active").trigger("click");
                        ftgUtil.updateEmptyFilter();
                    }
                }

                /*
                 $(window).scroll(function(){
                 // console.log($(".propGalleryWrapBottom").isOnScreen());
                 // console.log("isOnScreen : "+$(".propGalleryWrapBottom").isOnScreen());
                 if($(".propGalleryWrapBottom").isOnScreen()){
                 $(".visitWebsite").hide();
                 } else {
                 $(".visitWebsite").show();
                 }
                 });
                 */

                $(".propImageBlock").on("click", function(){
                    if(!$(".buttonCircle.ViewGallery").is(":visible")){
                        $(".buttonCircle.ViewGallery").trigger("click");
                    }
                });


                // Mobile Gallery View -------------------------------
                $(".buttonCircle.ViewGallery").on("click",function(){
                    $($(this).attr("data-target")).addClass("modal fade2");
                    $("#propertyWrap #contentRight div.propImageBlock + div.propImageBlock").show();
                });
                $('#propImageBlockWrap').on('hidden.bs.modal', function () {
                    $("#propImageBlockWrap").removeClass("modal fade2").show();
                    $("#propImageBlockWrap > div.propImageBlock").hide();
                    if($("#topMobileButton").is(":visible")){
                        $("#propImageBlockWrap > div.propImageBlock:nth-of-type(1)").show();
                    } else {
                        $("#propImageBlockWrap > div.propImageBlock").show();
                    }

                });
                $( window ).resize( function(){
                    if($("#topMobileButton").is(":visible")){
                        if($(".modal-open").is(":visible")){
                            $("#propImageBlockWrap > div.propImageBlock").show();
                        } else {
                            $("#propImageBlockWrap > div.propImageBlock").hide();
                            $("#propImageBlockWrap > div.propImageBlock:nth-of-type(1)").show();
                        }
                    } else {
                        $("#propImageBlockWrap > div.propImageBlock").show();
                    }

                    setTimeout(function(){
                        equalStoryImageHeight();
                        attachScrollFix();
                    },200);
                });
                // Mobile Gallery View End -------------------------------



                var accordion = function() {
                    $('.accordion').each(function (i) {
                        var $btn = $(this);
                        $btn.on("click", function(e){
                            e.preventDefault();
                            var $target = $($btn.attr("data-target"));
                            if($(this).hasClass("closed")){
                                $(this).removeClass("closed").addClass("opened");
                                $(this).find(".ardIcon").removeClass("closed").addClass("opened");
                            } else {
                                $(this).removeClass("opened").addClass("closed");
                                $(this).find(".ardIcon").removeClass("opened").addClass("closed");
                            }
                            $target.slideToggle( "fast", function() {
                                // Animation complete.
                                $(document.body).trigger("sticky_kit:recalc");
                            });
                        });
                        if(i>=0){
                            $btn.trigger("click");
                        }
                    });
                }
                accordion();

                $(".colorboxIframe").colorbox({iframe:true, width:"80%", height:"80%"});

                var propertyName = $('h1').text();
                var propertyURI = window.location.pathname;
                var now = new Date().getTime();
                var recentlyViewedProperties = localStorage.getItem("recentlyViewedProperties");
                var recentPropsArr;
                if(recentlyViewedProperties) {
                    recentPropsArr = JSON.parse(recentlyViewedProperties);
                    recentPropsArr.sort(function(a,b) {return (a.viewedOn < b.viewedOn) ? 1 : ((b.viewedOn < a.viewedOn) ? -1 : 0);} );
                    var indexToDelete = -1;

                    recentPropsArr.forEach(function (prop, i) {
                        if(prop.name === propertyName) {
                            indexToDelete = i;
                        }
                    });

                    if(indexToDelete > -1) {
                        recentPropsArr.splice(indexToDelete, 1);
                    }

                    if(recentPropsArr.length >= 5) {
                        recentPropsArr.pop();
                    }
                } else {
                    recentPropsArr = [];
                }
                recentPropsArr.push({name: propertyName, link: propertyURI, viewedOn: now});
                localStorage.setItem("recentlyViewedProperties", JSON.stringify(recentPropsArr));

                $(".viewMoreWrap .btn").on("click", function(){
                    $(".propStoryBlock .storyBlock.hidden").removeClass("hidden");
                    $(this).hide();
                });

                // *** Property Map *****************************************************************
                var drawMap = function(){
                    var geoCode = $(".mapProperty").attr("data-geocode").split(',');
                    var lat = parseFloat(geoCode[0]);
                    var lon = parseFloat(geoCode[1]);
                    var mapBase = [{"featureType":"all","elementType":"all","stylers":[{"hue":"#B6B4C3"},{"lightness":-0},{"saturation":-90}]},{"featureType":"poi","elementType":"attraction","stylers":[{"visibility":"on"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-70}]},{"featureType":"landscape","elementType":"all","stylers":[{"hue":"#B6B4C3"},{"saturation":10},{"lightness":15},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry","stylers":[{"lightness":-5},]},];
                    var mapOption = {
                        center: {lat: lat, lng: lon},
                        zoom: 15,
                        streetViewControl       : true,
                        fullscreenControl       : false,
                        mapTypeControl          : false, // Map or Satellite
                        styles                  : mapBase,
                        mapTypeId               : google.maps.MapTypeId.ROADMAP,
                        // disableDefaultUI     : true, // a way to quickly hide all controls
                        // panControl           : true,
                        // overviewMapControl   : true,
                        // scaleControl         : true,
                        scrollwheel          : false,
                        clickableIcons       : false,   // Disable POI Click
                    };
                    var infoBoxOptions = {
                        maxWidth: 250,
                    }
                    var ftg_map = new google.maps.Map(document.getElementById("propertyMapCanvas"), mapOption);

                    // var input = $('#cboxContent #mapQuery')[0];
                    // var autocomplete = new google.maps.places.Autocomplete(input);
                    // autocomplete.bindTo('bounds', ftg_map);


                    var marker = new google.maps.Marker({
                        map: ftg_map,
                        draggable: true,
                        animation: google.maps.Animation.DROP,
                        position: {lat: lat, lng: lon}
                    });


                    var iw  = new google.maps.InfoWindow(infoBoxOptions);
                    var iwContent = $("#markerIw").html();
                    iw.setContent(iwContent);
                    marker.addListener('click', function() {
                        iw.open(ftg_map, marker);
                    });
                    setTimeout(function(){
                        google.maps.event.trigger(marker, 'click');
                    },100);

                    google.maps.event.addListener(iw, 'domready', function(){
                        $(".gm-style-iw").next("div").hide();
                    });

                    google.maps.event.addListener(ftg_map, "click", function(event) {
                        $(document).find(".pac-container").hide();
                        iw.close();
                    });

                    google.maps.event.addListener(iw, 'domready', function() {
                        ftg.iwUpdateClasses();
                    });

                    var latLng = marker.getPosition(); // returns LatLng object
                    // ftg_map.setCenter(latLng); // setCenter takes a LatLng object

                    var custom_timeout = ( function() {
                        var timers = {};
                        return function ( callback, ms, uniqueId ) {
                            if ( !uniqueId ) {
                                uniqueId = "Don't call this twice without a uniqueId";
                            }
                            if ( timers[uniqueId] ) {
                                clearTimeout ( timers[uniqueId] );
                            }
                            timers[uniqueId] = setTimeout( callback, ms );
                        };
                    })();
                    // *** Property Map End *************************************************************


                    $( window ).resize( function(){
                        custom_timeout(function(){
                            if( $('#cboxOverlay' ).css( 'visibility' ) ){
                                $(".mapProperty").colorbox.resize({ innerWidth:'95%', innerHeight:'90%' });
                                // console.log("resizing 333 ...");
                                google.maps.event.trigger(ftg_map, 'resize');
                                ftg_map.setCenter(latLng);
                            }
                        },100);
                    });

                };

                $(".mapProperty").colorbox({
                    width:'95%',
                    height:'90%',
                    maxWidth:'95%',
                    maxHeight:'90%',
                    inline: true,
                });

                $(document).bind('cbox_complete', function(){
                    drawMap();
                });



                $( window ).trigger("resize");

            },

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            searchResultPage: function(){
                var initType = ftgUtil.getUrlParameter("type");

                $("#searchFilters .searchFilter, #searchFiltersMobilePopup .searchFilter").on("click", function(){
                    var newType = $(this).attr("data-type");

                    if(initType === newType){
                        var selectedTxt = $(this).text();
                        var targetPage = $(this).attr("data-pageId");

                        $(".selectedTxt").text(selectedTxt);


                        $("#searchFilters .searchFilter, #searchFiltersMobilePopup .searchFilter").removeClass("active");
                        $("#searchResultContent .searchPage").removeClass("active");
                        $(this).addClass("active");
                        $("#searchFiltersMobilePopup .searchFilter[data-pageid='"+targetPage+"']").addClass("active");

                        if(targetPage == "#searchPage-all"){
                            $("#searchResultContent .searchPage").addClass("active");
                        } else {
                            $("#searchResultContent "+targetPage).addClass("active");
                        }
                        // $("html, body").animate({ scrollTop: 0 }, "fast");
                        $("#searchFiltersMobilePopup").hide();
                    } else {
                        var newUrl = location.href;
                        if(initType){
                            newUrl = location.href.replace("type="+initType, "type="+newType);
                        } else {
                            var idx = location.href.indexOf("type=");
                            if(idx == -1){
                                newUrl = location.href + "&type="+newType;
                            } else {
                                newUrl = location.href.replace("type=", "type="+newType);
                            }
                        }
                        window.location.href = newUrl;
                    }


                });

                $("#searchFiltersMobile .searchFilterButtons").on("click", function(){
                    if($("#searchFiltersMobilePopup").is(":visible")){
                        $("#searchFilterButtonsWrap").show();
                    } else {
                        $("#searchFilterButtonsWrap").hide();
                    }
                    $("#searchFiltersMobilePopup").toggle();
                });

                $("#searchFiltersMobilePopup .searchFilterButtons").on("click", function(){
                    $("#searchFiltersMobilePopup").hide();
                    // if($("#filterByMenu").is(":visible")){
                    //     $("#searchFiltersMobilePopup .filterSortTriangle").addClass("opened");
                    // } else {
                    //     $("#searchFiltersMobilePopup .filterSortTriangle").removeClass("opened");
                    // }
                });


                if(initType){
                    $("#searchFilters li[data-type='"+initType+"']").trigger("click");
                }


                $(window).scroll(function(){
                    // console.log($(window).scrollTop());
                    if ($(window).scrollTop() > 135){
                        $("#searchFilters ul").addClass("mobileFixedPosition");
                    } else {
                        $("#searchFilters ul").removeClass("mobileFixedPosition");
                    }
                });
            },

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            destinationListPage : function(){

                $("#destinationListFilterBlock .regionFilter, #destinationListBlock .showDrillDown").on("click", function(){
                    var targetId = $(this).attr("data-filter");
                    var targetRegion = $(this).attr("data-showdrilldown");
                    var targetRegionName = $(".filterByMenu li[data-region='"+targetRegion+"']").text();

                    Cookies.set("destinationListPageSelect",$(this).attr("data-filter"));

                    $(".filterByButtons .selectedFilterLabel").text(targetRegionName);

                    $("#destinationListFilterBlock").find(".active").removeClass("active");
                    $("#destinationListFilterBlock li[data-filter='"+targetId+"']").addClass("active");
                    $("#destinationListBlock").find(".active").removeClass("active");
                    $("#destinationListBlock "+targetId).addClass("active");

                    if(ftg.isMobile()){
                        $("html, body").animate({ scrollTop: $('#topMainNavWrap').height() +70}, "fast");
                    } else {
                        $("html, body").animate({ scrollTop: 0 }, "fast");
                    }

                });

                $(".showDrillDown").each(function(){
                    var $this = $(this);
                    var regionName = $(this).attr("data-showDrillDown");
                    var regionPageId = $("#destinationListFilterBlock li[data-region='"+regionName+"']").attr("data-filter");
                    $this.attr("data-filter",regionPageId);
                });

                if($(".filterByButtons").length > 0){
                    $(".filterByMenu li").on("click", function(){
                        var filterText = $(this).text();
                        $(".filterByButtons .selectedFilterLabel").text(filterText);
                        $(".filterByButtons").trigger("click");
                    });
                    $(".filterByButtons").on("click", function(){
                        if($(".filterByButtons").is(":visible")){
                            $(".filterByMenu").toggle();
                        }
                        if($(".filterByMenu").is(":visible")){
                            $(".filterByButtons .selectedFilter .down").addClass("opened");
                        } else {
                            $(".filterByButtons .selectedFilter .down").removeClass("opened");
                        }
                    });
                }

                $(window).scroll(function(){
                    // console.log($(window).scrollTop());
                    if ($(window).scrollTop() > 125){
                        $("#topMainNavWrap, .viewMapButtonWrap").hide();
                        $(".filterByWrap").addClass("mobileFixedPosition");
                        $("#destinationListBlock").addClass("listMobileFix");
                        $("#destinationListBlock").css("padding-top","100px")
                    } else {
                        $(".filterByWrap").removeClass("mobileFixedPosition");
                        $("#destinationListBlock").removeClass("listMobileFix");
                        $("#topMainNavWrap, .viewMapButtonWrap").show();
                        $("#destinationListBlock").css("padding-top","0px")
                    }
                });


                var initDestination = ftgUtil.getUrlParameter("init");
                if(!initDestination){
                    initDestination = ftgUtil.getUrlParameter("region");
                }
                if(initDestination){
                    // console.log("initDestination :"+initDestination);
                    var regionText = $("#destinationListFilterBlock .filterByMenu li[data-region='"+initDestination+"']").text();
                    $("#destinationListFilterBlock .filterByMenu li[data-region='"+initDestination+"']").trigger("click");
                    if(ftg.isMobile()) {
                        $("#destinationListFilterBlock .filterByMenu").hide();
                    }
                    $(".filterByButtons .selectedFilterLabel").text(regionText);
                }

                var initTargetId = Cookies.get('destinationListPageSelect');
                if(initTargetId){
                    $("#destinationListFilterBlock li[data-filter='"+initTargetId+"']").trigger("click");
                    if(ftg.isMobile()) {
                        $("#destinationListFilterBlock .filterByMenu").hide();
                    }
                }

            },

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            destinationPropertiesPage : function(){
                if($(document).find(".filter-container .propBox").length >0){

                    ftgUtil.updateFilterSort();

                    $('.filter-buttons a').click(function(e) {
                        e.preventDefault();
                        $('.filter-buttons a').removeClass("active");
                        $(this).addClass('active');
                        var filterItem = $(this).data('filter');
                        ftgUtil.filterProperty("#propertyList .filtr-item", filterItem);
                        ftgUtil.updateCounter("#propertyList .filtr-item", "#filterDisplayingCount");
                    });

                    $("#viewMapDestination").on("click", function(e){
                        e.preventDefault();
                        var newUrl = $(this).attr("href") + '&initFilterType=' + $("#filterButtonWrap a.active").attr("data-type") + '&initSort=' + $("#sortMenu ul li.active").index();
                        window.location.href = newUrl;
                    });
                }

                var fakeMap = new google.maps.Map(document.getElementById("fakeMap"));
                var input = document.getElementById('mapQuery');
                var autocomplete = new google.maps.places.Autocomplete(input);
                autocomplete.bindTo('bounds', fakeMap);

                $("#mapSearch").submit(function(e) {
                    var address = $("#mapQuery").val();
                    if(address.trim() !== ""){
                        address = "/destinations?mapQuery="+$("#mapQuery").val().replace(/\s+/g,"+");
                        // console.log("address query : "+address);
                        window.open(address,"_self");
                    }
                    e.preventDefault();
                });



                var currentDestinationName = $("#propertyListWrap").attr("data-destinationId");
                var destinationName = Cookies.get("destinationName");
                var destinationPropType = Cookies.get("destinationPropType");
                var destinationSort = Cookies.get("destinationSort");

                var initTypeShow = ftgUtil.getUrlParameter("show");
                if(initTypeShow){
                    $("#filterButtonWrap a[data-type='"+initTypeShow+"']").trigger("click");
                    if($("#filterSortMobile").is(":visible")){
                        $("#filterSortMobile ul li:eq("+destinationSort+")").trigger("click");
                    } else {
                        $("#sortMenu ul li:eq("+destinationSort+")").trigger("click");
                    }
                } else {

                    if(currentDestinationName != destinationName){
                        destinationPropType = 0;
                        destinationSort = 0;
                    }
                    // console.log("initTypeShow :"+initTypeShow+" destinationPropType:"+destinationPropType+" destinationSort:"+destinationSort);
                    $("#filterButtonWrap a:eq("+destinationPropType+")").trigger("click");
                    if($("#filterSortMobile").is(":visible")){
                        $("#filterSortMobile ul li:eq("+destinationSort+")").trigger("click");
                    } else {
                        $("#sortMenu ul li:eq("+destinationSort+")").trigger("click");
                    }
                }

                $( window ).unload(function() {
                    Cookies.set("destinationName",currentDestinationName);
                    Cookies.set("destinationPropType",$("#filterButtonWrap a.active").index()-1);
                    Cookies.set("destinationSort",$("#sortMenu ul li.active").index());
                });

                ftgUtil.updateEmptyFilter();

                $("#mapSearch #mapQuery").on("change", function(){
                    $("#mapSearch").trigger("submit");
                });

            },

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            destinationTravelGuidePage: function(){
                var updateFilterLable = function(){
                    var selectedFilter = $("#blogMasonryList .filterMenu li a.active").text();
                    $("#blogMasonryList .selectedFilter .selectedFilterLabel").text(selectedFilter);
                    $("#blogMasonryList .filterMenu li").removeClass("activeList");
                    $("#blogMasonryList .filterMenu li a.active").parent().addClass("activeList");
                };

                var isotopFilter2 = function(){
                    var updateOrderClass = function(filterBox, $grid){
                        filterBox.find('.grid-item').removeClass("item1 item2 item3 item4 item5 item6 item7 item8 item9 item10");
                        var $items = filterBox.find(".grid-item:visible");
                        $items.each(function (i) {
                            var idx = (i % 10)+1;
                            // $(this).addClass('item'+idx).addClass('fade-in');
                            $(this).addClass('item'+idx);
                        });
                        var $grid = $('.grid').masonry({
                            itemSelector: '.grid-item',
                            columnWidth: 10,
                        });
                        setTimeout(function(){
                            $grid.masonry().masonry();
                        }, 10);
                    };


                    $('.filterItemWrap').each(function () {
                        var gridWrap    = $(this),
                            filterBox   = $(this).find('.grid'),
                            buttonBox   = gridWrap.find('.filter-buttons'),
                            filterElems = filterBox.find('.grid-item'),
                            selector    = filterBox.find('.filter-buttons .active').attr('data-filter');

                        updateOrderClass(filterBox);

                        buttonBox.find('li').on('click', function(e){
                            $this = $(this).find("a");
                            var selector = "."+$this.attr('data-filter');
                            e.preventDefault();

                            if (!$this.hasClass('active')) {
                                buttonBox.find('a').removeClass('active');
                                $this.addClass('active');
                                buttonBox.find('.dropdown-toggle').html($this.text() + '<span class="caret"></span>');
                            }

                            // console.log("selector : "+selector);
                            if(selector === ".*"){
                                filterElems.removeClass("hidden");
                                // filterElems.show();
                            } else {
                                filterElems.removeClass("hidden");
                                filterElems.not(selector).addClass("hidden");
                                // filterElems.hide();
                                // filterElems.not(selector).show();
                            }
                            updateOrderClass(filterBox);
                            updateFilterLable();

                            $('html, body').animate({
                                scrollTop: $("#blogMasonryList").offset().top-48
                            }, 100);


                            if($(".selectedFilter").is(":visible")){
                                $("#blogMasonryList .filterMenu").hide();
                            }
                        });
                    });

                    updateFilterLable();
                    $("#blogMasonryList").css("opacity","1");
                };
                if ($('.filterItemWrap').length && typeof isotopFilter2 == 'function'){
                    isotopFilter2();
                };


                $("#blogMasonryList .selectedFilter").on("click", function(){
                    if($(".selectedFilter").is(":visible")){
                        $("#blogMasonryList .filterMenu").toggle();
                    }
                    if($("#blogMasonryList .filterMenu").is(":visible")){
                        $(".filter-buttons .selectedFilter .down").addClass("opened");
                    } else {
                        $(".filter-buttons .selectedFilter .down").removeClass("opened");
                    }
                });


                $(window).scroll(function(){
                    // console.log($(window).scrollTop());
                    // console.log($("#viewPropertiesButtonWrao").offset().top);

                    // if($("#viewPropertiesButtonWrao").isOnScreen()){
                    // if ($(window).scrollTop() > 980){
                    if ($(window).scrollTop() > $("#viewPropertiesButtonWrao").offset().top){
                        $(".filter-buttons").addClass("mobileFixedPosition");
                    } else {
                        $(".filter-buttons").removeClass("mobileFixedPosition");
                    }
                });

            },

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            destinationLandingPage : function(){
                var isCollectionUrl = ftgUtil.getUrlParameter("collection");
                var collectionTitle = "";

                var defaultZoom         = 2;
                var maxZoom             = 18;
                var mapCenter           = new google.maps.LatLng(33.748995, -84.387982);
                var gotPropData         = false;
                var propInitZoom        = 0;
                var infoboxOpenedZoom   = 0;
                var infoboxOpenedCenter = null;
                var clickedDestination  = null;
                var addressMarkers      = [];
                var input = document.getElementById('mapQuery');
                var autocomplete = new google.maps.places.Autocomplete(input);


                var clusterStylesNumber = [
                    { textColor: 'white', height: 53, width: 52, url: globalImageBase+'/images/mapIcons/f1.png', },
                    { textColor: 'white', height: 56, width: 55, url: globalImageBase+'/images/mapIcons/f2.png', },
                    { textColor: 'white', height: 66, width: 65, url: globalImageBase+'/images/mapIcons/f3.png', },
                    { textColor: 'white', height: 78, width: 77, url: globalImageBase+'/images/mapIcons/f4.png', },
                    { textColor: 'white', height: 90, width: 89, url: globalImageBase+'/images/mapIcons/f5.png', },
                ];
                var clusterStyles = [
                    { textColor: 'transparent', height: 40, width: 40, url: globalImageBase+'/images/mapIcons/icon-destination.png', },
                    { textColor: 'transparent', height: 40, width: 40, url: globalImageBase+'/images/mapIcons/icon-destination.png', },
                    { textColor: 'transparent', height: 40, width: 40, url: globalImageBase+'/images/mapIcons/icon-destination.png', },
                    { textColor: 'transparent', height: 40, width: 40, url: globalImageBase+'/images/mapIcons/icon-destination.png', },
                    { textColor: 'transparent', height: 40, width: 40, url: globalImageBase+'/images/mapIcons/icon-destination.png', },
                ];
                var propTypeIcons =  {
                    DESTINATION:{ icon: globalImageBase+'/images/mapIcons/icon-destination.png' },
                    HOTEL:      { icon: globalImageBase+'/images/mapIcons/icon-hotel.png' },
                    RESTAURANT: { icon: globalImageBase+'/images/mapIcons/icon-restaurant.png' },
                    SPA:        { icon: globalImageBase+'/images/mapIcons/icon-spa.png' },
                    ACTIVITY:   { icon: globalImageBase+'/images/mapIcons/icon-activity.png'},
                };

                var markerClusterMinZoom = maxZoom-1;
                var markerClusterMaxZoom = maxZoom;
                var markerClusterOptions = {
                    gridSize: 40,
                    maxZoom: markerClusterMaxZoom,
                    zoomOnClick:true,
                    styles: clusterStyles,
                    minimumClusterSize: 2,
                };

                var mapBase = [{"featureType":"all","elementType":"all","stylers":[{"hue":"#B6B4C3"},{"lightness":-0},{"saturation":-90}]},{"featureType":"poi","elementType":"attraction","stylers":[{"visibility":"on"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-70}]},{"featureType":"landscape","elementType":"all","stylers":[{"hue":"#B6B4C3"},{"saturation":10},{"lightness":15},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry","stylers":[{"lightness":-5},]},];
                var mapOption = {
                    zoom: defaultZoom,
                    maxZoom: maxZoom,
                    center: mapCenter,
                    // disableDoubleClickZoom  : true,
                    zoomControl             : false,
                    fullscreenControl       : false,
                    streetViewControl       : false,
                    mapTypeControl          : false, // Map or Satellite
                    scrollwheel             : false,
                    styles                  : mapBase,
                    mapTypeId               : google.maps.MapTypeId.ROADMAP,
                    clickableIcons          : false,   // Disable POI Click
                };

                var ftg_map = new google.maps.Map(document.getElementById("mapCanvas"), mapOption);
                var initBounds = new google.maps.LatLngBounds();
                var mapLatLngBounds = new google.maps.LatLngBounds;
                var allDestinationMarkers = [];
                var mapControlDiv = document.createElement('div'); mapControlDiv.index = 1;
                var lastClusterZoom = 0;
                var iw  = new google.maps.InfoWindow({ maxWidth: 250 });
                var markerClusterer = new MarkerClusterer(ftg_map, allDestinationMarkers, markerClusterOptions);

                // Customize Info Window *******************************************************************
                // Remove infoWindow close button ************
                google.maps.event.addListener(iw, 'domready', function(){ $(".gm-style-iw").next("div").hide(); });
                google.maps.event.addListener(ftg_map, "click", function(event) { $(document).find(".pac-container").hide(); iw.close(); });
                google.maps.event.addListener(iw, 'domready', function() { ftg.iwUpdateClasses(); });
                // Customize Info Window End ***************************************************************

                ftg_map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(mapControlDiv);

                // Map Control ******
                var mapBaseControl = function(controlDiv, map, defaultZoom, mapCenter, maxZoom) {
                    var controlWrapper = document.createElement('div');
                    controlWrapper.className = "mapControlWrapper";
                    controlWrapper.style.backgroundColor = 'white';
                    controlWrapper.style.borderStyle = 'solid';
                    controlWrapper.style.borderColor = 'gray';
                    controlWrapper.style.borderWidth = '1px';
                    controlWrapper.style.cursor = 'pointer';
                    controlWrapper.style.color = '#333333';
                    controlWrapper.style.textAlign = 'center';
                    controlWrapper.style.width = '28px';
                    // controlWrapper.style.height = '96px';
                    controlDiv.appendChild(controlWrapper);

                    // Set CSS for the zoomIn
                    var zoomInButton = document.createElement('div');
                    zoomInButton.className = "mapControl zoomIn";
                    zoomInButton.innerHTML = "<span title='Zoom in'>+</span>";
                    controlWrapper.appendChild(zoomInButton);

                    // Set CSS for the Reset
                    var resetButton = document.createElement('div');
                    resetButton.className = "mapControl resetMap";
                    resetButton.innerHTML = "<span title='Reset Zoom'>★</span>";
                    controlWrapper.appendChild(resetButton);

                    // Set CSS for the Mouse Wheel Control
                    var wheelButton = document.createElement('div');
                    wheelButton.className = "mapControl wheelButton";
                    wheelButton.innerHTML = "<span title='Toggle Mouse Wheel Zoom Control'>☉</span>";
                    controlWrapper.appendChild(wheelButton);

                    // Set CSS for the zoomOut
                    var zoomOutButton = document.createElement('div');
                    zoomOutButton.className = "mapControl zoomOut";
                    zoomOutButton.innerHTML = "<span title='Zoom Out'>-</span>";
                    controlWrapper.appendChild(zoomOutButton);

                    // Setup the click event listener - zoomIn
                    google.maps.event.addDomListener(zoomInButton, 'click', function() {
                        if(map.getZoom() < maxZoom){
                            map.setZoom(map.getZoom() + 1);
                        }
                    });

                    // Setup the click event listener - zoomOut
                    google.maps.event.addDomListener(zoomOutButton, 'click', function() {
                        if( infoboxOpenedZoom == 0 ){
                            var zoomOutStep = 1;
                            if(map.getZoom()-zoomOutStep <= defaultZoom){
                                map.setZoom(defaultZoom);
                            } else {
                                map.setZoom(map.getZoom() - zoomOutStep);
                            }
                        } else {
                            map.setZoom(infoboxOpenedZoom);
                            map.setCenter(infoboxOpenedCenter);
                            infoboxOpenedZoom = 0;
                            infoboxOpenedCenter = null;
                        }
                        iw.close();
                        updatePropertyListData();

                    });

                    google.maps.event.addDomListener(resetButton, 'click', function() {
                        if(isCollectionUrl){
                            map.fitBounds(initBounds);
                        } else {
                            if(map.getZoom() !== defaultZoom){
                                map.setZoom(defaultZoom);
                            }
                            map.setCenter(mapCenter);
                        }
                    });

                    // Setup the click event listener - Mouse wheelButton
                    var checkMouseScroll = function(wheelButton){
                        if(map.scrollwheel){
                            wheelButton.classList.remove("disabled");
                        } else {
                            wheelButton.className += " disabled";
                        }
                    }
                    google.maps.event.addDomListener(wheelButton, 'click', function() {
                        // console.log("map.scrollwheel :"+map.scrollwheel);
                        if(map.scrollwheel){
                            map.set('scrollwheel', false);
                        } else {
                            map.set('scrollwheel', true);
                        }
                        checkMouseScroll(wheelButton);
                    });
                    checkMouseScroll(wheelButton);
                };

                google.maps.event.addListenerOnce(ftg_map, 'tilesloaded', function(){
                    mapBaseControl(mapControlDiv, ftg_map, defaultZoom, mapCenter, maxZoom);
                });


                var mapControl = function(allDestinationMarkers, propMarkers){
                    var initFilterType = ftgUtil.getUrlParameter("initFilterType"); if(!initFilterType){ initFilterType = "hotels"; }
                    var initSort = ftgUtil.getUrlParameter("initSort"); if(!initSort){ initSort = 0; }


                    if($(document).find(".mapFilterControl").length > 0){
                        $(document).find(".mapFilterControl").remove();
                    }
                    mapControlDiv.id = "mapFilterControlWrap";
                    mapControlDiv.style.padding = '5px';

                    var filterWrapper = document.createElement('div');

                    filterWrapper.className = "mapFilterWrapper";
                    filterWrapper.style.backgroundColor = 'white';
                    filterWrapper.style.borderStyle = 'solid';
                    filterWrapper.style.borderColor = 'gray';
                    filterWrapper.style.borderWidth = '1px';
                    filterWrapper.style.cursor = 'pointer';
                    filterWrapper.style.color = '#333333';
                    filterWrapper.style.textAlign = 'center';
                    filterWrapper.style.width = '28px';

                    mapControlDiv.insertBefore(filterWrapper, mapControlDiv.firstChild)

                    var filterAllButton = document.createElement('div');
                    filterAllButton.className = "mapFilterControl all";
                    filterAllButton.innerHTML = "<span title='All Properties'>★</span>";
                    filterWrapper.appendChild(filterAllButton);

                    var filterHotelButton = document.createElement('div');
                    filterHotelButton.className = "mapFilterControl hotel";
                    filterHotelButton.innerHTML = "<span title='Hotels' class='hotels disabled'><img src='"+globalImageBase+"/images/mapIcons/ic-hotels.svg' data-pin-nopin='true'></span>";
                    filterWrapper.appendChild(filterHotelButton);

                    var filterRestaurantButton = document.createElement('div');
                    filterRestaurantButton.className = "mapFilterControl restaurant";
                    filterRestaurantButton.innerHTML = "<span title='Restaurants' class='restaurants disabled'><img src='"+globalImageBase+"/images/mapIcons/ic-restaurants.svg' data-pin-nopin='true'></span>";
                    filterWrapper.appendChild(filterRestaurantButton);

                    var filterSpaButton = document.createElement('div');
                    filterSpaButton.className = "mapFilterControl spa";
                    filterSpaButton.innerHTML = "<span title='Spas' class='spas disabled'><img src='"+globalImageBase+"/images/mapIcons/ic-spas.svg' data-pin-nopin='true'></span>";
                    filterWrapper.appendChild(filterSpaButton);


                    google.maps.event.clearListeners(ftg_map, 'filterAllButton');
                    google.maps.event.clearListeners(ftg_map, 'filterHotelButton');
                    google.maps.event.clearListeners(ftg_map, 'filterRestaurantButton');
                    google.maps.event.clearListeners(ftg_map, 'filterSpaButton');

                    google.maps.event.addDomListener(filterAllButton,           'click', function() { updateMapWithFilter(allDestinationMarkers, propMarkers, '') });
                    google.maps.event.addDomListener(filterHotelButton,         'click', function() { updateMapWithFilter(allDestinationMarkers, propMarkers, 'HOTEL') });
                    google.maps.event.addDomListener(filterRestaurantButton,    'click', function() { updateMapWithFilter(allDestinationMarkers, propMarkers, 'RESTAURANT') });
                    google.maps.event.addDomListener(filterSpaButton,           'click', function() { updateMapWithFilter(allDestinationMarkers, propMarkers, 'SPA') });
                    // MapControl End ........................................................

                    var updateMapButton = function($this){
                        $("#mapFilterControlWrap .mapFilterControl span").addClass("disabled");
                        $this.removeClass("disabled");
                        $("#mapFilterControlWrap .mapFilterControl").addClass("disabledWrap");
                        $this.parent().removeClass("disabledWrap");
                    };

                    $(document).on("click", "#mapFilterControlWrap .mapFilterControl span", function(){
                        updateMapButton($(this));
                    });

                    var updateMapWithFilter = function(allDestinationMarkers, propMarkers, category, initFilterType){
                        google.maps.event.trigger(ftg_map, "click");
                        var filteredMarkers = [];

                        if(category !== ""){
                            for (i = 0; i < propMarkers.length; i++) {
                                if (propMarkers[i].category == category || category.length === 0) {
                                    filteredMarkers.push(propMarkers[i]);
                                }
                            }
                        } else {
                            if(ftg_map.getZoom() > 17){
                                ftg_map.setZoom(16);
                            }
                            filteredMarkers = propMarkers;
                        }
                        markerClusterer.clearMarkers();
                        markerClusterer.addMarkers(filteredMarkers);
                        markerClusterer.repaint();

                        if(initFilterType){
                            updateMapButton($("#mapFilterControlWrap .mapFilterControl span."+initFilterType));
                            setTimeout(function(){
                                $("#filterButtonWrap a[data-filtername='"+initFilterType+"']").trigger("click");
                                setTimeout(function(){
                                    $(".filterSortMenu ul li:eq("+initSort+")").trigger("click");
                                },500);
                            },500);
                        };
                    };

                    switch(initFilterType) {
                        case "hotels"       : updateMapWithFilter(allDestinationMarkers, propMarkers, 'HOTEL', initFilterType);      break;
                        case "spas"         : updateMapWithFilter(allDestinationMarkers, propMarkers, 'SPA', initFilterType);        break;
                        case "restaurants"  : updateMapWithFilter(allDestinationMarkers, propMarkers, 'RESTAURANT', initFilterType); break;
                        default             : break;
                    }




                };
                // Map Control End ******



                // Property map infobox content
                var infoBoxContent = function(marker) {
                    var html = "<div class='mapInfoBox'>";
                    if(marker.propertyRating !== ""){
                        html += "<div class='mapInfoRating'>";
                        if(marker.propertyRating !== 'NOT_RATED' && marker.propertyRating !== 'SOON_TO_BE_RATED'){
                            html += "<img src='"+globalImageBase+"/images/mapIcons/icon-rating-"+marker.propertyRating+".svg' class='mapInfoRatingIcon' data-pin-nopin='true'>";
                        }
                        html += "</div>";
                    }
                    html += "<div class='mapInfoPropImg'>";
                    html += "<a href='"+marker.propertyURI+"'><img src='"+marker.image+"' data-pin-nopin='true'></a>";
                    html += "</div>";
                    if(marker.accolade){
                        html += "<div class='markerAccoladeWrap'><div class='markerAccolade'><div class='markerAccoladeText'>"+marker.accolade+"</div></div></div>";
                    }
                    html += "<div class='mapInfoTextWrap'>";
                    html += "<div class='mapInfoBreadCrumb'>";
                    // html += "<a href='/destinations/"+marker.destinationId+"'>"+marker.destinationName+"</a> | <a href=''>COUNTRY</a>";
                    html += "<a href='/destinations/"+marker.destinationId+"'>"+marker.destinationName+"</a>";
                    html += "</div>";
                    html += "<div class='mapInfoPropName'><a href='"+marker.propertyURI+"'>"+marker.title+"</a>";
                    html += "</div>";
                    html += "</div>";
                    html += "</div>";
                    return html;
                };

                // Property List Box Content
                var propInfoBoxContent = function(marker) {
                    var overViewText = "";
                    if(marker.propertyHeadline){
                        overViewText = marker.propertyHeadline;
                    }
                    var html = '<div class="propertyListing">';
                    html += '<div class="propRating">';
                    if(marker.propertyRating !== 'NOT_RATED' && marker.propertyRating !== 'SOON_TO_BE_RATED'){
                        html += '<img src="'+globalImageBase+'/images/mapIcons/icon-rating-'+marker.propertyRating+'.svg" class="propRatingIcon" data-pin-nopin="true">';
                    }
                    html += '</div>';
                    html += '<div class="propImg"><a href="'+marker.propertyURI+'"><img src="'+marker.image+'" data-pin-nopin="true"></a></div>';
                    if(marker.accolade && !isCollectionUrl){
                        html += "<div class='accoladeWrap'><a href='"+marker.propertyURI+"' class='accolade'>"+marker.accolade+"</a></div>";
                    }
                    html += '<div class="propTextWrap">';
                    html += '<div class="PropName"><a href="'+marker.propertyURI+'">'+marker.title+'</a></div>';
                    html += '<div class="propOverview">'+overViewText+'</div>';
                    html += '<div class="propLocation">'+marker.propertyLocation+'</div>';
                    html += '</div>';
                    html += '</div>';
                    return html;
                };




                var updatePropertyListData = function(propMarkers){
                    if(gotPropData === true && propMarkers) {
                        if($("#propertyList").html() === ""){

                            var destinationName = "<h2><a href='/destinations/"+propMarkers[0].destinationId+"'>"+propMarkers[0].destinationName+"</a></h2>";
                            $("#propertyListWrap h2").remove();
                            if(isCollectionUrl){
                                $("#propertyListWrap").prepend(collectionTitle);
                            } else {
                                $("#propertyListWrap").prepend(destinationName);
                            }

                            var ct1 = 0, ct2 = 0, ct3 = 0;
                            for (var i = propMarkers.length, bounds = ftg_map.getBounds(); i--;) {

                                var dataFilter = '';
                                if(propMarkers[i].category === "HOTEL")     { dataFilter = "1"; ct1 ++;}
                                if(propMarkers[i].category === "RESTAURANT"){ dataFilter = "2"; ct2 ++; }
                                if(propMarkers[i].category === "SPA")       { dataFilter = "3"; ct3 ++; }

                                var propRating = propMarkers[i].propertyRating;
                                if(propRating == "NOT_RATED"){
                                    propRating = "Z-"+propRating;
                                }

                                var propertyBlockHtml = '<div class="propBox filtr-item  col-sx-12 col-sm-6 col-md-4 ' + propMarkers[i].category + '" data-category="'+dataFilter+'" data-name="'+propMarkers[i].sortName+'" data-rating="'+propRating+' '+propMarkers[i].sortName+'">' + propInfoBoxContent(propMarkers[i]) + '</div>';
                                $("#propertyList").prepend(propertyBlockHtml);
                            }

                            var filterHtml = "";
                            if(ct1 > 0){ filterHtml += '<a href="#" data-filter="1" data-filterName="hotels">Hotels</a>'; } else { $(".mapFilterWrapper .mapFilterControl.hotel").remove(); }
                            if(ct2 > 0){ filterHtml += '<a href="#" data-filter="2" data-filterName="restaurants">Restaurants</a>'; } else { $(".mapFilterWrapper .mapFilterControl.restaurant").remove(); }
                            if(ct3 > 0){ filterHtml += '<a href="#" data-filter="3" data-filterName="spas">Spas</a>'; } else { $(".mapFilterWrapper .mapFilterControl.spa").remove(); }

                            if(ct1 + ct2 + ct3 > 0){
                                $("#propertyListWrap, #filterButtonWrap").show();
                                if($(".accoladeWrap").length > 0){
                                    updateAccoladePosition($(".accoladeWrap"));
                                }
                                $("#featuredDestinationsListWrap").hide();
                                $("#propertyListWrap #filterButtonWrap a").remove();
                                $("#propertyListWrap #filterButtonWrap").append(filterHtml);

                                ftgUtil.updateFilterSort();

                                var updatePropertyList = function(filterItem){
                                    var count = $("#propertyList .filtr-item[data-category='"+filterItem+"']").length;
                                    if(parseInt(count) > 0){
                                        ftgUtil.filterProperty("#propertyList .filtr-item", filterItem);
                                        $("#filterDisplayingCount").text(count < 2 ? count+ ' PROPERTY' : count+ ' PROPERTIES');
                                    }
                                };

                                var updateActiveFilter = function(filterItem){
                                    // var timeOut = 0;
                                    // if($(".mapFilterWrapper").length == 0){
                                    //     timeOut = 500;
                                    // }
                                    // setTimeout(function(){
                                    $('#filterButtonWrap a').removeClass("active");
                                    $("#filterButtonWrap a[data-filter='"+filterItem+"']").addClass('active');

                                    $(".mapFilterWrapper .mapFilterControl span").addClass("disabled");
                                    $(".mapFilterWrapper .mapFilterControl:nth-child("+(parseInt(filterItem)+1)+")").find("span").removeClass("disabled");
                                    // },timeOut);
                                    updatePropertyList(filterItem);
                                };

                                $('.filter-buttons a').click(function(e) {
                                    e.preventDefault();
                                    $('.filter-buttons a').removeClass("active");
                                    $(this).addClass('active');
                                    var filterItem = $(this).data('filter');
                                    switch (filterItem){
                                        case 1 : updateActiveFilter("1"); $(document).find(".mapFilterControl.hotel").trigger("click"); break;
                                        case 2 : updateActiveFilter("2"); $(document).find(".mapFilterControl.restaurant").trigger("click"); break;
                                        case 3 : updateActiveFilter("3"); $(document).find(".mapFilterControl.spa").trigger("click"); break;
                                    }
                                    updatePropertyList(filterItem);
                                });

                                $('.filter-buttons a').first().addClass("active").trigger("click");
                                ftgUtil.updateEmptyFilter();

                                $(document).on("click", ".mapFilterControl.hotel", function() {updateActiveFilter("1");});
                                $(document).on("click", ".mapFilterControl.restaurant", function() {updateActiveFilter("2");});
                                $(document).on("click", ".mapFilterControl.spa", function() {updateActiveFilter("3");});

                            } else{
                                // console.log("333333");
                                $("#featuredDestinationsListWrap").show();
                            }
                        }
                    } else {
                        $("#propertyListWrap #filterButtonWrap a").remove();
                        $("#propertyList").html("");
                        $("#propertyListWrap").hide();
                        $("#featuredDestinationsListWrap").show();
                    }
                };




                var propertiesMap = function(marker, addressSearch){
                    var superObj = this;
                    var url = '/api/property/destination/'+marker.id+'.json';
                    if(addressSearch){
                        url = '/api/property/find-near?latitude='+marker.lat+'&longitude='+marker.lon+'&within=10&limit=50&metric=MILES';
                    } else {
                        if(isCollectionUrl){
                            url = isCollectionUrl+'.json';
                        }
                    }
                    $.ajax({
                        type: 'GET',
                        url: url,
                        dataType: 'json',
                        success: function (mapData) {
                            if(isCollectionUrl){
                                collectionTitle = "<h2><a href='"+mapData.collection.uri+"'>"+mapData.collection.name+"</a></h2>";
                                mapData = mapData.properties;
                            }

                            if(mapData.length > 0) {

                                var propMarkers = [];
                                var mapPropBounds = new google.maps.LatLngBounds;
                                if (addressSearch) {
                                    mapPropBounds.extend(marker.position);
                                }


                                $.each(mapData, function (index, property) {
                                    var lat = property.lat;
                                    var lon = property.long;

                                    if(typeof(lat) == 'number' && typeof(lon) == 'number'){
                                        var latLng = new google.maps.LatLng(lat, lon);

                                        var propMedia = globalImageBase + "/images/ftg_default_image.png";
                                        if (property.media.largeUrl) {
                                            propMedia = property.media.largeUrl;
                                        }
                                        if (isCollectionUrl) {
                                            var point = new google.maps.LatLng(parseFloat(lat), parseFloat(lon));
                                            initBounds.extend(point);
                                        }

                                        var propMarker = new google.maps.Marker({
                                            slug: property.propertyName,
                                            title: property.propertyName,
                                            position: latLng,
                                            map: ftg_map,
                                            draggable: !1,
                                            id: property.propertyId,
                                            flat: !0,
                                            icon: propTypeIcons[property.propertyType].icon,
                                            category: property.propertyType,
                                            destinationId: property.destinationId,
                                            destinationName: property.destinationName,
                                            propertyRating: property.ratingObject.id,
                                            propertyURI: property.propertyURI,
                                            propertyLocation: property.locationDisplay,
                                            image: propMedia,
                                            propertyHeadline: property.propertyHeadline,
                                            sortName: property.sortName,
                                            accolade: property.accolade,
                                            accoladeUrl: property.accoladeUri,
                                        });
                                        propMarkers.push(propMarker);
                                        mapPropBounds.extend(propMarker.position);

                                        google.maps.event.addListener(propMarker, 'click', (function (propMarker, index) {
                                            return function () {
                                                infoboxOpenedCenter = ftg_map.getCenter();
                                                infoboxOpenedZoom = ftg_map.getZoom();
                                                // console.log("infoboxOpenedZoom",infoboxOpenedZoom,"infoboxOpenedCenter",infoboxOpenedCenter);

                                                console.log("propMarker clicked");

                                                if (ftg_map.getZoom() < markerClusterMaxZoom) {
                                                    ftg_map.setZoom(markerClusterMaxZoom);
                                                }
                                                ftg_map.setCenter(propMarker.getPosition());
                                                ftg_map.panTo(propMarker.position);

                                                var infoboxContent = infoBoxContent(propMarker);
                                                iw.setContent(infoboxContent);
                                                iw.setOptions({'pixelOffset': new google.maps.Size(0, -10)});
                                                iw.open(ftg_map, propMarker);

                                            }
                                        })(propMarker, index));


                                    } else {
                                        // console.log(index,"no geodata",element);
                                    }
                                });


                                markerClusterer.clearMarkers();
                                markerClusterer.addMarkers(propMarkers);
                                markerClusterer.setStyles(clusterStylesNumber);
                                markerClusterer.repaint();
                                // google.maps.event.addListener(markerClusterer, 'clusteringend', mapControl(allDestinationMarkers, propMarkers));

                                google.maps.event.addListenerOnce(ftg_map, 'tilesloaded', function(){
                                    mapControl(allDestinationMarkers, propMarkers);
                                });

                                gotPropData = true;
                                $("#propertyList").html("");
                                ftg_map.fitBounds(mapPropBounds);


                                updatePropertyListData(propMarkers);


























                                // Listening Cluster Click ****************************************************
                                google.maps.event.addListener(markerClusterer, 'clusterclick', function(cluster) {
                                    var markers = cluster.getMarkers();
                                    // console.log("Cluster Clicked",markers);
                                    lastClusterZoom = ftg_map.getZoom();

                                    if(ftg_map.getZoom() > markerClusterMinZoom){
                                        var firstMarker = markers[0];
                                        var iwContent = '';
                                        if(markers.length > 1){
                                            iwContent = '<div id="multiPropInfoControlWrap"><span class="btn btn-default" id="btnPrev"><img src="'+globalImageBase+'/images/icon-next-prev-white.svg'+'"></span><span class="btn btn-default" id="btnNext" data-pin-nopin="true"><img src="'+globalImageBase+'/images/icon-next-prev-white.svg'+'" data-pin-nopin="true"></span></div>';
                                        }
                                        $.each(markers, function(idx){
                                            var marker = $(this)[0];
                                            var active = '';
                                            if(idx == 0){ active = 'active'; }
                                            iwContent += '<div id="multiPropInfo-'+idx+'" class="multiPropInfoBox '+active+'" data-idx="'+idx+'">';
                                            iwContent += infoBoxContent(marker);
                                            iwContent += '</div>';
                                        });

                                        markerClusterer.resetViewport(),markerClusterer.redraw();

                                        window.excludedFromClusters = [];
                                        markers.forEach(function(marker, t) {
                                            window.excludedFromClusters.push(marker.title + "")
                                        });

                                        setTimeout(function() {
                                            ftg_map.setCenter(cluster.getCenter());
                                            ftg_map.panTo(cluster.getCenter());

                                            iw.setContent(iwContent);
                                            iw.setPosition(cluster.getCenter());
                                            iw.setOptions({'pixelOffset':new google.maps.Size(0, -35)});
                                            iw.open(ftg_map, firstMarker);
                                            window.excludedFromClusters = [];
                                        }, 100);

                                        return true;
                                    } else {
                                        // propMarkers = [];
                                    }
                                });

                                // Multi Property in one location Info Box control ******************************************
                                var updateMultiInfoBox = function(direction){
                                    var activeIdx = parseInt($(document).find(".gm-style-iw .multiPropInfoBox.active").attr("data-idx"));
                                    var maxIdx = $(document).find(".gm-style-iw .multiPropInfoBox").length-1;
                                    var newActive = activeIdx + direction;
                                    if(newActive < 0){
                                        newActive = maxIdx;
                                    }
                                    if(newActive > maxIdx){
                                        newActive = 0;
                                    }
                                    $(document).find(".gm-style-iw .multiPropInfoBox").removeClass("active");
                                    $(document).find(".gm-style-iw #multiPropInfo-"+newActive).addClass("active");
                                };
                                $(document).on("click", "#multiPropInfoControlWrap .btn", function(){
                                    var direction = 1;
                                    if($(this).attr("id") == "btnPrev"){
                                        direction = -1;
                                    }
                                    updateMultiInfoBox(direction);
                                })


                                google.maps.event.addListener(ftg_map, 'idle', function() {
                                    // console.log("Map idle .......... current zoom : " + ftg_map.getZoom()+" propInitZoom : "+propInitZoom+" markerClusterMinZoom : "+markerClusterMinZoom);
                                    // console.log("markerClusterer",markerClusterer);
                                    if(ftg_map.getZoom() >= maxZoom)    { $(".mapControlWrapper .zoomIn > span").addClass("disabled"); }    else { $(".mapControlWrapper .zoomIn > span").removeClass("disabled"); }
                                    if(ftg_map.getZoom() <= 2)          { $(".mapControlWrapper .zoomOut > span").addClass("disabled"); }   else { $(".mapControlWrapper .zoomOut > span").removeClass("disabled"); }

                                    if ( (ftg_map.getZoom() < propInitZoom && ftg_map.getZoom() < markerClusterMinZoom - 1) &&  gotPropData) {
                                        // console.log("redraw destination markers");
                                        markerClusterer.clearMarkers();
                                        markerClusterer.setStyles(clusterStyles);
                                        setTimeout(function () {
                                            markerClusterer.addMarkers(allDestinationMarkers);
                                            markerClusterer.repaint();

                                            if (clickedDestination) {
                                                var lat = clickedDestination.position.lat();
                                                var lon = clickedDestination.position.lng();
                                                var latLng = new google.maps.LatLng(lat, lon);
                                                ftg_map.setCenter(latLng);
                                                clickedDestination = null;
                                            }

                                        }, 500);
                                        gotPropData = false;

                                        $("#mapFilterControlWrap .mapFilterWrapper").remove();
                                    }
                                });


                                propInitZoom = ftg_map.getZoom();
                                // mapControl(allDestinationMarkers, propMarkers);

                            }























                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log('jqXHR:');
                            console.log(jqXHR);
                            console.log('textStatus:');
                            console.log(textStatus);
                            console.log('errorThrown:');
                            console.log(errorThrown);
                        }
                    });
                };




                var destinationsMap = function(){
                    var superObj = this;
                    $.ajax({
                        type: 'GET',
                        url: '/api/destination-map.json',
                        dataType: 'json',
                        success: function (destinations) {
                            // console.log(destinations);
                            var initDestinationMarker = null;
                            var initDestination = ftgUtil.getUrlParameter("destination");
                            var initAddress = ftgUtil.getUrlParameter("mapQuery");

                            if(initAddress){
                                $(document).find("#mapQuery").val(initAddress.replace(/\+/g, ' '));
                                setTimeout(function(){
                                    $(document).find("#mapSearch").trigger("submit");
                                },500);
                            }

                            $.each(destinations, function(index, element) {
                                var lat = element.lat;
                                var lon = element.long;

                                if(typeof(lat) == 'number' && typeof(lon) == 'number'){
                                    var latLng = new google.maps.LatLng(lat, lon);
                                    var marker = new google.maps.Marker({
                                        slug: element.destinationName,
                                        position: latLng,
                                        map: ftg_map,
                                        draggable: !1,
                                        id: element.destinationId,
                                        flat: !0,
                                        icon: propTypeIcons["DESTINATION"].icon,
                                        category: "DESTINATION",
                                        title: element.destinationName,
                                        destinationImage: element.imgURL,
                                        optimized: false
                                    });
                                    allDestinationMarkers.push(marker), mapLatLngBounds.extend(marker.position);

                                    if(initDestination === marker.id){
                                        initDestinationMarker = marker;
                                    }

                                    // Listening Marker (Destination) Click ************************
                                    google.maps.event.addListener(marker, 'click', function() {
                                        var marker = this;
                                        var latLng = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
                                        // console.log("marker Clicked",marker);
                                        ftg_map.setCenter(latLng);
                                        propertiesMap(marker, false);
                                    });

                                } else {
                                    // console.log(index,"no geodata",element);
                                }
                            });

                            // var markerClusterer = new MarkerClusterer(ftg_map, allDestinationMarkers, markerClusterOptions);
                            markerClusterer.clearMarkers();
                            markerClusterer.setStyles(clusterStyles);
                            markerClusterer.addMarkers(allDestinationMarkers);
                            markerClusterer.repaint();
                            gotPropData = false;

                            if(initDestinationMarker){
                                google.maps.event.trigger(initDestinationMarker, "click");
                            }



                            $("#mapFilterControlWrap .mapFilterWrapper").remove();


                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            console.log('jqXHR:'); console.log(jqXHR); console.log('textStatus:'); console.log(textStatus); console.log('errorThrown:'); console.log(errorThrown);
                        },
                    });



                    var submitTimer = null;
                    // Address Search **********************************************
                    $("#mapSearch #mapQuery").on("change", function(){
                        submitTimer = setTimeout(function(){
                            $("#mapSearch").trigger("submit");
                        },200);
                    });
                    $("#mapSearch").submit(function(e) {
                        e.preventDefault();

                        if($("#mapQuery").val().trim() != "") {
                            if (submitTimer) { clearTimeout(submitTimer); }
                            var address = $(this).find("input").val();

                            ftg_map.setZoom(2);

                            if(address.trim() !== ""){
                                var geocoder = new google.maps.Geocoder();

                                // console.log("addressMarkers",addressMarkers);
                                for(var i=0; i<addressMarkers.length; i++){
                                    // Clear existing Address Search Mark
                                    addressMarkers[i].setMap(null);
                                }

                                geocoder.geocode({address: address}, function(results, status) {
                                    if (status == google.maps.GeocoderStatus.OK) {
                                        var lat = results[0].geometry.location.lat();
                                        var lon = results[0].geometry.location.lng();
                                        var latLng = new google.maps.LatLng(lat, lon);
                                        var addressMarker = new google.maps.Marker({
                                            slug: address,
                                            position: latLng,
                                            map: ftg_map,
                                            draggable: !1,
                                            title: address,
                                            lat: lat,
                                            lon: lon,
                                            id: "addressSearch"
                                        });
                                        addressMarkers.push(addressMarker);
                                        // var markerClusterer = new MarkerClusterer(ftg_map);
                                        propertiesMap(addressMarker, true);
                                    }
                                });
                            }
                        }
                    });



                    $("form#mapSearch .arrow").on("click", function(){
                        $("form#mapSearch").submit();
                    });


                    $(".listViewButtonWrap .btnRoundPurple").on("click", function(){
                        Cookies.set("destinationListPageSelect","");
                    });

                };










                updatePropertyListData();

                if(isCollectionUrl){
                    propertiesMap([], false);

                } else {
                    destinationsMap();
                }






            },

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            iwUpdateClasses: function(){
                var iwOuter = $('.gm-style-iw');
                var iwOuterIn = $('.gm-style-iw > div:nth-child(1)').addClass("iwOuterIn");
                var iwOuterWrap = iwOuter.parent().addClass("iwOuterWrap");
                var iwBgWrap = iwOuterWrap.find(">div:first-child").addClass("iwBgWrap");
                iwBgWrap.find(">div:nth-child(1)").addClass("jm-arrow-shadow");
                iwBgWrap.find(">div:nth-child(2)").addClass("jm-background-shadow");
                iwBgWrap.find(">div:nth-child(4)").addClass("jm-background");

                var jmArrow = iwBgWrap.find(">div:nth-child(3)").addClass("jm-arrow");
                jmArrow.find(">div:nth-child(1)").addClass("jm-arrow-left");
                jmArrow.find(">div:nth-child(2)").addClass("jm-arrow-right");
            },

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            collectionDetailPage : function(){
                if($(document).find(".filter-container .propBox").length >0){

                    ftgUtil.updateFilterSort();

                    $('.filter-buttons a').click(function(e) {
                        e.preventDefault();
                        $('.filter-buttons a').removeClass("active");
                        $(this).addClass('active');
                        var filterItem = $(this).attr('data-filter');
                        var destinationFilter = $(this).attr('data-destination');
                        ftgUtil.filterProperty("#propertyList .filtr-item", filterItem);
                        ftgUtil.updateCounter("#propertyList .filtr-item", ".filterDisplayingCount");

                        if($(".destinationFilterWrap").length > 0){
                            if($(".destinationFilterWrap .destinationFilter ul li.visible").length > 2){
                                $(".destinationFilterWrap").show();
                            } else {
                                $(".destinationFilterWrap").hide();
                            }
                            if(destinationFilter && destinationFilter > 0){
                                $(".destinationFilterWrap .destinationFilter ul li:eq("+destinationFilter+")").trigger("click");
                            } else {
                                $(".destinationFilterWrap .destinationFilter ul li").first().trigger("click");
                            }
                        }
                    });

                    $(".destinationFilter ul li").on("click", function(){
                        $(".filter-buttons a.active").attr("data-destination", $(this).index());
                    });

                    $(".viewMapLink").on("click", function(e){
                        e.preventDefault();
                        var newUrl = $(this).attr("href") + '&initFilterType=' + $("#filterButtonWrap a.active").attr("data-type") + '&initSort=' + $("#sortMenu ul li.active").index();
                        window.location.href = newUrl;
                    });
                }
                ftgUtil.updateEmptyFilter();



                var currentCollectionName = $("#propertyListWrap").attr("data-collectionid");
                var collectionName = Cookies.get("collectionName");
                var collectionPropType = Cookies.get("collectionPropType");
                var collectionDestination = Cookies.get("collectionDestination");
                var collectionSort = Cookies.get("collectionSort");

                if(currentCollectionName != collectionName){
                    collectionPropType = 0;
                    collectionDestination = 0;
                    collectionSort = 0;
                } else {
                    $(".filter-buttons a").each(function(i){
                        var initDestFilter = Cookies.get("destination-"+i);
                        $(this).attr("data-destination", initDestFilter);
                    });
                }

                $("#filterButtonWrap a:eq("+collectionPropType+")").trigger("click");
                $("#destinationFilter ul li:eq("+collectionDestination+")").trigger("click");

                setTimeout(function(){
                    if($("#filterSortMobile").is(":visible")){
                        $("#filterSortMobile ul li:eq("+collectionSort+")").trigger("click");
                    } else {
                        $("#sortMenu ul li:eq("+collectionSort+")").trigger("click");
                    }
                },300);

                ftgUtil.updateEmptyFilter();

                $( window ).unload(function() {
                    Cookies.set("collectionName",currentCollectionName);
                    Cookies.set("collectionPropType",$("#filterButtonWrap a.active").index()-1);
                    Cookies.set("collectionDestination",$("#destinationFilter ul li.active").index());
                    Cookies.set("collectionSort",$("#sortMenu ul li.active").index());

                    $(".filter-buttons a").each(function(i){
                        Cookies.set("destination-"+i,$(this).attr("data-destination"));
                    });
                });




            },

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            awardWinnersPage: function(){

                // reload page when page open from browser back button
                $(window).bind("pageshow", function(event) {
                    if (event.originalEvent.persisted) {
                        window.location.reload()
                    }
                });

                ftg.processingFilterMessage("One moment, please...", "on");

                var getWinnerData = function(tableData){
                    $.ajax({
                        url: '/award-winners.json',
                        data: { format: 'json' },
                        type: 'GET',
                        dataType: 'json',
                        success: function(json) {

                            // console.log(json);

                            var imageBase = $("#winnersTable").attr("data-imageBase");
                            var return_data = new Array();
                            for(var i=0;i< json.awardWinners.length; i++){
                                // var rated = json.awardWinners[i].ratingDisplay.replace("Rated","").replace("Recommended","Rec");
                                var rated1 = json.awardWinners[i].ratingDisplay.replace("Rated","");
                                var rated2 = rated1.replace("Recommended","Reco");

                                return_data.push({
                                    'propertyName': '<span class="hidden">'+json.awardWinners[i].sortName+'</span>'+'<a href="'+json.awardWinners[i].propertyURI+'" class="mobilePropLink">'+json.awardWinners[i].propertyName+'</a>'
                                    +'<div class="mobileOnly">'
                                    // +'<img src="'+imageBase+'/images/ic-'+json.awardWinners[i].propertyType+'.svg" title="'+json.awardWinners[i].propertyType+'">'
                                    +'<span class="propTypeIcon '+json.awardWinners[i].propertyType.toLowerCase()+'"></span>'
                                    +'<span class="mobileRate">'+rated1+'</span>'
                                    +'<div class="countryWrap">'
                                    +'<a href="'+json.awardWinners[i].destinationURI+'">'+json.awardWinners[i].destinationName+'</a> ,'
                                    +'<a href="/destinations-list?init='+json.awardWinners[i].regionId+'"> '+json.awardWinners[i].country+'</a>'
                                    +'</div>'
                                    +'</div>',

                                    'RatingHidden': json.awardWinners[i].ratingObject.id,
                                    'TypeHidden': json.awardWinners[i].propertyType,
                                    'NewHidden': json.awardWinners[i].newlyRated,
                                    'propertyFriendlyNameHidden': json.awardWinners[i].propertyFriendlyName,

                                    'Rating':
                                    '<span class="hidden">'+json.awardWinners[i].ratingObject.id+'</span>'+

                                    // '<span class="mobileOnly"><img class="tblStarRating" src="' +imageBase+ '/images/rating-' +json.awardWinners[i].ratingObject+ '-star-icon.png" title="' +json.awardWinners[i].ratingObject+ '"></span>'+
                                    // '<span class="desktopOnly">' +json.awardWinners[i].ratingDisplay+ '</span>',

                                    // '<span class="mobileOnly">'+rated2+'</span>'+
                                    '<span class="desktopOnly">' +rated1+ '</span>',

                                    'propertyType': '<span class="hidden">'+json.awardWinners[i].propertyType+'</span>'
                                    // +'<img src="'+imageBase+'/images/ic-'+json.awardWinners[i].propertyType+'.svg" title="'+json.awardWinners[i].propertyType+'">',
                                    +'<span class="propTypeIcon '+json.awardWinners[i].propertyType.toLowerCase()+'" title="'+json.awardWinners[i].propertyType+'">',

                                    'destinationName': '<a href="'+json.awardWinners[i].destinationURI+'">'+json.awardWinners[i].destinationName+'</a>',

                                    'country': '<a href="/destinations-list?init='+json.awardWinners[i].regionId+'">'+json.awardWinners[i].country+'</a>',
                                    'city': json.awardWinners[i].city,
                                    'secondaryRegion': json.awardWinners[i].secondaryRegion,
                                });
                            }

                            $("#winnersTable th").show();
                            var oTable = $('#winnersTable').DataTable( {
                                "fnPreDrawCallback":function(){},
                                "fnDrawCallback":function(){
                                    $("#winnersTable th").show();

                                    var count = $('#winnersTable').DataTable().page.info().recordsDisplay;
                                    var total = $('#winnersTable').DataTable().page.info().recordsTotal;
                                    if(count == total){
                                        $("#filterDisplayingCount").text(" "+total);
                                    } else {
                                        $("#filterDisplayingCount").text(count+" of "+total);
                                    }

                                    // ftg.loadingOverlay("", "off");
                                    ftg.processingFilterMessage("", "off");
                                },
                                "language": {
                                    "zeroRecords": "Sorry, no results.",
                                    "paginate": {
                                        "previous": "Prev",
                                        "Next": "Next"
                                    }
                                },
                                "fnInitComplete":function(){},
                                // "pageLength": return_data.length,
                                "pageLength": 50,
                                // "bPaginate": false,
                                "bLengthChange": false,
                                "bInfo": true,
                                "responsive": true,
                                "autoWidth": false,
                                "bAutoWidth": false,
                                // "processing": true,
                                "fixedColumns": true,
                                "columnDefs": [
                                    // { responsivePriority: 1, targets: 0 },
                                    // { responsivePriority: 2, targets: 1 },
                                    // { responsivePriority: 3, targets: 2 },
                                    { "targets": [  1 ], "visible": false },
                                    { "targets": [  2 ], "visible": false },
                                    { "targets": [  3 ], "visible": false },
                                    { "targets": [  4 ], "visible": false },
                                    { "targets": [  9 ], "visible": false },
                                    { "targets": [ 10 ], "visible": false },
                                    // { "searchable": false, "targets": 5 },
                                    // { "searchable": false, "targets": 6 },
                                    // { "searchable": false, "targets": 8 },
                                ],
                                "columns": [
                                    { data: "propertyName"},

                                    { data: "RatingHidden" },
                                    { data: "TypeHidden" },
                                    { data: "NewHidden" },
                                    { data: "propertyFriendlyNameHidden" },

                                    { data: "Rating"},
                                    { data: "propertyType" ,"width": "50px" ,sClass: "propIconColumn"},
                                    { data: "destinationName" },
                                    { data: "country" },

                                    { data: "city" },
                                    { data: "secondaryRegion" },
                                ],
                                "fixedHeader": {
                                    header: true,
                                    headerOffset: 134,
                                },
                            } );
                            $('.dataTables_filter input').keyup( function () {
                                oTable.fnFilter(jQuery.fn.DataTable.ext.type.search.string( this.value ));
                                oTable.fnFilter(jQuery.fn.DataTable.ext.type.search.html( this.value ));
                            } );


                            var updateFixedPosition = function(){
                                if(navigator.platform == 'iPad' || navigator.platform == 'iPhone' || navigator.platform == 'iPod') {
                                    // $("#filerBlock, #propertyListWrap").css("position", "static");
                                } else {
                                    // console.log($(window).scrollTop());
                                    if ($(window).scrollTop() > 672){
                                        $("#filerBlock, #propertyListWrap").addClass("fixedPosition");

                                        var height1 = $("#filerBlock").outerHeight();
                                        var height2 = $("#propertyListWrap").outerHeight();

                                        $("#propertyListWrap").css({"top":height1-20+"px", "padding-top":20+"px"});
                                        $(".container table").css({"position":"relative", "top":height1+height2+"px", "margin-bottom":height1+height2+"px"});
                                    } else {
                                        $("#filerBlock, #propertyListWrap").removeClass("fixedPosition");
                                        $(".container table").css({"top":"0px", "margin-bottom":"0px"});
                                    }
                                }

                            };

                            $(window).scroll(function(){
                                // console.log($(window).scrollTop());
                                updateFixedPosition();

                                // console.log($("footer").isOnScreen());
                                // console.log("page ct : "+$("#winnersTable_paginate span .paginate_button").length);
                                // if($("footer").isOnScreen()){
                                if($("#winnersTable_paginate span .paginate_button").length > 1){
                                    var VisibleRows = $('#winnersTable>tbody>tr:visible').length;
                                    var i = VisibleRows + 500;
                                    // var i = return_data.length;
                                    oTable.page.len( i ).draw();
                                } else {
                                    $("#moreButtonWrap").remove();
                                }
                                // }
                            });

                            $(window).resize(function() {
                                updateFixedPosition();
                            });









                            var addTableRow = function(p1,p2){
                                for(var i=p1; i<p2; i++){
                                    oTable.row.add( return_data[i]);
                                }
                                oTable.draw( false );
                                $("#filterDisplayingCount").text(return_data.length);
                            };



                            // ****************************************************
                            addTableRow(0,return_data.length);

                            // ********* Display DataTable 50 first... ***********
                            // addTableRow(0,50);
                            // setTimeout(function(){
                            //     addTableRow(51,return_data.length);
                            //     applyTableFilters();
                            // },100);

                            $(".dataTables_processing").hide();
                            // ****************************************************

                            // $(document).on("input","#tableSearch #mapQuery", function(e){
                            //     console.log(e.keyCode);
                            //     oTable.search($(this).val()).draw();
                            // });

                            var searchTable = function(){
                                var $this = $('#tableSearch #mapQuery');
                                oTable.search($this.val()).draw();
                            };

                            var saveSearchTextCookie = function(){
                                Cookies.set('searchText', $("#tableSearch #mapQuery").val());
                            };

                            var timer = null;
                            $('#tableSearch #mapQuery').keydown( function (e) {
                                // console.log($(this).val());
                                if(e.keyCode == 13){
                                    saveSearchTextCookie();
                                    searchTable();
                                    e.preventDefault();
                                    return false;
                                };
                                if($(this).val() === ""){
                                    saveSearchTextCookie();
                                    searchTable();
                                };

                                if (timer) {
                                    clearTimeout(timer);
                                }
                                timer = setTimeout(function() {
                                    // console.log("idel out");
                                    saveSearchTextCookie();
                                    searchTable();
                                }, 1000);
                            } );

                            $("#tableSearch .searchArrow").on("click", function(e){
                                // if($('#tableSearch #mapQuery').val().length > 0);{
                                saveSearchTextCookie();
                                searchTable();
                                // }
                                e.preventDefault();
                                return false;
                            });



                            var applyTableFilters = function(){
                                setTimeout(function(){
                                    var filter1 = '', filter1Col = '';
                                    $("#filerBlock .filter-list li.group1.active").each(function(){
                                        filter1Col = $(this).attr("data-col");
                                        filter1 += $(this).attr("data-value") + "|";
                                    });
                                    filter1 = filter1.substr(0,filter1.length-1);

                                    var filter2 = '', filter2Col = '';
                                    $("#filerBlock .filter-list li.group2.active").each(function(){
                                        filter2Col = $(this).attr("data-col");
                                        filter2 += $(this).attr("data-value") + "|";
                                    });
                                    filter2 = filter2.substr(0,filter2.length-1);

                                    var filter3 = '', filter3Col = '';
                                    $("#filerBlock .filter-list li.group3.active").each(function(){
                                        filter3Col = $(this).attr("data-col");
                                        filter3 += $(this).attr("data-value") + "|";
                                    });
                                    filter3 = filter3.substr(0,filter3.length-1);

                                    // console.log("filter1 : "+filter1);
                                    // console.log("filter2 : "+filter2);
                                    // console.log("filter3 : "+filter3);

                                    var searchTxt = $('#tableSearch #mapQuery').val();

                                    // if( filter1+filter2+filter3 == ""){
                                    //     oTable.search( '' ).columns().search( '' ).draw();
                                    // } else {
                                    //     oTable.search( '' ).columns().search( '' )
                                    //         .column( filter1Col ).search(filter1,true,false)
                                    //         .column( filter2Col ).search(filter2,true,false)
                                    //         .column( filter3Col ).search(filter3,true,false)
                                    //         .draw();
                                    // }

                                    if( filter1+filter2+filter3 == ""){
                                        oTable.search( '' ).columns().search( '' ).draw();
                                        searchTable();
                                    } else {
                                        oTable.search( '' ).columns().search( '' )
                                            .column( filter1Col ).search(filter1,true,false)
                                            .column( filter2Col ).search(filter2,true,false)
                                            .column( filter3Col ).search(filter3,true,false)
                                            .draw();
                                        searchTable();
                                    }
                                }, 100);
                            };


                            // ***********************************************************
                            $("#filerBlock .filter-list li").on("click", function(){

                                // ftg.loadingOverlay("One moment, please...", "on");
                                ftg.processingFilterMessage("One moment, please...", "on");

                                $(this).toggleClass("active");
                                $("#filerBlock .filter-list li").each(function(){
                                    Cookies.set($(this).attr("data-value"), $(this).hasClass("active"));
                                });
                                applyTableFilters();
                            });

                            var updateIcon = function(){
                                if($(".filterMenu").is(":visible")){
                                    $(".mobileOpenClose .down").addClass("opened");
                                } else {
                                    $(".mobileOpenClose .down").removeClass("opened");
                                }
                            };
                            updateIcon();
                            $(window).resize(function() {
                                updateIcon();
                                if(!$(".mobileOpenClose").is(":visible")){
                                    $(".filterMenu.mobileFixMenu").css("display","inline-block");
                                }
                            });

                            $("#filerBlock #mobileFlags .filterFlag").on("click", function(){
                                $(this).toggleClass("active");
                                $("#filerBlock .filter-list li[data-value='"+$(this).attr("data-value")+"']").toggleClass("active");
                                applyTableFilters();
                            });

                            $("#filterMenuTop").on("click", function(){
                                if($(".mobileOpenClose").is(":visible")){
                                    $("#filerBlock .filterMenu").toggle();
                                    updateIcon();
                                    setTimeout(function(){
                                        updateFixedPosition();
                                    },100);
                                }
                            });

                            $("#filerBlock .filter-list li").each(function(){
                                var cookieVal = Cookies.get($(this).attr("data-value"));
                                // console.log('cookie : '+$(this).attr("data-value")+" : "+cookieVal);
                                if(cookieVal === 'true'){
                                    $(this).addClass("active");
                                }
                            });

                            if($("#filerBlock .filter-list li.active").length > 0){
                                // console.log("trigger click");
                                $("#filterMenuTop").trigger("click");
                            }

                            var cookieSearchText = Cookies.get('searchText');
                            $('#tableSearch #mapQuery').val(cookieSearchText);
                            // console.log("cookieSearchText :"+cookieSearchText);

                            applyTableFilters();

                        },
                        error: function() {
                        }
                    });
                };

                $(".dataTables_processing").show();
                getWinnerData();



                var isMobile = false; //initiate as false
                if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
                    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;
                if(isMobile){
                    $('#tableSearch #mapQuery').keydown( function (e) {
                        if(e.keyCode == 13){
                            document.activeElement.blur();
                        };
                    } );
                }

            },

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            newsPage: function(){
                $("#viewMoreNews").on("click", function(){
                    $(this).hide();
                    $("#newsList .hidden").removeClass("hidden");
                });
            },

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            brandOfficialsLandingPage: function(){
                $(".brandLogoImg").on("click", function(e){
                    e.preventDefault();
                });

                // $(".closeModal").on("click", function(){
                //     $('#modal').modal('toggle');
                // });
                // $(".brandModule").hover(function() {
                //     $(this).addClass("darkBg");
                //     $(this).children(".brandInfo").fadeIn();
                //     var $brandDetail = $(this).find(".brandDetail");
                //     if($brandDetail.height() >= 100){
                //         $brandDetail.addClass("scrollDiv");
                //     }
                // }, function() {
                //     $(this).children(".brandInfo").fadeOut();
                //     $(".brandInfo").removeClass("scrollDiv");
                //     $(this).removeClass("darkBg");
                // });
            },

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            sacMemberPage: function(){
                $("#termTabs .termTab").on("click", function(){
                    var tabId = "#"+$(this).attr("data-tabId");
                    // console.log("tabId : "+tabId);
                    $("#termTabs .termTab").removeClass("active");
                    $(this).addClass("active");
                    $("#peopleList .peopleBlock").addClass("hidden");
                    $(tabId).removeClass("hidden");
                });

                var getTallest = function($obj){
                    var tallest = 0;
                    $obj.css("height","");
                    $obj.each(function(){
                        if($(this).height() > tallest){
                            tallest = $(this).height();
                        }
                    });
                    $obj.height(tallest);
                };

                var updateBottomSpace =  function(){
                    var padding = $("#peopleList .midImageWrap:first-child").css("padding-right").replace("px","");
                    $("#peopleList .midImageWrap").css("margin-bottom",padding*2+"px");
                };


                getTallest($("#peopleList .midImageWrap .peopleDetail"));
                // getTallest($("#peopleList .midImageWrap"));
                updateBottomSpace();

                $(window).resize(function() {
                    getTallest($("#peopleList .midImageWrap .peopleDetail"));
                    getTallest($("#peopleList .midImageWrap"));
                    updateBottomSpace($("#peopleList .midImageWrap"));
                });

                setTimeout(function(){
                    $(".dont-break-out").removeClass("dont-break-out");
                    $(window).trigger('resize');
                },300);
            },

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            ourTeamPage: function(){

                var getTallest = function($obj, target){
                    $obj.each(function(){
                        var tallest = 0;
                        var $target = $obj.find(target);
                        $target.css("height","");
                        $target.each(function(){
                            if($(this).height() > tallest){
                                tallest = $(this).height();
                            }
                        });
                        $target.height(tallest);
                    });
                };

                var updateBottomSpaceOurTeam = function(){
                    var padding = $("#peopleList .firstBlock .midImageWrap").css("padding-right").replace("px","");
                    $("#peopleList .firstBlock .midImageWrap").css("margin-bottom",padding*2+"px");

                    padding = $("#peopleList .otherBlock .midImageWrap").css("padding-right").replace("px","");
                    $("#peopleList .otherBlock .midImageWrap").css("margin-bottom",padding*2+"px");
                };

                $("#peopleList .midImageWrap .verticalMiddleWrap").on("mouseover", function(){
                    $(this).find("hr").addClass("hoverBorder");
                });
                $("#peopleList .midImageWrap .verticalMiddleWrap").on("mouseout", function(){
                    $(this).find("hr").removeClass("hoverBorder");
                });

                getTallest($("#peopleList .firstBlock"),".midImageWrap .peopleDetail");
                getTallest($("#peopleList .firstBlock"),".verticalMiddleWrap");

                getTallest($("#peopleList .otherBlock"),".midImageWrap .peopleDetail");
                getTallest($("#peopleList .otherBlock"),".verticalMiddleWrap");

                updateBottomSpaceOurTeam();

                $(window).resize(function() {
                    getTallest($("#peopleList .firstBlock"),".midImageWrap .peopleDetail");
                    getTallest($("#peopleList .firstBlock"),".verticalMiddleWrap");

                    getTallest($("#peopleList .otherBlock"),".midImageWrap .peopleDetail");
                    getTallest($("#peopleList .otherBlock"),".verticalMiddleWrap");

                    updateBottomSpaceOurTeam();
                });
            },

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            specialOffers: function(){
                $(document).on("click",".filterSort .filterSortTriangle", function(){
                    $(".filterSort #filterSelected").trigger("click");
                });
                $(document).on("click",".filterSort #filterSelected", function(){
                    $(".filterSortMenu").toggle();
                    $(".filterSortTriangle").toggleClass("opened");
                });
                $(document).on("click",".filterSort .filterSortMenu li", function(){
                    var selected = ".dst-"+$(this).attr("data-id");
                    $(".filterSort .filterSortMenu li").removeClass("active");
                    $(this).addClass("active");
                    $(".filterSort #filterSelected").text($(this).text());
                    if(selected === ".dst-All"){
                        $("#offerList .destination").show();
                    } else {
                        $("#offerList .destination").hide();
                        $("#offerList "+selected).show();
                    }
                    $(".filterSortMenu").hide();
                });

                $(".filterSortMenu").on("mouseleave", function(){
                    $(".filterSortMenu").hide();
                });

            },

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            careers: function(){
                $(".accordionTitle .ardIcon, .accordionTitle .ardIconTitle").on("click", function(){
                    var $parent = $(this).parent().parent();
                    $parent.find(".accordionContent").toggle();
                    var $ardIcon = $parent.find(".ardIcon");
                    if($ardIcon.hasClass("opened")){
                        $ardIcon.removeClass("opened").addClass("closed");
                    } else {
                        $ardIcon.removeClass("closed").addClass("opened");
                    }
                });

                $(".accordionTitle .ardIcon").each(function(){
                    $(this).trigger("click");
                });
            },
        };



        ftg.init();



        // Init Each Specific Page JS ********************************************************
        if($("#ftg-homepage").length > 0)               { ftg.homepage(); };
        if($("#ftg-property").length > 0)               { ftg.propertyPage(); };
        if($("#destinationLandingPage").length > 0)     { ftg.destinationLandingPage(); };
        if($("#destinationListPage").length > 0)        { ftg.destinationListPage(); };
        if($("#destinationPropertiesPage").length > 0)  { ftg.destinationPropertiesPage(); };
        if($("#destinationTravelGuidePage").length > 0) { ftg.destinationTravelGuidePage(); };
        if($("#collectionDetailPage").length > 0)       { ftg.collectionDetailPage(); };
        if($("#searchResultPage").length > 0)           { ftg.searchResultPage(); };
        if($("#awardWinnersPage").length > 0)           { ftg.awardWinnersPage(); };
        if($("#newsPage").length > 0)                   { ftg.newsPage(); };
        if($("#brandOfficialsLandingPage").length > 0)  { ftg.brandOfficialsLandingPage(); };
        if($("#sacMemberPage").length > 0)              { ftg.sacMemberPage(); };
        if($("#ourTeamPage").length > 0)                { ftg.ourTeamPage(); };
        if($("#specialOffers").length > 0)              { ftg.specialOffers(); };
        if($("#careersContainer").length > 0)           { ftg.careers(); };







    });
});
