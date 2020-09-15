
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            destinationLandingPage : function(){
                var isCollectionUrl = ftgUtil.getUrlParameter("collection");
                var collectionTitle = "";



                var defaultZoom         = 2;
                var maxZoom             = 18;
                var mapCenter           = new google.maps.LatLng(33.748995, -84.387982);
                var gotPropData         = false;
                var propInitZoom        = 0;
                var infoboxOpenedZoom   = 0;
                var infoboxOpenedCenter = null;
                var clickedDestination  = null;
                var addressMarkers      = [];
                var input = document.getElementById('mapQuery');
                var autocomplete = new google.maps.places.Autocomplete(input);


                var clusterStylesNumber = [
                    { textColor: 'white', height: 53, width: 52, url: globalImageBase+'/images/mapIcons/f1.png', },
                    { textColor: 'white', height: 56, width: 55, url: globalImageBase+'/images/mapIcons/f2.png', },
                    { textColor: 'white', height: 66, width: 65, url: globalImageBase+'/images/mapIcons/f3.png', },
                    { textColor: 'white', height: 78, width: 77, url: globalImageBase+'/images/mapIcons/f4.png', },
                    { textColor: 'white', height: 90, width: 89, url: globalImageBase+'/images/mapIcons/f5.png', },
                ];
                var clusterStyles = [
                    { textColor: 'transparent', height: 40, width: 40, url: globalImageBase+'/images/mapIcons/icon-destination.png', },
                    { textColor: 'transparent', height: 40, width: 40, url: globalImageBase+'/images/mapIcons/icon-destination.png', },
                    { textColor: 'transparent', height: 40, width: 40, url: globalImageBase+'/images/mapIcons/icon-destination.png', },
                    { textColor: 'transparent', height: 40, width: 40, url: globalImageBase+'/images/mapIcons/icon-destination.png', },
                    { textColor: 'transparent', height: 40, width: 40, url: globalImageBase+'/images/mapIcons/icon-destination.png', },
                ];
                var propTypeIcons =  {
                    DESTINATION:{ icon: globalImageBase+'/images/mapIcons/icon-destination.png' },
                    HOTEL:      { icon: globalImageBase+'/images/mapIcons/icon-hotel.png' },
                    RESTAURANT: { icon: globalImageBase+'/images/mapIcons/icon-restaurant.png' },
                    SPA:        { icon: globalImageBase+'/images/mapIcons/icon-spa.png' },
                    ACTIVITY:   { icon: globalImageBase+'/images/mapIcons/icon-activity.png'},
                };

                var markerClusterMinZoom = maxZoom-1;
                var markerClusterMaxZoom = maxZoom;
                var markerClusterOptions = {
                    gridSize: 40,
                    maxZoom: markerClusterMaxZoom,
                    zoomOnClick:true,
                    styles: clusterStyles,
                    minimumClusterSize: 2,
                };

                var mapBase = [{"featureType":"all","elementType":"all","stylers":[{"hue":"#B6B4C3"},{"lightness":-0},{"saturation":-90}]},{"featureType":"poi","elementType":"attraction","stylers":[{"visibility":"on"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-70}]},{"featureType":"landscape","elementType":"all","stylers":[{"hue":"#B6B4C3"},{"saturation":10},{"lightness":15},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry","stylers":[{"lightness":-5},]},];
                var mapOption = {
                    zoom: defaultZoom,
                    maxZoom: maxZoom,
                    center: mapCenter,
                    // disableDoubleClickZoom  : true,
                    zoomControl             : false,
                    fullscreenControl       : false,
                    streetViewControl       : false,
                    mapTypeControl          : false, // Map or Satellite
                    scrollwheel             : false,
                    styles                  : mapBase,
                    mapTypeId               : google.maps.MapTypeId.ROADMAP,
                    clickableIcons          : false,   // Disable POI Click
                };

                var ftg_map = new google.maps.Map(document.getElementById("mapCanvas"), mapOption);
                var initBounds = new google.maps.LatLngBounds();
                var mapLatLngBounds = new google.maps.LatLngBounds;
                var allDestinationMarkers = [];
                var mapControlDiv = document.createElement('div'); mapControlDiv.index = 1;
                var lastClusterZoom = 0;
                var iw  = new google.maps.InfoWindow({ maxWidth: 250 });
                var markerClusterer = new MarkerClusterer(ftg_map, allDestinationMarkers, markerClusterOptions);

                // Customize Info Window *******************************************************************
                // Remove infoWindow close button ************
                google.maps.event.addListener(iw, 'domready', function(){ $(".gm-style-iw").next("div").hide(); });
                google.maps.event.addListener(ftg_map, "click", function(event) { $(document).find(".pac-container").hide(); iw.close(); });
                google.maps.event.addListener(iw, 'domready', function() { ftg.iwUpdateClasses(); });
                // Customize Info Window End ***************************************************************


                // Map Control ******
                var mapBaseControl = function(controlDiv, map, defaultZoom, mapCenter, maxZoom) {
                    var controlWrapper = document.createElement('div');
                    controlWrapper.className = "mapControlWrapper";
                    controlWrapper.style.backgroundColor = 'white';
                    controlWrapper.style.borderStyle = 'solid';
                    controlWrapper.style.borderColor = 'gray';
                    controlWrapper.style.borderWidth = '1px';
                    controlWrapper.style.cursor = 'pointer';
                    controlWrapper.style.color = '#333333';
                    controlWrapper.style.textAlign = 'center';
                    controlWrapper.style.width = '28px';
                    // controlWrapper.style.height = '96px';
                    controlDiv.appendChild(controlWrapper);

                    // Set CSS for the zoomIn
                    var zoomInButton = document.createElement('div');
                    zoomInButton.className = "mapControl zoomIn";
                    zoomInButton.innerHTML = "<span title='Zoom in'>+<span>";
                    controlWrapper.appendChild(zoomInButton);

                    // Set CSS for the Reset
                    var resetButton = document.createElement('div');
                    resetButton.className = "mapControl resetMap";
                    resetButton.innerHTML = "<span title='Reset Zoom'>★<span>";
                    controlWrapper.appendChild(resetButton);

                    // Set CSS for the Mouse Wheel Control
                    var wheelButton = document.createElement('div');
                    wheelButton.className = "mapControl wheelButton";
                    wheelButton.innerHTML = "<span title='Toggle Mouse Wheel Zoom Control'>☉<span>";
                    controlWrapper.appendChild(wheelButton);

                    // Set CSS for the zoomOut
                    var zoomOutButton = document.createElement('div');
                    zoomOutButton.className = "mapControl zoomOut";
                    zoomOutButton.innerHTML = "<span title='Zoom Out'>-<span>";
                    controlWrapper.appendChild(zoomOutButton);

                    // Setup the click event listener - zoomIn
                    google.maps.event.addDomListener(zoomInButton, 'click', function() {
                        if(map.getZoom() < maxZoom){
                            map.setZoom(map.getZoom() + 1);
                        }
                    });

                    // Setup the click event listener - zoomOut
                    google.maps.event.addDomListener(zoomOutButton, 'click', function() {
                        if( infoboxOpenedZoom == 0 ){
                            var zoomOutStep = 1;
                            if(map.getZoom()-zoomOutStep <= defaultZoom){
                                map.setZoom(defaultZoom);
                            } else {
                                map.setZoom(map.getZoom() - zoomOutStep);
                            }
                        } else {
                            map.setZoom(infoboxOpenedZoom);
                            map.setCenter(infoboxOpenedCenter);
                            infoboxOpenedZoom = 0;
                            infoboxOpenedCenter = null;
                        }
                        iw.close();
                        updatePropertyListData();

                    });

                    google.maps.event.addDomListener(resetButton, 'click', function() {
                        if(isCollectionUrl){
                            map.fitBounds(initBounds);
                        } else {
                            if(map.getZoom() !== defaultZoom){
                                map.setZoom(defaultZoom);
                            }
                            map.setCenter(mapCenter);
                        }
                    });

                    // Setup the click event listener - Mouse wheelButton
                    var checkMouseScroll = function(wheelButton){
                        if(map.scrollwheel){
                            wheelButton.classList.remove("disabled");
                        } else {
                            wheelButton.className += " disabled";
                        }
                    }
                    google.maps.event.addDomListener(wheelButton, 'click', function() {
                        // console.log("map.scrollwheel :"+map.scrollwheel);
                        if(map.scrollwheel){
                            map.set('scrollwheel', false);
                        } else {
                            map.set('scrollwheel', true);
                        }
                        checkMouseScroll(wheelButton);
                    });
                    checkMouseScroll(wheelButton);
                };
                mapBaseControl(mapControlDiv, ftg_map, defaultZoom, mapCenter, maxZoom);
                ftg_map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(mapControlDiv);



                var mapControl = function(allDestinationMarkers, propMarkers){
                    var initFilterType = ftgUtil.getUrlParameter("initFilterType"); if(!initFilterType){ initFilterType = "hotels"; }
                    var initSort = ftgUtil.getUrlParameter("initSort"); if(!initSort){ initSort = 0; }


                    if($(document).find(".mapFilterControl").length > 0){
                        $(document).find(".mapFilterControl").remove();
                    }
                    mapControlDiv.id = "mapFilterControlWrap";
                    mapControlDiv.style.padding = '5px';

                    var filterWrapper = document.createElement('div');

                    filterWrapper.className = "mapFilterWrapper";
                    filterWrapper.style.backgroundColor = 'white';
                    filterWrapper.style.borderStyle = 'solid';
                    filterWrapper.style.borderColor = 'gray';
                    filterWrapper.style.borderWidth = '1px';
                    filterWrapper.style.cursor = 'pointer';
                    filterWrapper.style.color = '#333333';
                    filterWrapper.style.textAlign = 'center';
                    filterWrapper.style.width = '28px';

                    mapControlDiv.insertBefore(filterWrapper, mapControlDiv.firstChild)

                    var className = "";
                    var filterAllButton = document.createElement('div');
                    filterAllButton.className = "mapFilterControl all"+(initFilterType ? ' disabledWrap' : '');
                    filterAllButton.innerHTML = "<span title='All Properties' class='"+(initFilterType ? ' disabled' : '')+"'>★<span>";
                    filterWrapper.appendChild(filterAllButton);

                    var filterHotelButton = document.createElement('div');
                    filterHotelButton.className = "mapFilterControl hotel"+(initFilterType == 'hotels' ? '' : ' disabledWrap');
                    filterHotelButton.innerHTML = "<span title='Hotels' class='hotels"+(initFilterType == 'hotels' ? '' : ' disabled')+"'><img src='"+globalImageBase+"/images/mapIcons/ic-hotels.svg' data-pin-nopin='true'><span>";
                    filterWrapper.appendChild(filterHotelButton);

                    var filterRestaurantButton = document.createElement('div');
                    filterRestaurantButton.className = "mapFilterControl restaurant"+(initFilterType == 'restaurants' ? '' : ' disabledWrap');
                    filterRestaurantButton.innerHTML = "<span title='Restaurants' class='restaurants"+(initFilterType == 'restaurants' ? '' : ' disabled')+"'><img src='"+globalImageBase+"/images/mapIcons/ic-restaurants.svg' data-pin-nopin='true'><span>";
                    filterWrapper.appendChild(filterRestaurantButton);

                    var filterSpaButton = document.createElement('div');
                    filterSpaButton.className = "mapFilterControl spa"+(initFilterType == 'spas' ? '' : ' disabledWrap');
                    filterSpaButton.innerHTML = "<span title='Spas' class='spas"+(initFilterType == 'spas' ? '' : ' disabled')+"'><img src='"+globalImageBase+"/images/mapIcons/ic-spas.svg' data-pin-nopin='true'><span>";
                    filterWrapper.appendChild(filterSpaButton);

                    // console.log("mapControl data",allDestinationMarkers, markerClusterer, propMarkers);

                    var updateMapWithFilter = function(allDestinationMarkers, propMarkers, category){
                        google.maps.event.trigger(ftg_map, "click");
                        var filteredMarkers = [];

                        if(category !== ""){
                            for (i = 0; i < propMarkers.length; i++) {
                                if (propMarkers[i].category == category || category.length === 0) {
                                    filteredMarkers.push(propMarkers[i]);
                                }
                            }
                        } else {
                            if(ftg_map.getZoom() > 17){
                                ftg_map.setZoom(16);
                            }
                            filteredMarkers = propMarkers;
                        }
                        markerClusterer.clearMarkers();
                        markerClusterer.addMarkers(filteredMarkers);
                        markerClusterer.repaint();
                    };

                    google.maps.event.clearListeners(ftg_map, 'filterAllButton');
                    google.maps.event.clearListeners(ftg_map, 'filterHotelButton');
                    google.maps.event.clearListeners(ftg_map, 'filterRestaurantButton');
                    google.maps.event.clearListeners(ftg_map, 'filterSpaButton');

                    google.maps.event.addDomListener(filterAllButton, 'click', function() {
                        updateMapWithFilter(allDestinationMarkers, propMarkers, '')
                    });

                    google.maps.event.addDomListener(filterHotelButton, 'click', function() {
                        updateMapWithFilter(allDestinationMarkers, propMarkers, 'HOTEL')
                    });

                    google.maps.event.addDomListener(filterRestaurantButton, 'click', function() {
                        updateMapWithFilter(allDestinationMarkers, propMarkers, 'RESTAURANT')
                    });

                    google.maps.event.addDomListener(filterSpaButton, 'click', function() {
                        updateMapWithFilter(allDestinationMarkers, propMarkers, 'SPA')
                    });
                    // MapControl End ........................................................





                    switch(initFilterType) {
                        case "hotels":
                            updateMapWithFilter(allDestinationMarkers, propMarkers, 'HOTEL');
                            break;
                        case "spas":
                            updateMapWithFilter(allDestinationMarkers, propMarkers, 'SPA');
                            break;
                        case "restaurants":
                            updateMapWithFilter(allDestinationMarkers, propMarkers, 'RESTAURANT');
                            break;
                        default:
                            break;
                    }

                    // console.log("length ",$("#mapFilterControlWrap").length);
                    // $("#mapFilterControlWrap .mapFilterControl."+initFilterType).trigger("click");

                    setTimeout(function(){
                        $("#filterButtonWrap a[data-filtername='"+initFilterType+"']").trigger("click");
                        setTimeout(function(){
                            $(".filterSortMenu ul li:eq("+initSort+")").trigger("click");
                        },500);
                    },1000);



                    $(document).on("click", "#mapFilterControlWrap .mapFilterControl span", function(){
                        $("#mapFilterControlWrap .mapFilterControl span").addClass("disabled");
                        $(this).removeClass("disabled");
                        $("#mapFilterControlWrap .mapFilterControl").addClass("disabledWrap");
                        $(this).parent().removeClass("disabledWrap");
                    });

                };
                // Map Control End ******



                // Property map infobox content
                var infoBoxContent = function(marker) {
                    var html = "<div class='mapInfoBox'>";
                    if(marker.propertyRating !== ""){
                        html += "<div class='mapInfoRating'>";
                        if(marker.propertyRating !== 'NOT_RATED' && marker.propertyRating !== 'SOON_TO_BE_RATED'){
                            html += "<img src='"+globalImageBase+"/images/mapIcons/icon-rating-"+marker.propertyRating+".svg' class='mapInfoRatingIcon' data-pin-nopin='true'>";
                        }
                        html += "</div>";
                    }
                    html += "<div class='mapInfoPropImg'>";
                    html += "<a href='"+marker.propertyURI+"'><img src='"+marker.image+"' data-pin-nopin='true'></a>";
                    html += "</div>";
                    if(marker.accolade){
                        html += "<div class='markerAccoladeWrap'><div class='markerAccolade'><div class='markerAccoladeText'>"+marker.accolade+"</div></div></div>";
                    }
                    html += "<div class='mapInfoTextWrap'>";
                    html += "<div class='mapInfoBreadCrumb'>";
                    // html += "<a href='/destinations/"+marker.destinationId+"'>"+marker.destinationName+"</a> | <a href=''>COUNTRY</a>";
                    html += "<a href='/destinations/"+marker.destinationId+"'>"+marker.destinationName+"</a>";
                    html += "</div>";
                    html += "<div class='mapInfoPropName'><a href='"+marker.propertyURI+"'>"+marker.title+"</a>";
                    html += "</div>";
                    html += "</div>";
                    html += "</div>";
                    return html;
                };

                // Property List Box Content
                var propInfoBoxContent = function(marker) {
                    var overViewText = "";
                    if(marker.propertyHeadline){
                        overViewText = marker.propertyHeadline;
                    }
                    var html = '<div class="propertyListing">';
                    html += '<div class="propRating">';
                    if(marker.propertyRating !== 'NOT_RATED' && marker.propertyRating !== 'SOON_TO_BE_RATED'){
                        html += '<img src="'+globalImageBase+'/images/mapIcons/icon-rating-'+marker.propertyRating+'.svg" class="propRatingIcon" data-pin-nopin="true">';
                    }
                    html += '</div>';
                    html += '<div class="propImg"><a href="'+marker.propertyURI+'"><img src="'+marker.image+'" data-pin-nopin="true"></a></div>';
                    if(marker.accolade && !isCollectionUrl){
                        html += "<div class='accoladeWrap'><a href='"+marker.propertyURI+"' class='accolade'>"+marker.accolade+"</a></div>";
                    }
                    html += '<div class="propTextWrap">';
                    html += '<div class="PropName"><a href="'+marker.propertyURI+'">'+marker.title+'</a></div>';
                    html += '<div class="propOverview">'+overViewText+'</div>';
                    html += '<div class="propLocation">'+marker.propertyLocation+'</div>';
                    html += '</div>';
                    html += '</div>';
                    return html;
                };




                var updatePropertyListData = function(propMarkers){
                    if(gotPropData === true && propMarkers) {
                        if($("#propertyList").html() === ""){

                            $("#propertyList").html("");

                            var destinationName = "<h2><a href='/destinations/"+propMarkers[0].destinationId+"'>"+propMarkers[0].destinationName+"</a></h2>";
                            $("#propertyListWrap h2").remove();
                            if(isCollectionUrl){
                                $("#propertyListWrap").prepend(collectionTitle);
                            } else {
                                $("#propertyListWrap").prepend(destinationName);
                            }

                            var ct1 = 0, ct2 = 0, ct3 = 0;
                            for (var i = propMarkers.length, bounds = ftg_map.getBounds(); i--;) {

                                var dataFilter = '';
                                if(propMarkers[i].category === "HOTEL")     { dataFilter = "1"; ct1 ++;}
                                if(propMarkers[i].category === "RESTAURANT"){ dataFilter = "2"; ct2 ++; }
                                if(propMarkers[i].category === "SPA")       { dataFilter = "3"; ct3 ++; }

                                var propRating = propMarkers[i].propertyRating;
                                if(propRating == "NOT_RATED"){
                                    propRating = "Z-"+propRating;
                                }

                                var propertyBlockHtml = '<div class="propBox filtr-item  col-sx-12 col-sm-6 col-md-4 ' + propMarkers[i].category + '" data-category="'+dataFilter+'" data-name="'+propMarkers[i].sortName+'" data-rating="'+propRating+' '+propMarkers[i].sortName+'">' + propInfoBoxContent(propMarkers[i]) + '</div>';
                                $("#propertyList").prepend(propertyBlockHtml);
                            }

                            var filterHtml = "";
                            if(ct1 > 0){ filterHtml += '<a href="#" data-filter="1" data-filterName="hotels">Hotels</a>'; } else { $(".mapFilterWrapper .mapFilterControl.hotel").remove(); }
                            if(ct2 > 0){ filterHtml += '<a href="#" data-filter="2" data-filterName="restaurants">Restaurants</a>'; } else { $(".mapFilterWrapper .mapFilterControl.restaurant").remove(); }
                            if(ct3 > 0){ filterHtml += '<a href="#" data-filter="3" data-filterName="spas">Spas</a>'; } else { $(".mapFilterWrapper .mapFilterControl.spa").remove(); }

                            if(ct1 + ct2 + ct3 > 0){
                                $("#propertyListWrap, #filterButtonWrap").show();
                                if($(".accoladeWrap").length > 0){
                                    updateAccoladePosition($(".accoladeWrap"));
                                }
                                $("#featuredDestinationsListWrap").hide();
                                $("#propertyListWrap #filterButtonWrap a").remove();
                                $("#propertyListWrap #filterButtonWrap").append(filterHtml);

                                ftgUtil.updateFilterSort();

                                var updatePropertyList = function(filterItem){
                                    var count = $("#propertyList .filtr-item[data-category='"+filterItem+"']").length;
                                    if(parseInt(count) > 0){
                                        ftgUtil.filterProperty("#propertyList .filtr-item", filterItem);
                                        $("#filterDisplayingCount").text(count < 2 ? count+ ' PROPERTY' : count+ ' PROPERTIES');
                                    }
                                };

                                var updateActiveFilter = function(filterItem){
                                    // var timeOut = 0;
                                    // if($(".mapFilterWrapper").length == 0){
                                    //     timeOut = 500;
                                    // }
                                    // setTimeout(function(){
                                        $('#filterButtonWrap a').removeClass("active");
                                        $("#filterButtonWrap a[data-filter='"+filterItem+"']").addClass('active');

                                        $(".mapFilterWrapper .mapFilterControl span").addClass("disabled");
                                        $(".mapFilterWrapper .mapFilterControl:nth-child("+(parseInt(filterItem)+1)+")").find("span").removeClass("disabled");
                                    // },timeOut);
                                    updatePropertyList(filterItem);
                                };

                                $('.filter-buttons a').click(function(e) {
                                    e.preventDefault();
                                    $('.filter-buttons a').removeClass("active");
                                    $(this).addClass('active');
                                    var filterItem = $(this).data('filter');
                                    switch (filterItem){
                                        case 1 : updateActiveFilter("1"); $(document).find(".mapFilterControl.hotel").trigger("click"); break;
                                        case 2 : updateActiveFilter("2"); $(document).find(".mapFilterControl.restaurant").trigger("click"); break;
                                        case 3 : updateActiveFilter("3"); $(document).find(".mapFilterControl.spa").trigger("click"); break;
                                    }
                                    updatePropertyList(filterItem);
                                });

                                $('.filter-buttons a').first().addClass("active").trigger("click");
                                ftgUtil.updateEmptyFilter();

                                $(document).on("click", ".mapFilterControl.hotel", function() {updateActiveFilter("1");});
                                $(document).on("click", ".mapFilterControl.restaurant", function() {updateActiveFilter("2");});
                                $(document).on("click", ".mapFilterControl.spa", function() {updateActiveFilter("3");});

                            } else{
                                // console.log("333333");
                                $("#featuredDestinationsListWrap").show();
                            }
                        }
                    } else {
                        $("#propertyListWrap #filterButtonWrap a").remove();
                        $("#propertyList").html("");
                        $("#propertyListWrap").hide();
                        $("#featuredDestinationsListWrap").show();
                    }
                };




                var propertiesMap = function(marker, addressSearch){
                    var superObj = this;
                    var url = '/api/property/destination/'+marker.id+'.json';
                    if(addressSearch){
                        url = '/api/property/find-near?latitude='+marker.lat+'&longitude='+marker.lon+'&within=10&limit=50&metric=MILES';
                    } else {
                        if(isCollectionUrl){
                            url = isCollectionUrl+'.json';
                        }
                    }
                    $.ajax({
                        type: 'GET',
                        url: url,
                        dataType: 'json',
                        success: function (mapData) {
                            if(isCollectionUrl){
                                collectionTitle = "<h2><a href='"+mapData.collection.uri+"'>"+mapData.collection.name+"</a></h2>";
                                mapData = mapData.properties;
                            }

                            if(mapData.length > 0) {

                                var propMarkers = [];
                                var mapPropBounds = new google.maps.LatLngBounds;
                                if (addressSearch) {
                                    mapPropBounds.extend(marker.position);
                                }


                                $.each(mapData, function (index, property) {
                                    var lat = property.lat;
                                    var lon = property.long;

                                    if(typeof(lat) == 'number' && typeof(lon) == 'number'){
                                        var latLng = new google.maps.LatLng(lat, lon);

                                        var propMedia = globalImageBase + "/images/ftg_default_image.png";
                                        if (property.media.largeUrl) {
                                            propMedia = property.media.largeUrl;
                                        }
                                        if (isCollectionUrl) {
                                            var point = new google.maps.LatLng(parseFloat(lat), parseFloat(lon));
                                            initBounds.extend(point);
                                        }

                                        var propMarker = new google.maps.Marker({
                                            slug: property.propertyName,
                                            title: property.propertyName,
                                            position: latLng,
                                            map: ftg_map,
                                            draggable: !1,
                                            id: property.propertyId,
                                            flat: !0,
                                            icon: propTypeIcons[property.propertyType].icon,
                                            category: property.propertyType,
                                            destinationId: property.destinationId,
                                            destinationName: property.destinationName,
                                            propertyRating: property.ratingObject.id,
                                            propertyURI: property.propertyURI,
                                            propertyLocation: property.locationDisplay,
                                            image: propMedia,
                                            propertyHeadline: property.propertyHeadline,
                                            sortName: property.sortName,
                                            accolade: property.accolade,
                                            accoladeUrl: property.accoladeUri,
                                        });
                                        propMarkers.push(propMarker);
                                        mapPropBounds.extend(propMarker.position);

                                        google.maps.event.addListener(propMarker, 'click', (function (propMarker, index) {
                                            return function () {
                                                infoboxOpenedCenter = ftg_map.getCenter();
                                                infoboxOpenedZoom = ftg_map.getZoom();
                                                // console.log("infoboxOpenedZoom",infoboxOpenedZoom,"infoboxOpenedCenter",infoboxOpenedCenter);

                                                console.log("propMarker clicked");

                                                if (ftg_map.getZoom() < markerClusterMaxZoom) {
                                                    ftg_map.setZoom(markerClusterMaxZoom);
                                                }
                                                ftg_map.setCenter(propMarker.getPosition());
                                                ftg_map.panTo(propMarker.position);

                                                var infoboxContent = infoBoxContent(propMarker);
                                                iw.setContent(infoboxContent);
                                                iw.setOptions({'pixelOffset': new google.maps.Size(0, -10)});
                                                iw.open(ftg_map, propMarker);

                                            }
                                        })(propMarker, index));


                                    } else {
                                        // console.log(index,"no geodata",element);
                                    }
                                });


                                markerClusterer.clearMarkers();
                                markerClusterer.addMarkers(propMarkers);
                                markerClusterer.setStyles(clusterStylesNumber);
                                markerClusterer.repaint();
                                google.maps.event.addListener(markerClusterer, 'clusteringend', mapControl(allDestinationMarkers, propMarkers));

                                gotPropData = true;
                                $("#propertyList").html("");
                                ftg_map.fitBounds(mapPropBounds);


                                updatePropertyListData(propMarkers);


























                                // Listening Cluster Click ****************************************************
                                google.maps.event.addListener(markerClusterer, 'clusterclick', function(cluster) {
                                    var markers = cluster.getMarkers();
                                    // console.log("Cluster Clicked",markers);
                                    lastClusterZoom = ftg_map.getZoom();

                                    if(ftg_map.getZoom() > markerClusterMinZoom){
                                        var firstMarker = markers[0];
                                        var iwContent = '';
                                        if(markers.length > 1){
                                            iwContent = '<div id="multiPropInfoControlWrap"><span class="btn btn-default" id="btnPrev"><img src="'+globalImageBase+'/images/icon-next-prev-white.svg'+'"></span><span class="btn btn-default" id="btnNext" data-pin-nopin="true"><img src="'+globalImageBase+'/images/icon-next-prev-white.svg'+'" data-pin-nopin="true"></span></div>';
                                        }
                                        $.each(markers, function(idx){
                                            var marker = $(this)[0];
                                            var active = '';
                                            if(idx == 0){ active = 'active'; }
                                            iwContent += '<div id="multiPropInfo-'+idx+'" class="multiPropInfoBox '+active+'" data-idx="'+idx+'">';
                                            iwContent += infoBoxContent(marker);
                                            iwContent += '</div>';
                                        });

                                        markerClusterer.resetViewport(),markerClusterer.redraw();

                                        window.excludedFromClusters = [];
                                        markers.forEach(function(marker, t) {
                                            window.excludedFromClusters.push(marker.title + "")
                                        });

                                        setTimeout(function() {
                                            ftg_map.setCenter(cluster.getCenter());
                                            ftg_map.panTo(cluster.getCenter());

                                            iw.setContent(iwContent);
                                            iw.setPosition(cluster.getCenter());
                                            iw.setOptions({'pixelOffset':new google.maps.Size(0, -35)});
                                            iw.open(ftg_map, firstMarker);
                                            window.excludedFromClusters = [];
                                        }, 100);

                                        return true;
                                    } else {
                                        // propMarkers = [];
                                    }
                                });

                                // Multi Property in one location Info Box control ******************************************
                                var updateMultiInfoBox = function(direction){
                                    var activeIdx = parseInt($(document).find(".gm-style-iw .multiPropInfoBox.active").attr("data-idx"));
                                    var maxIdx = $(document).find(".gm-style-iw .multiPropInfoBox").length-1;
                                    var newActive = activeIdx + direction;
                                    if(newActive < 0){
                                        newActive = maxIdx;
                                    }
                                    if(newActive > maxIdx){
                                        newActive = 0;
                                    }
                                    $(document).find(".gm-style-iw .multiPropInfoBox").removeClass("active");
                                    $(document).find(".gm-style-iw #multiPropInfo-"+newActive).addClass("active");
                                };
                                $(document).on("click", "#multiPropInfoControlWrap .btn", function(){
                                    var direction = 1;
                                    if($(this).attr("id") == "btnPrev"){
                                        direction = -1;
                                    }
                                    updateMultiInfoBox(direction);
                                })


                                google.maps.event.addListener(ftg_map, 'idle', function() {
                                    // console.log("Map idle .......... current zoom : " + ftg_map.getZoom()+" propInitZoom : "+propInitZoom+" markerClusterMinZoom : "+markerClusterMinZoom);
                                    // console.log("markerClusterer",markerClusterer);
                                    if(ftg_map.getZoom() >= maxZoom)    { $(".mapControlWrapper .zoomIn > span").addClass("disabled"); }    else { $(".mapControlWrapper .zoomIn > span").removeClass("disabled"); }
                                    if(ftg_map.getZoom() <= 2)          { $(".mapControlWrapper .zoomOut > span").addClass("disabled"); }   else { $(".mapControlWrapper .zoomOut > span").removeClass("disabled"); }

                                    if ( (ftg_map.getZoom() < propInitZoom && ftg_map.getZoom() < markerClusterMinZoom - 1) &&  gotPropData) {
                                        // console.log("redraw destination markers");
                                        markerClusterer.clearMarkers();
                                        markerClusterer.setStyles(clusterStyles);
                                        setTimeout(function () {
                                            markerClusterer.addMarkers(allDestinationMarkers);
                                            markerClusterer.repaint();

                                            if (clickedDestination) {
                                                var lat = clickedDestination.position.lat();
                                                var lon = clickedDestination.position.lng();
                                                var latLng = new google.maps.LatLng(lat, lon);
                                                ftg_map.setCenter(latLng);
                                                clickedDestination = null;
                                            }

                                        }, 500);
                                        gotPropData = false;

                                        $("#mapFilterControlWrap .mapFilterWrapper").remove();
                                    }
                                });


                                propInitZoom = ftg_map.getZoom();
                                // mapControl(allDestinationMarkers, propMarkers);

                            }























                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log('jqXHR:');
                            console.log(jqXHR);
                            console.log('textStatus:');
                            console.log(textStatus);
                            console.log('errorThrown:');
                            console.log(errorThrown);
                        }
                    });
                };




                var destinationsMap = function(){
                    var superObj = this;
                    $.ajax({
                        type: 'GET',
                        url: '/api/destination-map.json',
                        dataType: 'json',
                        success: function (destinations) {
                            // console.log(destinations);
                            var initDestinationMarker = null;
                            var initDestination = ftgUtil.getUrlParameter("destination");
                            var initAddress = ftgUtil.getUrlParameter("mapQuery");

                            if(initAddress){
                                $(document).find("#mapQuery").val(initAddress.replace(/\+/g, ' '));
                                setTimeout(function(){
                                    $(document).find("#mapSearch").trigger("submit");
                                },500);
                            }

                            $.each(destinations, function(index, element) {
                                var lat = element.lat;
                                var lon = element.long;

                                if(typeof(lat) == 'number' && typeof(lon) == 'number'){
                                    var latLng = new google.maps.LatLng(lat, lon);
                                    var marker = new google.maps.Marker({
                                        slug: element.destinationName,
                                        position: latLng,
                                        map: ftg_map,
                                        draggable: !1,
                                        id: element.destinationId,
                                        flat: !0,
                                        icon: propTypeIcons["DESTINATION"].icon,
                                        category: "DESTINATION",
                                        title: element.destinationName,
                                        destinationImage: element.imgURL,
                                        optimized: false
                                    });
                                    allDestinationMarkers.push(marker), mapLatLngBounds.extend(marker.position);

                                    if(initDestination === marker.id){
                                        initDestinationMarker = marker;
                                    }

                                    // Listening Marker (Destination) Click ************************
                                    google.maps.event.addListener(marker, 'click', function() {
                                        var marker = this;
                                        var latLng = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
                                        // console.log("marker Clicked",marker);
                                        ftg_map.setCenter(latLng);
                                        propertiesMap(marker, false);
                                    });

                                } else {
                                    // console.log(index,"no geodata",element);
                                }
                            });

                            // var markerClusterer = new MarkerClusterer(ftg_map, allDestinationMarkers, markerClusterOptions);
                            markerClusterer.clearMarkers();
                            markerClusterer.setStyles(clusterStyles);
                            markerClusterer.addMarkers(allDestinationMarkers);
                            markerClusterer.repaint();
                            gotPropData = false;

                            if(initDestinationMarker){
                                google.maps.event.trigger(initDestinationMarker, "click");
                            }



                            $("#mapFilterControlWrap .mapFilterWrapper").remove();


                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            console.log('jqXHR:'); console.log(jqXHR); console.log('textStatus:'); console.log(textStatus); console.log('errorThrown:'); console.log(errorThrown);
                        },
                    });



                    var submitTimer = null;
                    // Address Search **********************************************
                    $("#mapSearch #mapQuery").on("change", function(){
                        submitTimer = setTimeout(function(){
                            $("#mapSearch").trigger("submit");
                        },200);
                    });
                    $("#mapSearch").submit(function(e) {
                        e.preventDefault();

                        if($("#mapQuery").val().trim() != "") {
                            if (submitTimer) { clearTimeout(submitTimer); }
                            var address = $(this).find("input").val();

                            ftg_map.setZoom(2);

                            if(address.trim() !== ""){
                                var geocoder = new google.maps.Geocoder();

                                // console.log("addressMarkers",addressMarkers);
                                for(var i=0; i<addressMarkers.length; i++){
                                    // Clear existing Address Search Mark
                                    addressMarkers[i].setMap(null);
                                }

                                geocoder.geocode({address: address}, function(results, status) {
                                    if (status == google.maps.GeocoderStatus.OK) {
                                        var lat = results[0].geometry.location.lat();
                                        var lon = results[0].geometry.location.lng();
                                        var latLng = new google.maps.LatLng(lat, lon);
                                        var addressMarker = new google.maps.Marker({
                                            slug: address,
                                            position: latLng,
                                            map: ftg_map,
                                            draggable: !1,
                                            title: address,
                                            lat: lat,
                                            lon: lon,
                                            id: "addressSearch"
                                        });
                                        addressMarkers.push(addressMarker);
                                        // var markerClusterer = new MarkerClusterer(ftg_map);
                                        propertiesMap(addressMarker, true);
                                    }
                                });
                            }
                        }
                    });



                    $("form#mapSearch .arrow").on("click", function(){
                        $("form#mapSearch").submit();
                    });


                    $(".listViewButtonWrap .btnRoundPurple").on("click", function(){
                        Cookies.set("destinationListPageSelect","");
                    });

                };










                updatePropertyListData();

                if(isCollectionUrl){
                    propertiesMap([], false);

                } else {
                    destinationsMap();
                }






            },
