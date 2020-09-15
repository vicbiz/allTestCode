/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */


CKEDITOR.on('instanceReady', function (ev) {
    ev.editor.on('paste', function (ev) {
        // console.log("pasting...");
        // ev.data.dataValue = ev.data.dataValue.replace(/(<([^>]+)>)/ig, ''); // Remove All Tags
        // ev.data.dataValue = ev.data.dataValue.replace(/(\<p ?\/?\>)+/gi, '');
        // ev.data.dataValue = ev.data.dataValue.replace(/(\<\/p\>)+/gi, '</br></br>');

        ev.data.dataValue = ev.data.dataValue.replace(/<\/?([a-z]+)[^>]*>/gi, function(match, tag) {
            // console.log("match:"+match);
            // console.log("tag:"+tag);
            return (tag === "p" || tag === "div" || tag === "br" || tag === "em" || tag === "redact") ? match : "";
        });

    });
});

CKEDITOR.editorConfig = function( config ) {
    // Define changes to default configuration here. For example:
    // config.language = 'fr';
    // config.uiColor = '#AADC6E';

    config.removePlugins = 'PasteFromWord';
    config.removePlugins = 'magicline';
    config.forcePasteAsPlainText = true;
    config.allowedContent = true;
    config.disableNativeSpellChecker = true;
    config.scayt_autoStartup = true;
    config.extraPlugins = 'redactor,smallerselection';
};
