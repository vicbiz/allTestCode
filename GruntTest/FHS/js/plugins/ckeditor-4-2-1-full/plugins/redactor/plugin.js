CKEDITOR.plugins.add( 'redactor',
    {
        init: function( editor )
        {
            editor.addCommand( 'insertRedactedText', {
                exec : function( editor ) {
                    var selected_target = editor.getSelection().getStartElement();
                    var selected_text = editor.getSelection().getSelectedText();
                    var parent = selected_target.getParent();

//                    console.log("selected_target.getName() :"+selected_target.getName());
//                    console.log( selected_target.getName() );
//                    console.log("Is Span :"+selected_target.is('span'));
//                    console.log("Is redact :"+selected_target.is('redact'));
//                    console.log("hasAscendant redact :"+selected_target.hasAscendant('redact'));
//                    console.log("Parent Name :"+ parent.getName() );

                    if(parent.getName() === "redact"){
                        selected_target = selected_target.getParent();
                    }


                    if(selected_target.getName() === "redact") {
//                        console.log("REDACT");
                        selected_text = editor.getSelection().getStartElement().getHtml();
                        selected_target.remove();
                        editor.insertHtml(selected_text);
                    } else {
//                        console.log("NOT REDACT");
                        if(selected_text.length > 0){
                            var newElement = new CKEDITOR.dom.element("redact");
                            newElement.setAttribute('class', 'redact' );
                            newElement.setText(selected_text);
                            editor.insertElement(newElement);
                        }
                    }


                }
            });
            editor.ui.addButton( 'Redactor',{
                    label: 'Redact Selected Text',
                    command: 'insertRedactedText',
                    icon: this.path + 'icons/regular_smile.gif'
            });
        }
    } );