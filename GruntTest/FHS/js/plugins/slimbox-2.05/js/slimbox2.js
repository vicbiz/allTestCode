/*!
	Slimbox v2.05 - The ultimate lightweight Lightbox clone for jQuery
	(c) 2007-2013 Christophe Beyls <http://www.digitalia.be>
	MIT-style license.
*/
//(function(w){var E=w(window),u,f,F=-1,n,x,D,v,y,L,r,m=!window.XMLHttpRequest,s=[],l=document.documentElement,k={},t=new Image(),J=new Image(),H,a,g,p,I,d,G,c,A,K;w(function(){w("body").append(w([H=w('<div id="lbOverlay" />').click(C)[0],a=w('<div id="lbCenter" />')[0],G=w('<div id="lbBottomContainer" />')[0]]).css("display","none"));g=w('<div id="lbImage" />').appendTo(a).append(p=w('<div style="position: relative;" />').append([I=w('<a id="lbPrevLink" href="#" />').click(B)[0],d=w('<a id="lbNextLink" href="#" />').click(e)[0]])[0])[0];c=w('<div id="lbBottom" />').appendTo(G).append([w('<a id="lbCloseLink" href="#" />').click(C)[0],A=w('<div id="lbCaption" />')[0],K=w('<div id="lbNumber" />')[0],w('<div style="clear: both;" />')[0]])[0]});w.slimbox=function(O,N,M){u=w.extend({loop:false,overlayOpacity:0.8,overlayFadeDuration:400,resizeDuration:400,resizeEasing:"swing",initialWidth:250,initialHeight:250,imageFadeDuration:400,captionAnimationDuration:400,counterText:"Image {x} of {y}",closeKeys:[27,88,67],previousKeys:[37,80],nextKeys:[39,78]},M);if(typeof O=="string"){O=[[O,N]];N=0}y=E.scrollTop()+(E.height()/2);L=u.initialWidth;r=u.initialHeight;w(a).css({top:Math.max(0,y-(r/2)),width:L,height:r,marginLeft:-L/2}).show();v=m||(H.currentStyle&&(H.currentStyle.position!="fixed"));if(v){H.style.position="absolute"}w(H).css("opacity",u.overlayOpacity).fadeIn(u.overlayFadeDuration);z();j(1);f=O;u.loop=u.loop&&(f.length>1);return b(N)};w.fn.slimbox=function(M,P,O){P=P||function(Q){return[Q.href,Q.title]};O=O||function(){return true};var N=this;return N.unbind("click").click(function(){var S=this,U=0,T,Q=0,R;T=w.grep(N,function(W,V){return O.call(S,W,V)});for(R=T.length;Q<R;++Q){if(T[Q]==S){U=Q}T[Q]=P(T[Q],Q)}return w.slimbox(T,U,M)})};function z(){var N=E.scrollLeft(),M=E.width();w([a,G]).css("left",N+(M/2));if(v){w(H).css({left:N,top:E.scrollTop(),width:M,height:E.height()})}}function j(M){if(M){w("object").add(m?"select":"embed").each(function(O,P){s[O]=[P,P.style.visibility];P.style.visibility="hidden"})}else{w.each(s,function(O,P){P[0].style.visibility=P[1]});s=[]}var N=M?"bind":"unbind";E[N]("scroll resize",z);w(document)[N]("keydown",o)}function o(O){var N=O.which,M=w.inArray;return(M(N,u.closeKeys)>=0)?C():(M(N,u.nextKeys)>=0)?e():(M(N,u.previousKeys)>=0)?B():null}function B(){return b(x)}function e(){return b(D)}function b(M){if(M>=0){F=M;n=f[F][0];x=(F||(u.loop?f.length:0))-1;D=((F+1)%f.length)||(u.loop?0:-1);q();a.className="lbLoading";k=new Image();k.onload=i;k.src=n}return false}function i(){a.className="";w(g).css({backgroundImage:"url("+n+")",visibility:"hidden",display:""});w(p).width(k.width);w([p,I,d]).height(k.height);w(A).html(f[F][1]||"");w(K).html((((f.length>1)&&u.counterText)||"").replace(/{x}/,F+1).replace(/{y}/,f.length));if(x>=0){t.src=f[x][0]}if(D>=0){J.src=f[D][0]}L=g.offsetWidth;r=g.offsetHeight;var M=Math.max(0,y-(r/2));if(a.offsetHeight!=r){w(a).animate({height:r,top:M},u.resizeDuration,u.resizeEasing)}if(a.offsetWidth!=L){w(a).animate({width:L,marginLeft:-L/2},u.resizeDuration,u.resizeEasing)}w(a).queue(function(){w(G).css({width:L,top:M+r,marginLeft:-L/2,visibility:"hidden",display:""});w(g).css({display:"none",visibility:"",opacity:""}).fadeIn(u.imageFadeDuration,h)})}function h(){if(x>=0){w(I).show()}if(D>=0){w(d).show()}w(c).css("marginTop",-c.offsetHeight).animate({marginTop:0},u.captionAnimationDuration);G.style.visibility=""}function q(){k.onload=null;k.src=t.src=J.src=n;w([a,g,c]).stop(true);w([I,d,g,G]).hide()}function C(){if(F>=0){q();F=x=D=-1;w(a).hide();w(H).stop().fadeOut(u.overlayFadeDuration,j)}return false}})(jQuery);


/*!
 Slimbox v2.05 - The ultimate lightweight Lightbox clone for jQuery
 (c) 2007-2013 Christophe Beyls <http://www.digitalia.be>
 MIT-style license.
 */

(function($) {

    // Global variables, accessible to Slimbox only
    var win = $(window), options, images, activeImage = -1, activeURL, prevImage, nextImage, compatibleOverlay, middle, centerWidth, centerHeight,
        ie6 = !window.XMLHttpRequest, hiddenElements = [], documentElement = document.documentElement,

    // Preload images
        preload = {}, preloadPrev = new Image(), preloadNext = new Image(),

    // DOM elements
        overlay, center, image, sizer, prevLink, nextLink, bottomContainer, bottom, caption, number;

    /*
     Initialization
     */

    $(function() {
        // Append the Slimbox HTML code at the bottom of the document
        $("body").append(
            $([
                overlay = $('<div id="lbOverlay" />').click(close)[0],
                center = $('<div id="lbCenter" />')[0],
                bottomContainer = $('<div id="lbBottomContainer" />')[0]
            ]).css("display", "none")
        );

        image = $('<div id="lbImage" />').appendTo(center).append(
            sizer = $('<div style="position: relative;" />').append([
                prevLink = $('<a id="lbPrevLink" href="#" />').click(previous)[0],
                nextLink = $('<a id="lbNextLink" href="#" />').click(next)[0]
            ])[0]
        )[0];

        bottom = $('<div id="lbBottom" />').appendTo(bottomContainer).append([
            $('<a id="lbCloseLink" href="#" />').click(close)[0],
            caption = $('<div id="lbCaption" />')[0],
            number = $('<div id="lbNumber" />')[0],
            $('<div style="clear: both;" />')[0]
        ])[0];
    });


    /*
     API
     */

    // Open Slimbox with the specified parameters
    $.slimbox = function(_images, startImage, _options) {
        options = $.extend({
            loop: false,				// Allows to navigate between first and last images
            overlayOpacity: 0.8,			// 1 is opaque, 0 is completely transparent (change the color in the CSS file)
            overlayFadeDuration: 400,		// Duration of the overlay fade-in and fade-out animations (in milliseconds)
            resizeDuration: 400,			// Duration of each of the box resize animations (in milliseconds)
            resizeEasing: "swing",			// "swing" is jQuery's default easing
            initialWidth: 250,			// Initial width of the box (in pixels)
            initialHeight: 250,			// Initial height of the box (in pixels)
            imageFadeDuration: 400,			// Duration of the image fade-in animation (in milliseconds)
            captionAnimationDuration: 400,		// Duration of the caption animation (in milliseconds)
            counterText: "Image {x} of {y}",	// Translate or change as you wish, or set it to false to disable counter text for image groups
            closeKeys: [27, 88, 67],		// Array of keycodes to close Slimbox, default: Esc (27), 'x' (88), 'c' (67)
            previousKeys: [37, 80],			// Array of keycodes to navigate to the previous image, default: Left arrow (37), 'p' (80)
            nextKeys: [39, 78]			// Array of keycodes to navigate to the next image, default: Right arrow (39), 'n' (78)
        }, _options);

        // The function is called for a single image, with URL and Title as first two arguments
        if (typeof _images == "string") {
            _images = [[_images, startImage]];
            startImage = 0;
        }

        middle = win.scrollTop() + (win.height() / 2);
        centerWidth = options.initialWidth;
        centerHeight = options.initialHeight;
        $(center).css({top: Math.max(0, middle - (centerHeight / 2)), width: centerWidth, height: centerHeight, marginLeft: -centerWidth/2}).show();
        compatibleOverlay = ie6 || (overlay.currentStyle && (overlay.currentStyle.position != "fixed"));
        if (compatibleOverlay) overlay.style.position = "absolute";
        $(overlay).css("opacity", options.overlayOpacity).fadeIn(options.overlayFadeDuration);
        position();
        setup(1);

        images = _images;
        options.loop = options.loop && (images.length > 1);
        return changeImage(startImage);
    };

    /*
     options:	Optional options object, see jQuery.slimbox()
     linkMapper:	Optional function taking a link DOM element and an index as arguments and returning an array containing 2 elements:
     the image URL and the image caption (may contain HTML)
     linksFilter:	Optional function taking a link DOM element and an index as arguments and returning true if the element is part of
     the image collection that will be shown on click, false if not. "this" refers to the element that was clicked.
     This function must always return true when the DOM element argument is "this".
     */
    $.fn.slimbox = function(_options, linkMapper, linksFilter) {
        linkMapper = linkMapper || function(el) {
            return [el.href, el.title];
        };

        linksFilter = linksFilter || function() {
            return true;
        };

        var links = this;

        return links.unbind("click").click(function() {
            // Build the list of images that will be displayed
            var link = this, startIndex = 0, filteredLinks, i = 0, length;
            filteredLinks = $.grep(links, function(el, i) {
                return linksFilter.call(link, el, i);
            });

            // We cannot use jQuery.map() because it flattens the returned array
            for (length = filteredLinks.length; i < length; ++i) {
                if (filteredLinks[i] == link) startIndex = i;
                filteredLinks[i] = linkMapper(filteredLinks[i], i);
            }

            return $.slimbox(filteredLinks, startIndex, _options);
        });
    };


    /*
     Internal functions
     */

    function position() {
        var l = win.scrollLeft(), w = win.width();
        $([center, bottomContainer]).css("left", l + (w / 2));
        if (compatibleOverlay) $(overlay).css({left: l, top: win.scrollTop(), width: w, height: win.height()});
    }

    function setup(open) {
        if (open) {
            $("object").add(ie6 ? "select" : "embed").each(function(index, el) {
                hiddenElements[index] = [el, el.style.visibility];
                el.style.visibility = "hidden";
            });
        } else {
            $.each(hiddenElements, function(index, el) {
                el[0].style.visibility = el[1];
            });
            hiddenElements = [];
        }
        var fn = open ? "bind" : "unbind";
        win[fn]("scroll resize", position);
        $(document)[fn]("keydown", keyDown);
    }

    function keyDown(event) {
        var code = event.which, fn = $.inArray;
        // Prevent default keyboard action (like navigating inside the page)
        return (fn(code, options.closeKeys) >= 0) ? close()
            : (fn(code, options.nextKeys) >= 0) ? next()
            : (fn(code, options.previousKeys) >= 0) ? previous()
            : null;
    }

    function previous() {
        return changeImage(prevImage);
    }

    function next() {
        return changeImage(nextImage);
    }

    function changeImage(imageIndex) {
        if (imageIndex >= 0) {
            activeImage = imageIndex;
            activeURL = images[activeImage][0];
            prevImage = (activeImage || (options.loop ? images.length : 0)) - 1;
            nextImage = ((activeImage + 1) % images.length) || (options.loop ? 0 : -1);

            stop();
            center.className = "lbLoading";

            preload = new Image();
            preload.onload = animateBox;
            preload.src = activeURL;
        }

        return false;
    }

    function animateBox() {
        center.className = "";
//        $(image).css({backgroundImage: "url(" + activeURL + ")", visibility: "hidden", display: ""});
//        $(sizer).width(preload.width);
//        $([sizer, prevLink, nextLink]).height(preload.height);


        /* HACK --- Jae Moon -- make sure the image won't be bigger than the window ---- Begin*/
        var winWidth = $(window).width() - 20;
        var winHeight = $(window).height() - 104;
        var maxSize = (winWidth > winHeight) ? winHeight : winWidth; /* the smaller dimension determines max size */

        /* determine proper w and h for img, based on original image'w dimensions and maxSize */
        var my_w = preload.width;
        var my_h = preload.height;
        if (my_w > my_h)
        {
            my_h = maxSize * my_h / my_w;
            my_w = maxSize;
        }
        else
        {
            my_w = maxSize * my_w / my_h;
            my_h = maxSize;
        }

        if (preload.width > my_w || preload.height > my_h){ /* constrain it */
            $(image).css({backgroundImage: "url(" + activeURL + ")", backgroundSize: my_w + "px " + my_h + "px", visibility: "hidden", display: ""});
            $(sizer).width(my_w);
            $([sizer, prevLink, nextLink]).height(my_h);
        }
        else { /* default behaviour */
            $(image).css({backgroundImage: "url(" + activeURL + ")", backgroundSize: "", visibility: "hidden", display: ""});
            $(sizer).width(preload.width);
            $([sizer, prevLink, nextLink]).height(preload.height);
        }
        /* HACK --- Jae Moon -- make sure the image won't be bigger than the window ---- END*/



        $(caption).html(images[activeImage][1] || "");
        $(number).html((((images.length > 1) && options.counterText) || "").replace(/{x}/, activeImage + 1).replace(/{y}/, images.length));

        if (prevImage >= 0) preloadPrev.src = images[prevImage][0];
        if (nextImage >= 0) preloadNext.src = images[nextImage][0];

        centerWidth = image.offsetWidth;
        centerHeight = image.offsetHeight;
        var top = Math.max(0, middle - (centerHeight / 2));
        if (center.offsetHeight != centerHeight) {
            $(center).animate({height: centerHeight, top: top}, options.resizeDuration, options.resizeEasing);
        }
        if (center.offsetWidth != centerWidth) {
            $(center).animate({width: centerWidth, marginLeft: -centerWidth/2}, options.resizeDuration, options.resizeEasing);
        }
        $(center).queue(function() {
            $(bottomContainer).css({width: centerWidth, top: top + centerHeight, marginLeft: -centerWidth/2, visibility: "hidden", display: ""});
            $(image).css({display: "none", visibility: "", opacity: ""}).fadeIn(options.imageFadeDuration, animateCaption);
        });
    }

    function animateCaption() {
        if (prevImage >= 0) $(prevLink).show();
        if (nextImage >= 0) $(nextLink).show();
        $(bottom).css("marginTop", -bottom.offsetHeight).animate({marginTop: 0}, options.captionAnimationDuration);
        bottomContainer.style.visibility = "";
    }

    function stop() {
        preload.onload = null;
        preload.src = preloadPrev.src = preloadNext.src = activeURL;
        $([center, image, bottom]).stop(true);
        $([prevLink, nextLink, image, bottomContainer]).hide();
    }

    function close() {
        if (activeImage >= 0) {
            stop();
            activeImage = prevImage = nextImage = -1;
            $(center).hide();
            $(overlay).stop().fadeOut(options.overlayFadeDuration, setup);
        }

        return false;
    }

})(jQuery);

// AUTOLOAD CODE BLOCK (MAY BE CHANGED OR REMOVED)
if (!/android|iphone|ipod|series60|symbian|windows ce|blackberry/i.test(navigator.userAgent)) {
	jQuery(function($) {
		$("a[rel^='lightbox']").slimbox({
		    /* Put custom options here */
        }, null, function(el) {
			return (this == el) || ((this.rel.length > 8) && (this.rel == el.rel));
		});
	});
}