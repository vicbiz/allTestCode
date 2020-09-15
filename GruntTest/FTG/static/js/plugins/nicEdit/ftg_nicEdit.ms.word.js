/** *******************************************************************************
 * NicEdit Instance
 * This class creates an editable area out of any block level node and converting textarea nodes into editable areas. Instances of this class use the contentEditable attribute and besides textareas do not modify the orginal node.
 * @author: Brian Kirchoff
 * @requires: nicCore
 * @version 0.9
 */

/* this nicEditorInstance class was edited to perform a "cleaning" on any paste, in particular
 * it will fully clean a paste from a microsoft word document.
 * All edits are indicated with comments.  The rest of the code is by the author listed above.
 * Clean Word Paste Mod by Billy Flaherty (www.billyswebdesign.com/) for cgCraft (www.cgcraft.com) */

var nicEditorInstance = bkClass.extend({
    isSelected : false,

    construct : function(e,options,nicEditor) {
        this.ne = nicEditor;
        this.elm = this.e = e;
        this.options = options || {};

        newX = parseInt(e.getStyle('width')) || e.clientWidth;
        newY = parseInt(e.getStyle('height')) || e.clientHeight;
        this.initialHeight = newY-8;

        var isTextarea = (e.nodeName.toLowerCase() == "textarea");
        if(isTextarea || this.options.hasPanel) {
            var ie7s = (bkLib.isMSIE && !((typeof document.body.style.maxHeight != "undefined") && document.compatMode == "CSS1Compat"))
            var s = {width: newX+'px', border : '2px solid #F1F1F1', borderTop : 0, overflowY : 'auto', overflowX: 'hidden' };
            s[(ie7s) ? 'height' : 'maxHeight'] = (this.ne.options.maxHeight) ? this.ne.options.maxHeight+'px' : null;
            this.editorContain = new bkElement('DIV').setStyle(s).appendBefore(e);

            /* CLEAN WORD PASTE MOD */
            //var editorElm = new bkElement('DIV').setAttributes({id : e.id}).setStyle({width : (newX-8)+'px', margin: '4px', minHeight : newY+'px'}).addClass('main').appendTo(this.editorContain);
            var editorElm = new bkElement('DIV').setStyle({width : (newX-8)+'px', margin: '4px', minHeight : newY+'px'}).addClass('main').appendTo(this.editorContain);


            e.setStyle({display : 'none'});
            editorElm.innerHTML = e.innerHTML;
            if(isTextarea) {
                editorElm.setContent(e.value);
                this.copyElm = e;
                var f = e.parentTag('FORM');
                if(f) { bkLib.addEvent( f, 'submit', this.saveContent.closure(this)); }
            }
            editorElm.setStyle((ie7s) ? {height : newY+'px'} : {overflow: 'hidden'});
            this.elm = editorElm;

        }
        this.ne.addEvent('blur',this.blur.closure(this));

        this.init();
        this.blur();
    },

    init : function() {
        this.elm.setAttribute('contentEditable','true');
        // FTG Modified... Jae Moon
        // if(this.getContent() == "") {
        //     this.setContent('<br />');
        // }
        this.instanceDoc = document.defaultView;
        this.elm.addEvent('mousedown',this.selected.closureListener(this)).addEvent('keypress',this.keyDown.closureListener(this)).addEvent('focus',this.selected.closure(this)).addEvent('blur',this.blur.closure(this)).addEvent('keyup',this.selected.closure(this));
        this.ne.fireEvent('add',this);

        /* CLEAN WORD PASTE MOD */
        this.elm.addEvent('paste',this.initPasteClean.closureListener(this));
    },

    initPasteClean : function() {
        this.pasteCache = this.getElm().innerHTML;
        setTimeout(this.pasteClean.closure(this),100);
    },

    /* CLEAN WORD PASTE MOD : pasteClean method added for clean word paste */
    pasteClean : function() {
        var matchedHead = "";
        var matchedTail = "";
        var newContent = this.getElm().innerHTML;
        this.ne.fireEvent("get",this);
        var newContentStart = 0;
        var newContentFinish = 0;
        var newSnippet = "";
        var tempNode = document.createElement("div");

        /* Find start of both strings that matches */

        for (newContentStart = 0; newContent.charAt(newContentStart) == this.pasteCache.charAt(newContentStart); newContentStart++)
        {
            matchedHead += this.pasteCache.charAt(newContentStart);
        }

        /* If newContentStart is inside a HTML tag, move to opening brace of tag */
        for (var i = newContentStart; i >= 0; i--)
        {
            if (this.pasteCache.charAt(i) == "<")
            {
                newContentStart = i;
                matchedHead = this.pasteCache.substring(0, newContentStart);

                break;
            }
            else if(this.pasteCache.charAt(i) == ">")
            {
                break;
            }
        }

        newContent = this.reverse(newContent);
        this.pasteCache = this.reverse(this.pasteCache);

        /* Find end of both strings that matches */
        for (newContentFinish = 0; newContent.charAt(newContentFinish) == this.pasteCache.charAt(newContentFinish); newContentFinish++)
        {
            matchedTail += this.pasteCache.charAt(newContentFinish);
        }

        /* If newContentFinish is inside a HTML tag, move to closing brace of tag */
        for (var i = newContentFinish; i >= 0; i--)
        {
            if (this.pasteCache.charAt(i) == ">")
            {
                newContentFinish = i;
                matchedTail = this.pasteCache.substring(0, newContentFinish);

                break;
            }
            else if(this.pasteCache.charAt(i) == "<")
            {
                break;
            }
        }

        matchedTail = this.reverse(matchedTail);

        /* If there's no difference in pasted content */
        if (newContentStart == newContent.length - newContentFinish)
        {
            return false;
        }

        newContent = this.reverse(newContent);
        newSnippet = newContent.substring(newContentStart, newContent.length - newContentFinish);
        newSnippet = this.validTags(newSnippet);

        /* Replace opening bold tags with strong */
        newSnippet = newSnippet.replace(/<b(\s+|>)/g, "<strong$1");
        /* Replace closing bold tags with closing strong */
        newSnippet = newSnippet.replace(/<\/b(\s+|>)/g, "</strong$1");

        /* Replace italic tags with em */
        newSnippet = newSnippet.replace(/<i(\s+|>)/g, "<em$1");
        /* Replace closing italic tags with closing em */
        newSnippet = newSnippet.replace(/<\/i(\s+|>)/g, "</em$1");

        /* strip out comments -cgCraft */
        newSnippet = newSnippet.replace(/<!(?:--[\s\S]*?--\s*)?>\s*/g, "");

        /* strip out &nbsp; -cgCraft */
        newSnippet = newSnippet.replace(/&nbsp;/gi, " ");
        /* strip out extra spaces -cgCraft */
        newSnippet = newSnippet.replace(/ <\//gi, "</");

        while (newSnippet.indexOf("  ") != -1) {
            var anArray = newSnippet.split("  ")
            newSnippet = anArray.join(" ")
        }

        /* strip &nbsp; -cgCraft */
        newSnippet = newSnippet.replace(/^\s*|\s*$/g, "");

        /* Strip out unaccepted attributes */

        newSnippet = newSnippet.replace(/<[^>]*>/g, function(match)
            {
                match = match.replace(/ ([^=]+)="[^"]*"/g, function(match2, attributeName)
                {
                    if (attributeName == "alt" || attributeName == "href" || attributeName == "src" || attributeName == "title")
                    {
                        return match2;
                    }

                    return "";
                });

                return match;
            }
        );

        /* Final cleanout for MS Word cruft */
        newSnippet = newSnippet.replace(/<\?xml[^>]*>/g, "");
        newSnippet = newSnippet.replace(/<[^ >]+:[^>]*>/g, "");
        newSnippet = newSnippet.replace(/<\/[^ >]+:[^>]*>/g, "");

        /* remove undwanted tags */
        newSnippet = newSnippet.replace(/<(div|span|style|meta|link){1}.*?>/gi,'');

        this.content = matchedHead + newSnippet + matchedTail;
        this.ne.fireEvent("set",this);
        this.elm.innerHTML = this.content;
    },

    reverse : function(sentString) {
        var theString = "";
        for (var i = sentString.length - 1; i >= 0; i--) {
            theString += sentString.charAt(i);
        }
        return theString;
    },

    /* CLEAN WORD PASTE MOD : validTags method added for clean word paste */
    validTags : function(snippet) {
        var theString = snippet;

        /* Replace uppercase element names with lowercase */
        theString = theString.replace(/<[^> ]*/g, function(match){return match.toLowerCase();});

        /* Replace uppercase attribute names with lowercase */
        theString = theString.replace(/<[^>]*>/g, function(match) {
            match = match.replace(/ [^=]+=/g, function(match2){return match2.toLowerCase();});
            return match;
        });

        /* Put quotes around unquoted attributes */
        theString = theString.replace(/<[^>]*>/g, function(match) {
            match = match.replace(/( [^=]+=)([^"][^ >]*)/g, "$1\"$2\"");
            return match;
        });

        return theString;
    },

    remove : function() {
        this.saveContent();
        if(this.copyElm || this.options.hasPanel) {
            this.editorContain.remove();
            this.e.setStyle({'display' : 'block'});
            this.ne.removePanel();
        }
        this.disable();
        this.ne.fireEvent('remove',this);
    },

    disable : function() {
        this.elm.setAttribute('contentEditable','false');
    },

    getSel : function() {
        return (window.getSelection) ? window.getSelection() : document.selection;
    },

    getRng : function() {
        var s = this.getSel();
        if(!s) { return null; }
        return (s.rangeCount > 0) ? s.getRangeAt(0) : s.createRange();
    },

    selRng : function(rng,s) {
        if(window.getSelection) {
            s.removeAllRanges();
            s.addRange(rng);
        } else {
            rng.select();
        }
    },

    selElm : function() {
        var r = this.getRng();
        if(r.startContainer) {
            var contain = r.startContainer;
            if(r.cloneContents().childNodes.length == 1) {
                for(var i=0;i<contain.childNodes.length;i++) {
                    var rng = contain.childNodes[i].ownerDocument.createRange();
                    rng.selectNode(contain.childNodes[i]);
                    if(r.compareBoundaryPoints(Range.START_TO_START,rng) != 1 &&
                        r.compareBoundaryPoints(Range.END_TO_END,rng) != -1) {
                        return $BK(contain.childNodes[i]);
                    }
                }
            }
            return $BK(contain);
        } else {
            return $BK((this.getSel().type == "Control") ? r.item(0) : r.parentElement());
        }
    },

    saveRng : function() {
        this.savedRange = this.getRng();
        this.savedSel = this.getSel();
    },

    restoreRng : function() {
        if(this.savedRange) {
            this.selRng(this.savedRange,this.savedSel);
        }
    },

    keyDown : function(e,t) {
        if(e.ctrlKey) {
            this.ne.fireEvent('key',this,e);
        }
    },

    selected : function(e,t) {
        if(!t) {t = this.selElm()}
        if(!e.ctrlKey) {
            var selInstance = this.ne.selectedInstance;
            if(selInstance != this) {
                if(selInstance) {
                    this.ne.fireEvent('blur',selInstance,t);
                }
                this.ne.selectedInstance = this;
                this.ne.fireEvent('focus',selInstance,t);
            }
            this.ne.fireEvent('selected',selInstance,t);
            this.isFocused = true;
            this.elm.addClass('selected');
        }
        return false;
    },

    blur : function() {
        this.isFocused = false;
        this.elm.removeClass('selected');
    },

    saveContent : function() {
        if(this.copyElm || this.options.hasPanel) {
            this.ne.fireEvent('save',this);
            (this.copyElm) ? this.copyElm.value = this.getContent() : this.e.innerHTML = this.getContent();
        }
    },

    getElm : function() {
        return this.elm;
    },

    getContent : function() {
        this.content = this.getElm().innerHTML;
        this.ne.fireEvent('get',this);
        return this.content;
    },

    setContent : function(e) {
        this.content = e;
        this.ne.fireEvent('set',this);
        this.elm.innerHTML = this.content;
    },

    nicCommand : function(cmd,args) {
        document.execCommand(cmd,false,args);
    }
});
/** END *******************************************************************************/

