
var maxMySelection = 15;

$(document).ready(function() {

    /************************************************************************************/
    if($("#reportApp").length === 0 && $("#assetTable, #classificationTable").length > 0){
        var oTable0 = $("#assetTable, #classificationTable").dataTable({
            "sPaginationType": "full_numbers",
            aoColumnDefs: [
                {
                    bSortable: false,
                    aTargets: []
                }
            ],
            "aaSorting": [[0, "asc"]],
            "sDom": '<"H"f>rt',
            "iDisplayLength": 100000
        });
    }
    /************************************************************************************/


    /************************************************************************************/
    if($(".helpIcon").length > 0){
        $(".helpIcon:not(.disabled)").click(function(e) {
            e.preventDefault();
            var modalId = "myModal";
            var modalTitle = "Help";
            var modalContent = $($(this).attr("data-helpContent")).html();
            var noTxt = "";
            var yesTxt = "CLOSE";
            e.stopImmediatePropagation();
            fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){
            });
        });
    }
    /************************************************************************************/


    /************************************************************************************/
    //if($("#reportApp").length === 0 && $("select").length > 0){
    //    $("select").selectpicker({style: 'btn-wt form-control', menuStyle: 'dropdown-inverse'});
    //}
    /************************************************************************************/



    /************************************************************************************/
    /* Achieved Misse Pie Chart Begin */
    if($("#achievedMissed").length > 0){
        var pieData = $("#achievedMissed").attr("data-data");
        if(pieData === '[, , ]'){
            pieData = '[]';
        }
        var achievedMissedData = JSON.parse(pieData);

        var total = 0;
        $(achievedMissedData).map(function(){total += this[1];})
        var labelValuePercent = $.makeArray($(achievedMissedData).map(function(){
            return this[1] + " (" + Math.round(this[1]/total * 100) + "%)";
        }));

        var keyColor = ["#43AFC1", "#D12824", "#A4A4A4" ];

        var jqPieChart = jQuery.jqplot ('pieChart', [achievedMissedData],
            {
                seriesDefaults: {
                    shadow: false,
                    renderer: jQuery.jqplot.PieRenderer,
                    rendererOptions: {
                        showDataLabels: true,
                        highlightMouseOver: true,
                        startAngle: 90,
                        dataLabels: labelValuePercent
                    }
                },
                animate: true,
                grid: {borderColor: '#ffffff', shadow: false, drawBorder: true, background: '#ffffff'},
                seriesColors: keyColor,
                legend: { show:false, location: 'e' }
            }
        );

        if($("#reportApp").length === 0){
            //On mouseover
            $('#pieChart').bind('jqplotDataHighlight', function(evt, seriesIndex, pointIndex, data) {
                var idx = parseInt(pointIndex)+2;
                $("#pieChart div.jqplot-pie-series").css("display","none");
                $("#pieChart div.jqplot-pie-series:nth-of-type("+idx+")").css("display","block");
            });

            //On mouseout
            $('#pieChart').bind('jqplotDataUnhighlight', function(evt, seriesIndex, pointIndex, data){
                //place your logic here
                $("#pieChart div.jqplot-pie-series").css("display","none");
            });
        } else {
            $("#pieChart div.jqplot-pie-series").css("display","block");
        }


        $("#achievedMissed .keyColor0").css("background",keyColor[0]);
        $("#achievedMissed .keyColor1").css("background",keyColor[1]);
        $("#achievedMissed .keyColor2").css("background",keyColor[2]);

        $(window).resize(function() {
            jqPieChart.replot( { resetAxes: true } );
        });
    }
    /* Achieved Misse Pie Chart End */
    /************************************************************************************/



    /************************************************************************************/
    if($("#reportApp").length === 0 && $("#basicStandardsModule").length > 0 ){
        var oTable1 = $("#basicStandardsModule").dataTable({
            "sPaginationType": "full_numbers",
            aoColumnDefs: [
                {
                    bSortable: false,
                    aTargets: []
                }
            ],
            "aoColumns": [
                null,
                null,
                null,
                { "sType": "percent" }
            ],
            "aaSorting": [],
            "sDom": '<"H"f>rt',
            "bFilter": false,
            "bInfo": false,
            "iDisplayLength": 100000
        });
    }
    /************************************************************************************/

    /************************************************************************************/
    if($("#reportApp").length === 0 && $("#ytdClassificationAvgsModule").length > 0 ){
        var oTable2 = $("#ytdClassificationAvgsModule").dataTable({
            "sPaginationType": "full_numbers",
            aoColumnDefs: [
                {
                    bSortable: false,
                    aTargets: []
                }
            ],
            "aoColumns": [
                null,
                { "sType": "percent" },
                { "sType": "percent" }
            ],
            "aaSorting": [],
            "sDom": '<"H"f>rt',
            "bFilter": false,
            "bInfo": false,
            "iDisplayLength": 100000
        });
    }
    /************************************************************************************/


    /************************************************************************************/
    if($("#reportApp").length === 0 && $("#accountabilityModule").length > 0 ){
        var oTable3 = $("#accountabilityModule").dataTable({
            "sPaginationType": "full_numbers",
            aoColumnDefs: [
                {
                    bSortable: false,
                    aTargets: [0,1]
                }
            ],
//            "aaSorting": [[0, "asc"]],
            "sDom": '<"H"f>rt',
            "bFilter": false,
            "bInfo": false,
            "iDisplayLength": 100000,
            "aoColumns": [
                { "sWidth": "70%" },
                { "sWidth": "30%" }
            ]
        });
    }
    /************************************************************************************/

    /************************************************************************************/
    if($("#reportApp").length === 0 && $("#scoreDetailsSection").length > 0 ){
        var oTable4 = $("#scoreDetailsSection").dataTable({
            "sPaginationType": "full_numbers",
            aoColumnDefs: [
                {
                    bSortable: false,
                    aTargets: [2,4]
                }
            ],
            "aoColumns": [
                null,
                { "sType": "percent" },
                null,
                { "sType": "percent" },
                null,
                { "sType": "numeric-comma" }
            ],
            "aaSorting": [],
            "sDom": '<"H"f>rt',
            "bFilter": false,
            "bInfo": false,
            "iDisplayLength": 100000
        });
    }

    if($("#reportApp").length === 0 && $("#scoreDetailsSectionBrand").length > 0 ){
        var oTable5 = $("#scoreDetailsSectionBrand").dataTable({
            "sPaginationType": "full_numbers",
            aoColumnDefs: [
                {
                    bSortable: false,
                    aTargets: [2]
                }
            ],
            "aoColumns": [
                null,
                { "sType": "percent" },
                null,
                { "sType": "numeric-comma" }
            ],
            "aaSorting": [],
            "sDom": '<"H"f>rt',
            "bFilter": false,
            "bInfo": false,
            "iDisplayLength": 100000
        });
    }


    if($("#reportApp").length === 0 && $("#scoreDetailsClassification").length > 0 ){
        var oTable6 = $("#scoreDetailsClassification").dataTable({
            "sPaginationType": "full_numbers",
            aoColumnDefs: [
                {
                    bSortable: false,
                    aTargets: [2,4]
                }
            ],
            "aoColumns": [
                null,
                { "sType": "percent" },
                null,
                null,
                null,
                { "sType": "numeric-comma" }
            ],
            "aaSorting": [[0, "asc"]],
            "sDom": '<"H"f>rt',
            "bFilter": false,
            "bInfo": false,
            "iDisplayLength": 100000
        });
    }

    if($("#reportApp").length === 0 && $("#scoreDetailsEE").length > 0){
        var oTable7 = $("#scoreDetailsEETable").dataTable({
            "sPaginationType": "full_numbers",
            aoColumnDefs: [
                {
                    bSortable: false,
                    aTargets: []
                }
            ],
            "aaSorting": [],
            "sDom": '<"H"f>rt',
            "bFilter": false,
            "bInfo": false,
            "iDisplayLength": 100000,
            "aoColumns": [
                { "sType": "overallFirst" },
                { "sType": "percent" },
                { "sType": "numeric-comma" }
            ]
        });
    }

    if($("#reportApp").length === 0 && $("#serviceComparisonOverallTable").length > 0 ){
        var opAoColumns = [
            null,
            { "sType": "percent" },
            { "sType": "percent" },
            { "sType": "percent" },
            { "sType": "percent" }
        ] ;

        if($("#serviceComparisonOverallTable").attr("data-assetType") === 'spa'){
            opAoColumns = [
                null,
                { "sType": "percent" },
                { "sType": "percent" },
                { "sType": "percent" }
            ] ;
        }
        var oTable8 = $("#serviceComparisonOverallTable").dataTable({
            "sPaginationType": "full_numbers",
            aoColumnDefs: [
                {
                    bSortable: false,
//                    aTargets: [0,1,2,3,4]
                    aTargets: []
                }
            ],
            "aoColumns": opAoColumns,
            "aaSorting": [],
            "sDom": '<"H"f>rt',
            "bFilter": false,
            "bInfo": false,
            "iDisplayLength": 100000
        });
    }
    /************************************************************************************/



    /************************************************************************************/
    if($(".tabToggleBlock .tabMenu").length > 0){
        $(".tabToggleBlock .tabMenu").on("click", function(e){
            var $this = $(this);
            e.preventDefault();
            if($this.hasClass("selected")){ return true }
            else {
                $(this).parent().find(".tabMenu").removeClass("selected");
                $this.addClass("selected");

                var targetTab = "#"+$this.attr("data-tabId");

                $(targetTab).siblings().removeClass("hidden").addClass("hidden");
                $(targetTab).removeClass("hidden");
            }
        });
    }
    /************************************************************************************/


    /************************************************************************************/
    if($("#reportApp").length === 0 && $("#scoreDetailsTabBlock .tabMenu").length > 0){
        $("#scoreDetailsTabBlock .tabMenu").on("click", function(e){
            var $this = $(this);
            e.preventDefault();
            if($this.hasClass("selected")){ return true }
            else {
                $("#scoreDetailsTabBlock .tabMenu").removeClass("selected");
                $this.addClass("selected");

                var targetTbl = "#"+$this.attr("data-tabId");

                $("#scoreDetailsTabBlock").parent().find("table").removeClass("hidden").addClass("hidden");
                // $("#scoreDetails table.dataTable").removeClass("hidden").addClass("hidden");
                if(targetTbl === '#scoreDetailsEE'){
                    $("#scoreDetailsEE table.dataTable").removeClass("hidden");
                    $('#scoreDetailsEE').removeClass("hidden");
                } else {
                    $('#scoreDetailsEE').removeClass("hidden").addClass("hidden");
                    $(targetTbl).removeClass("hidden");
                }

                if(targetTbl === '#scoreDetailsClassification'){
                    $("#highImpactHelp").removeClass("hidden");
                } else {
                    $("#highImpactHelp").addClass("hidden");
                }
            }
        });
    }
    /************************************************************************************/



    /************************************************************************************/
    if($("canvas.cvs").length > 0){
        // PBar --- Table Bar Graph
        function roundRect(ctx, x, y, width, height, radius, fill, stroke, isLargeGraph) {
            if (typeof stroke == "undefined" ) {
                stroke = true;
            }
            if (typeof radius === "undefined") {
                radius = 5;
            }

            var gdest = ctx.globalCompositeOperation;
            var fstyle = ctx.fillStyle;
            ctx.globalCompositeOperation = "destination-out";
            ctx.fillStyle = "rgba(0,0,0,1.0)";

            ctx.beginPath();
            ctx.moveTo(x, y+radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
            ctx.lineTo(x, y);
            ctx.lineTo(x, y+radius);
            ctx.closePath();
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(x, y+height-radius);
            ctx.quadraticCurveTo(x, y+height, x + radius, y+height);
            ctx.lineTo(x, y+height);
            ctx.lineTo(x, y+height-radius);
            ctx.closePath();
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(x+width-radius, y);
            ctx.quadraticCurveTo(x+width, y, x + width, y+radius);
            ctx.lineTo(x+width, y);
            ctx.lineTo(x+width-radius, y);
            ctx.closePath();
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(x+width, y+height-radius);
            ctx.quadraticCurveTo(x+width, y+height, x+width - radius, y+height);
            ctx.lineTo(x+width, y+height);
            ctx.lineTo(x+width, y+height-radius);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = fstyle;
            ctx.globalCompositeOperation = gdest;

            //round rect
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + width - radius, y);
            ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
            ctx.lineTo(x + width, y + height - radius);
            ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
            ctx.lineTo(x + radius, y + height);
            ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
            ctx.closePath();
            if (stroke) {
                ctx.stroke();
            }
            if (fill) {
                ctx.fill();
            }


        }


        var ii = 0;
        function isNumber(n)
        {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }

        function drawCanvas($targetCanvas, containerWidth)
        {
            var isLargeGraph = false;
            if($targetCanvas.hasClass("barGraphLarge")){
                isLargeGraph = true;
            }

            var dataLow = $targetCanvas.attr("data-low");;
            var dataHigh = $targetCanvas.attr("data-high");;
            if(typeof dataLow === "undefined"){dataLow = 0;}
            if(typeof dataHigh === "undefined"){dataHigh = 0;}


            var percentage = $targetCanvas.attr("data-percentage");
            $targetCanvas.attr("data-pct",percentage);
            var error = !isNumber(percentage);
            if (!error && (percentage < 0 || percentage > 100))
            {
                error = true;
            }

            var canvas = $targetCanvas;
            canvas.clear = true;
            canvas = $targetCanvas[0];

            if(canvas.getContext){
                var context = canvas.getContext('2d');
                context.clearRect(0,0,canvas.width,canvas.height);

                if(isLargeGraph){
                    context.fillStyle = "rgb(191, 191, 191)";
                } else {
                    context.fillStyle = "rgb(238, 238, 238)";
                }
                context.fillRect(0, 0, canvas.width, canvas.height);

                var percWidth = Math.round(canvas.width / 100);

                if (!error)
                {
                    for (var i = 0; i<= percentage; i++)
                    {
                        context.fillStyle = "rgb(85, 189, 202)";
                        var temp1 = Math.round(i*canvas.width / 100)-percWidth;
                        context.fillRect(temp1, 0, percWidth, canvas.height);
                    }

                    var msg = percentage+"%";
                }
                else
                {
                    context.fillStyle = "rgb(255,0,0)";
                    context.fillRect(0,0,canvas.width, canvas.height);
                    context.font = "bold 30px sans-serif";
                    context.fillStyle = "rgb(255,255,255)";
                    context.textBaseline = "middle";
                    var msg = "ERROR: Wrong input";
                }

                var radiusValue = 10;
                if(containerWidth > 300){radiusValue = 7;}
                if(isLargeGraph){
                    var temp2 = Math.round(dataLow*canvas.width / 100)-percWidth;
                    var temp3 = Math.round(dataHigh*canvas.width / 100)-percWidth;

                    // To make line clear
                    //context.translate(0.5, 0.5); // To make line clear -- not working with resize window
                    temp2 += 0.5;
                    temp3 += 0.5;

                    context.strokeStyle = "rgba(255, 255, 255, 1)";
                    context.lineWidth = 1;
                    context.beginPath();
                    context.moveTo(temp2, 0);
                    context.lineTo(temp2, canvas.height);
                    context.stroke();

                    context.strokeStyle = "rgba(151, 108, 250, 1)";
                    context.lineWidth = 1;
                    context.beginPath();
                    context.moveTo(temp3, 0);
                    context.lineTo(temp3, canvas.height);
                    context.stroke();
                } else {
                    roundRect(context, 0,0,canvas.width,canvas.height,radiusValue,"",false, isLargeGraph);
                }



            }

        }



        var drawTableBarGraph = function(){
            var containerWidth = 0;
            $(".barGraph canvas.cvs").addClass("hidden");
            $(".barGraph canvas.cvs").each(function(){
                var $this = $(this);
                if($this.parent().width() > containerWidth){ containerWidth = $this.parent().width(); }
            });

            $(".barGraph canvas.cvs").each(function(){
                var $this = $(this);
                $this.css("width",containerWidth);
                $this.css("height",15);
                drawCanvas($this, containerWidth);
                $(".barGraph canvas.cvs").removeClass("hidden");
            });

            if($(".cpAvgBarModule .barGraphLargeWrap canvas").length > 0){
                $(".barGraphLargeWrap canvas.cvs").each(function(){
                    var $this = $(this);
                    $this.css("width",$(this).width());
                    $this.css("height",$(this).height());
                    drawCanvas($this, $(this).width());

                    var dPercent = $(this).attr("data-percent");
                    //console.log("dPercent :"+dPercent);
                    dPercent = dPercent.replace("%","");
                    dPercent = parseFloat(dPercent)+"%";
                    //console.log("dPercent :"+dPercent);
                    if(dPercent === "NaN%"){ dPercent = "";}

                    var dText = $(this).attr("data-text");
                    var dHtml = "";
                    if(dPercent === ""){ dText = ""; }

                    if(typeof dPercent !== "undefined"){
                        var signClass = "positive";
                        if(typeof dPercent !== "undefined" && dPercent.lastIndexOf("-") > -1){
                            signClass = "negative";
                        }
                        dHtml += '<span class="'+signClass+'">'+dPercent+'</span>';
                    }
                    if(typeof dText !== "undefined"){
                        dHtml += '<br/><span class="barTextInfo">'+dText+'</span>';
                    }

                    if(dHtml !== ""){
                        dHtml = '<span class="barInfo">' + dHtml + '</span>';
                    }


                    if($("#reportApp").length > 0){
                        var $targetObj = $(this).parent().find(".barInfo");
                        $targetObj.find(".barValInfo").addClass(signClass);
                        $targetObj.find(".barValInfo").text(dPercent);
                        $targetObj.find(".barTextInfo").text(dText);
                    } else {
                        $(this).parent().find(".barInfo").remove();
                        $(this).parent().append(dHtml);
                    }










                    $(".barGraph canvas.cvs").removeClass("hidden");

                    var ctLow = $(this).attr("data-low");
                    var ctHigh = $(this).attr("data-high");
                    var ctLowName = $(this).attr("data-lowName");
                    var ctHighName = $(this).attr("data-highName");
                    var ctScore = $(this).attr("data-percentage");
                    var plusLinkUrl = $(".cpAvgBarModule .plusLink a").attr("href");


                    if((ctHigh !== "" || ctLow !== "") && $("#reportApp").length === 0){
                        var ct = '<div class="cpAvgToolText">Highest : '+ctHighName+' ('+ctHigh+'%) <br/> Lowest : '+ctLowName+' ('+ctLow+'%) <br/><br/><a href="'+plusLinkUrl+'" class="tooltipLink">View Details</a></div>';
                        //var ct = '<div class="cpAvgToolText">Highest : '+ctHigh+'% <br/> '+ctHighName+' <br/><br/> Lowest : '+ctLow+'% <br/>'+ctLowName+'<br/><br/>View Details.</div>';
                        if(!$(this).hasClass("tooltipstered")){
                            $(this).tooltipster({
                                content: ct,
                                contentAsHTML: true,
                                animation: 'grow',
                                speed: 200,
                                delay: 100,
                                touchDevices: false,
                                maxWidth: 500,
                                interactive: true,
                                trigger: 'hover'
                            });
                        }
                    }
                });
            }


        };
        drawTableBarGraph();



        $("td.barGraph").on("mouseenter", function(){
            var $this = $(this).find("canvas");
            var leftPosition = parseInt($this.width()*0.45);
            var scoreData = $this.attr("data-percentage");
            $("td.barGraph .barHoverData").remove();
            $this.parent().prepend("<div class='barHoverDataWrap'><p class='barHoverData' style='left:"+leftPosition+"px'>"+scoreData+"%</p></div>");
        });
        $("td.barGraph").on("mouseleave", function(){
            $("td.barGraph .barHoverData").remove();
        });



        // Resize Bar Graphp After Window Resize -- Begin
        var resizeId;
        $(window).resize(function() {
            clearTimeout(resizeId);
            resizeId = setTimeout(doneResizing, 500);
        });
        function doneResizing(){
            drawTableBarGraph();
        }

        //$(window).resize(function() {
        //    console.log("size changed");
        //    setTimeout(function() {
        //        drawTableBarGraph();
        //    }, 1000);
        //});

    }
    /************************************************************************************/







    /************************************************************************************/
    // Add count number to Same name evaluation name Start ************************
    if($(".addCountToList li").length > 0){
        $listAry = [];
        $(".addCountToList li").each(function(){
            // console.log($(this).text());
            $(this).attr("data-data",$(this).text());
            $listAry.push($(this).text());
        });
        // console.log($listAry);

        $.extend({
            distinct : function(anArray) {
                var result = [];
                $.each(anArray, function(i,v){
                    if ($.inArray(v, result) == -1) result.push(v);
                });
                return result;
            }
        });
        var tempAry = $.distinct($listAry);
        // console.log(tempAry);

        $.each(tempAry, function(i, val){
            // console.log(val + " : " +$(".addCountToList li[data-data='"+val+"']").length);
            if($(".addCountToList li[data-data='"+val+"']").length > 1){
                $(".addCountToList li[data-data='"+val+"']").each(function(i){
                    var ct = i+1;
                    $(this).text($(this).text()+"("+ct+")");
                });
            }
        });
    }
    // Add count number to Same name evaluation name END ************************
    /************************************************************************************/








    var drawBarChart = function(targetId, $this){
        if(typeof targetId !== "undefined"){
            var showHorizonLine = false;
            var fontSize = "7pt";
            if($this.hasClass("benchMarkBarGraphChart") || $this.hasClass("cpBarchart") || $this.hasClass("cpBrandBarchart") || $this.hasClass("corpBarchart")){
                showHorizonLine = true;
                fontSize = "7pt";
            }

            var $targetObj = $("#"+targetId);
            var barChartLabelTxt = $targetObj.attr("data-label");
            if(typeof barChartLabelTxt === 'undefined' || barChartLabelTxt === '[, , , ]'){
                barChartLabelTxt = '[]';
            }

            var barChartLabel = JSON.parse(barChartLabelTxt);
            $.each(barChartLabel, function(i, value){
                barChartLabel[i] = value.replace("\n","<br/>");
            });

            //var barChartDataTxt = $targetObj.attr("data-data").replace(/ /g,'').replace(/N\/A/g,'null').replace(/&quot;/g,'"');
            var barChartDataTxt = $targetObj.attr("data-data").replace(/ /g,'').replace(/N\/A/g,'0').replace(/null/g,'0').replace(/&quot;/g,'"');


            if(typeof barChartDataTxt === 'undefined' || barChartDataTxt.replace(/,/g, "") === '[]'){
                barChartDataTxt = '[-1]';
            }

            var barChartData = JSON.parse(barChartDataTxt);




            if($this.hasClass("corpBarchart")){
                if(barChartData.length < maxMySelection){
                    for(var i=0; maxMySelection-barChartData.length; i++){
                        barChartLabel.push("");
                        barChartData.push("");
                    }
                }
            }



            var obj = [];
            for(var i=0; i< barChartData.length; i++) {
                if(barChartData[i]){
                    obj.push({
                        evaluation : barChartLabel[i],
                        score : barChartData[i].toString()
                    });
                } else {
                    obj.push({
                        evaluation : barChartLabel[i],
                        score : ""
                    });
                }
            }


            var fillupDefaultColor = function(chartType, colors){
                if(chartType === "benchMark"){
                    for(var i=colors.length; i<100; i=i+2){
                        colors[i] = "#cccccc";
                        colors[i+1] = "#868686";
                    }
                } else {
                    for(var i=colors.length; i<100; i++){
                        colors[i] = "#cccccc";
                    }
                }
                return colors
            }

            var ticks = [ '0','25','50','75','100','105'];
            var colors = ['#55BDCA'];
            var chartType = "";

            if($this.hasClass("cpBarchart")){
                //ticks = [ '0','10','20','30','40','50','60','70','80','90','100','105'];
                colors = ['#55BDCA', '#868686'];
            } else if($this.hasClass("cpBrandBarchart")){
                //ticks = [ '0','10','20','30','40','50','60','70','80','90','100','105'];
                colors = ['#55BDCA'];
            } else if($this.hasClass("benchMarkBarGraphChart")){
                chartType = "benchMark";
                colors = ['#55BDCA', '#cccccc', '#868686'];
            } else if($this.hasClass("corpBarchart")){
                colors = ['#868686'];
            }
            colors = fillupDefaultColor(chartType, colors);


            var tickFormatter = function (format, val) {
                return val+"%";
            }

            function tooltipContentEditor(str, seriesIndex, pointIndex, plot) {
                var label = obj[pointIndex].evaluation;
                return "<b>"+label + "</b><br/>Scores: " + plot.data[seriesIndex][pointIndex]+"%";
            }

            var showHighlighter = false;
            var showPointLabels = true;
            var pointLabelLocation = "n";
            var yPadding = 3;
            if($("#reportApp").length === 0){
                showHighlighter = true;
                showPointLabels = false;
                pointLabelLocation = "s";
                yPadding = 12;
            }


            //$.jqplot(targetId, [barChartData]).destroy();
            $.jqplot(targetId, [barChartData]).destroy();

            var jqBarGraph = $.jqplot(targetId, [barChartData], {
                //title: 'Concern vs. Occurrance',
                animate: true,
                animateReplot: true,
                series:[{renderer: $.jqplot.BarRenderer}],
                seriesColors: colors,
                width: 300,
                height:300,
                seriesDefaults:{
                    renderer:$.jqplot.BarRenderer,
                    shadow: false,
                    pointLabels: {
                        show: showPointLabels,
                        edgeTolerance: -200,
                        location: pointLabelLocation,
                        fontSize: fontSize,
                        formatString: '%s%%',
                        ypadding: yPadding
                    },
                    rendererOptions: {
                        varyBarColor: true
                    }
                },
                axesDefaults: {
                    tickRenderer: $.jqplot.CanvasAxisTickRenderer ,
                    tickOptions: {
                        fontSize: fontSize,
                        formatString: '%s%%'
                    }
                },
                highlighter:{
                    show:showHighlighter,
                    sizeAdjust: 7.5,
                    tooltipLocation: 'n',
                    showMarker: false,
                    tooltipContentEditor:tooltipContentEditor
                },
                grid: {borderColor: '#ffffff', shadow: false, drawBorder: true, background: '#ffffff'},
                axes: {
                    xaxis: {
                        renderer: $.jqplot.CategoryAxisRenderer,
                        ticks:barChartLabel,
                        tickRenderer: $.jqplot.CanvasAxisTickRenderer,
                        tickOptions:{
                            showGridline: false // Hide Vertical Grid Line
                        }
                    },
                    yaxis: {
                        ticks:ticks,
                        tickOptions: {
                            formatter: tickFormatter
                        }
                    }
                },
                canvasOverlay: {
                    show: true,
                    objects: [
                        {
                            horizontalLine: {
                                y: 0,
                                color: "#cccccc",
                                lineWidth: 4,
                                shadow: false,
                                show: true
                            }
                        },
                        {
                            horizontalLine: {
                                y: barChartData[0],
                                color: "#55BDCA",
                                lineWidth: 1,
                                shadow: false,
                                show: showHorizonLine
                            }
                        }
                    ]
                }
            });

            ///////////////////////////////////////////////////

        }
    };



    var drawAllBarCharts = function(){
        $(".barGraphChart").each(function(){
            var targetId   = $(this).attr("id");
            var $this = $(this);
            drawBarChart(targetId,$this);
        });
    };


    var switchTabs = function(){
        var selectedTab = $("#cpHighLowBttn input[name=cpGroup]:checked").val();
        $(".cpTab").hide();
        $("#"+selectedTab).show();
        drawAllBarCharts();
    };





    if($(".barGraphChart").length > 0){

        //This is for Corporate Complete PDF ***********************
        if($("#cpCompletePDF").length > 0){
            $(".barGraphChart").each(function(index){
                $(this).attr("id", $(this).attr("id")+"_"+index);
                //console.log("<h1>added id:"+index+"</h1>");
            });
        }


        drawAllBarCharts();

        if($("#cpHighLowBttn").length > 0){
            $("#cpHighLowBttn input").on("click", function(){
                switchTabs();
            });
            switchTabs();
        }

        $(window).resize(function() {
            drawAllBarCharts();
        });
    };











    /**************** Line Chart ********************************************************************/
    if($(".lineGraphChart").length > 0 || $(".eeColors").length > 0){

        var checkData = function (data) {
            var sum = 0;
            for (var i = 0; i < data.length; i++) {
                sum += data[i][1];
            }
            if (sum === 0) {
                data = [[null]];
            }
            return data;
        }

        var updateYTDCheckBox = function (data, $obj) {
            if ($obj.length > 0) {
                if (data[0][0]) {
                    $obj.removeClass("disabled");
                    $obj.find(".fui-check").addClass("checked");
                }
                else {
                    $obj.addClass("disabled");
                    $obj.find(".fui-check").removeClass("checked");
                }
            }
        }




        var yTicks   = [ '-5', '0','25','50','75','100','105'];
        var colors   = ['#159FEB', '#850086', '#cccccc', '#cccccc', '#cccccc', '#cccccc', '#cccccc', '#cccccc', '#cccccc', '#cccccc']; // Line Graph Color

        /*
        var colorsH  = ['#BD0000', '#FB5000', '#7CC600', '#295500']; // Legend & Line Color
        var colorBg  = ['#fd817a', '#eba77a', '#bfe37d', '#88d08f']; // Range Background Color
        var colorsH1 = ['#AF000B', '#F1803C','#FDB11D','#11B600']; // Legend & Line Color
        var colorBg1 = ['#AF000B', '#F1803C','#FDB11D','#11B600']; // Range Background Color
        var colorsH2 = ['#AF000B','#F1803C','#FDB11D','#11B600','#8AD800']; // Legend & Line Color
        var colorBg2 = ['#AF000B','#F1803C','#FDB11D','#11B600','#8AD800']; // Range Background Color
        */
        //var colorsH  = ['#AF000B','#F1803C','#FDB11D','#11B600']; // Legend & Line Color
        var colorsH  = ['#FB0016', '#D8551E', '#84CA42', '#16A541']; // Legend & Line Color
        var colorBg  = ['#fd817a', '#eba77a', '#bfe37d', '#88d08f']; // Range Background Color

        var colorsH2 = ['#AF000B','#F1803C','#FDB11D','#8AD800','#428642']; // Legend & Line Color
        var colorBg2 = ['#c85150','#f6a974','#fecb4f','#ace54f','#4baa4b']; // Range Background Color

        var tooltipFormatString = ["MOST NEGATIVE","SOMEWHAT NEGATIVE","SOMEWHAT POSITIVE","MOST POSITIVE" ];
        var fontSize = "10pt";



        // ************ Emotional Engagement Report Text ************ //
        if($(".eeColors").length > 0){
            $(".eeColors").each(function(){
                var $this = $(this);
                if($this.hasClass("eeType2015")){
                    colorsH = colorsH2; // Legend & Line Color
                    colorBg = colorBg2; // Range Background Color
                }

                var tempHtml = "";
                $.each(colorsH, function(i){
                    var idx = i+1;
                    tempHtml += '<span class="eeBox ee'+idx+'" style="background:'+colorsH[i]+'">&nbsp;</span>';
                    $(".dataTable .ee"+idx).css("background",colorsH[i]);
                });
                $this.find(".chartText.negative").after(tempHtml);
            });
        }




        // ************ eeTable Color background ************ //
        $(".colorBgTable").each(function(){
            var $this = $(this);
            if($this.hasClass("eeType2015")){
                colorsH = colorsH2; // Legend & Line Color
                colorBg = colorBg2; // Range Background Color
            }

            $.each(colorsH, function(i){
                var idx = i+1;
                $this.find(".ee"+idx).css("background",colorsH[i]);
            })
        });


        // ************ Line Graph Start ************ //
        $(".lineGraphChart").each(function(){
            var $this = $(this);
            var targetId   = $(this).attr("data-targetId");

            if($this.hasClass("eeType2015")){
                colorsH = colorsH2; // Legend & Line Color
                colorBg = colorBg2; // Range Background Color
                tooltipFormatString = ["MOST NEGATIVE","SOMEWHAT NEGATIVE","NEUTRAL", "POSITIVE","MOST POSITIVE" ];
            }

            // ************ Legend Colors ************ //
            var $chartKey = $this.find(".chart-key");
            if($chartKey.find("li").length === 0){
                var tempHtml = "<li>";
                $.each(colorsH, function(i){
                    tempHtml += '<span class="keyLineColor'+i+'" style="background:'+colorsH[i]+'">&nbsp;</span>'+tooltipFormatString[i].replace(' ','&nbsp;')+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
                })
                tempHtml += "</li>";
                $chartKey.append(tempHtml);
            }







            var tickFormatter = function (format, val) {
                return val+"%";
            }
            var getChartData = function ($obj, attr){
                var lineCharTxt = $obj.attr(attr);
                if(typeof lineCharTxt === 'undefined' || lineCharTxt === '[, , , ]' || lineCharTxt === ''){lineCharTxt = '[["",0]]';}
                return checkData($.parseJSON(lineCharTxt));
            }

            var line11 = getChartData($this, "data-data-01");
            var line12 = getChartData($this, "data-data-02");
            var line13 = getChartData($this, "data-data-03");

            updateYTDCheckBox(line11, $("#ytdCheckLeft  .legendServiceCheckbox"));
            updateYTDCheckBox(line12, $("#ytdCheckRight .legendServiceCheckbox"));

            // ************ Overlay : MOST POSITIVE / SOMEWHAT POSITIVE / SOMEWHAT NEGATIVE / MOST NEGATIVE ************ //
            var overlayOptions = [];
            var lineChartLineData = getChartData($this, "data-lines");
            var areaSize = lineChartLineData.length;
            var minY = yTicks[0];
            var maxY = yTicks[yTicks.length-1];
            var drawBgBlock = true;

            if(areaSize === 1 && lineChartLineData[0][0] === null){
                drawBgBlock = false;
            }

            var showHorizonGrid = true;
            var borderColor = "#ffffff";
            var overlayOptionsArea = [];
            if(drawBgBlock){
                for(var i=0; i <= areaSize; i++){
                    showHorizonGrid = false;
                    var yMinVal = minY;
                    var yMaxVal = lineChartLineData[i];

                    if(i > 0 )      { yMinVal = lineChartLineData[i-1]; }
                    if(i === areaSize){ yMaxVal = maxY; }
                    //console.log(i+" - yMinVal :"+yMinVal + " : "+yMaxVal);

                    overlayOptionsArea.push({
                        "rectangle" : {
                            ymin: yMinVal, ymax: yMaxVal, color: colorBg[i], tooltipFormatString: tooltipFormatString[i], xminOffset: "0px", xmaxOffset: "0px", yminOffset: "0px", ymaxOffset: "0px", showTooltip: true, tooltipLocation:"e"
                        }
                    });
                    overlayOptions = overlayOptionsArea;
                    borderColor = "#eeeeee";
                    colors[0]   = "#3D3D3D";
                }
            } else{
                showHorizonGrid = true;
            }



            var showPointLabels = false;



            // ****************************************************************************
            // settings for eeTimeline Chart
            // ****************************************************************************
            var seriseData = [];
            var textAngle = -45;
            var preText = "";
            var postText = "";

            if($this.hasClass("eeTimeLineChart")){
                textAngle = -45;

                var getPrePostStateText = function(pVal){
                    var sizeData = tooltipFormatString.length -1;
                    var pText = "";
                    var rangeVal1 = parseInt(lineChartLineData[0]);
                    var rangeVal2 = parseInt(lineChartLineData[lineChartLineData.length -1]);

                    if(pVal <= rangeVal1){
                        pText = tooltipFormatString[0];
                    }
                    if(pVal > rangeVal2){
                        pText = tooltipFormatString[sizeData];
                    }
                    if(pText === ""){
                        for(var i=1; i<sizeData; i++){
                            if(pVal > parseInt(lineChartLineData[i-1]) && pVal <= parseInt(lineChartLineData[i])){
                                pText = tooltipFormatString[i];
                            }
                        }
                    }
                    return pText;
                }


                var preVal  = 0;
                var postVal = 0;
                if(line13[0][0] !== null){
                    preVal  = parseInt(line13[0][1]);
                    postVal = parseInt(line13[1][1]);
                }

                var preText = getPrePostStateText(preVal)+"<br/><br/><div class='prePostHoverText'>"+$(this).attr("data-pretext")+"</div>";
                var postText = getPrePostStateText(postVal)+"<br/><br/><div class='prePostHoverText'>"+$(this).attr("data-posttext")+"</div>";

                var breakonNullValue = false;
                if($("#reportApp").length > 0){
                    breakonNullValue = true;
                    $.each(line12, function(idx, item){
                        if(item[[1]] === "null"){
                            item[[1]] = null;
                        }
                    });
                }
                seriseData = [{},
                    {
                        renderer: $.jqplot.LineRenderer,
                        //renderer: $.jqplot.BarRenderer,
                        color: '#2E2E2E',
                        breakOnNull: breakonNullValue,
                        rendererOptions: {
                            barPadding: -30,
                            barWidth: 30,
                            varyBarColor: false
                        }
                    },
                    {
                        renderer: $.jqplot.LineRenderer,
                        color: '#ffffff',
                        //lineWidth:0.0001,
                        lineWidth:1,
                        markerOptions: {
                            style:"filledSquare", size:10
                        },
                        sdata:["a","b"]
                    }];
            }
            // ****************************************************************************




            $.jqplot.config.enablePlugins = true;
            var plot1= $.jqplot(targetId, [line11, line12, line13], {
                title: '',
                animate: true,
                animateReplot: true,
                series: seriseData,
                seriesDefaults: {
                    shadow: false,
                    lineWidth: 1,
                    pointLabels: {
                        show: showPointLabels, // Point Value Show
                        howMarker: false,
                        location:'s',
                        fontSize: "30pt",
                        ypadding: 12
                    },
                    rendererOptions: {
                        smooth: false,
                        varyBarColor: true
                    },
                    markerRenderer: $.jqplot.MarkerRenderer,    // renderer to use to draw the data
                    // point markers.
                    markerOptions: {
                        show: true,             // wether to show data point markers.
                        style: 'filledCircle',  // circle, diamond, square, filledCircle.
                        size: 10                // size (diameter, edge length, etc.) of the marker.
                    }
                },



                highlighter: {
                    tooltipContentEditor: function (str, seriesIndex, pointIndex) {
                        /*
                        console.log(plot1.options.axes.yaxis);
                        console.log(plot1.axes.yaxis);
                        console.log(plot1.axes);
                        console.log(plot1);
                        console.log(plot1.data[1][pointIndex][0]);
                        console.log(plot1.series[2]);
                        */
                        var xLabel = plot1.data[seriesIndex][pointIndex][0];
                        if(seriesIndex === 2 && pointIndex === 0 && preText !==""){
                            return "<center>"+xLabel + "<br/><b>" + preText + "</b></center>";
                        }
                        else if(seriesIndex === 2 && pointIndex === 1 && postText !==""){
                            return "<center>"+xLabel + "<br/><b>" + postText + "</b></center>";
                        } else {
                            return "<center>"+xLabel + "<br/>" + str + "</center>";
                        }
                    },
                    show: true,
                    sizeAdjust: 7.5,
                    tooltipLocation: 'n',
                    useAxesFormatters: true,
                    tooltipAxes: 'y',
                    showMarker: false
                },

                legend: { show: false },
                axesDefaults: {
                    tickRenderer: $.jqplot.CanvasAxisTickRenderer ,
                    drawBaseline: false,
                    tickOptions: {
                        fontSize: fontSize
                    }
                },
                axes: {
                    xaxis: {
                        renderer: $.jqplot.CategoryAxisRenderer,
                        tickRenderer: $.jqplot.CanvasAxisTickRenderer,
                        tickOptions:{
                            angle: textAngle,
                            showGridline: false // Hide Vertical Grid Line
                        }
                    },
                    yaxis: {
                        ticks: yTicks,
                        /*
                        // for Dynamic yaxis upon Data
                        ticks: [],
                        min: minData,
                        max: maxData,
                         */
                        tickOptions: {
                            formatter: tickFormatter,
                            showGridline: showHorizonGrid // Hide Horizontal Grid Line
                        }
                    }
                },
                seriesColors: colors,
                grid: {borderColor: borderColor, shadow: false, drawBorder: true, background: '#ffffff'},

                canvasOverlay: {
                    show: true,
                    objects: overlayOptions
                }
            });



            // Resize Line Graphp After Window Resize -- Begin
            $(window).resize(function() {
                plot1.replot( { resetAxes: true } );
            });


            // YTD Line Graph using Dropdown and onload
            if($("#ytdSectionFacility").length > 0 || $("#ytdOverall").length > 0) {
                $(".legendService").css("background", colors[0]);
                $(".legendFacility").css("background", colors[1]);
                $(".legendServiceCheckbox").on("click", function () {
                    if ($(this).hasClass("disabled")) {
                        return
                    }

                    var index = $(this).attr("data-idx");
                    var graphObj = plot1;
                    graphObj.series[index].show = !graphObj.series[index].show;
                    graphObj['animateReplot'] = false;
                    graphObj.redraw();
                    if (graphObj.series[index].show) {
                        $(this).find(".fui-check").removeClass("checked").addClass("checked");
                    } else {
                        $(this).find(".fui-check").removeClass("checked");
                    }
                });
            }

            if($("#ytdSectionFacility").length > 0){
                var reDrawLineChart = function($obj){
                    var data1txt = $obj.find("option:selected").attr("data-data-01");
                    var data2txt = $obj.find("option:selected").attr("data-data-02");

                    if(typeof data1txt === 'undefined' || data1txt === '[, , , ]' || data1txt === ''){ data1txt = '[]';}
                    var data1data = $.parseJSON(data1txt);

                    if(typeof data2txt === 'undefined' || data2txt === '[, , , ]' || data2txt === ''){ data2txt = '[]';}
                    var data2data = $.parseJSON(data2txt);

                    data1data = checkData(data1data);
                    data2data = checkData(data2data);

                    updateYTDCheckBox(data1data, $("#ytdCheckLeft  .legendServiceCheckbox"));
                    updateYTDCheckBox(data2data, $("#ytdCheckRight .legendServiceCheckbox"));

                    var newDataSet = [data1data, data2data];
                    plot1.replot({data:newDataSet});

                }

                var updateYTDPopupLinks = function(){
                    var $select = $("#ytdDropDown select");
                    var selectedId = $("option:selected").attr("data-data-03");
                    var evalId = $select.attr("data-evalId");
                    var selectedName = $("option:selected").text();
                    var ytdType = $.urlParam('type');
                    if(ytdType === 'SECTIONS'){
                        selectedId = '&sectionId='+selectedId;
                    }
                    if(ytdType === 'CLASSIFICATIONS'){
                        selectedId = '&classificationId='+selectedId;
                    }
                    var linkHtml = '/report/generatePDFReport/'+evalId+'?templateName=yearToDate&type='+ytdType+'&stream=true'+selectedId;
                    if ($("#ytdSectionFacility.eeYTDSection").length > 0) {
                        var linkHtml = '/report/generatePDFReport/' + evalId + '?templateName=eeYearToDate&type=' + ytdType + '&stream=true' + selectedId;
                    }

                    //console.log("linkHtml :" + linkHtml);

                    $("#pdfLinks .pdfLinkContent .selectedYTDSectionName").text(selectedName);
                    $("#pdfLinks .pdfLinkContent a.selectedYTDSectionLink").attr("href",linkHtml);
                }
                updateYTDPopupLinks();

                $("#ytdDropDown select").on("change", function(){
                    reDrawLineChart($(this));
                    updateYTDPopupLinks();
                });
                reDrawLineChart($("#ytdDropDown select"));
            }


        });
    };







    /************************************************************************************/
    /************************************************************************************/
    var dtTable = function($obj){
        var aoColumns = [];
        var columns = [];

        // data-pagination : True, data-search : show, data-maxct : 100
        var showSearch = false, maxCt = 100000, sDom = '<"H"f>rt';
        if($obj.attr("data-search") === "show"){ showSearch = true; }
        if(typeof $obj.attr("data-pagination") !== "undefined"){  if($obj.attr("data-pagination").toLowerCase() === "true"){ sDom = '<"H"f>prt'; }  }
        if(typeof $obj.attr("data-maxct") !== "undefined" && $obj.attr("data-maxct") !== ""){ maxCt = parseInt($obj.attr("data-maxct")); }

        $obj.find("tr:nth-child(1) th").each(function(){
            var sType = $(this).attr("data-stype");
            if(typeof sType === "undefined" || sType === ""){
                aoColumns.push( null );
            } else {
                aoColumns.push( { 'sType': sType } );
            }
            //console.log("sType :"+sType);
        });

        var oTable9 = $($obj).dataTable({
            "sPaginationType": "full_numbers",
            aoColumnDefs: [
                {
                    bSortable: false,
                    aTargets: []
                }
            ],
            "aoColumns": aoColumns,
            "aaSorting": [],
            "sDom": sDom,
            "bFilter": showSearch,
            "bInfo": false,
            "iDisplayLength": maxCt
        });
    }
    /************************************************************************************/
    /************************************************************************************/



    if($("#reportApp").length === 0 && $(".fhsDTable").length > 0){
        $(".fhsDTable").each(function(){
            var targetId = $(this).attr("id");
            //console.log("targetId :"+targetId);
            dtTable($("#"+targetId));
        });
        //dtTable($("#serviceTable"));
        //dtTable($("#facilityTable"));
        //dtTable($("#eeSectionsScoreTable"));
        //dtTable($("#eeSectionsPointValueTable"));
    }


    // Split eeYTD Tables for many evaluations
    if ($("#reportApp").length > 0 && $(".fhsDTable").length > 0) {
        $(".fhsDTable").each(function () {

            var $baseTable = $(this);
            var maxTd = parseInt($baseTable.attr("data-maxColumn"));
            var tdCount = $baseTable.find("tr:nth-child(1) td").length;
            var lastTableColumns = tdCount % maxTd;

            //console.log("tdCount: " + tdCount);
            //console.log("maxTd: " + maxTd);
            //console.log("lastTableColumns: " + lastTableColumns);

            if (tdCount > maxTd) {
                var cloneTableCount = Math.floor(tdCount / maxTd) - 1;
                //console.log("cloneTableCount: " + cloneTableCount);
                if (cloneTableCount === 0) {
                    cloneTableCount = 1;
                }
                //console.log("cloneTableCount: " + cloneTableCount);

                for (var i = 1; i <= cloneTableCount; i++) {
                    var $clonedtable = $baseTable.clone();
                    $clonedtable.find("td, th").hide();

                    var cFrom = maxTd * i + 1;
                    var cTo = cFrom + maxTd;
                    //console.log("cFrom: "+cFrom+" cTo: "+cTo);

                    for (var j = cFrom; j <= cTo; j++) {
                        $clonedtable.find("td:nth-child(" + j + "), th:nth-child(" + j + ")").show();
                    }
                    //$clonedtable.find("td:nth-child(1), th:nth-child(1)").show();

                    if (i === cloneTableCount && lastTableColumns <= maxTd / 2 && lastTableColumns > 0) {
                        $clonedtable.addClass("autoTable");
                    }

                    $clonedtable.appendTo($baseTable.parent());
                }

                $baseTable.find("td, th").hide();
                for (var j = 0; j <= maxTd; j++) {
                    $baseTable.find("td:nth-child(" + j + "), th:nth-child(" + j + ")").show();
                }
            }
        });
    }


    var currentUrl  = window.location.href;     // Returns full URL
    var isDashboard = currentUrl.toLowerCase().indexOf("/dashboard");
    if(isDashboard > 0 && $.urlParam('plaqueSubmitted') === "true"){
        var modalId = "myModal";
        var modalTitle = "Plaque Request Submitted";
        var modalContent ="<p>Thank you! <br/>Your plaque request has been submitted.<br/><br/>You will receive a confirmation email shortly from <br/>notification@reports.forbestravelguide.com.<br/><br/>When you close this message, you will be redirected to the<br/>Forbes Travel Guide Brand Store, <br/>where you can find custom-label bottled water, crystal stars, flags and much more.</p>";
        var noTxt = "";
        var yesTxt = "CLOSE";
        fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){
            var newHref=currentUrl.replace(/&?((plaqueSubmitted))=[^&]*/gi, "");
            history.pushState(null, null, newHref);
            window.open(
                'https://store.forbestravelguide.com/',
                '_blank' // <- This is what makes it open in a new window.
            );
        });
    }


    if($("#cpListOpenCloseWrap").length > 0){
        var slideUpDown = function (sdStatus) {
            if (sdStatus == "close") {
                $("#cpSlideListDiv").slideUp(function () {
                    $("#cpSlideHeader").removeClass("bdrBottom");
                    $("#cpListOpenCloseTxt").text("Open List");
                    $("#cpListOpenClose").text("+");
                });
            };
            if (sdStatus == "open") {
                $("#cpSlideHeader").addClass("bdrBottom");
                $("#cpSlideListDiv").slideDown(function () {
                    $("#cpListOpenCloseTxt").text("Close List");
                    $("#cpListOpenClose").text("-");
                });
            };
        }
        $("#cpListOpenCloseWrap").unbind('click').bind('click', function (event) {
            if ($("#cpSlideListDiv").is(':visible')) {
                slideUpDown("close");
            } else {
                slideUpDown("open");
            }
        });
        if ($("#cpListOpenCloseWrap").hasClass("initClose")) {
            slideUpDown("close");
        };
        if ($("#cpListOpenCloseWrap").hasClass("initOpen")) {
            slideUpDown("open");
        };
    }

    $("#announceBarClose").on("click", function(){
        $("#announceBar").hide();
        $.cookies.set("announceBar", "hidden");
    });
    var announceBarCookie = $.cookies.get("announceBar");
    if( typeof announceBarCookie === "undefined" || announceBarCookie === null || announceBarCookie === "" ){
        $.cookies.set("announceBar", "shown");
        $.cookies.setOptions({expiresAt: null});
    } else{
        if(announceBarCookie === "shown"){
            $("#announceBar").show();
            $.cookies.set("announceBar", "shown");
        }
        if(announceBarCookie === "hidden"){
            $("#announceBar").hide();
        }
    }


    if($("#eeColorChartHelpButton").length > 0){
        $("#eeColorChartHelpButton").click(function(e) {
            e.preventDefault();
            var modalId = "myModal";
            //var modalTitle = "Emotional Engagement Scale " + $(this).attr("data-eeType").replace("eeType", "");
            var modalTitle = "Emotional Engagement Scale ";
            var modalContent = $($(this).attr("data-helpContent")).html();
            var noTxt = "";
            var yesTxt = "CLOSE";
            e.stopImmediatePropagation();
            fhsAlert(modalId,modalTitle, modalContent, noTxt, yesTxt, function(result){
            });
        });
    }


    $(document).on("click",".getMySelectionToPDF", function(e){
        var alink = $(this).attr("href");
        if($(".mySelectionTable input.mySelectionChkBx:checked:enabled").length > 0){
            if($("#cpOverallMy .barGraphChart").length === 3){
                var mySelectionDataLabel1 = $("#cpBarchart7").attr("data-label").replace(/ /g,'').replace(/&/g,' %26 ');
                var mySelectionDataValue1 = $("#cpBarchart7").attr("data-data").replace(/ /g,'').replace(/N\/A/g,'null');

                var mySelectionDataLabel2 = $("#cpBarchart8").attr("data-label").replace(/ /g,'').replace(/&/g,' %26 ');
                var mySelectionDataValue2 = $("#cpBarchart8").attr("data-data").replace(/ /g,'').replace(/N\/A/g,'null');

                var mySelectionDataLabel3 = $("#cpBarchart9").attr("data-label").replace(/ /g,'').replace(/&/g,' %26 ');
                var mySelectionDataValue3 = $("#cpBarchart9").attr("data-data").replace(/ /g,'').replace(/N\/A/g,'null');

                alink += '&label5='+mySelectionDataLabel1+'&data5='+mySelectionDataValue1+'&label6='+mySelectionDataLabel2+'&data6='+mySelectionDataValue2+'&label7='+mySelectionDataLabel3+'&data7='+mySelectionDataValue3;
            }
            if($("#cpOverallMy .barGraphChart").length === 2){
                var mySelectionDataLabel1 = $("#cpBarchart5").attr("data-label").replace(/ /g,'').replace(/&/g,' %26 ');
                var mySelectionDataValue1 = $("#cpBarchart5").attr("data-data").replace(/ /g,'').replace(/N\/A/g,'null');

                var mySelectionDataLabel2 = $("#cpBarchart6").attr("data-label").replace(/ /g,'').replace(/&/g,' %26 ');
                var mySelectionDataValue2 = $("#cpBarchart6").attr("data-data").replace(/ /g,'').replace(/N\/A/g,'null');
                alink += '&label5='+mySelectionDataLabel1+'&data5='+mySelectionDataValue1+'&label6='+mySelectionDataLabel2+'&data6='+mySelectionDataValue2;
            }
            if($("#cpOverallMy .barGraphChart").length === 1){
                var mySelectionDataLabel1 = $("#cpBarchart3").attr("data-label").replace(/ /g,'').replace(/&/g,' %26 ');
                var mySelectionDataValue1 = $("#cpBarchart3").attr("data-data").replace(/ /g,'').replace(/N\/A/g,'null');
                alink += '&label5='+mySelectionDataLabel1+'&data5='+mySelectionDataValue1;
            }
            //console.log(alink);
        }
        window.location = alink;
        return false;
    });


    //$('[data-toggle="tooltip"]').tooltip({});
    if($(".iframe").length > 0) {
        $(".iframe").colorbox({iframe: true, width: "700px;", height: "700px"});
    }

});