// GA timeSpent ******************************* Begin
var startTime = new Date().getTime();

function trackTimingCallback(event) {
    var endTime = new Date().getTime();
    var timeSpent = endTime - startTime;
    var pageUrl = window.location.href;
//    var pageUrl = window.location.pathname;
//    alert("timeSpent :"+timeSpent+" pageUrl :"+pageUrl);
    ga('send', 'timing', 'Page Load', 'Page Load', timeSpent, {'page': pageUrl});
}

$(window).bind('beforeunload', trackTimingCallback);
// GA timeSpent ******************************* End


$().ready(function(){
    var userId = $("#pageInfo").attr("data-userName");
    var propertyName = $("#pageInfo").attr("data-propertyName");

    if($("#pageInfo").length > 0 && $.trim(userId) !== "" && $.trim(propertyName) !== ""){

//        console.log("userId: "+userId+" propertyName:"+propertyName);

        ga('set', 'dimension2', 'userId');
        ga('set', 'dimension3', 'propertyName');
        ga('send', 'pageview', { 'dimension2': userId, 'dimension3': propertyName});
//      ga('send', 'pageview', { 'dimension2': userId});
//      ga('send', 'pageview', { 'dimension3': propertyName});
    }

    if($("#iconBigDownloadContent").length > 0){
        $(document).on("click", ".xlsReportScores", function() {
            ga('send', 'event', 'Button', 'Download', 'Report Scores');
        });
        $(document).on("click", ".xlsServiceComparisonScores", function() {
            ga('send', 'event', 'Button', 'Download', 'Service Comparison Scores');
        });
        $(document).on("click", ".xlsReportText", function() {
            ga('send', 'event', 'Button', 'Download', 'Report Text');
        });
        $(document).on("click", ".xlsReportTextNamesHidden", function() {
            ga('send', 'event', 'Button', 'Download', 'Report Text Names Hidden');
        });
        $(document).on("click", ".xlsMissedStandards", function() {
            ga('send', 'event', 'Button', 'Download', 'Missed Standards');
        });
        $(document).on("click", ".xlsMissedStandardsNamesHidden", function() {
            ga('send', 'event', 'Button', 'Download', 'Missed Standards Names Hidden');
        });
        $(document).on("click", ".xlsEmotionalEngagementText", function() {
            ga('send', 'event', 'Button', 'Download', 'Emotional Engagement Text');
        });
        $(document).on("click", ".xlsReportPhotos", function() {
            ga('send', 'event', 'Button', 'Download', 'Report Photos');
        });
    }
});
