<g:set var="cacheBust" value="${new Date().time}"/>

<g:set var="asset" value="/static"/>
<g:if test="${request.serverName == 'localhost'}">
    <g:set var="asset" value=""/>
</g:if>

<!doctype html>
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml"><!--<![endif]-->
<head>
    <title><g:message code="site.name"/></title>

    <meta charset="utf-8">
    <meta http-equiv="pragma" content="no-cache" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="description" content="Learn how the global leader in hospitality ratings can help your hotel, restaurant or spa deliver exceptional guest experiences.">
    <meta name="google-site-verification" content="iWkuR4i47T9HJ4Ucthpm1qZ1bnnJdt4IgwRb7nftpJQ" />
    <meta name="viewport" content="width=device-width, initial-scale=1.02, user-scalable=no" />

    <link rel="shortcut icon" href="${resource(plugin: 'fhs-shared', dir: 'images', file: 'favicon.ico')}" type="image/x-icon">
    <link rel="stylesheet" href="${resource(plugin: 'Internal-App', dir: 'css'+asset, file: 'style.css')}?v=${cacheBust}">
    <link rel="stylesheet" href="${resource(plugin: 'Internal-App', dir: 'css'+asset, file: 'mobile.css')}?v=${cacheBust}">

    <!--[if IE 8]>
    <link rel="stylesheet" href="${resource(plugin: 'Internal-App', dir: 'css'+asset, file: 'ie8.css')}">
    <![endif]-->


    <script type="text/javascript" src="${resource(plugin: 'Internal-App', dir: 'js'+asset, file: 'jquery.1.9.1.min.js')}"></script>
    <script type="text/javascript" src="${resource(plugin: 'Internal-App', dir: 'js'+asset, file: 'script.js')}?v=${cacheBust}"></script>
    <script src="${resource(plugin: 'fhs-shared', dir: 'js/plugins', file: 'jquery.cookies.2.2.0.min.js')}"></script>
    <script src="${resource(plugin: 'fhs-shared', dir: 'js/plugins', file: 'jquery.cookie.js')}"></script>

    <script src="${resource(plugin: 'fhs-shared', dir: 'js/plugins/colorbox', file: 'jquery.colorbox-min.js')}"></script>
    <link rel="stylesheet" href="${resource(plugin: 'fhs-shared', dir: 'js/plugins/colorbox/css', file: 'colorbox.css')}">

    <script src="${resource(plugin: 'fhs-shared', dir: 'js'+asset, file: 'googleAnalytics.js')}"></script>
    <script src="${resource(plugin: 'fhs-shared', dir: 'js'+asset, file: 'login.js')}?v=${cacheBust}"></script>


    <link href='http://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext' rel='stylesheet' type='text/css'>
    <link href="https://fonts.googleapis.com/css?family=Lato:300,400|Roboto+Slab" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Lato:300,400|Roboto+Mono|Roboto+Slab" rel="stylesheet">
</head>

<body class="home">

<header id="header">
    <g:render template="/common/no-javascript" plugin="fhs-shared"/>
    <g:render template="loginForm"/>


    <div id="headerContentWrap">
        <div class="container">
            <div id="slideDnBtn" class="slideBtn">PARTNER Log in</div>
            <div id="headerMain">
                <p class="ftgLogo"><a href=""><img src="${resource(plugin: 'Internal-App', dir: 'images', file: 'ftg-logo.jpg')}" alt="<g:message code="site.name"/>"></a></p>
                <ul class="mainNav">
                    <li class="active"><a href="./index.html" data-href="#top" id="navMain">Welcome</a></li>
                    <li><a href="#" data-href="#service1Tag" id="navSolutions">SERVICES</a></li>
                    <li><a href="contact" data-href="#contactUs" id="navContactus">contact us</a></li>
                </ul>
            </div>
        </div>
    </div>
</header>

<div id="main">
    <div id="welcome">
        <div id="heroTextWrap" class="container">
            <div id="homeHero">
                <h1 id="heroTextLarge" class="fontCanelaWeb">
                    We verify luxury<span class="tradeMark">TM</span>
                </h1>
                <div id="heroTextBox">
                    <div id="heroText" class="fontLato">
                        ${textModules.welcomeVerifyText}
                    </div>
                    <p class="buttons">
                        <a data-href="#service1Tag" class="navButton">Training</a>
                        <a data-href="#service2Tag" class="navButton">Quality Assessment</a>
                        <a data-href="#service3Tag" class="navButton">Global Partnership</a>
                        <a data-href="#service4Tag" class="navButton">Custom Standards</a>
                    </p>
                </div>
            </div>
        </div>
        <div class="videoBg">
            <div class="video-responsive">
                <video class="video" muted="muted" loop="loop" autoplay="autoplay">
                    %{--<source src="http://secure.s.forbestravelguide.com/img/destinations/video/Austin.mp4" type="video/mp4">--}%
                    <source src="http://s.origin.forbestravelguide.com/imgFhs/fhs_welcome.mp4" type="video/mp4">
                </video>
                <canvas class="canvas" style="display: none;"></canvas>
            </div>
        </div>

    </div>

    <div class="aCenter">
        <img src="http://s.origin.forbestravelguide.com/imgFhs/down_arrow.jpg">
    </div>

    <div id="service1" class="divContent">
        <div id="service1Tag" class="tagTitle">
            <div class="container">
                <h2>Training Services</h2>
            </div>
        </div>

        <div id="service1Content">
            <div class="container">
                <div id="service1Title" class="contentText">
                    ${textModules.welcomeTrainingServices}
                </div>
                <div class="colm colLeft">
                    <img src="http://s.origin.forbestravelguide.com/imgFhs/ftg_poster_1.jpg" class="thumbImg">
                    <div class="colmTitle">
                        In-Person Training
                    </div>
                    <div class="colmTex">
                        ${textModules.welcomeTrainingInPerson}
                    </div>
                </div>
                <div class="colm colMiddle">
                    <a class="youtube cboxElement" href="http://www.youtube.com/embed/HE4m5HH3AHs?rel=0&amp;wmode=transparent"><img src="http://s.origin.forbestravelguide.com/imgFhs/ftg_poster_2.jpg" class="thumbImg"></a>
                    <div class="colmTitle">
                        Online Training with<br/> Lobster Ink
                    </div>
                    <div class="colmTex">
                        ${textModules.welcomeTrainingOnline}
                    </div>
                </div>
                <div class="colm colRight">
                    <a class="youtube cboxElement" href="http://www.youtube.com/embed/NynRe3lqbHE?rel=0&amp;wmode=transparent"><img src="http://s.origin.forbestravelguide.com/imgFhs/ftg_poster_3.jpg" class="thumbImg"></a>
                    <div class="colmTitle">
                        Star Coach &<br/> Training Toolkit
                    </div>
                    <div class="colmTex">
                        ${textModules.welcomeTrainingStarCoachAndToolkit}
                    </div>
                </div>
                <div class="buttonWrap"><a href="https://podio.com/webforms/20528085/1405572" class="contactBtn cbox podioBtn" title="">GET DETAILS</a></div>
            </div>
        </div>
    </div>

    <div id="service2" class="divContent">
        <div id="service2Tag" class="tagTitle">
            <div class="container">
                <h2>Quality Assessment</h2>
            </div>
        </div>

        <div id="service2Content">
            <div class="container">
                <div class="contentText">
                    ${textModules.welcomeQualityAssessment}
                </div>
                <div class="buttonWrap"><a href="https://podio.com/webforms/20528085/1405572" class="contactBtn cbox podioBtn">LEARN MORE</a></div>
            </div>
        </div>
    </div>

    <div id="service3" class="divContent">
        <div id="service3Tag" class="tagTitle">
            <div class="container">
                <h2>Global Partnership</h2>
            </div>
        </div>

        <div id="service3Content">
            <div class="container">
                <div class="contentText">
                    <img src="http://s.origin.forbestravelguide.com/imgFhs/wecome_img_1.jpg" id="welcomeImg1" class="welcomeImg" alt="Global Partnership">
                    ${textModules.welcomeGlobalPartnership}
                    <span class="mobilBtnWrap"><a href="https://podio.com/webforms/20528085/1405572" class="contactBtn cbox podioBtn">REQUEST INFORMATION</a></span>
                </div> 
            </div>
        </div>
    </div>



    <div id="service4" class="divContent">
        <div id="service4Tag" class="tagTitle">
            <div class="container">
                <h2>Custom Standards</h2>
            </div>
        </div>

        <div id="service4Content">
            <div class="container">
                <div class="contentText">
                    <img src="http://s.origin.forbestravelguide.com/imgFhs/wecome_img_2.jpg" id="welcomeImg2" class="welcomeImg" alt="Custom Standards">
                    ${textModules.welcomeCustomStandards}
                    <span class="mobilBtnWrap"><a href="https://podio.com/webforms/20528085/1405572" class="contactBtn cbox podioBtn">GET STARTED</a></span>
                </div> 
            </div>
        </div>
    </div>
</div>

<footer id="footer">
    <div class="container">
        <p class="footerText">
            <a href="http://www.forbestravelguide.com/terms-of-use">TERMS</a> &#9679; <a href="http://www.forbestravelguide.com/privacy">PRIVACY</a>
            &#9679; <a href="http://www.forbestravelguide.com/about/careers" target="_blank">CAREERS</a>
            &#9679; <a href="/contact">CONTACT</a> &#9679; <a href="http://www.forbestravelguide.com/">FORBES TRAVEL GUIDE</a>
            &#9679; <a href="https://store.forbestravelguide.com/" target="_blank">STORE</a><br/>
            © <g:formatDate format="yyyy" date="${new Date()}"/> THE FIVE STAR TRAVEL CORPORATION. ALL RIGHTS RESERVED. <br/>FORBES IS A REGISTERED TRADEMARK OF FORBES LLC USED UNDER LICENSE BY THE FIVE STAR TRAVEL CORPORATION.
        </p>
    </div>
</footer>

</body>
</html>