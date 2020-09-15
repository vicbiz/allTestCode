// npm install uglify-js
// npm -g uninstall <name> --save




var fs = require("fs");
var uglify = require("uglify-js");
var sourceJSdir = "../src/js/";
var targetJSdir = "../static/js/";

if (!fs.existsSync(targetJSdir)){
    fs.mkdirSync(targetJSdir);
}


// must be same list as header.jsp
var jsFiles = [
	"plugins/jquery/jquery-2.1.4.min.js",
	"plugins/bootstrap/js/bootstrap.min.js",
	"plugins/bootstrap-validator/validator.js",
	"plugins/js.cookie.js",
	"plugins/canvas-video-player.js",

	"plugins/colorbox/jquery.colorbox-min.js",
	"plugins/jssocials-1.4.0/jssocials.min.js",
	"plugins/lazysizes/lazysizes.min.js",
	"plugins/lazysizes/ls.unveilhooks.min.js",
	"plugins/lazysizes/ls.bgset.min.js",
	"plugins/lazysizes/ls.respimg.min.js",
	"plugins/sticky-kit.min.js",
	"plugins/masonry.pkgd.min.js",
	"plugins/markerclusterer/markerclusterer.ftg.js",
	"plugins/DataTables-1.10.13/media/js/jquery.dataTables.min.js",
	"plugins/DataTables-1.10.13/media/js/dataTables.responsive.min.js",
	"plugins/DataTables-1.10.13/media/js/dataTables.fixedHeader.min.js",

	"ftg_common_src.js",
	"ftg_site_src.js",
];


// must be same list as cms_header.jsp
var jsFiles_CMS = [
	"plugins/jquery/jquery-2.1.4.min.js",
    "plugins/jquery-ui-1.12.1.custom/jquery-ui.min.js",

	"plugins/bootstrap/js/bootstrap.min.js",
	"plugins/bootstrap-select/js/bootstrap-select.min.js",
	"plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js",
	"plugins/bootstrap-validator/validator.js",

	"plugins/DataTables-1.10.13/media/js/jquery.dataTables.min.js",
	"plugins/DataTables-1.10.13/media/js/dataTables.responsive.min.js",
	"plugins/DataTables-1.10.13/media/js/accent-neutralise.js",

	"plugins/colorbox/jquery.colorbox-min.js",
	"plugins/chosen_v1.6.2/chosen.jquery.min.js",
	"plugins/choses_accent_fix.js",
	"plugins/nicEdit/ftg_nicEdit.js",
	"plugins/nicEdit/ftg_nicEdit.ms.word.js",

	"ftg_common_src.js",
	"ftg_cms_src.js",
];

var jsFiles_landing = [
	"plugins/jquery/jquery-2.1.4.min.js",
	"ftg_common_src.js",
];

var ugyArray = [
	{"jsName": "main.min.js", "jsFiles" :jsFiles},
	{"jsName": "cms_main.min.js", "jsFiles" :jsFiles_CMS},
	{"jsName": "landing_page_main.min.js", "jsFiles" :jsFiles_landing},
];


for (i = 0; i < ugyArray.length; ++i) {
	// console.log("jsFiles length :"+ugyArray[i]["jsFiles"].length);
	for (j = 0; j < ugyArray[i]["jsFiles"].length; ++j) {
		ugyArray[i]["jsFiles"][j] = sourceJSdir + ugyArray[i]["jsFiles"][j];
	}
	var uglified = uglify.minify(ugyArray[i]["jsFiles"]);
	var ugfyName = targetJSdir+ugyArray[i]["jsName"];

	console.log("Processing :"+ugfyName);

	fs.writeFile(ugfyName, uglified.code, function (err){
	  if(err) {
		  console.log("Error to Generated :", ugfyName);
	    console.log(err);
	  } else {
	    console.log("Script Generated and Saved :", ugfyName);
	  }      
	});
}


