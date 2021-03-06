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

        const enterstyleIn = { 
            "color": "black",   // green:  #2C9815
            "weight": 3,
            "fillOpacity": 0.5
        };

        const enterstyleMid = { 
            "color": "brown",   // green:  #2C9815
            "weight": 3,
            "fillOpacity": 0.5
        };

        const enterstyleOut = { 
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

            

            //For loop to assess if current location is within outer geofence.  geof_out = outer geofence
            const outerbufferList = [bt_geof_out, os_geof_out, ws_geof_out, fs_geof_out]; 
            const outerPopups = [bt_popup3, os_popup3, ws_popup3, fs_popup3];  
            // 'i' is for index. Meaning that for index 0 (when we start to iterrate) when i is smaller than length, i++ is probably go one by one
            for ( let i=0; i<outerbufferList.length; i++) {
                if (turf.booleanWithin(player, outerbufferList[i])) {
                    // loc.outerPopups[i].bindPopup().openPopup();
                     outerPopups[i].openPopup();
                     // create marker object, pass custom icon as option, pass content and options to popup, add to map
                        L.marker(e.latlng, {icon: funny}).addTo(map); 
                        L.geoJSON(outerbufferList[i], {style: enterstyleOut}).addTo(map);
                } else {
                    loc.bindPopup("<strong>You are here.</strong><br />Keep exploring!.", {maxWidth: 500});
                }
            }

            //For loop to assess if current location is within middle geofence
            const midbufferList = [bt_geof_mid, os_geof_mid, ws_geof_mid, fs_geof_mid];
            const midPopups = [bt_popup2, os_popup2, ws_popup2, fs_popup2]; 

            for ( let i=0; i<midbufferList.length; i++) {
                if (turf.booleanWithin(player, midbufferList[i])) {
                    midPopups[i].openPopup();
                        // create marker object, pass custom icon as option, pass content and options to popup, add to map
                        L.marker(e.latlng, {icon: funny}).addTo(map); 
                        L.geoJSON(midbufferList[i], {style: enterstyleMid}).addTo(map);
                } else {
                    loc.bindPopup("<strong>You are here.</strong><br />Keep exploring!.", {maxWidth: 500});
                }
            }
            
            //For loop to assess if current location is within inner geofence.   geof = geofence; in = inner
            const innerbufferList = [bt_geof_in,os_geof_in, ws_geof_in, fs_geof_in];
            const innerPopups = [bt_popup1, os_popup1, ws_popup1, fs_popup1];
            const popup_audio = []   

            for ( let i = 0; i < innerbufferList.length; i++) {       
                if (turf.booleanWithin(player, innerbufferList[i])) {					
                    innerPopups[i].openPopup();
                            // create marker object, pass custom icon as option, pass content and options to popup, add to map
                            L.marker(e.latlng, {icon: audioIcon}).bindPopup(customPopup, customOptions).addTo(map);       
                            L.geoJSON(innerbufferList[i], {style:enterstyleIn}).addTo(map); 			
                }  else {
                    loc.bindPopup("<strong>You are here.</strong><br />Keep exploring!.", {maxWidth: 500});
                }
            } 
        }

        const funny = L.icon({
            iconUrl: "http://grzegorztomicki.pl/serwisy/pin.png",
            iconSize: [50, 58], // size of the icon
            iconAnchor: [20, 58], // changed marker icon position
            popupAnchor: [0, -60], // changed popup position
          });

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
        

        // create popup contents
        const customPopup =
        //'<iframe width="360" height="310" src="https://www.youtube.com/embed/glKDhBuoRUs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        '<b>House of the rising sun</b><br><iframe src="house_of_rising_sun.mp3" width="300" height="60" frameborder="0" ></iframe>';

        // specify popup options
        const customOptions = {
        maxWidth: "auto", // set max-width
        className: "customPopup", // name custom popup
        };

        const backTurner = new manIcon({iconUrl: 'BackTurner_1.jpg'}),
            oak = new manIcon({iconUrl:'Oak_2.jpg'}),
            whitworth = new manIcon({iconUrl: 'Whitworth_4.jpg'}),
            faraday = new manIcon({iconUrl: 'Faraday_5.jpg'});


        // Add audio popup content
        const audioPopup1 = 
        //'<iframe width="360" height="310" src="https://www.youtube.com/embed/glKDhBuoRUs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        //'<iframe width="360" height="200" src="https://upload.wikimedia.org/wikipedia/en/a/a5/Joe_Hill_Louis_-_Gotta_Let_You_Go.ogg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        '<b>House of the rising sun</b><br><iframe src="house_of_rising_sun.mp3" width="300" height="60" frameborder="0" ></iframe>';

        
        const audioPopup2 =   
        '<b>Joe Hill Louis - Gotta Let You Go</b><br><iframe src="media/Gotta_Let_You_Go.mp3" width="300" height="60" frameborder="0" ></iframe>';
        //'<iframe width="360" height="200" src="file:///C:/Users/ArcProData/Dissertation/LB_Game_Git/house_of_rising_sun.mp3" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        //'<iframe width="360" height="200" src="https://upload.wikimedia.org/wikipedia/en/4/4d/Oasis_D%27You_Know_What_I_Mean.ogg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        
        const audioPopup3 =   
        '<b>Oasis - Dont look back in anger</b><br><iframe src="media/Dont_Look_Back_In_Anger.mp3" width="300" height="60" frameborder="0" ></iframe>';
        
        const audioPopup4 =   
        '<b>Gorillaz - Rhinestone Eyes</b><br><iframe src="media/Rhinestone_Eyes.mp3" width="300" height="60" frameborder="0" ></iframe>';
        /*
        // Add audio popup content
        const audioPopup3 = new Audio('C:/Users/ArcProData/Dissertation/LB_Game_Git/house_of_rising_sun.mp3');
        // file:///C:/Users/ArcProData/Dissertation/LB_Game_Git/house_of_rising_sun.mp3
        */

    

        // specify popup options
        const audioOptions1 = {
            maxWidth: "auto", // set max-width
            className: "audioPopup1", // name custom popup
        };
        
        const audioOptions2 = {
            maxWidth: "auto", // set max-width
            className: "audioPopup2", // name custom popup
        };

        const audioOptions3 = {
            maxWidth: "auto", // set max-width
            className: "audioPopup3", // name custom popup
        };

        const audioOptions4 = {
            maxWidth: "auto", // set max-width
            className: "audioPopup4", // name custom popup
        };
        
        /*
        const audioOptions3 = {
            maxWidth: "auto", // set max-width
            className: "audioPopup3", // name custom popup
        };
        */





        //Site one  //backTurner bt_dot = centre point of all geofences for the Back Turner
        const bt_dot  = turf.point([-2.237358,53.484120]);            
        const bt_geof_in = turf.buffer(bt_dot, 0.02, {units:'kilometers',steps:24}); 
        const bt_geof_mid = turf.buffer(bt_dot, 0.2, {units:'kilometers', steps:24}); 
        const bt_geof_out = turf.buffer(bt_dot, 0.4,{units: 'kilometers',steps:24});
            
        L.geoJSON(bt_geof_in,{style: innerStyle}).addTo(map); 
        L.geoJSON(bt_geof_mid, {style: midStyle}).addTo(map); 										
        L.geoJSON(bt_geof_out,{style: outerStyle}).addTo(map);	

        const bt = L.marker([53.484120,-2.237358], {icon:backTurner}).bindPopup("Back Turner Invader"); // .addTo(map)   

        // Inner geofence
        const bt_popupContent1 = ("<h1 style ='text-align:center; color: #263985'> Well done! You found Back Turner Invader!</h1><b> Please click on your music icon to listen to a story </b>")   //Add content using HTML tags 
        const bt_popup1 = bt.bindPopup(bt_popupContent1, { 
            maxWidth: 320,				 
            maxHeight: 400
        });
        // Middle geofence
        const bt_popupContent2 = ("<h1 style ='text-align:center; color: #263985'> You are very close to Back Turner!</h1><b> Please walk towards ... street</b>")   //Add content using HTML tags 
        const bt_popup2 = bt.bindPopup(bt_popupContent2, { 
            maxWidth: 320,				 
            maxHeight: 400
        });
        // Outer geofence
        const bt_popupContent3 = ("<h1 style ='text-align:center; color: #263985'> You are inside Back Turner outer geofence!</h1><b> Please walk towards Shudehill bus terminal and you will discover another hint!</b>")   //Add content using HTML tags 
        const bt_popup3 = bt.bindPopup(bt_popupContent3, { 
            maxWidth: 320,				 
            maxHeight: 400
        });

        bt.off('click'); 

        //Site two //oak
        const os_dot  = turf.point([-2.234620,53.470192]);      // Engineering building      
        const os_geof_in = turf.buffer(os_dot, 0.02, {units:'kilometers',steps:24});
        const os_geof_mid = turf.buffer(os_dot, 0.2, {units:'kilometers', steps:24});   
        const os_geof_out = turf.buffer(os_dot, 0.4,{units: 'kilometers',steps:24});    
        var os = L.marker([53.470192,-2.234620], {icon:oak}).bindPopup("Oak Street Invader").addTo(map);   
        L.geoJSON(os_geof_in,{style: innerStyle}).addTo(map);
        L.geoJSON(os_geof_mid, {style: midStyle}).addTo(map); 										
        L.geoJSON(os_geof_out,{style: outerStyle}).addTo(map);				 

        // Inner geofence
        const os_popupContent1 = ("<h1 style ='text-align:center; color: #263985'> Well done! You found Oak Street Invader!</h1><b> It is the first space invader ever created in Manchester back in 2004:</b>")   //Add content using HTML tags 
        const os_popup1 = os.bindPopup(os_popupContent1, { 
            maxWidth: 320,				 
            maxHeight: 400
        });
        // Middle geofence
        const os_popupContent2 = ("<h1 style ='text-align:center; color: #263985'> You are very close to Oak Street!</h1><b> Please walk towards ... street</b>")   //Add content using HTML tags 
        const os_popup2 = os.bindPopup(os_popupContent2, { 
            maxWidth: 320,				 
            maxHeight: 400
        });
        // Outer geofence
        const os_popupContent3 = ("<h1 style ='text-align:center; color: #263985'> You are inside Oak Street outer geofence!</h1><b> Please walk towards Shudehill bus terminal and you will discover another hint!</b>")   //Add content using HTML tags 
        const os_popup3 = os.bindPopup(os_popupContent3, { 
            maxWidth: 320,				 
            maxHeight: 400
        });
        os.off('click'); 


        //Site four //whitworth
        const ws_dot  = turf.point([-2.226204,53.493350]);        // Christabel coords    
        const ws_geof_in = turf.buffer(ws_dot, 0.02, {units:'kilometers',steps:24});
        const ws_geof_mid = turf.buffer(ws_dot, 0.2, {units:'kilometers', steps:24});  
        const ws_geof_out = turf.buffer(ws_dot, 0.4,{units: 'kilometers',steps:24});    
        const ws = L.marker([53.493350,-2.226204], {icon:whitworth}).bindPopup("Whitworth Street Invader").addTo(map);   
        L.geoJSON(ws_geof_in,{style: innerStyle}).addTo(map);
        L.geoJSON(ws_geof_mid, {style: midStyle}).addTo(map);  										
        L.geoJSON(ws_geof_out,{style: outerStyle}).addTo(map);				 

        // Inner geofence
        const ws_popupContent1 = ("<h1 style ='text-align:center; color: #263985'> Well done! You found Whitworth Street Invader!</h1><b> It is the first space invader ever created in Manchester back in 2004:</b>")   //Add content using HTML tags 
        const ws_popup1 = ws.bindPopup(ws_popupContent1, { 
            maxWidth: 320,				 
            maxHeight: 400
        });
        // Middle geofence
        const ws_popupContent2 = ("<h1 style ='text-align:center; color: #263985'> You are very close to Whitworth Street!</h1><b> Please walk towards ... street</b>")   //Add content using HTML tags 
        const ws_popup2 = ws.bindPopup(ws_popupContent2, { 
            maxWidth: 320,				 
            maxHeight: 400
        });
        // Outer geofence
        const ws_popupContent3 = ("<h1 style ='text-align:center; color: #263985'> You are inside Whitworth Street outer geofence!</h1><br><iframe src='Whitworth_4.jpg' width='300' height='300' frameborder='0' ></iframe>");
        // const ws_popupContent3 = ("<h1 style ='text-align:center; color: #263985'> You are inside Whitworth Street outer geofence!</h1><b> Please walk towards Shudehill bus terminal and you will discover another hint!</b>")   //Add content using HTML tags 
        const ws_popup3 = ws.bindPopup(ws_popupContent3, { 
            maxWidth: 250,				 
            maxHeight: 200
        });
        ws.off('click'); 


        //Site five //faraday
        const fs_dot  = turf.point([-2.228177,53.487077]);   // Wang Ying coords         
        const fs_geof_in = turf.buffer(fs_dot, 0.02, {units:'kilometers',steps:24});
        const fs_geof_mid = turf.buffer(fs_dot, 0.2, {units:'kilometers', steps:24});   
        const fs_geof_out = turf.buffer(fs_dot, 0.4,{units: 'kilometers',steps:24});    
        const fs = L.marker([53.487077,-2.228177], {icon:faraday}).bindPopup("Faraday Street Invader").addTo(map);   
        L.geoJSON(fs_geof_in,{style: innerStyle}).addTo(map);
        L.geoJSON(fs_geof_mid, {style: midStyle}).addTo(map);  										
        L.geoJSON(fs_geof_out,{style: outerStyle}).addTo(map);				 

        // Inner geofence
        const fs_popupContent1 = ("<h1 style ='text-align:center; color: #263985'> Well done! You found Faraday Street Invader!</h1><b> It is the first space invader ever created in Manchester back in 2004:</b>")   //Add content using HTML tags 
        const fs_popup1 = fs.bindPopup(fs_popupContent1, { 
            maxWidth: 320,				 
            maxHeight: 400
        });
        // Middle geofence
        const fs_popupContent2 = ("<h1 style ='text-align:center; color: #263985'> You are very close to Faraday Street!</h1><b> Please walk towards ... street</b>")   //Add content using HTML tags 
        const fs_popup2 = fs.bindPopup(fs_popupContent2, { 
            maxWidth: 320,				 
            maxHeight: 400
        });
        // Outer geofence
        const fs_popupContent3 = ("<h1 style ='text-align:center; color: #263985'> You are inside Faraday Street outer geofence!</h1><br><iframe src='Faraday_5.jpg' width='300' height='300' frameborder='0' ></iframe>");
        // const fs_popupContent3 = ("<h1 style ='text-align:center; color: #263985'> You are inside Faraday Street outer geofence!</h1><b> Please walk towards Shudehill bus terminal and you will discover another hint!</b> <figure><img </figure>")   //Add content using HTML tags 
        const fs_popup3 = fs.bindPopup(fs_popupContent3, { 
            maxWidth: 320,				 
            maxHeight: 400
        });
        fs.off('click'); 




        // Adding audio Popup

        // create marker object, pass custom icon as option, pass content and options to popup, add to map
        const audio1 = L.marker([53.487681, -2.228975], {
            icon: audioIcon,
        }).bindPopup(audioPopup1, audioOptions1).addTo(map);
        
        const audio2 = L.marker([53.470192,-2.234620], {
            icon: audioIcon,
        }).bindPopup(audioPopup2, audioOptions2).addTo(map);

        const audio3 = L.marker([53.475754, -2.255766], {
            icon: audioIcon,
        }).bindPopup(audioPopup3, audioOptions3).addTo(map);

        const audio4 = L.marker([53.485195, -2.244346], {
            icon: audioIcon,
        }).bindPopup(audioPopup4, audioOptions4).addTo(map);




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