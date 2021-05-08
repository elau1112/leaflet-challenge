function markerSize(magnitude) {
    return parseInt(magnitude) * 3; 
}

function getColor(dscale) {
    switch(true) {
    case dscale > 89:
        return '#ff0800';
    case dscale > 69:
        return '#ff4500';
    case dscale > 49:
        return '#cc7722';
    case dscale > 29:
        return '#fbceb1';
    case dscale > 9:
        return '#ffef00';
    default:
        return '#BFFF00';
    }
}

// Used this link to get the geojson data.
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";
//var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

d3.json(link).then(function(eq){
    console.log(eq)      
    console.log(eq.features)
    // var eqfeatures = eq.features;
    eqMarkers(eq.features);
});

function createMap(gj){
        var brightscale = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
            attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
            tileSize: 512,
            maxZoom: 18,
            zoomOffset: -1,
            id: "mapbox/streets-v11",
            accessToken: API_KEY
        });
  
        var grayscale = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
            attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
            maxZoom: 18,
            id: "dark-v10",
            accessToken: API_KEY
        });

   // var eqplaces = L.layerGroup(eqMarkers);
    var baseMaps = {
        "Streets Map": brightscale,
        "Dark Map": grayscale
        };

    var eqMaps = {
        Earthquakes: gj
    };
    
    var myMap = L.map("map", {
    center: [-14.599413,-28.673147],
    zoom: 1.5,
    layers: [brightscale, gj]
    });

    L.control.layers(baseMaps, eqMaps, {
    collapsed: true
    }).addTo(myMap);

    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function() {
        var ctrlEle = L.DomUtil.create('div', 'info legend');
        var dscale = [-10, 10, 30, 50, 70, 90];

            for (var i = 0; i < dscale.length; i++) {
            ctrlEle.innerHTML += 
                '<i style = "background:' + getColor(dscale[i]) + '"></i> ' + dscale[i] + 
            (dscale[i + 1] ? '&ndash;' + dscale[i + 1] + '<br>' : '+');
            //console.log(getColor(dscale[i]))
            }
        return ctrlEle;
    };
    
    legend.addTo(myMap);  
};
function eqMarkers(eqd){
        var gj = L.geoJson(eqd,{
                pointToLayer: function(feature, latlng){
                    return L.circleMarker(latlng);
                },
                style: function(feature){
                    return {
                        stroke: true,
                        weight: 1,                
                        color: "black",
                        fillOpacity: 0.75,
                        fillColor: getColor(feature.geometry.coordinates[2]),
                        radius: markerSize(feature.properties.mag)
                        };   
                },            
                onEachFeature: function(feature, layer) {
                layer.bindPopup("Location: " + feature.properties.place + "<hr> Magnitude: " + feature.properties.mag + "<hr> Depth: " + feature.geometry.coordinates[2]);
            }    
            });
            console.log(gj)
            createMap(gj);
};



 