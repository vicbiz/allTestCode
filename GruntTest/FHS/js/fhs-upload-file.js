$().ready(function(){
    var unlockSubmit = function(){
        if($(".uploaderFormBlock.photo").length > 0){
            if($(".uploaderFormBlock form .customfile-list-block").html() !== "" && $(".uploaderFormBlock form select option:selected").val() !== ""){
                $(".uploaderFormBlock form #Submit").removeAttr("disabled");
            } else {
                $(".uploaderFormBlock form #Submit").removeAttr("disabled").attr("disabled","disabled");
            }
        } else {
            if($(".uploaderFormBlock form .customfile-list-block").html() !== ""){
                $(".uploaderFormBlock form #Submit").removeAttr("disabled");
            } else {
                $(".uploaderFormBlock form #Submit").removeAttr("disabled").attr("disabled","disabled");
            }
        }
    };


    //$("select").selectpicker({style: 'btn-wt form-control', menuStyle: 'dropdown-inverse'});


    // Browser supports HTML5 multiple file?
    var multipleSupport = typeof $('<input/>')[0].multiple !== 'undefined',
        isIE = /msie/i.test( navigator.userAgent );

    $.fn.customFile = function() {

        return this.each(function() {

            var $file = $(this).addClass('customfile'), // the original file input
                $wrap = $('<div class="customfile-wrap"><div class="customfile-list-block"></div>'),
                $input = $('<input type="text" class="customfile-filename" style="display: none;" />'),
            // Button that will be used in non-IE browsers
                $button = $('<button type="button" class="btn browseBtn">BROWSE</button>'),
            // Hack for IE
                $label = $('<label class="customfile-upload" for="'+ $file[0].id +'">BROWSE</label>');

            // Hide by shifting to the left so we
            // can still trigger events
            $file.css({
                position: 'absolute',
                left: '-9999px'
            });

            $wrap.insertAfter( $file )
                .append( $file, $input, ( isIE ? $label : $button ) );

            // Prevent focus
            $file.attr('tabIndex', -1);
            $button.attr('tabIndex', -1);

            $button.click(function () {
                $file.focus().click(); // Open dialog
            });

            $file.change(function() {

                var files = [], fileArr, filename, filenameList;

                // If multiple is supported then extract
                // all filenames from the file array
                if ( multipleSupport ) {
                    fileArr = $file[0].files;
                    for ( var i = 0, len = fileArr.length; i < len; i++ ) {
                        files.push( fileArr[i].name );
                    }
                    filename = files.join(', ');
                    filenameList = files.join('<br/>');
                    // If not supported then just take the value
                    // and remove the path to just show the filename
                } else {
                    filename = $file.val().split('\\').pop();
                    filenameList = filename;
                }

                $input.val( filename ) // Set the value
                    .attr('title', filename) // Show filename in title tootlip
                    .focus(); // Regain focus
                $(".customfile-list-block").html(filenameList);

                unlockSubmit();

            });

            $input.on({
                blur: function() { $file.trigger('blur'); },
                keydown: function( e ) {
                    if ( e.which === 13 ) { // Enter
                        if ( !isIE ) { $file.trigger('click'); }
                    } else if ( e.which === 8 || e.which === 46 ) { // Backspace & Del
                        // On some browsers the value is read-only
                        // with this trick we remove the old input and add
                        // a clean clone with all the original events attached
                        $file.replaceWith( $file = $file.clone( true ) );
                        $file.trigger('change');
                        $input.val('');
                    } else if ( e.which === 9 ){ // TAB
                        return;
                    } else { // All other keys
                        return false;
                    }
                }
            });

        });

    };

// Old browser fallback
    if ( !multipleSupport ) {
        $( document ).on('change', 'input.customfile', function() {

            var $this = $(this),
            // Create a unique ID so we
            // can attach the label to the input
                uniqId = 'customfile_'+ (new Date()).getTime(),
                $wrap = $this.parent(),

            // Filter empty input
                $inputs = $wrap.siblings().find('.customfile-filename').filter(function(){ return !this.value }),

                $file = $('<input type="file" id="'+ uniqId +'" name="'+ $this.attr('name') +'"/>');

            // 1ms timeout so it runs after all other events
            // that modify the value have triggered
            setTimeout(function() {
                // Add a new input
                if ( $this.val() ) {
                    // Check for empty fields to prevent
                    // creating new inputs when changing files
                    if ( !$inputs.length ) {
                        $wrap.after( $file );
                        $file.customFile();
                    }
                    // Remove and reorganize inputs
                } else {
                    $inputs.parent().remove();
                    // Move the input so it's always last on the list
                    $wrap.appendTo( $wrap.parent() );
                    $wrap.find('input').focus();
                }
            }, 1);

        });
    }


    $('input[type=file]').customFile();

    $(".uploaderFormBlock form select").on("change", function(){
        unlockSubmit();
    });

    $(".uploaderFormBlock form").on("submit", function(){
        if($(this).closest("form").find("#description").val() === ""){
            $(this).closest("form").find("#description").focus().addClass("error");
            return false;
        }
    });
    $(".uploaderFormBlock form input#description").keyup(function(){
            $(this).removeClass("error");
    });


});

