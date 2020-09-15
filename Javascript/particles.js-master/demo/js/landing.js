                var isCollectionUrl = ftgUtil.getUrlParameter("collection");
                var collectionTitle = "";
                var initBounds = new google.maps.LatLngBounds();

                var initMap = {
                    getDestinationMapData: function(){
                        var url = '/api/destination-map.json';
                        // console.log(url);
                        $.ajax({
                            type: 'GET',
                            url: url,
                            dataType: 'json',
                            success: function (data) {
                                // console.log(data);
                                var markers = [];
                                $.each(data, function(index, element) {
                                    // console.log(element);
                                    var lat = "", lon = "";
                                        lat = element.lat;
                                        lon = element.long;
                                        if(lat === null || lon === null || lat === "null" || lon === "null" ){
                                            lat = ""; lon = "";
                                        } else {
                                            // console.log("lat:"+lat+" lon:"+lon);
                                            markers.push([index, element.destinationName, lat, lon, "DESTINATION", "", element.destinationId, element.imgURL]);
                                        }
                                });
                                initMap.drawMap(markers);
                            },
                            error: function(jqXHR, textStatus, errorThrown) {
                                console.log('jqXHR:'); console.log(jqXHR); console.log('textStatus:'); console.log(textStatus); console.log('errorThrown:'); console.log(errorThrown);
                            },
                        });
                    },

                    infoBoxContent : function(marker) {
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
                    },

                    propInfoBoxContent : function(marker) {
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
                        if(marker.accolade){
                            html += "<div class='accoladeWrap'><a href='"+marker.propertyURI+"' class='accolade'>"+marker.accolade+"</a></div>";
                        }
                        html += '<div class="propTextWrap">';
                        html += '<div class="PropName"><a href="'+marker.propertyURI+'">'+marker.title+'</a></div>';
                        html += '<div class="propOverview">'+overViewText+'</div>';
                        html += '<div class="propLocation">'+marker.propertyLocation+'</div>';
                        html += '</div>';
                        html += '</div>';
                        return html;
                    },

                    drawMap : function(destinations){
                        var defaultZoom = 2;
                        var maxZoom = 18;
                        var lastClusterZoom = 0;
                        var markerClusterMinZoom = maxZoom-1;
                        var markerClusterMaxZoom = maxZoom;
                        var defaultLat = 33.748995;
                        var defaultLon = -84.387982;
                        var mapCenter = new google.maps.LatLng(defaultLat, defaultLon);

                        var mapControlDiv = document.createElement('div');
                        mapControlDiv.index = 1;

                        // POI - Google map Attraction ......................................................................
                        var mapBase = [{"featureType":"all","elementType":"all","stylers":[{"hue":"#B6B4C3"},{"lightness":-0},{"saturation":-90}]},{"featureType":"poi","elementType":"attraction","stylers":[{"visibility":"on"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-70}]},{"featureType":"landscape","elementType":"all","stylers":[{"hue":"#B6B4C3"},{"saturation":10},{"lightness":15},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry","stylers":[{"lightness":-5},]},];
                        var markers = [], initMarkers = [];
                        var propInitZoom = 0;
                        var propMarkers = [];
                        var gotPropData = false;
                        var clickedDestination = null;
                        var mapLatLngBounds = new google.maps.LatLngBounds;
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
                        var markerClusterOptions = {
                            gridSize: 40,
                            maxZoom: markerClusterMaxZoom,
                            zoomOnClick:true,
                            styles: clusterStyles,
                            minimumClusterSize: 2,
                        };
                        var infoBoxOptions = {
                            maxWidth: 250,
                        };


                        var ftg_map = new google.maps.Map(document.getElementById("mapCanvas"), mapOption);
                        var input = document.getElementById('mapQuery');
                        var autocomplete = new google.maps.places.Autocomplete(input);
                        var iw  = new google.maps.InfoWindow(infoBoxOptions);

                        autocomplete.bindTo('bounds', ftg_map);


                        // Customize Info Window *******************************************************************
                        // Remove infoWindow close button ************
                        google.maps.event.addListener(iw, 'domready', function(){
                            $(".gm-style-iw").next("div").hide();
                        });
                        google.maps.event.addListener(ftg_map, "click", function(event) {
                            $(document).find(".pac-container").hide();
                            iw.close();
                        });
                        google.maps.event.addListener(iw, 'domready', function() {
                            ftg.iwUpdateClasses();
                        });
                        // Customize Info Window End ***************************************************************


                        google.maps.event.addListener(ftg_map, 'rightclick', function(e) {
                            ftg_map.set('disableDoubleClickZoom', true);
                        });
                        google.maps.event.addListener(ftg_map, 'click', function(e) {
                            ftg_map.set('disableDoubleClickZoom', false);
                        });


                        var drawPropertyMap = function(marker, addressSearch){
                            var url = '/api/property/destination/'+marker.id+'.json';
                            if(addressSearch){
                                url = '/api/property/find-near?latitude='+marker.lat+'&longitude='+marker.lon+'&within=10&limit=50&metric=MILES';
                            } else {
                                if(isCollectionUrl){
                                    url = isCollectionUrl+'.json';
                                }
                            }
                            // console.log(url);

                            $.ajax({
                                type: 'GET',
                                url: url,
                                dataType: 'json',
                                success: function (data) {

                                    // console.log("prop data");
                                    // console.log(data);

                                    var markersTemp = [];
                                    var mapData = data;
                                    if(isCollectionUrl){
                                        mapData = data.properties;
                                        collectionTitle = "<h2>"+data.collection.name+"</h2>";
                                    }
                                    // console.log("mapData.length : "+mapData.length);
                                    if(mapData.length > 0){
                                        $.each(mapData, function(index, element) {
                                            // console.log(element);

                                            // var lat = element.location[0];
                                            // var lon = element.location[1];
                                            var lat = element.lat;
                                            var lon = element.long;
                                            if(lat === null || lon === null || lat === "null" || lon === "null" ){
                                                lat = ""; lon = "";
                                            } else {
                                                markersTemp.push(element);
                                            }
                                        });

                                        var mapPropBounds = new google.maps.LatLngBounds;
                                        if(addressSearch){
                                            mapPropBounds.extend(marker.position);
                                        }
                                        propMarkers = [];

                                        for (var i = 0; i < markersTemp.length; i++) {
                                            var property = markersTemp[i];
                                            // var lat = property.location[0];
                                            // var lon = property.location[1];
                                            var lat = property.lat;
                                            var lon = property.long;
                                            var latLng = new google.maps.LatLng(lat, lon);
                                            var propMarker = null;
                                            var propMedia = globalImageBase+"/images/ftg_default_image.png";
                                            if(property.media.largeUrl){
                                                propMedia = property.media.largeUrl;
                                            }

                                            if(isCollectionUrl){
                                                var point = new google.maps.LatLng(parseFloat(lat), parseFloat(lon));
                                                initBounds.extend(point);
                                            }


                                            // var decodedPropertyName = ftg.decodeEntities(property.propertyName);
                                            // console.log(decodedPropertyName);

                                            propMarker = new google.maps.Marker({
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
                                            propMarkers.push(propMarker), mapPropBounds.extend(propMarker.position);

                                            google.maps.event.addListener(propMarker, 'click', (function(propMarker, i) {
                                                return function() {
                                                    // console.log("propMarker clicked");
                                                    // console.log("lastClusterZoom :"+lastClusterZoom);
                                                    // if(ftg_map.getZoom() < lastClusterZoom){
                                                    //     ftg_map.setZoom(lastClusterZoom);
                                                    // }
                                                    if(ftg_map.getZoom() < markerClusterMaxZoom){
                                                        ftg_map.setZoom(markerClusterMaxZoom);
                                                    }
                                                    ftg_map.setCenter(propMarker.getPosition());
                                                    ftg_map.panTo(propMarker.position);

                                                    var infoboxContent = initMap.infoBoxContent(propMarker);
                                                    iw.setContent(infoboxContent);
                                                    iw.setOptions({'pixelOffset':new google.maps.Size(0, -10)});
                                                    iw.open(ftg_map, propMarker);
                                                }
                                            })(propMarker, i));
                                        }
                                        // console.log("propMarkers.....1111");
                                        // console.log(propMarkers);
                                        gotPropData = true;
                                        $("#propertyList").html("");
                                        ftg_map.fitBounds(mapPropBounds);

                                        markerClusterer.clearMarkers();
                                        markerClusterer.addMarkers(propMarkers);
                                        markerClusterer.setStyles(clusterStylesNumber);
                                        markerClusterer.repaint();

                                        propInitZoom = ftg_map.getZoom();









                                        // MapControl ........................................................
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
                                        // controlDiv.appendChild(filterWrapper);
                                        mapControlDiv.insertBefore(filterWrapper, mapControlDiv.firstChild)

                                        var filterAllButton = document.createElement('div');
                                        filterAllButton.className = "mapFilterControl all";
                                        filterAllButton.innerHTML = "<span title='All Properties'>★<span>";
                                        filterWrapper.appendChild(filterAllButton);

                                        var filterHotelButton = document.createElement('div');
                                        filterHotelButton.className = "mapFilterControl hotel";
                                        filterHotelButton.innerHTML = "<span title='Hotels' class='hotels disabled'><img src='"+globalImageBase+"/images/mapIcons/ic-hotels.svg' data-pin-nopin='true'><span>";
                                        filterWrapper.appendChild(filterHotelButton);

                                        var filterRestaurantButton = document.createElement('div');
                                        filterRestaurantButton.className = "mapFilterControl restaurant";
                                        filterRestaurantButton.innerHTML = "<span title='Restaurants' class='restaurants disabled'><img src='"+globalImageBase+"/images/mapIcons/ic-restaurants.svg' data-pin-nopin='true'><span>";
                                        filterWrapper.appendChild(filterRestaurantButton);

                                        var filterSpaButton = document.createElement('div');
                                        filterSpaButton.className = "mapFilterControl spa";
                                        filterSpaButton.innerHTML = "<span title='Spas' class='spas disabled'><img src='"+globalImageBase+"/images/mapIcons/ic-spas.svg' data-pin-nopin='true'><span>";
                                        filterWrapper.appendChild(filterSpaButton);

                                        var updateMapWithFilter = function(initMarkers, markerCluster, propMarkers, category){
                                            google.maps.event.trigger(ftg_map, "click");
                                            var filteredMarkers = [];

                                            if(category !== ""){
                                                for (i = 0; i < propMarkers.length; i++) {
                                                    // console.log("category :"+propMarkers[i].category);
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
                                            markerCluster.clearMarkers();
                                            markerCluster.addMarkers(filteredMarkers);
                                            markerCluster.repaint();
                                        };

                                        google.maps.event.clearListeners(ftg_map, 'filterAllButton');
                                        google.maps.event.clearListeners(ftg_map, 'filterHotelButton');
                                        google.maps.event.clearListeners(ftg_map, 'filterRestaurantButton');
                                        google.maps.event.clearListeners(ftg_map, 'filterSpaButton');

                                        google.maps.event.addDomListener(filterAllButton, 'click', function() {
                                            updateMapWithFilter(initMarkers, markerClusterer, propMarkers, '')
                                        });

                                        google.maps.event.addDomListener(filterHotelButton, 'click', function() {
                                            updateMapWithFilter(initMarkers, markerClusterer, propMarkers, 'HOTEL')
                                        });

                                        google.maps.event.addDomListener(filterRestaurantButton, 'click', function() {
                                            updateMapWithFilter(initMarkers, markerClusterer, propMarkers, 'RESTAURANT')
                                        });

                                        google.maps.event.addDomListener(filterSpaButton, 'click', function() {
                                            updateMapWithFilter(initMarkers, markerClusterer, propMarkers, 'SPA')
                                        });
                                        // MapControl End ........................................................











                                        var initFilterType = ftgUtil.getUrlParameter("initFilterType");
                                        if(!initFilterType){
                                            initFilterType = "hotels";
                                        }

                                        switch(initFilterType) {
                                            case "hotels":
                                                updateMapWithFilter(initMarkers, markerClusterer, propMarkers, 'HOTEL');
                                                break;
                                            case "spas":
                                                updateMapWithFilter(initMarkers, markerClusterer, propMarkers, 'SPA');
                                                break;
                                            case "restaurants":
                                                updateMapWithFilter(initMarkers, markerClusterer, propMarkers, 'RESTAURANT');
                                                break;
                                            default:
                                                break;
                                        }

                                        setTimeout(function(){
                                            // $("#mapFilterControlWrap .mapFilterControl span."+initFilterType).trigger("click");
                                            $("#filterButtonWrap a[data-filtername='"+initFilterType+"']").trigger("click");
                                        },1500);

                                        $(document).on("click", "#mapFilterControlWrap .mapFilterControl span", function(){
                                            $("#mapFilterControlWrap .mapFilterControl span").addClass("disabled");
                                            $(this).removeClass("disabled");
                                            $("#mapFilterControlWrap .mapFilterControl").addClass("disabledWrap");
                                            $(this).parent().removeClass("disabledWrap");
                                        });
                                    } else {
                                        // console.log("no property data....");
                                        var lat = marker.position.lat();
                                        var lon = marker.position.lng();
                                        var latLng = new google.maps.LatLng(lat, lon);
                                        ftg_map.setCenter(latLng);
                                        ftg_map.panTo(latLng);
                                        // console.log("current zoom: "+ftg_map.getZoom());
                                        if(ftg_map.getZoom() < 5){
                                            ftg_map.setZoom(10);
                                        }
                                    }
                                },
                                error: function(jqXHR, textStatus, errorThrown) {
                                    console.log('jqXHR:'); console.log(jqXHR); console.log('textStatus:'); console.log(textStatus); console.log('errorThrown:'); console.log(errorThrown);
                                },
                            });
                        };


                        if(isCollectionUrl){
                            drawPropertyMap("", false);
                        } else {
                            var initDestinationMarker = null;
                            var initDestination = ftgUtil.getUrlParameter("destination");
                            var initAddrfess = ftgUtil.getUrlParameter("mapQuery");
                            if(initAddrfess){
                                $(document).find("#mapQuery").val(initAddrfess.replace(/\+/g, ' '));
                                setTimeout(function(){
                                    $(document).find("#mapSearch").trigger("submit");
                                },500);
                            }

                            for (var i = 0; i < destinations.length; i++) {
                                var destination = destinations[i];
                                var lat = destination[2];
                                var lon = destination[3];
                                var latLng = new google.maps.LatLng(lat, lon);

                                var marker = new google.maps.Marker({
                                    slug: destination[1],
                                    position: latLng,
                                    map: ftg_map,
                                    draggable: !1,
                                    id: destination[6],
                                    flat: !0,
                                    icon: propTypeIcons[destination[4]].icon,
                                    category: destination[4],
                                    title: destination[1],
                                    destinationImage: destination[7],
                                    optimized: false // No Repeat Markers for World Level Zoom... 2
                                });
                                markers.push(marker), mapLatLngBounds.extend(marker.position);
                                if(initDestination === marker.id){
                                    initDestinationMarker = marker;
                                }

                                // Listening Marker (Destination) Click ************************
                                google.maps.event.addListener(marker, 'click', function() {
                                    var marker = this;
                                    clickedDestination = marker;
                                    // console.log("marker Clicked");
                                    // console.log(marker);
                                    drawPropertyMap(marker, false);
                                });


                                // Todo : Testing Visible Destination Markers to automatic Click to open Destination.
                                // google.maps.event.addListener(ftg_map, "zoom_changed", function() {
                                    // console.log("markers.length : "+markers.length);
                                    // var visibleMarkers = 0;
                                    // var singleVisibleMarker = null;
                                    // for(var i = markers.length, bounds = ftg_map.getBounds(); i--;) {
                                    //     if( bounds.contains(markers[i].getPosition()) ){
                                    //         visibleMarkers++;
                                    //         singleVisibleMarker = markers[i];
                                    //     }
                                    // }
                                    // console.log("visibleMarkers : "+visibleMarkers);
                                    // if(visibleMarkers === 1){
                                    //     new google.maps.event.trigger( singleVisibleMarker, 'click' );
                                    //     singleVisibleMarker = null;
                                    // }
                                // });

                            }


                            if(initDestinationMarker){
                                google.maps.event.trigger(initDestinationMarker, "click");
                            }
                        }


                        // Listening Zoom Changes *****************************************
                        google.maps.event.addListener(ftg_map, "zoom_changed", function() {
                            // console.log("Zoom Changed .......... current zoom : " + ftg_map.getZoom());
                            if(isCollectionUrl || ftg_map.getZoom() < markerClusterMaxZoom){
                                iw.close();
                            }
                        });

                        var updateZoomIcon = function(){
                            if(ftg_map.getZoom() >= maxZoom){
                                $(".mapControlWrapper .zoomIn > span").addClass("disabled");
                            } else {
                                $(".mapControlWrapper .zoomIn > span").removeClass("disabled");
                            }

                            if(ftg_map.getZoom() <= 2){
                                $(".mapControlWrapper .zoomOut > span").addClass("disabled");
                            } else {
                                $(".mapControlWrapper .zoomOut > span").removeClass("disabled");
                            }
                        };

                        // Append Property List to Content Area ******************************************
                        google.maps.event.addListener(ftg_map, 'idle', function() {

                            // console.log("Map idle .......... current zoom : " + ftg_map.getZoom()+" propInitZoom : "+propInitZoom+" markerClusterMinZoom : "+markerClusterMinZoom);

                            updateZoomIcon();

                            if(ftg_map.getZoom() < propInitZoom && ftg_map.getZoom() < markerClusterMinZoom-1){
                                var showDestinations = function(initMarkers, markerCluster, category){
                                    markerCluster.clearMarkers();
                                    markerClusterer.setStyles(clusterStyles);
                                    setTimeout(function(){
                                        markerCluster.addMarkers(initMarkers);
                                        markerClusterer.repaint();

                                        if(clickedDestination){
                                            var lat = clickedDestination.position.lat();
                                            var lon = clickedDestination.position.lng();
                                            var latLng = new google.maps.LatLng(lat, lon);
                                            ftg_map.setCenter(latLng);
                                            // ftg_map.panTo(latLng);
                                            clickedDestination = null;
                                        }

                                    },500);
                                    gotPropData = false;
                                }
                                showDestinations(initMarkers, markerClusterer, 'DESTINATION');
                                $("#mapFilterControlWrap .mapFilterWrapper").remove();
                            }

                            // console.log("current zoom : "+ftg_map.getZoom()+" propInitZoom :"+propInitZoom+ " propMarkers.length:"+propMarkers.length);
                            // console.log("gotPropData : "+gotPropData);
                            // console.log("propertyList html : "+$("#propertyList").html());

                            if(gotPropData === true) {
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

                                        var propertyBlockHtml = '<div class="propBox filtr-item  col-sx-12 col-sm-6 col-md-4 ' + propMarkers[i].category + '" data-category="'+dataFilter+'" data-name="'+propMarkers[i].sortName+'" data-rating="'+propRating+' '+propMarkers[i].sortName+'">' + initMap.propInfoBoxContent(propMarkers[i]) + '</div>';
                                        $("#propertyList").prepend(propertyBlockHtml);
                                    }


                                    var filterHtml = "";
                                    if(ct1 > 0){ filterHtml += '<a href="#" data-filter="1" data-filterName="hotels">Hotels</a>'; } else { $(".mapFilterWrapper .mapFilterControl.hotel").remove(); }
                                    if(ct2 > 0){ filterHtml += '<a href="#" data-filter="2" data-filterName="restaurants">Restaurants</a>'; } else { $(".mapFilterWrapper .mapFilterControl.restaurant").remove(); }
                                    if(ct3 > 0){ filterHtml += '<a href="#" data-filter="3" data-filterName="spas">Spas</a>'; } else { $(".mapFilterWrapper .mapFilterControl.spa").remove(); }

                                    // console.log("ct1 : "+ct1+" ct2 : "+ct2+" ct3 : "+ct3);
                                    // console.log("filterHtml : "+filterHtml);

                                    if(ct1 + ct2 + ct3 > 0){

                                        $("#propertyListWrap, #filterButtonWrap").show();

                                        if($(".accoladeWrap").length > 0){
                                            updateAccoladePosition($(".accoladeWrap"));
                                        }

                                        $("#featuredDestinationsListWrap").hide();

                                        $("#propertyListWrap #filterButtonWrap a").remove();
                                        $("#propertyListWrap #filterButtonWrap").append(filterHtml);

                                        ftgUtil.updateFilterSort();

                                        var updateActiveFilter = function(filterItem){
                                            var timeOut = 0;
                                            if($(".mapFilterWrapper").length == 0){
                                                timeOut = 500;
                                            }
                                            setTimeout(function(){
                                                $('#filterButtonWrap a').removeClass("active");
                                                $("#filterButtonWrap a[data-filter='"+filterItem+"']").addClass('active');

                                                $(".mapFilterWrapper .mapFilterControl span").addClass("disabled");
                                                $(".mapFilterWrapper .mapFilterControl:nth-child("+(parseInt(filterItem)+1)+")").find("span").removeClass("disabled");
                                                if($("#filterButtonWrap a[data-filter='"+filterItem+"']").attr("data-filtercounter") > 0){
                                                    ftgUtil.filterProperty("#propertyList .filtr-item", filterItem);
                                                    ftgUtil.updateCounter("#propertyList .filtr-item", "#filterDisplayingCount");
                                                }
                                            },timeOut);
                                        };

                                        $('.filter-buttons a').click(function(e) {
                                            e.preventDefault();
                                            $('.filter-buttons a').removeClass("active");
                                            $(this).addClass('active');
                                            var filterItem = $(this).data('filter');
                                            switch (filterItem){
                                                case 1 : updateActiveFilter("1"); break;
                                                case 2 : updateActiveFilter("2"); break;
                                                case 3 : updateActiveFilter("3"); break;
                                            }
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
                        });


                        initMarkers = markers;


                        initMap.mapBaseControl(mapControlDiv, ftg_map, defaultZoom, mapCenter, maxZoom);
                        ftg_map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(mapControlDiv);

                        var markerClusterer = new MarkerClusterer(ftg_map, markers, markerClusterOptions);

                        // Listening Cluster Click ****************************************************
                        google.maps.event.addListener(markerClusterer, 'clusterclick', function(cluster) {
                            var markers = cluster.getMarkers();

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
                                    iwContent += initMap.infoBoxContent(marker);
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
                        var updateMutiInfoBox = function(direction){
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
                            updateMutiInfoBox(direction);
                        })


                        var submitTimer = null;
                        // Address Search **********************************************
                        $("#mapSearch #mapQuery").on("change", function(){
                            submitTimer = setTimeout(function(){
                                $("#mapSearch").trigger("submit");
                            },200);
                        });

                        $("#mapSearch").submit(function(e) {
                            if (submitTimer) {
                                clearTimeout(submitTimer);
                            }
                            var address = $(this).find("input").val();

                            ftg_map.setZoom(2);

                            if(address.trim() !== ""){
                                var geocoder = new google.maps.Geocoder();

                                var tempAry = [];
                                for(var i=0; i<markers.length; i++){

                                    if( markers[i].id !== 'addressSearch' ) {
                                        tempAry.push(markers[i]);
                                    } else {
                                        markers[i].setMap(null);
                                    }
                                }
                                markers = tempAry;

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
                                        markers.push(addressMarker);
                                        drawPropertyMap(addressMarker, true);
                                    }
                                });
                            }
                            e.preventDefault();
                        });
                    },

                    mapBaseControl : function(controlDiv, map, defaultZoom, mapCenter, maxZoom) {
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
                            var zoomOutStep = 1;
                            if(map.getZoom()-zoomOutStep <= defaultZoom){
                                map.setZoom(defaultZoom);
                            } else {
                                map.setZoom(map.getZoom() - zoomOutStep);
                            }
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

                    },
                };

                if(isCollectionUrl){
                    initMap.drawMap([]);
                } else {
                    initMap.getDestinationMapData();
                }

                $("form#mapSearch .arrow").on("click", function(){
                    $("form#mapSearch").submit();
                });


                $(".listViewButtonWrap .btnRoundPurple").on("click", function(){
                    Cookies.set("destinationListPageSelect","");
                });