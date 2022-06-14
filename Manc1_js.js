// Set location variable to 'null' to account for no info when user just enters the game
let loc = null;          
			
//Alert shown when webpage is opened
alert("Welcome to Man_stories!\n\n\This game aims to help you explore the city by searching for hidden multimedia stories in the real-world urban environment. To continue please enable location on your device.\n\nFurther instructions are in the menu.\n\n Have fun!");      


// Style for geofences
const outerStyle = {      
    "color": "#2E86C1",
    "weight": 2,       //2
    "fillOpacity": 0.0   //0.1
};

const midStyle = {
    "color": "#2E86C1",
    "weight": 2,
    "fillOpacity": 0.0
};

const innerStyle = {
    "color": "#2E86C1", 
    "weight": 2, 
    "fillOpacity":0.0   //0.4 
};

const enterstyle = { 
    "color": "#2E86C1",   // green:  #2C9815
    "weight": 3,
    "fillOpacity": 0.5
};


// Create map  
const map = L.map('map');
const mapCentre = L.latLng(53.4808,-2.2426);
map.setView(mapCentre,13);
// Change tiles to make the map sexier
const Stamen_Terrain = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 18,
    ext: 'png'
});
Stamen_Terrain.addTo(map)


// Leaflet function that tracks player's geolocation
map.locate({setView: true, maxZoom: 14, watch: true, enableHighAccuracy: true});   


//********************
//GEOLOCATION FUNCTION 
function onLocationFound(e) { 
    // Not sure why I need this. This is probably for a circle to show how accurate is my location.                
    //var radius = e.accuracy;
    
    // This is the point that is getting tracked, but I do not add it to the map. 
    // Ask Abi what is the difference between 'player' and 'loc' 
    player = turf.point([e.latlng.lng, e.latlng.lat]);		 	 
    // Geolocation icon
    const playerIcon = L.icon({     
        iconUrl: 'placeholder.png',   // person, walk
        iconSize: [37,37],    
        iconAnchor: [17, 37],  
        popupAnchor: [0,-37],
    })
    console.log("Your current position is at:" +e.latlng);  
    // This account for the geolocation when the user just opens the game
    // I add this marker to the map
    if (loc == null) {                        
        loc = L.marker(e.latlng, {icon:playerIcon}).addTo(map);
    // Update the geolocation when the current location is known
    } else { 
        loc.setLatLng(e.latlng); 
    }


    //For loop to assess if current location is within outer geofence 
    const outerbufferList = [outer_geofence1, outer_geofence2, outer_geofence4, outer_geofence5]; 
    const popups3 = [bt_popup3, os_popup3, ws_popup3, fs_popup3];  
    // 'i' is for index. Meaning that for index 0 (when we start to iterrate) when i is smaller than length, i++ is probably go one by one
    for ( let i=0; i<outerbufferList.length; i++) {
        if (turf.booleanWithin(player, outerbufferList[i])) {
            popups3[i].openPopup();
                L.geoJSON(outerbufferList[i], {style: enterstyle}).addTo(map);
        }
    }

    //For loop to assess if current location is within middle geofence
    const midbufferList = [mid_geofence1, mid_geofence2, mid_geofence4, mid_geofence5];
    const popups2 = [bt_popup2, os_popup2, ws_popup2, fs_popup2]; 

    for ( let i=0; i<midbufferList.length; i++) {
        if (turf.booleanWithin(player, midbufferList[i])) {
            popups2[i].openPopup();
                L.geoJSON(midbufferList[i], {style: enterstyle}).addTo(map);
        }
    }
    
    //For loop to assess if current location is within inner geofence 
    const innerbufferList = [inner_geofence1,inner_geofence2, inner_geofence4, inner_geofence5];
    const popups1 = [bt_popup1, os_popup1, ws_popup1, fs_popup1];   

    for ( let i = 0; i < innerbufferList.length; i++) {       
        if (turf.booleanWithin(player, innerbufferList[i])) {					
            popups1[i].openPopup();      
        
                    L.geoJSON(innerbufferList[i], {style:enterstyle}).addTo(map); 			
            
        }  
    } 
}

//Icon class for custom icons 
let manIcon = L.Icon.extend({
    options: {
        iconSize: [37,37],    
        iconAnchor: [23,37],
        popupAnchor: [-5, -37] 
    }
});

// Add a song icon
const audioIcon = L.icon({
    iconUrl: "music.png",
    iconSize: [50, 58], // size of the icon
    iconAnchor: [20, 58], // changed marker icon position
    popupAnchor: [0, -60], // changed popup position
});
 

const backTurner = new manIcon({iconUrl: 'BackTurner_1.jpg'}),
    oak = new manIcon({iconUrl:'Oak_2.jpg'}),
    whitworth = new manIcon({iconUrl: 'Whitworth_4.jpg'}),
    faraday = new manIcon({iconUrl: 'Faraday_5.jpg'});


// Add audio popup content
const audioPopup1 =
//'<iframe width="360" height="310" src="https://www.youtube.com/embed/glKDhBuoRUs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
'<iframe width="360" height="200" src="https://upload.wikimedia.org/wikipedia/en/a/a5/Joe_Hill_Louis_-_Gotta_Let_You_Go.ogg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';

const audioPopup2 =   //'<iframe width="360" height="200" "house_of_rising_sun.mp3" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
'<iframe width="360" height="200" src="https://upload.wikimedia.org/wikipedia/en/4/4d/Oasis_D%27You_Know_What_I_Mean.ogg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';

// specify popup options
const audioOptions1 = {
    maxWidth: "auto", // set max-width
    className: "audioPopup1", // name custom popup
};

const audioOptions2 = {
    maxWidth: "auto", // set max-width
    className: "audioPopup2", // name custom popup
};



//Site one  //backTurner 
const site_one  = turf.point([-2.237358,53.484120]);            
const inner_geofence1 = turf.buffer(site_one, 0.02, {units:'kilometers',steps:24}); 
const mid_geofence1 = turf.buffer(site_one, 0.2, {units:'kilometers', steps:24}); 
const outer_geofence1 = turf.buffer(site_one, 0.4,{units: 'kilometers',steps:24});
    
const bt = L.marker([53.484120,-2.237358], {icon:backTurner}).bindPopup("Back Turner Invader").addTo(map);   
L.geoJSON(inner_geofence1,{style: innerStyle}).addTo(map); 
L.geoJSON(mid_geofence1, {style: midStyle}).addTo(map); 										
L.geoJSON(outer_geofence1,{style: outerStyle}).addTo(map);	

// Inner geofence
const bt_popupContent1 = ("<h1 style ='text-align:center; color: #263985'> Well done! You found Back Turner Invader!</h1><b> It is the first space invader ever created in Manchester back in 2004:</b>")   //Add content using HTML tags 
const bt_popup1 = bt.bindPopup(bt_popupContent1, { 
    maxWidth: 320,				 
    maxHeight: 400
});
// Middle geofence
const bt_popupContent2 = ("<h1 style ='text-align:center; color: #263985'> You are very close!</h1><b> Please walk towards ... street</b>")   //Add content using HTML tags 
const bt_popup2 = bt.bindPopup(bt_popupContent2, { 
    maxWidth: 320,				 
    maxHeight: 400
});
// Outer geofence
const bt_popupContent3 = ("<h1 style ='text-align:center; color: #263985'> You are inside the outer geofence!</h1><b> Please walk towards Shudehill bus terminal and you will discover another hint!</b>")   //Add content using HTML tags 
const bt_popup3 = bt.bindPopup(bt_popupContent3, { 
    maxWidth: 320,				 
    maxHeight: 400
});

bt.off('click'); 

//Site two //oak
const site_two  = turf.point([-2.234620,53.470192]);      // Engineering building      
const inner_geofence2 = turf.buffer(site_two, 0.02, {units:'kilometers',steps:24});
const mid_geofence2 = turf.buffer(site_two, 0.2, {units:'kilometers', steps:24});   
const outer_geofence2 = turf.buffer(site_two, 0.4,{units: 'kilometers',steps:24});    
var os = L.marker([53.470192,-2.234620], {icon:oak}).bindPopup("Oak Street Invader").addTo(map);   
L.geoJSON(inner_geofence2,{style: innerStyle}).addTo(map);
L.geoJSON(mid_geofence2, {style: midStyle}).addTo(map); 										
L.geoJSON(outer_geofence2,{style: outerStyle}).addTo(map);				 

// Inner geofence
const os_popupContent1 = ("<h1 style ='text-align:center; color: #263985'> Well done! You found Back Turner Invader!</h1><b> It is the first space invader ever created in Manchester back in 2004:</b>")   //Add content using HTML tags 
const os_popup1 = os.bindPopup(os_popupContent1, { 
    maxWidth: 320,				 
    maxHeight: 400
});
// Middle geofence
const os_popupContent2 = ("<h1 style ='text-align:center; color: #263985'> You are very close!</h1><b> Please walk towards ... street</b>")   //Add content using HTML tags 
const os_popup2 = os.bindPopup(os_popupContent2, { 
    maxWidth: 320,				 
    maxHeight: 400
});
// Outer geofence
const os_popupContent3 = ("<h1 style ='text-align:center; color: #263985'> You are inside the outer geofence!</h1><b> Please walk towards Shudehill bus terminal and you will discover another hint!</b>")   //Add content using HTML tags 
const os_popup3 = os.bindPopup(os_popupContent3, { 
    maxWidth: 320,				 
    maxHeight: 400
});
os.off('click'); 


//Site four //whitworth
const site_four  = turf.point([-2.226204,53.493350]);        // Christabel coords    
const inner_geofence4 = turf.buffer(site_four, 0.02, {units:'kilometers',steps:24});
const mid_geofence4 = turf.buffer(site_four, 0.2, {units:'kilometers', steps:24});  
const outer_geofence4 = turf.buffer(site_four, 0.4,{units: 'kilometers',steps:24});    
const ws = L.marker([53.493350,-2.226204], {icon:whitworth}).bindPopup("Whitworth Street Invader").addTo(map);   
L.geoJSON(inner_geofence4,{style: innerStyle}).addTo(map);
L.geoJSON(mid_geofence4, {style: midStyle}).addTo(map);  										
L.geoJSON(outer_geofence4,{style: outerStyle}).addTo(map);				 

// Inner geofence
const ws_popupContent1 = ("<h1 style ='text-align:center; color: #263985'> Well done! You found Back Turner Invader!</h1><b> It is the first space invader ever created in Manchester back in 2004:</b>")   //Add content using HTML tags 
const ws_popup1 = ws.bindPopup(ws_popupContent1, { 
    maxWidth: 320,				 
    maxHeight: 400
});
// Middle geofence
const ws_popupContent2 = ("<h1 style ='text-align:center; color: #263985'> You are very close!</h1><b> Please walk towards ... street</b>")   //Add content using HTML tags 
const ws_popup2 = ws.bindPopup(ws_popupContent2, { 
    maxWidth: 320,				 
    maxHeight: 400
});
// Outer geofence
const ws_popupContent3 = ("<h1 style ='text-align:center; color: #263985'> You are inside the outer geofence!</h1><b> Please walk towards Shudehill bus terminal and you will discover another hint!</b>")   //Add content using HTML tags 
const ws_popup3 = ws.bindPopup(ws_popupContent3, { 
    maxWidth: 320,				 
    maxHeight: 400
});
ws.off('click'); 


//Site five //faraday
const site_five  = turf.point([-2.228177,53.487077]);   // Wang Ying coords         
const inner_geofence5 = turf.buffer(site_five, 0.02, {units:'kilometers',steps:24});
const mid_geofence5 = turf.buffer(site_five, 0.2, {units:'kilometers', steps:24});   
const outer_geofence5 = turf.buffer(site_five, 0.4,{units: 'kilometers',steps:24});    
const fs = L.marker([53.487077,-2.228177], {icon:faraday}).bindPopup("Faraday Street Invader").addTo(map);   
L.geoJSON(inner_geofence5,{style: innerStyle}).addTo(map);
L.geoJSON(mid_geofence5, {style: midStyle}).addTo(map);  										
L.geoJSON(outer_geofence5,{style: outerStyle}).addTo(map);				 

// Inner geofence
const fs_popupContent1 = ("<h1 style ='text-align:center; color: #263985'> Well done! You found Back Turner Invader!</h1><b> It is the first space invader ever created in Manchester back in 2004:</b>")   //Add content using HTML tags 
const fs_popup1 = fs.bindPopup(fs_popupContent1, { 
    maxWidth: 320,				 
    maxHeight: 400
});
// Middle geofence
const fs_popupContent2 = ("<h1 style ='text-align:center; color: #263985'> You are very close!</h1><b> Please walk towards ... street</b>")   //Add content using HTML tags 
const fs_popup2 = fs.bindPopup(fs_popupContent2, { 
    maxWidth: 320,				 
    maxHeight: 400
});
// Outer geofence
const fs_popupContent3 = ("<h1 style ='text-align:center; color: #263985'> You are inside the outer geofence!</h1><b> Please walk towards Shudehill bus terminal and you will discover another hint!</b> <figure><img </figure>")   //Add content using HTML tags 
const fs_popup3 = fs.bindPopup(fs_popupContent3, { 
    maxWidth: 320,				 
    maxHeight: 400
});
fs.off('click'); 




// Adding audio Popup

// create marker object, pass custom icon as option, pass content and options to popup, add to map
const audio1 = L.marker([53.487077, -2.228177], {
    icon: audioIcon,
}).bindPopup(audioPopup1, audioOptions1).addTo(map);


const audio2 = L.marker([53.470192,-2.234620], {
    icon: audioIcon,
}).bindPopup(audioPopup2, audioOptions2).addTo(map);




//Call location function	
map.on('locationfound', onLocationFound);   //onLocationFound  getPosition


// Location error function 
function onLocationError(e) {         
    alert(e.message); 
} 
map.on('locationerror', onLocationError);












//-------------------------------------------------------------------------
// Set map bounds to restrict the view
// coordinates limiting the map
function getBounds() {
const southWest = new L.LatLng(53.461320, -2.274756);  // points around central Manchester
const northEast = new L.LatLng(53.492787, -2.212573);
return new L.LatLngBounds(southWest, northEast);
}

// set maxBounds
map.setMaxBounds(map.getBounds());

// zoom the map to the polyline
map.fitBounds(getBounds(), { reset: true });