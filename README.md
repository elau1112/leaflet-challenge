# leaflet-challenge
In this assignment, two folders are included as required:
1. Leaflet_Step1
Selected Dataset: Significant earthqualkes of the past 30 days
This folder includes two logic files
a) logicL.js: I tried to use "L.Circle" for the visualization of the earthquake data. The "magnitude" would have to enlarge 100000 times for a clear scaling of the "circle" size, which is representing the magnitude of the earthquake.
b) logicGL.js: I switched to "L.geoJson" for the visualization of the earthquake data. The "magitude" was enlarged 3 times with proper scaling of the "circle" size vs. earthquake magnitude achieved as required.

This dataset contains worldwide data. Thus, it is centered around the North Atlantic Ocean for showing the worldwide earthquakes in the initial screen as appropriate.

The base maps included the Streets Map and Dark Map. A "collapsed" layer box is used with the base maps and the earthquake "circles" layer included.

Each point has a tooltip with the location, magnitude and depth in <hr>.

2. Leaflet_Step2
Selected Dataset: All earthquakes of the past 30 days
This folder includes the logic.js file with a "collapsed" layer box. It includes the control to change the basemap and to add/remove layers as required, including the visualization of the tectonic plate lines on the map. 

The base maps included the Streets Map, Dark Map and Satellite Streets Map.
The corresponding id was determined via the mabox styles page in the following link: https://docs.mapbox.com/api/maps/styles/#mapbox-styles

Each point has a tooltip with the location, magnitude and depth in <br>.

The API KEYS in the config.js of both folders are not uploaded in the submission as requested.

Thank you very much ~ Elizabeth Lau