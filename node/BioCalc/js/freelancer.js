(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 70)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Scroll to top button appear
  $(document).scroll(function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 80
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Modal popup$(function () {
  $('.portfolio-item').magnificPopup({
    type: 'inline',
    preloader: false,
    focus: '#username',
    modal: true
  });
  $(document).on('click', '.portfolio-modal-dismiss', function(e) {
    e.preventDefault();
    $.magnificPopup.close();
  });

  // Floating label headings for the contact form
  $(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
      $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
      $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
      $(this).removeClass("floating-label-form-group-with-focus");
    });
  });












  var weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];  

  // Get Astrology Data
  var getAstrologyData = function(selectedDate, dateText){
    var atrologyData = {};
    var dobDay = weekDays[selectedDate.getDay()];
    var bm = selectedDate.getMonth()+1;
    var bd = selectedDate.getDate();
    var by = selectedDate.getFullYear();
    var s = 1901,cSign,aSign;
    if(bm==1&&bd>=20||bm==2&&bd<=18){aSign="Aquarius";}if(bm==1&&bd>31){aSign="Huh?";}if(bm==2&&bd>=19||bm==3&&bd<=20){aSign="Pisces";}if(bm==2&&bd>29){aSign="Huh?";}if(bm==3&&bd>=21||bm==4&&bd<=19){aSign="Aries";}if(bm==3&&bd>31){aSign="Huh?";}if(bm==4&&bd>=20||bm==5&&bd<=20){aSign="Taurus";}if(bm==4&&bd>30){aSign="Huh?";}if(bm==5&&bd>=21||bm==6&&bd<=21){aSign="Gemini";}if(bm==5&&bd>31){aSign="Huh?";}if(bm==6&&bd>=22||bm==7&&bd<=22){aSign="Cancer";}if(bm==6&&bd>30){aSign="Huh?";}if(bm==7&&bd>=23||bm==8&&bd<=22){aSign="Leo";}if(bm==7&&bd>31){aSign="Huh?";}if(bm==8&&bd>=23||bm==9&&bd<=22){aSign="Virgo";}if(bm==8&&bd>31){aSign="Huh?";}if(bm==9&&bd>=23||bm==10&&bd<=22){aSign="Libra";}if(bm==9&&bd>30){aSign="Huh?";}if(bm==10&&bd>=23||bm==11&&bd<=21){aSign="Scorpio";}if(bm==10&&bd>31){aSign="Huh?";}if(bm==11&&bd>=22||bm==12&&bd<=21){aSign="Sagittarius";}if(bm==11&&bd>30){aSign="Huh?";}if(bm==12&&bd>=22||bm==1&&bd<=19){aSign="Capricorn";}if(bm==12&&bd>31){aSign="Huh?";}var x=0;x=(s-by)%12;if(x==1||x==-11){cSign="Rat";}if(x==0){cSign="Ox";}if(x==11||x==-1){cSign="Tiger";}if(x==10||x==-2){cSign="Rabbit";}if(x==9||x==-3){cSign="Dragon";}if(x==8||x==-4){cSign="Snake";}if(x==7||x==-5){cSign="Horse";}if(x==6||x==-6){cSign="Sheep";}if(x==5||x==-7){cSign="Monkey";}if(x==4||x==-8){cSign="Cock";}if(x==3||x==-9){cSign="Dog";}if(x==2||x==-10){cSign="Boar";};
    return "<i>Born on </i><b>"+dobDay+"</b><br/><i>Sun Sign: </i><b>"+aSign+"</b><i></br> Chinese Sign: </i><b>"+cSign+"</b><br />";
  }


  // Pick Date
  $("input.pickDOB").bind('keydown', function (e) {
    if (e.which == 13) {
      $(document).find('.ui-state-default.ui-state-active').trigger("click");
    }
  }); 
  $(document).on("click", ".ui-datepicker-close", function(){
    $(document).find('.ui-state-default.ui-state-active').trigger("click");
  });

  var datepickerOptions = {
    yearRange: "-100:+0",
    changeMonth:true, 
    changeYear:true, 
    dateFormat:"mm-dd-yy", 
    onSelect: function(dateText){
      var selectedDate = $(this).datepicker('getDate');
      var infoHtml = getAstrologyData(selectedDate, dateText);
      $($(this).attr('data-infoBox')).find('.infoText').html(infoHtml);
      processData();
    },
    showButtonPanel:true
  };
  $(".pickDOB").datepicker(datepickerOptions);




  var processData = function(){
    $(".pickDOB").each(function(){
      var today = new Date();
      var $this = $(this);
      var pickedDate = $this.datepicker('getDate');
      if(pickedDate){
        var dobY = pickedDate.getFullYear();
        var dobM = pickedDate.getMonth()+1;
        var dobD = pickedDate.getDate();
  
        var bdd = new Date(dobY, dobM-1, dobD);
        var od = 1000*60*60*24;
        var dsb = Math.ceil((today.getTime()-bdd.getTime())/(od))-1;
        var nd = 24;
  
        var wp = new Array();
        var we = new Array();
        var wi = new Array();
        var dy = new Array();
  
        var result = [];
  
        // Today Biorhythm
        var todayP = Math.sin(2*Math.PI*(dsb)/23)*100;
        var todayE = Math.sin(2*Math.PI*(dsb)/28)*100;
        var todayI = Math.sin(2*Math.PI*(dsb)/33)*100;
        console.log("P: "+todayP , "E: "+todayE , "I: "+todayI);
      
      
        for(var i = 0; i < nd; i++){
          wp.push([i+1, Math.sin(2*Math.PI*(dsb+i)/23)*100]);
          we.push([i+1, Math.sin(2*Math.PI*(dsb+i)/28)*100]);
          wi.push([i+1, Math.sin(2*Math.PI*(dsb+i)/33)*100]);
      
          dy.push([i+1, today.getDate()]);
  
          result.push({
              fullDate: today.getMonth()+1+"-"+today.getDate()+"-"+today.getFullYear(),
              year: today.getFullYear(),
              month: today.getMonth(),
              date: today.getDate(),
              day: weekDays[today.getDay()],
              physical: (Math.sin(2*Math.PI*(dsb+i)/23)*100).toFixed(2),
              emotional: (Math.sin(2*Math.PI*(dsb+i)/28)*100).toFixed(2),
              intellectual: (Math.sin(2*Math.PI*(dsb+i)/33)*100).toFixed(2)
          });
          today.setTime(today.getTime() + 86400000);
        }
        // console.log(result);
  
        var $infoBoxObj = $($this.attr('data-infoBox'));
  
        // Draw Chart
        // var $chart = $infoBoxObj.find('.chart');
        // $.plot($chart, [ { data: wp}, { data: we}, { data: wi} ], { series: { lines: { show: true } }, xaxis: { ticks: dy }, yaxis: { ticks: 10, min: -110, max: 110 }, grid: { backgroundColor: { colors: ["#fff", "#eee"] }}});
  
  
        var maxP = Math.max.apply(Math,result.map(function(o){return o.physical;}));
        var maxE = Math.max.apply(Math,result.map(function(o){return o.emotional;}));
        var maxI = Math.max.apply(Math,result.map(function(o){return o.intellectual;}));
        console.log(maxP, maxE, maxI);
  
        var maxP_result = $.grep(result, function(n) { return n.physical == maxP; });
        var maxE_result = $.grep(result, function(n) { return n.emotional == maxE; });
        var maxI_result = $.grep(result, function(n) { return n.intellectual == maxI; });
        
        console.log(maxP_result, maxE_result, maxI_result);
        // var infoTextHtml  = '<div>Best Physical Date: '+maxP_result[0].fullDate+' ('+maxP_result[0].physical+')</div>'
        //                   + '<div>Best Emotional Date: '+maxE_result[0].fullDate+' ('+maxE_result[0].emotional+')</div>'
        //                   + '<div>Best Intellectual Date: '+maxI_result[0].fullDate+' ('+maxI_result[0].intellectual+')</div>';
        // var $infoText = $infoBoxObj.find('.infoText');
        // $infoText.append(infoTextHtml);
  
        var updateResult = function(block, result){
          $infoBoxObj.find('.resulWrap '+block+'.resultE .year').html(result.year);
          $infoBoxObj.find('.resulWrap '+block+' .month').html(result.month);
          $infoBoxObj.find('.resulWrap '+block+' .date').html(result.date);
          $infoBoxObj.find('.resulWrap '+block+' .year').html(result.year);
          $infoBoxObj.find('.resulWrap '+block+' .day').html(result.day);
          $infoBoxObj.find('.resulWrap '+block+' .fulldate').html(result.fullDate + ' ( ' + result.day+' )');
        };
        updateResult('.resultE', maxE_result[0]);
        updateResult('.resultP', maxP_result[0]);
        updateResult('.resultI', maxI_result[0]);
      };
    });
  };

  $("#showResultBtn").on("click", function(){
    processData();
  });


  $(".pickDOB").each(function(){
    var pickedDate = $(this).datepicker('getDate');
    console.log(pickedDate);
    if(pickedDate){
      processData();
    }
  });







})(jQuery); // End of use strict
