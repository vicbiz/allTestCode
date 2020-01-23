$(document).ready(function() {

    var standardYearSelect = $("#standardYearId");
    var assetGroupSelect = $("#assetGroupId");
    var assetTypeSelect = $("#assetTypeId");
    var csReportForm = $("#csRatingReportForm");
    var downloadLink = $("a:last");
    var loadingMessage = $("#loadingMessage");

    downloadLink.removeClass("disabled");
    loadingMessage.addClass("hidden");

    assetGroupSelect.select2({
        placeholder: "ALL",
        width: 300,
        allowClear: true
    });

    standardYearSelect.change(function() {
        // reset choice if the year has changed
        assetGroupSelect.val("");
        assetTypeSelect.val("");
        loadingMessage.removeClass("hidden");
        downloadLink.addClass("disabled");
        csReportForm.submit();
    });

    assetGroupSelect.change(function() {
        loadingMessage.removeClass("hidden");
        downloadLink.addClass("disabled");
        csReportForm.submit();
    });

    assetTypeSelect.change(function() {
        loadingMessage.removeClass("hidden");
        downloadLink.addClass("disabled");
        csReportForm.submit();
    });


});
