$(document).ready(function () {
    var oTable = $("#evalTable").dataTable({
        "sPaginationType": "full_numbers",
        "aoColumns": [
            null,
            null,
            null,
            { "sType": "date" },
            { "sType": "date-blanksfirst" },
            {"bSortable" : false}
        ],
        "aaSorting": [[5, "desc"]]
    });
});

// Prevent Browser Back Button for Dashboard Page
window.onload = function () {
    if (typeof history.pushState === "function") {
        history.pushState("jibberish", null, null);
        window.onpopstate = function () {
            history.pushState('newjibberish', null, null);
            // Handle the back (or forward) buttons here
            // Will NOT handle refresh, use onbeforeunload for this.
        };
    }
    else {
        var ignoreHashChange = true;
        window.onhashchange = function () {
            if (!ignoreHashChange) {
                ignoreHashChange = true;
                window.location.hash = Math.random();
                // Detect and redirect change here
                // Works in older FF and IE9
                // * it does mess with your hash symbol (anchor?) pound sign
                // delimiter on the end of the URL
            }
            else {
                ignoreHashChange = false;
            }
        };
    }
}