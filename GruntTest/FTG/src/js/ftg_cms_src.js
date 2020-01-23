$(document).ready(function(){

    var globalImageBase = $("body").attr("data-globalImageBase");

    var ftg = {
        init : function(){

            var partialURI = $("#partialURI");
            var editPartialURIButton = $("#editPartialURI");
            var partialURILabel = $("#partialURILabel");
            var partialURIDiv = $("#partialURIDiv");
            var partialURIErrorDiv = $("#partialURIErrorDiv");
            var initialPartialURI = partialURI.val();

            editPartialURIButton.click(function() {
                if(partialURI.is(":disabled")) {
                    partialURI.prop("disabled", false);
                    button.html("Use Generated URI");
                    partialURILabel.html("Overridden Partial URI");
                } else {
                    partialURI.prop("disabled", true);
                    partialURI.val(initialPartialURI);
                    button.html("Override Generated URI");
                    partialURILabel.html("Generated Partial URI");
                    if(partialURIDiv.hasClass("has-error") && partialURIDiv.hasClass("has-danger")) {
                        partialURIDiv.removeClass("has-error has-danger");
                        partialURIErrorDiv.html("");
                    }
                }
            });

            $('.input-group.date').each(function() {
                $(this).datepicker();
            });


            $('[data-toggle="popover"]').popover({
                trigger: "hover",
            });
            $('[data-toggle="popoverFocus"]').popover({
                trigger: 'focus',
            });

            $('[data-toggle="tooltip"]').tooltip({
                // placement: 'right',
            });


            // Main Navigation Mark Active
            var pageId = $("body").attr("id");
            var $activeMenu = $("#cmsMainNavigation").find(".active");
            $activeMenu.closest(".dropdown").addClass("active").find(".activeNode").addClass("active");

            // Init Tabs ********************************************
            if($(".nav.nav-tabs").length > 0){
                var initTab = ftgUtil.getUrlParameter('tab');
                if(initTab){
                    $("#tab"+initTab).trigger("click");
                } else {
                    if($(".help-block.with-errors span").length > 0){
                        var $firstErrorField = $(".help-block.with-errors span:first");
                        var tabId = $firstErrorField.closest(".tab-pane").attr("id");
                        $(".nav-tabs li a[href$='#"+tabId+"']").trigger("click");
                    }
                }
            }


            // Init Chosen Type Ahead ********************************************
            var config = {
                '.chosen-select'           : {},
                '.chosen-select-deselect'  : {allow_single_deselect:true},
                '.chosen-select-no-single' : {disable_search_threshold:10},
                '.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
                '.chosen-select-width'     : {width:"95%"}
            }
            for (var selector in config) {
                $(selector).chosen(config[selector]);
            }



            if($("form").length >0){
                // Init Bootstrap Validator ********************************************
                $.fn.validator.Constructor.INPUT_SELECTOR = ':input:not([type="submit"], [type="reset"], button, .search-field input):enabled, .chosen-select, .select2';

                $('form[data-toggle="validatorForTab"]').validator().on('submit', function (e) {
                    if (e.isDefaultPrevented()) {
                        // console.log("errors in input form");
                        // TAB SUPPORT FOR BOOTSTRAP
                        var firstInvalid = $(".form-group.has-error").first();
                        var tabContainer = firstInvalid.parents('div .tab-pane');

                        if (tabContainer != null) {
                            var tabA = $('.nav-tabs a[href="#' + tabContainer.attr('id') + '"]');

                            if (tabA != null) {
                                tabA.tab('show');
                            }
                        }
                    } else {
                        // console.log("good to submit");
                    }
                });

                // Form Reset function for chosen multi select  ********************************************
                $('button[type="reset"]').click(function(ev){
                    ev.preventDefault();

                    var currentTab = "";
                    if($("#tabNav li").length > 0){
                        currentTab = $("#tabNav li.active a").attr("id").replace("tab","");
                        if(currentTab === "1"){
                            currentTab = "";
                        } else {
                            currentTab = "?tab=" + currentTab;
                        }
                    }

                    // var currentUrl = $(location).attr('href')+currentTab;

                    var currentUrl = window.location.pathname+currentTab;
                    if(confirm("Clear all changes?")) {
                        window.open(currentUrl,"_self");
                    }


                    // var $form = $(this).closest('form');
                    // $form.trigger('reset');
                    //
                    // // Chosen Multi Select
                    // $form.find(".chosen-select").each(function(){
                    //     $(this).trigger("chosen:updated");
                    // });
                    //
                    // // nicEditor
                    // $form.find('textarea.nicEditor').each(function(i){
                    //     var initTextareaData = $(this).closest("textarea").val();
                    //     var textareaId = $(this).attr("id");
                    //     nicEditors.findEditor( textareaId ).setContent( initTextareaData );
                    // });
                    //
                    // $form.find('.txtCounterWrap').each(function(i){
                    //     // $(this).parent().find(".txtCounterWrap").remove();
                    //     $(this).html('Text Counter : 0');
                    // });

                });


                // Form textarea word counter  ********************************************
                if($('form textarea.form-control').length > 0){
                    var getWordCount = function(val){
                        var wd = val.match(/\S+/g);
                        return {
                            charactersNoSpaces : val.replace(/\s+/g, '').length,
                            characters         : val.length,
                            words              : wd ? wd.length : 0,
                            lines              : val.split(/\r*\n/).length
                        };
                    };
                    $('form textarea.form-control').each(function(i){
                        var maxCt = 0, maxCtText = "";
                        var bootstrapInput = this;
                        if($(this).attr("maxlength")){
                            maxCt = $(this).attr("maxlength");
                            maxCtText = "<span class='txtCounterMax'> of "+maxCt+"</span>";
                        }

                        var initText = bootstrapInput.value;
                        if(maxCt > 0 && initText.length > maxCt){
                            bootstrapInput.value = initText.substring(0,maxCt);
                        }

                        var txtResult = getWordCount($(this).val());
                        var msgWindow = "txtCounter"+i;
                        $(this).after('<div id="'+msgWindow+'" class="txtCounterWrap">Text Counter : '+txtResult.characters+maxCtText+'</div>');

                        $(this).keyup(function() {
                            var txtResult = getWordCount( this.value );
                            var htmlContent = '<div id="'+msgWindow+'" class="txtCounterWrap">Text Counter : '+txtResult.characters+maxCtText+'</div>';

                            if(this.value.length >= maxCt && maxCt > 0){
                                var htmlContent = '<div id="'+msgWindow+'" class="txtCounterWrap error">Text Counter : '+txtResult.characters+maxCtText+'</div>';
                            };
                            $(document).find("#"+msgWindow).html(htmlContent);

                        });
                    });
                }


                // Form NiceEditor Textarea word counter  ********************************************
                bkLib.onDomLoaded (function() {
                    if($('form textarea.nicEditor').length > 0){

                        var placeCaretAtEnd = function(el) {
                            el.focus();
                            if (typeof window.getSelection != "undefined"
                                && typeof document.createRange != "undefined") {
                                var range = document.createRange();
                                range.selectNodeContents(el);
                                range.collapse(false);
                                var sel = window.getSelection();
                                sel.removeAllRanges();
                                sel.addRange(range);
                            } else if (typeof document.body.createTextRange != "undefined") {
                                var textRange = document.body.createTextRange();
                                textRange.moveToElementText(el);
                                textRange.collapse(false);
                                textRange.select();
                            }
                        };

                        var nicCount = function(editor, $editorInput, counterObj, maxCt, maxCtText)  {
                            var content = editor.getContent();
                            var cleanContent = ftgUtil.stripHtml(content);

                            if(maxCt > 0 && cleanContent.length >= maxCt){
                                var getTextFromHtmlContent = ftgUtil.htmlSubstring(content, maxCt);
                                $editorInput.html(getTextFromHtmlContent);
                                placeCaretAtEnd($editorInput.get(0));
                                content = editor.getContent();
                                cleanContent = ftgUtil.stripHtml(content);
                                counterObj.classList.add("error");
                            } else {
                                counterObj.classList.remove("error");
                            }
                            counterObj.innerHTML = 'Text Counter : '+cleanContent.length + maxCtText;
                            // counterObj.value = content;
                        };

                        $('form textarea.nicEditor').each(function(i){
                            var $this = $(this);
                            var editorId = $this.attr("id");
                            var maxCt = 0;
                            var msgWindow = "txtNiceCounter"+i;
                            var editor = nicEditors.findEditor(editorId);
                            var maxCtText = "";
                            var content = editor.getContent();
                            var cleanContent = ftgUtil.stripHtml(content);

                            if($(this).attr("maxlength")){
                                maxCt = $(this).attr("maxlength");
                                maxCtText = "<span class='txtCounterMax'> of "+maxCt+"</span>";
                            }

                            $(this).after('<div id="'+msgWindow+'" class="txtCounterWrap"></div>');

                            var counterObj = document.getElementById(msgWindow);
                            if(counterObj) {
                                var $input = $("#"+editorId);
                                var $editorInput = $input.parent().find(".nicEdit-main");
                                var $form = $input.closest("form");

                                editor.getElm().onkeyup = function() {
                                    var editorContent = editor.getContent();
                                    if(editorContent == "<br>"){
                                        editorContent = "";
                                    }
                                    $input.val(editorContent).trigger("input");
                                    nicCount(editor, $editorInput, counterObj, maxCt, maxCtText);
                                }
                                nicCount(editor, $editorInput, counterObj, maxCt, maxCtText);

                            }
                        });

                        $('form .nicEdit-main').on("blur",function(){
                            $(this).closest(".nicEditWrap").find("textarea").trigger("input");
                        });


                        $('form textarea.nicEditor').each(function(i){
                            var niceVal = $(this).val().trim();
                            if(niceVal === '<br>'){
                                $(this).val('');
                                $(this).text('');
                                // $(this).trigger("change");
                            }
                        });

                        $('form').on("submit",function(){
                            $('form textarea.nicEditor').each(function(i){
                                var niceVal = $(this).val().trim();
                                if(niceVal === '<br>'){
                                    $(this).val('');
                                    $(this).text('');
                                }
                            });

                        });
                    };
                });

                // $('form').validator().on('submit', function (e) {
                    // console.log(".nicEditor : "+$(".nicEditor").length);
                    // $(".nicEditor").each(function(){
                    //     console.log($(this).val());
                    // });
                    // if (e.isDefaultPrevented()) {
                    //     console.log("Error to submit");
                    // } else {
                    //     console.log("good to submit");
                    // }
                // });

                // $("form button[type='submit']").addClass("disabled");

                $("form button[type='submit']").on("click", function(e){
                    if($(this).hasClass("disabled")){
                      e.preventDefault();
                    };
                });


            };


            // Init Fix for  Bootstrap Dialog Modal Position Center of Window ***************************************
            if($(".modal").length > 0){
                function setModalMaxHeight(element) {
                    this.$element     = $(element);
                    this.$content     = this.$element.find('.modal-content');
                    var borderWidth   = this.$content.outerHeight() - this.$content.innerHeight();
                    var dialogMargin  = $(window).width() < 768 ? 20 : 60;
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
                });
                $(window).resize(function() {
                    if ($('.modal.in').length != 0) {
                        setModalMaxHeight($('.modal.in'));
                    }
                });
            }



            // Init for colorbox Popup ***************************************
            $(".textGroup").colorbox({
                rel:'textGroup',
                inline:true,
                loop: false,
                href:$(this).attr('href'),
                current: "{current} of {total} pages" ,
                // title: function(){
                //     var url = $(this).attr('href');
                //     return '<a href="' + url + '" target="_blank">Open In New Window</a>';
                // }
            });

            $(".popupBoxGallery").colorbox({
                rel:'gallery',
                loop: true,
            });


            if($("table.datatable").length > 0){
                // **** Recalculate Datatable Column with for hidden table under tab
                $('a[data-toggle="tab"]').on('shown.bs.tab', function(e){
                    $($.fn.dataTable.tables(true)).DataTable().columns.adjust();
                });
                $("table.datatable").each(function(){
                    // console.log("length :"+$(this).find("tbody tr").length);
                   if($(this).find("tbody tr").length == 0){
                       $(this).closest(".dataTableLoading").hide();
                   } else {
                       $(this).closest(".dataTableLoading").show();
                       $(this).closest(".dataTableLoading").removeClass("dataTableLoading");
                   }
                });
            }

            // Init for nicEditor ***************************************
            // 'bold'
            // 'italic'
            // 'underline'
            // 'left'
            // 'center'
            // 'right'
            // 'justify'
            // 'ol'
            // 'ul'
            // 'subscript'
            // 'superscript'
            // 'strikethrough'
            // 'removeformat'
            // 'indent'
            // 'outdent'
            // 'hr'
            // 'image'
            // 'upload' * requires nicUpload
            // 'forecolor'
            // 'bgcolor'
            // 'link' * requires nicLink
            // 'unlink' * requires nicLink
            // 'fontSize' * requires nicSelect
            // 'fontFamily' * requires nicSelect
            // 'fontFormat' * requires nicSelect
            // 'xhtml' * required nicCode

            if($(".nicEditor").length > 0){
                $(".nicEditor").each(function(){
                    var objId = $(this).attr("id");
                    if($(this).attr("data-mode") === 'ftgBasic'){
                        var buttonList = ['fontSize','bold','italic','underline','strikeThrough','removeformat','ol','ul','link','unlink'];
                        new nicEditor({buttonList : buttonList,maxHeight : 400, iconsPath : globalImageBase+'/images/nicEditor/nicEditorIcons.gif'}).panelInstance(objId);
                    } else {
                        if($(this).attr("data-mode") === 'ftgSelect'){
                            var buttonList = ['fontSize','fontFormat','bold','italic','underline','strikeThrough','removeformat','ol','ul','link','unlink','indent','outdent','','',''];
                            new nicEditor({buttonList : buttonList,maxHeight : 400, iconsPath : globalImageBase+'/images/nicEditor/nicEditorIcons.gif'}).panelInstance(objId);
                        } else {
                            new nicEditor({maxHeight : 400, iconsPath : globalImageBase+'/images/nicEditor/nicEditorIcons.gif'}).panelInstance(objId);
                        }
                    }
                });
                $('.nicEdit-panelContain').parent().width('100%');
                $('.nicEdit-panelContain').parent().next().width('96%');
            }



            if($(".deleteConfirm").length > 0){
                $(".deleteConfirm").on("click",function(e){
                    e.preventDefault();
                    var r=confirm("Are you sure you want to delete?");
                    if (r==true)   {
                        window.location = $(this).attr('href');
                    }
                });
            }

            if($(".cmsConfirm").length > 0){
                $(".cmsConfirm").on("click",function(e){
                    var btnTxt = $(this).text();
                    var r=confirm("Are you sure you want to "+btnTxt+"?");
                    if (r==true)   {
                        return true;
                    } else {
                        e.preventDefault();
                        return false;
                    }
                });
            }

            var confirmMenu = $(".confirm-menu"); 
            if(confirmMenu.length > 0){
                confirmMenu.on("click",function(e){
                    e.preventDefault();
                    var r=confirm("Are you sure?");
                    if (r==true)   {
                        alert("This may take awhile to process. Please wait.");
                        window.location = $(this).attr('href');
                    }
                });
            }
        },


        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        updateArchiveTable : function(oTable){
            var columnIdx = $("table th:contains('Archive')").index();
            var selectedText =  "No";
            if($("#archiveOnly").is(":checked")){
                selectedText =  "Yes";
            }
            oTable.fnFilter( selectedText, columnIdx );
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // CMS Homepage for UI Components Testing... need to remove later.,..
        index : function(){
            // TODO : This is just for testing, need to remove later ***********************************
            if($('#tableTest').length > 0){
                $('#tableTest').DataTable( {
                    "fnPreDrawCallback":function(){
                        // $("#details").hide();
                        // $("#loading").show();
                        //alert("Pre Draw");
                    },
                    "fnDrawCallback":function(){
                        // $("#details").show();
                        // $("#loading").hide();
                        //alert("Draw");
                    },
                    "fnInitComplete":function(){
                        //alert("Complete");
                        $(".loadingIconWrap").hide();
                    },
                    // responsive: true,
                    // "bAutoWidth":false,
                    // "bPaginate": true,
                    // "bFilter": true,
                    // "lengthMenu": [[10, 25, 50, -1], ["10/Page", "25/Page", "50/page", "All"]],
                    // aoColumns : [
                    //     { "sWidth": "25%"},
                    //     { "sWidth": "10%"},
                    //     { "sWidth": "10%"},
                    //     { "sWidth": "10%"},
                    //     { "sWidth": "10%"},
                    //     { "sWidth": "10%"},
                    // ]
                } );
            }
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        homepage : function(){

        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        amenity : function(){
            if($('#amenityList').length > 0){
                $('#amenityList').DataTable( {
                    "fnPreDrawCallback":function(){
                    },
                    "fnDrawCallback":function(){
                    },
                    "fnInitComplete":function(){
                        $(".loadingIconWrap").hide();
                    },
                    "aaSorting": [ [0,'asc'], [1,'asc'] ],
                    "pageLength": 100,

            } );
            }
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        updateStateUponCountry: function(){
            var newCountryName = $("#countryName option:selected").text();
            $.ajax({
                type: 'GET',
                url: '/api/state.json?country='+newCountryName,
                dataType: 'json',
                success: function (data) {
                    var newOptions = '<option value="">Select State</option>';
                    if(data.length > 0){
                        for(var i=0; i<data.length; i++){
                            newOptions += '<option value="'+data[i].name+'">'+data[i].name+'</option>';
                        }
                        $('#stateProvinceName').prop('disabled', false).prop('required',true);
                        $('.selectStateWrap').show();
                    } else {
                        newOptions += '<option value="">No State Information available for this country</option>';
                        $('#stateProvinceName').prop('disabled', 'disabled').prop('required',false);
                        $('.selectStateWrap').hide();
                    }

                    $("#stateProvinceName option").remove();
                    $("#stateProvinceName").append(newOptions);
                    $('#stateProvinceName').trigger("chosen:updated");
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log('jqXHR:');
                    console.log(jqXHR);
                    console.log('textStatus:');
                    console.log(textStatus);
                    console.log('errorThrown:');
                    console.log(errorThrown);
                },
            });
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        updateSecondaryRegion: function(){
            var newRegion = $("#regionId option:selected").val();
            if(newRegion === ""){
                var newOptions = "";
                newOptions += '<option value="">No secondary region available for this region</option>';
                $('#regionSecondaryLevel').prop('disabled', 'disabled');
                $("#regionSecondaryLevel option").remove();
                $("#regionSecondaryLevel").append(newOptions);
                $('#regionSecondaryLevel').trigger("chosen:updated");
                $('.selectSecondaryWrap').hide();
            } else {
                $.ajax({
                    type: 'GET',
                    url: '/api/region/'+newRegion+'.json',
                    dataType: 'json',
                    success: function (data) {
                        var newOptions = '<option value="">Select a Secondary Level</option>';
                        if(data.secondaryLevels.length > 0){
                            for(var i=0; i<data.secondaryLevels.length; i++){
                                newOptions += '<option value="'+data.secondaryLevels[i]+'">'+data.secondaryLevels[i]+'</option>';
                            }
                            $('#regionSecondaryLevel').prop('disabled', false);
                        } else {
                            newOptions += '<option value="">No secondary region available for this region</option>';
                            $('#regionSecondaryLevel').prop('disabled', 'disabled');
                        }

                        $("#regionSecondaryLevel option").remove();
                        $("#regionSecondaryLevel").append(newOptions);
                        $('#regionSecondaryLevel').trigger("chosen:updated");
                        $("#regionSecondaryLevel").trigger("change");
                        $('.selectSecondaryWrap').show();
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.log('jqXHR:');
                        console.log(jqXHR);
                        console.log('textStatus:');
                        console.log(textStatus);
                        console.log('errorThrown:');
                        console.log(errorThrown);
                    },
                });
            }
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        destination : function(){
            $("#partialURI").prop("disabled", true);
            $(document).on("change","#countryName", function(){
                ftg.updateStateUponCountry();
            });
            if(!$("#stateProvinceName").val()){
                $("#countryName").trigger("change");
            };

            $(document).on("change","#regionId", function(){
                ftg.updateSecondaryRegion();
            });
            if(!$("#regionSecondaryLevel").val()){
                $("#regionId").trigger("change");
            };


        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        destinationList : function(){
            if($('#destinationList').length > 0){
                var oTable = $('#destinationList').dataTable( {
                    // responsive: true,
                    // "bAutoWidth":false,
                    // "bPaginate": true,
                    // "bFilter": true,
                    "lengthMenu": [[50, 100, 250, -1], ["50", "100", "250", "All"]],
                    "fnPreDrawCallback":function(){
                        // $("#details").hide();
                        // $("#loading").show();
                        //alert("Pre Draw");
                    },
                    "fnDrawCallback":function(){
                        // $("#details").show();
                        // $("#loading").hide();
                        //alert("Draw");
                    },
                    "fnInitComplete":function(){
                        //alert("Complete");
                        $(".loadingIconWrap").hide();
                    }
                    // aoColumns : [
                    //     { "sWidth": "25%"},
                    //     { "sWidth": "10%"},
                    //     { "sWidth": "10%"},
                    //     { "sWidth": "10%"},
                    //     { "sWidth": "10%"},
                    //     { "sWidth": "10%"},
                    // ]
                } );
                $('.dataTables_filter input').keyup( function () {
                    oTable.fnFilter(jQuery.fn.DataTable.ext.type.search.string( this.value ));
                    oTable.fnFilter(jQuery.fn.DataTable.ext.type.search.html( this.value ));
                } );

                $("#archiveOnly").on("change", function(){
                    ftg.updateArchiveTable(oTable);
                });
                ftg.updateArchiveTable(oTable);
            }

        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        property : function(){


            // Image Management *******************************
            var updateOrder = function(){
                var idx = 0;
                $(document).find("#images .imageBlock li").each(function(){
                    $(this).find(".inputDescription").attr("id","assets"+idx+".description").attr("name","assets["+idx+"].description");
                    $(this).find(".inputFileName").attr("id","assets"+idx+".fileName").attr("name","assets["+idx+"].fileName");
                    $(this).find(".inputCarouselPosition").attr("id","assets"+idx+".carouselPosition").attr("name","assets["+idx+"].carouselPosition");
                    $(this).find(".inputType").attr("id","assets"+idx+".type").attr("name","assets["+idx+"].type");
                    $(this).find(".inputCredit").attr("id","assets"+idx+".credit").attr("name","assets["+idx+"].credit");
                    idx++;

                    $(this).find(".imgPosition").val(idx);
                });
            };
            var sortGroup = $('#selectedImagesWrap ol.imageBlock').sortable({
                stop: function( ) {
                    $("form#property input").trigger("change");
                    updateOrder();
                },
                helper: 'clone',
                placeholder: {
                    element: function(currentItem) {
                        return $('<li class="placeholder col-xs-12 col-sm-3 col-md-3"><div class="placeHolderInner"></div></li>')[0];
                    },
                    update: function(container, p) {
                        return;
                    }
                }
            });
            updateOrder();

            var updateDeleteBtn = function(){
                var checkedCt = $("#images .imageBlock .checkToDelete").length;
                if(checkedCt > 0){
                    $("#images #btnDeleteImg").removeClass("disabled");
                } else {
                    $("#images #btnDeleteImg").addClass("disabled");
                }

                if($("#images .imageBlock li").length == 0){
                    $("#images #btnDeleteAllImg").addClass("disabled");
                } else {
                    $("#images #btnDeleteAllImg").removeClass("disabled");
                }
            };

            var updateDeleteAllBtn = function(){
                var selectedImages = $("#selectedImagesWrap li.imgItem").length;
                if(selectedImages > 0){
                    $("#btnDeleteAllImg").removeClass("disabled");
                } else {
                    $("#btnDeleteAllImg").addClass("disabled");
                }
            };

            var updateNewBtn = function(){
                var availableImages = $("#browseImagesWrap li.imgItem").length;
                if(availableImages > 0){
                    $("#btnNewImg").removeClass("disabled");
                    $("#selectedImagesWrap li.imgItem .imgThumb").removeClass("cursorDefault");
                } else {
                    $("#btnNewImg").addClass("disabled");
                    $("#selectedImagesWrap li.imgItem .imgThumb").addClass("cursorDefault");
                }
            };

            var updateBtns = function(){
                updateDeleteBtn();
                updateDeleteAllBtn();
                updateNewBtn();
            };
            updateBtns();


            $("#images #btnDeleteImg").on("click", function() {
                $("#images .imageBlock .checkToDelete").each(function(){
                    $(this).parent().detach().appendTo('#browseImagesWrap .imageBlock');
                });
                $("form#property input").trigger("change");
                updateBtns();
                updateOrder();
            });

            $("#images #btnDeleteAllImg").on("click", function() {
                $("#selectedImagesWrap ol.imageBlock li").detach().appendTo('#browseImagesWrap .imageBlock');
                $("form#property input").trigger("change");
                updateBtns();
            });

            var colorBoxOption = {
                rel:'textGroup',
                inline:true,
                loop: false,
                href:"#browseImage",
                // title: "Select Image"
                width:"900px",
                height:"80%",
                arrowKey: false,
                onOpen:function(){
                    // console.log('onOpen: colorbox is about to open');
                },
                onLoad:function(){
                    $("#browseImagesWrap li .SectionBlock").removeClass("selectedToAdd");
                    // console.log('onLoad: colorbox has started to load the targeted content');
                },
                onComplete:function(){
                    // console.log('onComplete: colorbox has displayed the loaded content');
                },
                onCleanup:function(){
                    // console.log('onCleanup: colorbox has begun the close process');
                },
                onClosed:function(){
                    $(document).find("#selectedImagesWrap li, #selectedImagesWrap li div, #browseImagesWrap li, #browseImagesWrap li div").removeClass("editTarget checkToDelete selectedToAdd");
                    $.colorbox.remove('#btnNewImg');
                    $.colorbox.remove('#selectedImagesWrap .imgItem .imgThumb');
                    initColorBox();
                    updateBtns();
                }
            };

            var checkAvailableImages = function(e){
                var availableImages = $("#browseImagesWrap li.imgItem").length;
                // console.log("availableImages : "+availableImages);
                if(availableImages == 0){
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    return false;
                } else {
                    return true;
                }
            };



            var initColorBox = function(){
                $("#btnNewImg").colorbox(colorBoxOption);
                $("#selectedImagesWrap .imgItem .imgThumb").on("click",checkAvailableImages).colorbox(colorBoxOption);
            };
            initColorBox();

            var initSelectWindow = function(mode){
                $("#browseImage").removeClass("multi single");
                $("#browseImagesWrap li .SectionBlock").removeClass("selectedToAdd");

                $("#browseImage").addClass(mode);
                if(mode == 'multi'){
                    $("#browseImage h1").text("Select Image(s) to add");
                    $(".selectAll").show();
                } else {
                    $("#browseImage h1").text("Select a replacement image");
                    $(".selectAll").hide();
                }
            };
            $("#btnNewImg").on("click", function(){
                if($(this).hasClass("disabled")){
                    return false;
                } else {
                    initSelectWindow("multi");
                }
            });


            $(document).on("click","#selectedImagesWrap li .SectionBlock, #images .imgItem .imgThumb", function(e){
                var clickedOn = $(e.target);
                // console.log("selectedImagesWrap");
                // console.log(clickedOn);
                // console.log('clickedOn.prop("tagName") :'+clickedOn.prop("tagName"));
                if(clickedOn.prop("tagName") === "DIV"){
                    $(this).toggleClass("checkToDelete");
                    updateBtns();
                } else {
                    $(this).closest("li").addClass("editTarget");
                    initSelectWindow("single");
                }
            });

            $(document).on("click","#browseImagesWrap li .SectionBlock", function(){
                var isSingleSlect = $("#browseImage").hasClass("single");
                var selectedCount = $("#browseImagesWrap .selectedToAdd").length;
                // console.log("isSingleSlect :"+isSingleSlect);
                // console.log("selected Ct :"+selectedCount);
                if(isSingleSlect){
                    $("#browseImagesWrap .SectionBlock").removeClass("selectedToAdd");
                }
                $(this).toggleClass("selectedToAdd");
            });
            $(document).on("click","#browseImagesWrap .imgThumb img", function(e){
                e.preventDefault();
                $(this).parent().parent().trigger("click");
                return false;
            });


            $(".selectAll").on("click", function(){
                if( $("#browseImagesWrap li .SectionBlock").length == $("#browseImagesWrap li .selectedToAdd").length){
                    $("#browseImagesWrap li .SectionBlock").removeClass("selectedToAdd");
                } else {
                    $("#browseImagesWrap li .SectionBlock").addClass("selectedToAdd");
                }
            });

            $.fn.swapWith = function(to) {
                return this.each(function() {
                    var copy_to = $(to).clone(false);
                    var copy_from = $(this).clone(false);
                    $(to).replaceWith(copy_from);
                    $(this).replaceWith(copy_to);
                });
            };

            $(".submitImages").on("click", function(){
                var isSingleSlect = $("#browseImage").hasClass("single");
                // console.log("isSingleSlect :"+isSingleSlect);
                if(isSingleSlect){
                    var $target = $("#selectedImagesWrap .editTarget");
                    var $selected = $("#browseImagesWrap .selectedToAdd");

                    // console.log("legnth : "+$selected.length);
                    if($selected.length > 0){
                        var selectedHtml = $selected.html();
                        var targetHtml = $target.find(".SectionBlock").html();
                        $target.find(".SectionBlock").html(selectedHtml);
                        $selected.html(targetHtml);
                    }
                    $("#selectedImagesWrap .editTarget").removeClass("editTarget");
                } else {
                    $("#browseImagesWrap .selectedToAdd").each(function(){
                        $(this).parent().detach().appendTo('#selectedImagesWrap .imageBlock');
                    });
                }
                updateBtns();
                updateOrder();
                $("#btnNewImg, #images .imgItem .imgThumb").colorbox.close();
                initColorBox();
                $("form#property input").trigger("change");
            });



















            $(document).on("change","#countryName", function(){
                ftg.updateStateUponCountry();
            });
            if(!$("#stateProvinceName").val()){
                $("#countryName").trigger("change");
            }

            var markersArray = [];
            var drawMarkers = function(ftg_map){
                var address = $("#mapAddress").val();
                var inputGeocodeLat = $("#latitude").val();
                var inputGeocodeLon = $("#longitude").val();
                var iw = new google.maps.InfoWindow();
                var geocoder = new google.maps.Geocoder();

                // Testing...........
                // address = "";
                // inputGeocodeLat = ""; inputGeocodeLon = "";

                // console.log(markersArray);
                for (var i = 0; i < markersArray.length; i++ ) {
                    markersArray[i].setMap(null);
                }
                markersArray.length = 0;


                if(address === "" && inputGeocodeLat+inputGeocodeLon == ""){
                    // console.log("show default map");
                } else {
                    geocoder.geocode({address: address}, function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            var helpText = "<br/><br/><b>Right Click Map to pick Geocode from map</b>";
                            var bounds = new google.maps.LatLngBounds();

                            if(address !== ""){
                                var addressLat = results[0].geometry.location.lat();
                                var addressLon = results[0].geometry.location.lng();
                                var latLng = new google.maps.LatLng(addressLat, addressLon);
                                var marker = new google.maps.Marker({
                                    position: latLng,
                                    map: ftg_map,
                                    draggable: !1,
                                    icon: globalImageBase+'/images/red-dot.png',
                                    title: address,
                                    lat: addressLat,
                                    lon: addressLon,
                                    iwContent: "<b>Address Marker : </b></br>"+address+"<br/>("+addressLat+" , "+addressLon+")",
                                });
                                markersArray.push(marker);
                                bounds.extend(latLng);

                                google.maps.event.addListener(marker, 'click', function() {
                                    iw.setContent(marker.iwContent+helpText);
                                    iw.open(ftg_map,marker);
                                });
                            }

                            if(inputGeocodeLat == addressLat && inputGeocodeLon == addressLon) {
                                // console.log("same coordinates");
                                marker.setIcon(globalImageBase+'/images/blue-dot.png')
                                marker.iwContent = "<b>Same coordinates (address & geocode)</b><br/><br/>"+marker.iwContent+"<br/><br/><b>Marker from Geocode Input : </b><br/>("+inputGeocodeLat+","+inputGeocodeLon+")";
                                google.maps.event.trigger(marker, "click");
                            } else {
                                // console.log("not same coordinates");
                                if(inputGeocodeLat+inputGeocodeLon !== ""){
                                    var latLng2 = new google.maps.LatLng(inputGeocodeLat, inputGeocodeLon);
                                    var marker2 = new google.maps.Marker({
                                        position: latLng2,
                                        map: ftg_map,
                                        draggable: !1,
                                        icon: globalImageBase+'/images/green-dot.png',
                                        title: inputGeocodeLat+","+inputGeocodeLon,
                                        lat: inputGeocodeLat,
                                        lon: inputGeocodeLon,
                                        iwContent: "<b>Marker from Geocode Input : </b></br>("+inputGeocodeLat+","+inputGeocodeLon+")",
                                    });
                                    markersArray.push(marker2);
                                    bounds.extend(latLng2);

                                    google.maps.event.addListener(marker2, 'click', function() {
                                        iw.setContent(marker2.iwContent+helpText);
                                        iw.open(ftg_map,marker2);
                                    });
                                }
                            }

                            ftg_map.fitBounds(bounds);

                            google.maps.event.addListener(ftg_map, 'idle', function() {
                                if (ftg_map.getZoom() > 20) {
                                    ftg_map.setZoom(20);
                                }
                            });

                            google.maps.event.addListener(ftg_map, 'click', function() {
                                iw.close();
                            });

                        }
                    });
                }
            }


            var mapActivated = false;
            $("#tabNav li a").on("click", function(){
                setTimeout(function(){
                    // console.log("visible : "+$("#mapCanvas").is(':visible'));
                    if($("#mapCanvas").is(":visible") && !mapActivated){
                        mapActivated = true;
                        var mapOption = {
                            panControl              : true,
                            zoom                    : 2,
                            center                  : new google.maps.LatLng(33.748995, -84.387982),
                            zoomControl             : true,
                            streetViewControl       : true,
                            mapTypeControl          : true, // Map or Satellite
                            scrollwheel             : false,
                            mapTypeId               : google.maps.MapTypeId.ROADMAP,
                        };
                        var ftg_map = new google.maps.Map(document.getElementById("mapCanvas"),mapOption);
                        var iw = new google.maps.InfoWindow();

                        drawMarkers(ftg_map);

                        google.maps.event.addListener(ftg_map, "rightclick", function (e) {
                            var lat = e.latLng.lat();
                            var lon = e.latLng.lng();
                            iw.setPosition({lat: lat, lng: lon});
                            iw.setContent("<center><br/>"+lat + " , " + lon + "<br/><br/><div id='getGeocodeFromMap' class='btn btn-default' data-lat='"+lat+"' data-lon='"+lon+"'>Get this point Geocode</div></center>");
                            iw.open(ftg_map,this);
                            iw.open(ftg_map,this);
                        });

                        google.maps.event.addListener(ftg_map, 'click', function() {
                            iw.close();
                        });

                        $(document).on("click","#getGeocodeFromMap", function(){
                            $("#latitude").val($(this).attr("data-lat"));
                            $("#longitude").val($(this).attr("data-lon"));
                        });


                        // $("#cms-property input#mapAddress").blur(function(){
                        $("#cms-property input#mapAddress").on("change", function(){
                            var mapImgUrl = "https://maps.googleapis.com/maps/api/staticmap?center="+$(this).val()+"&zoom=13&key=AIzaSyA_kl4XxSgUyGG2pAA6EejzWSiVuPYvQ1A&size=255x255&markers=color:red|label:S|"+$(this).val()+"&style=feature:all|element:all|hue:ffee00|saturation:-90&style=feature:road|element:geometry|lightness:100|visibility:simplified&style=feature:road|element:labels|visibility:off";
                            $("#cmsPropertyMap").attr("src", mapImgUrl);
                            drawMarkers(ftg_map);
                        });

                        $("#latitude, #longitude").on("change", function(){
                            drawMarkers(ftg_map);
                        });
                    }

                },100);
            });
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        propertyList : function(){
            if($('#propertyList').length > 0){
                var oTable = $('#propertyList').dataTable( {
                    // responsive: true,
                    // "bAutoWidth":false,
                    // "bPaginate": true,
                    // "bFilter": true,
                    "lengthMenu": [[50, 100, 250, -1], ["50", "100", "250", "All"]],
                    "fnPreDrawCallback":function(){
                        // $("#details").hide();
                        // $("#loading").show();
                        //alert("Pre Draw");
                    },
                    "fnDrawCallback":function(){
                        // $("#details").show();
                        // $("#loading").hide();
                        //alert("Draw");
                    },
                    "fnInitComplete":function(){
                        //alert("Complete");
                        $(".loadingIconWrap").hide();
                    },
                    aaSorting: [[1, 'asc']]
                    // aoColumns : [
                    //     { "sWidth": "25%"},
                    //     { "sWidth": "10%"},
                    //     { "sWidth": "10%"},
                    //     { "sWidth": "10%"},
                    //     { "sWidth": "10%"},
                    //     { "sWidth": "10%"},
                    // ]
                } );

                $('.dataTables_filter input').keyup( function () {
                    oTable.fnFilter(jQuery.fn.DataTable.ext.type.search.string( this.value ));
                    oTable.fnFilter(jQuery.fn.DataTable.ext.type.search.html( this.value ));
                } );


                var updateTable = function(){
                    var selectedText =  $("#propertyType").find(":selected").text();
                    if(selectedText === "All"){
                        oTable.fnFilter( "", 0 );
                    } else {
                        oTable.fnFilter( selectedText, 0 );
                    }
                };
                $("#propertyType").on("change", function(){
                    updateTable();
                });
                updateTable();

                $("#archiveOnly").on("change", function(){
                    ftg.updateArchiveTable(oTable);
                });
                ftg.updateArchiveTable(oTable);

            }

        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        collectionList : function(){
            if($('#collectionList').length > 0){
                var oTable = $('#collectionList').dataTable( {
                    "iDisplayLength": 100,
                    "fnPreDrawCallback":function(){
                    },
                    "fnDrawCallback":function(){
                    },
                    "fnInitComplete":function(){
                        $(".loadingIconWrap").hide();
                    }
                } );
                $('.dataTables_filter input').keyup( function () {
                    oTable.fnFilter(jQuery.fn.DataTable.ext.type.search.string( this.value ));
                    oTable.fnFilter(jQuery.fn.DataTable.ext.type.search.html( this.value ));
                } );

                var updateTable = function(){
                    var selectedText =  $("#collectionList").find(":selected").text();
                    if(selectedText === "All"){
                        oTable.fnFilter( "", 0 );
                    } else {
                        oTable.fnFilter( selectedText, 0 );
                    }
                };
                $("#collectionList").on("change", function(){
                    updateTable();
                });
                updateTable();

                $("#archiveOnly").on("change", function(){
                    ftg.updateArchiveTable(oTable);
                });
                ftg.updateArchiveTable(oTable);

            }
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        cmsCollection : function() {
            // hack to get the bootstrap validator to valid this field when it's enabled.  marking field as disabled by default doesn't work
            $("#partialURI").prop("disabled", true);
            $("#propertyCollection").on("submit", function(){

                if($("#hotels").val() || $("#restaurants").val() || $("#spas").val()){
                    return true;
                } else {
                    $(".propertySelect").each(function(){
                        // $(this).parent().addClass("has-error has-danger");
                        $(this).parent().addClass("has-error has-danger").find(".help-block.with-errors").addClass("aCenter").html('<ul class="list-unstyled"><li>Please choose at least one property from Hotel, Restaurant or Spa</li></ul>');
                    });
                    $(document).on("change",".propertySelect", function(){
                        if($(this).val()){
                            $(".propertySelect").each(function(){
                                $(this).parent().removeClass("has-error has-danger").find(".help-block.with-errors").removeClass("aCenter").html('');
                            });
                        }
                    });
                    return false;
                }

            });
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        aboutPages : function(){

        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        landingPages : function(){

        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        peopleList : function(){
            if($('#ourTeamPeopleList').length > 0){
                var oTable = $('#ourTeamPeopleList').dataTable( {
                    // responsive: true,
                    // "bAutoWidth":false,
                    // "bPaginate": true,
                    // "bFilter": true,
                    // "lengthMenu": [[50, 100, 250, -1], ["50", "100", "250", "All"]],
                    "fnPreDrawCallback":function(){
                        // $("#details").hide();
                        // $("#loading").show();
                        //alert("Pre Draw");
                    },
                    "fnDrawCallback":function(){
                        // $("#details").show();
                        // $("#loading").hide();
                        //alert("Draw");
                    },
                    "fnInitComplete":function(){
                        //alert("Complete");
                        $(".loadingIconWrap").hide();
                    },
                    // aoColumns : [
                    //     { "sWidth": "25%"},
                    //     { "sWidth": "10%"},
                    //     { "sWidth": "10%"},
                    //     { "sWidth": "10%"},
                    //     { "sWidth": "10%"},
                    //     { "sWidth": "10%"},
                    // ]
                } );

                var updateTable = function(){
                    var selectedText =  $("#ourTeamPeopleList").find(":selected").text();
                    if(selectedText === "All"){
                        oTable.fnFilter( "", 0 );
                    } else {
                        oTable.fnFilter( selectedText, 0 );
                    }
                };
                $("#ourTeamPeopleList").on("change", function(){
                    updateTable();
                });
                updateTable();
            }
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        regionList : function(){
            if($('#regionList').length > 0){
                var oTable = $('#regionList').dataTable( {
                    // responsive: true,
                    // "bAutoWidth":false,
                    // "bPaginate": true,
                    // "bFilter": true,
                    // "lengthMenu": [[50, 100, 250, -1], ["50", "100", "250", "All"]],
                    "fnPreDrawCallback":function(){
                        // $("#details").hide();
                        // $("#loading").show();
                        //alert("Pre Draw");
                    },
                    "fnDrawCallback":function(){
                        // $("#details").show();
                        // $("#loading").hide();
                        //alert("Draw");
                    },
                    "fnInitComplete":function(){
                        //alert("Complete");
                        $(".loadingIconWrap").hide();
                    },
                    // aoColumns : [
                    //     { "sWidth": "25%"},
                    //     { "sWidth": "10%"},
                    //     { "sWidth": "10%"},
                    //     { "sWidth": "10%"},
                    //     { "sWidth": "10%"},
                    //     { "sWidth": "10%"},
                    // ]
                } );

                var updateTable = function(){
                    var selectedText =  $("#regionList").find(":selected").text();
                    if(selectedText === "All"){
                        oTable.fnFilter( "", 0 );
                    } else {
                        oTable.fnFilter( selectedText, 0 );
                    }
                };
                $("#regionList").on("change", function(){
                    updateTable();
                });
                updateTable();

                $("#archiveOnly").on("change", function(){
                    ftg.updateArchiveTable(oTable);
                });
                ftg.updateArchiveTable(oTable);
            }
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        newFhsAssetList : function(){
            if($('#newFhsAssetList').length > 0){
                var oTable = $('#newFhsAssetList').dataTable( {
                    // responsive: true,
                    // "bAutoWidth":false,
                    // "bPaginate": true,
                    // "bFilter": true,
                    // "lengthMenu": [[50, 100, 250, -1], ["50", "100", "250", "All"]],
                    "fnPreDrawCallback":function(){
                        // $("#details").hide();
                        // $("#loading").show();
                        //alert("Pre Draw");
                    },
                    "fnDrawCallback":function(){
                        // $("#details").show();
                        // $("#loading").hide();
                        //alert("Draw");
                    },
                    "fnInitComplete":function(){
                        //alert("Complete");
                        $(".loadingIconWrap").hide();
                    },
                    // aoColumns : [
                    //     { "sWidth": "25%"},
                    //     { "sWidth": "10%"},
                    //     { "sWidth": "10%"},
                    //     { "sWidth": "10%"},
                    //     { "sWidth": "10%"},
                    //     { "sWidth": "10%"},
                    // ]
                } );

                var updateTable = function(){
                    var selectedText =  $("#newFhsAssetList").find(":selected").text();
                    if(selectedText === "All"){
                        oTable.fnFilter( "", 0 );
                    } else {
                        oTable.fnFilter( selectedText, 0 );
                    }
                };
                $("#newFhsAssetList").on("change", function(){
                    updateTable();
                });
                updateTable();
            }
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        userList : function(){
            if($('#userList').length > 0){
                var oTable = $('#userList').dataTable( {
                    // responsive: true,
                    // "bAutoWidth":false,
                    // "bPaginate": true,
                    // "bFilter": true,
                    // "lengthMenu": [[50, 100, 250, -1], ["50", "100", "250", "All"]],
                    "fnPreDrawCallback":function(){
                        // $("#details").hide();
                        // $("#loading").show();
                        //alert("Pre Draw");
                    },
                    "fnDrawCallback":function(){
                        // $("#details").show();
                        // $("#loading").hide();
                        //alert("Draw");
                    },
                    "fnInitComplete":function(){
                        //alert("Complete");
                        $(".loadingIconWrap").hide();
                    }
                    // aoColumns : [
                    //     { "sWidth": "25%"},
                    //     { "sWidth": "10%"},
                    //     { "sWidth": "10%"},
                    //     { "sWidth": "10%"},
                    //     { "sWidth": "10%"},
                    //     { "sWidth": "10%"},
                    // ]
                } );

                var updateTable = function(){
                    var selectedText =  $("#userList").find(":selected").text();
                    if(selectedText === "All"){
                        oTable.fnFilter( "", 0 );
                    } else {
                        oTable.fnFilter( selectedText, 0 );
                    }
                };
                $("#userList").on("change", function(){
                    updateTable();
                });
                updateTable();
            }
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        newsArticleList : function(){
            if($('#recentNewsArticleList').length > 0){
                var oTable = $('#recentNewsArticleList').dataTable( {
                    // responsive: true,
                    // "bAutoWidth":false,
                    // "bPaginate": true,
                    // "bFilter": true,
                    // "lengthMenu": [[50, 100, 250, -1], ["50", "100", "250", "All"]],
                    "iDisplayLength": 50,
                    "aaSorting": [ [0,'desc'] ],
                    "fnPreDrawCallback":function(){
                        // $("#details").hide();
                        // $("#loading").show();
                        //alert("Pre Draw");
                    },
                    "fnDrawCallback":function(){
                        // $("#details").show();
                        // $("#loading").hide();
                        //alert("Draw");
                    },
                    "fnInitComplete":function(){
                        //alert("Complete");
                        $(".loadingIconWrap").hide();
                    }
                    // aoColumns : [
                    //     { "sWidth": "25%"},
                    //     { "sWidth": "10%"},
                    //     { "sWidth": "10%"},
                    //     { "sWidth": "10%"},
                    //     { "sWidth": "10%"},
                    //     { "sWidth": "10%"},
                    // ]
                } );

                var updateTable = function(){
                    var selectedText =  $("#recentNewsArticleList").find(":selected").text();
                    if(selectedText === "All"){
                        oTable.fnFilter( "", 0 );
                    } else {
                        oTable.fnFilter( selectedText, 0 );
                    }
                };
                $("#recentNewsArticleList").on("change", function(){
                    updateTable();
                });
                updateTable();

                $("#archiveOnly").on("change", function(){
                    ftg.updateArchiveTable(oTable);
                });
                ftg.updateArchiveTable(oTable);
            }
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        cmsUser : function() {
            var passwordField = $("#password");
            var confirmPasswordField = $("#confirmPassword");            
            if($("#id").val()) {
                // hack to get the bootstrap validator to valid these fields when it's enabled.  marking field as disabled by default doesn't work
                var passwordDiv = $("#passwordDiv");

                passwordDiv.hide();
                passwordField.prop("disabled", true);
                passwordField.prop("required", false);
                confirmPasswordField.prop("disabled", true);
                passwordField.prop("required", false);


                var passwordButton = $("#passwordButton");
                passwordButton.click(function() {
                    if(passwordField.is(":disabled")) {
                        passwordDiv.show();
                        passwordField.prop("disabled", false);
                        passwordField.prop("required", true);
                        confirmPasswordField.prop("disabled", false);
                        confirmPasswordField.prop("required", true);
                        passwordButton.html("Undo");
                    } else {
                        passwordDiv.hide();
                        passwordField.prop("disabled", true);
                        passwordField.prop("required", false);
                        confirmPasswordField.prop("disabled", true);
                        confirmPasswordField.prop("required", false);
                        passwordButton.html("Update Password");
                    }
                });
            } else {
                passwordField.prop("required", true);
                confirmPasswordField.prop("required", true);
            }
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        cmsOurTeamPage  : function(){
            $("#createGroup").on("click", function(){
                var idx = $("#groupInputList input").length;
                var idxLabel = idx+1;
                var html = '<div class="form-group">'
                    + '<label for="group'+idx+'">Group '+idxLabel+'</label>'
                    + '<input id="groupNames['+idx+']" name="groupNames['+idx+']" class="form-control sideBySideInput" value="" type="text">'
                    + '</div>';
                $("#groupInputList").append(html);
            })

        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        cmsOurTeamList  : function(){

            var updateOrder = function(){
                $("table.datatable").each(function(){
                    var idx = 0;
                    $(this).find("tr").each(function(){
                        $(this).find("input.position").val(idx);
                        idx++;
                    })
                });
            };

            $("table.datatable tbody").sortable({
                appendTo: "parent",
                helper: "clone",
                update: function (event, ui) {
                    var data = $(this).sortable('serialize');
                    $(this).find("input").each(function(idx){
                        $(this).val(idx+1);
                    });
                }
            }).disableSelection();

        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        cmsCompanyList : function(){
            if($('#brandOfficialsCompanyList').length > 0){
                var oTable = $('#brandOfficialsCompanyList').dataTable( {
                    // responsive: true,
                    // "bAutoWidth":false,
                    // "bPaginate": true,
                    // "bFilter": true,
                    // "lengthMenu": [[50, 100, 250, -1], ["50", "100", "250", "All"]],
                    "fnPreDrawCallback":function(){
                        // $("#details").hide();
                        // $("#loading").show();
                        //alert("Pre Draw");
                    },
                    "fnDrawCallback":function(){
                        // $("#details").show();
                        // $("#loading").hide();
                        //alert("Draw");
                    },
                    "fnInitComplete":function(){
                        //alert("Complete");
                        $(".loadingIconWrap").hide();
                    }
                    // aoColumns : [
                    //     { "sWidth": "25%"},
                    //     { "sWidth": "10%"},
                    //     { "sWidth": "10%"},
                    //     { "sWidth": "10%"},
                    //     { "sWidth": "10%"},
                    //     { "sWidth": "10%"},
                    // ]
                } );

                $("#archiveOnly").on("change", function(){
                    ftg.updateArchiveTable(oTable);
                });
                ftg.updateArchiveTable(oTable);


                var updateTable = function(){
                    var selectedText =  $("#brandOfficialsCompanyList").find(":selected").text();
                    if(selectedText === "All"){
                        oTable.fnFilter( "", 0 );
                    } else {
                        oTable.fnFilter( selectedText, 0 );
                    }
                };
                $("#brandOfficialsCompanyList").on("change", function(){
                    updateTable();
                });
                updateTable();
            }
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        cmsSpecialOfferList : function(){
            if($('#specialOfferList').length > 0){
                var oTable = $('#specialOfferList').dataTable( {
                    aaSorting: [[5, 'desc'],[4,'desc']],
                    "iDisplayLength": 10,
                    "fnPreDrawCallback":function(){
                    },
                    "fnDrawCallback":function(){
                    },
                    "fnInitComplete":function(){
                        $(".loadingIconWrap").hide();
                    }
                } );

                var updateTable = function(){
                    var selectedText =  $("#specialOfferList").find(":selected").text();
                    if(selectedText === "All"){
                        oTable.fnFilter( "", 0 );
                    } else {
                        oTable.fnFilter( selectedText, 0 );
                    }
                };
                $("#specialOfferList").on("change", function(){
                    updateTable();
                });
                updateTable();

                $("#archiveOnly").on("change", function(){
                    ftg.updateArchiveTable(oTable);
                });
                ftg.updateArchiveTable(oTable);
            }
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        cmsCareerPage : function(){
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        cmsJobListingList: function(){
            if($('#jobListingList').length > 0){
                var oTable = $('#jobListingList').dataTable( {
                    "fnPreDrawCallback":function(){
                    },
                    "fnDrawCallback":function(){
                    },
                    "fnInitComplete":function(){
                        $(".loadingIconWrap").hide();
                    }
                } );

                $("#archiveOnly").on("change", function(){
                    ftg.updateArchiveTable(oTable);
                });
                ftg.updateArchiveTable(oTable);
            }
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        cmsSpecialOfferPage: function() {
            var theForm = $("#specialOfferForm");
            var specialOfferId = $("#id").val();
            $(document).on("click","#saveButton", function(e){
                if($("#active").prop('checked')) {
                    e.preventDefault();
                    $.ajax( {
                        type: "GET",
                        url: "/api/special-offer/show-warning/" + $("#propertyId").val() + "?specialOfferId=" + specialOfferId,
                        success: function( response ) {
                            if(response === "true") {
                                if(confirm("There is another active offer for this property that will be set to inactive. Continue?")) {
                                    theForm.submit();
                                }
                            } else {
                                theForm.submit();
                            }
                        },
                        error: function(xhr, textStatus, errorThrown){
                            alert("An error occurred:\n" + errorThrown)
                        }
                    });
                }
            });
        },

        cmsSACList: function(){
            if($('#sacPeopleList').length > 0){
                var oTable = $('#sacPeopleList').dataTable( {
                    "paging": true,
                    "fnPreDrawCallback":function(){
                    },
                    "fnDrawCallback":function(){
                    },
                    "fnInitComplete":function(){
                        $(".loadingIconWrap").hide();
                    }
                } );
                // $('.dataTables_filter input').keyup( function () {
                //     oTable.fnFilter(jQuery.fn.DataTable.ext.type.search.string( this.value ));
                //     oTable.fnFilter(jQuery.fn.DataTable.ext.type.search.html( this.value ));
                // } );
                //
                // $("#archiveOnly").on("change", function(){
                //     ftg.updateArchiveTable(oTable);
                // });
                // ftg.updateArchiveTable(oTable);
            }
        },

        cmsRedirectionList: function(){
            if($('#redirectionList').length > 0){
                var oTable = $('#redirectionList').dataTable( {
                    "paging": true,
                    "fnPreDrawCallback":function(){
                    },
                    "fnDrawCallback":function(){
                    },
                    "fnInitComplete":function(){
                        $(".loadingIconWrap").hide();
                    }
                } );
                // $('.dataTables_filter input').keyup( function () {
                //     oTable.fnFilter(jQuery.fn.DataTable.ext.type.search.string( this.value ));
                //     oTable.fnFilter(jQuery.fn.DataTable.ext.type.search.html( this.value ));
                // } );
                //
                // $("#archiveOnly").on("change", function(){
                //     ftg.updateArchiveTable(oTable);
                // });
                // ftg.updateArchiveTable(oTable);
            }
        },


        propertyFinishCreate: function(){
            $(document).on("change","#countryName", function(){
                ftg.updateStateUponCountry();
            });
            if(!$("#stateProvinceName").val()){
                $("#countryName").trigger("change");
            }
        },

        cmsLandingPageList : function(){
            if($('#landingPageList').length > 0){
                var oTable = $('#landingPageList').dataTable( {
                    aaSorting: [[0, 'asc']],
                    "iDisplayLength": 10,
                    "fnPreDrawCallback":function(){
                    },
                    "fnDrawCallback":function(){
                    },
                    "fnInitComplete":function(){
                        $(".loadingIconWrap").hide();
                    }
                } );

                var updateTable = function(){
                    var selectedText =  $("#landingPageList").find(":selected").text();
                    if(selectedText === "All"){
                        oTable.fnFilter( "", 0 );
                    } else {
                        oTable.fnFilter( selectedText, 0 );
                    }
                };
                $("#landingPageList").on("change", function(){
                    updateTable();
                });
                updateTable();

                $("#archiveOnly").on("change", function(){
                    ftg.updateArchiveTable(oTable);
                });
                ftg.updateArchiveTable(oTable);
            }
        },

        cmsRatingList : function(){
            if($('#ratingList').length > 0){
                var oTable = $('#ratingList').dataTable( {
                    aaSorting: [[0, 'asc']],
                    "iDisplayLength": 10,
                    "fnPreDrawCallback":function(){
                    },
                    "fnDrawCallback":function(){
                    },
                    "fnInitComplete":function(){
                        $(".loadingIconWrap").hide();
                    }
                } );

                var updateTable = function(){
                    var selectedText =  $("#ratingList").find(":selected").text();
                    if(selectedText === "All"){
                        oTable.fnFilter( "", 0 );
                    } else {
                        oTable.fnFilter( selectedText, 0 );
                    }
                };
                $("#ratingList").on("change", function(){
                    updateTable();
                });
                updateTable();

                $("#archiveOnly").on("change", function(){
                    ftg.updateArchiveTable(oTable);
                });
                ftg.updateArchiveTable(oTable);
            }
        }

    };





    ftg.init();



    // Init Each Specific Page JS ********************************************************
    if($("#pageId-cmsIndex").length > 0)               { ftg.index(); };
    if($("#pageId-cmsHomepage").length > 0)            { ftg.homepage(); };
    if($("#pageId-cmsAmenityList").length > 0)         { ftg.amenity(); };
    if($("#pageId-cmsDestination").length > 0)         { ftg.destination(); };
    if($("#pageId-cmsDestinationList").length > 0)     { ftg.destinationList(); };
    if($("#pageId-cmsProperty").length > 0)            { ftg.property(); };
    if($("#pageId-cmsPropertyList").length > 0)        { ftg.propertyList(); };
    if($("#pageId-cms-CollectionList").length > 0)     { ftg.collectionList(); };
    if($("#pageId-cms-Collection").length > 0)         { ftg.cmsCollection();};
    if($("#pageId-cmsLandingPages").length > 0)        { ftg.aboutPages(); };
    if($("#pageId-cmsLandingPages").length > 0)        { ftg.landingPages(); };
    if($("#pageId-cmsOurTeamPeopleList").length > 0)   { ftg.peopleList(); };
    if($("#pageId-cmsRegionList").length > 0)          { ftg.regionList(); };
    if($("#pageId-cmsUserList").length > 0)            { ftg.userList(); };
    if($("#pageId-cmsUser").length > 0)                { ftg.cmsUser(); };
    if($("#cms-our-team-page").length > 0)             { ftg.cmsOurTeamPage(); };
    if($("#cms-our-team-people").length > 0)           { ftg.cmsOurTeamList(); };
    if($("#pageId-cmsNewsArticleList").length > 0)     { ftg.newsArticleList(); };
    if($("#pageId-cmsCompanyList").length > 0)         { ftg.cmsCompanyList(); };
    if($("#cms-career-page").length > 0)               { ftg.cmsCareerPage(); };
    if($("#cms-job-listing-list").length > 0)          { ftg.cmsJobListingList(); };
    if($("#pageId-cmsSpecialOfferList").length > 0)    { ftg.cmsSpecialOfferList(); };
    if($("#pageId-cms-specialOffer").length > 0)       { ftg.cmsSpecialOfferPage(); };
    if($("#pageId-cms-sac-people").length > 0)         { ftg.cmsSACList(); };
    if($("#pageId-cmsRedirectionList").length > 0)     { ftg.cmsRedirectionList(); };
    if($("#pageId-cmsNewFhsAssets").length > 0)        { ftg.newFhsAssetList(); };
    if($("#cms-property-finish-create").length > 0)    { ftg.propertyFinishCreate(); };
    if($("#pageId-cmsLandingPageList").length > 0)     { ftg.cmsLandingPageList(); };
    if($("#pageId-cmsRatingList").length > 0)          { ftg.cmsRatingList(); };


});
