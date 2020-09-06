
const inputElement = document.querySelector('#search');
const bntElement = document.querySelector('.btn');
const mapa = document.querySelector('.mapa');

function BuscarMapa(){
    var ipAddress = inputElement.value;
    const api = 'https://geo.ipify.org/api/v1?apiKey=at_kkV0RSKzsozxyqc3oIFGd6H5GY5ex&ipAddress=' + ipAddress;

    $(document).ready(function(){
     $.getJSON(api , function(data){
  
         var ip = '';
         var location = '';
         var isp = '';
         var timezone ='';
 
         var lat ='';
         var lng ='';
 
         ip +=  data.ip;
         location += data.location.region + ', ' + data.location.city + '-' + data.location.country;
         isp += data.isp;
         timezone += data.location.timezone;
 
         lat+= data.location.lat;
         lng+= data.location.lng;
         
        $('#ip').html(ip);
        $('#location').html(location);
        $('#isp').html(isp);
        $('#timezone').html(timezone);
        
        if (L.DomUtil.get(mapa) !== undefined) { 
            L.DomUtil.get(mapa)._leaflet_id = null; 
         }  

         
        var mymap = L.map(mapa).setView([lat, lng], 10);
         L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
             maxZoom: 18,
             attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                 '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
             id: 'mapbox/streets-v11',
             tileSize: 512,
             zoomOffset: -1
         }).addTo(mymap);
 
         var icon = L.icon({
             iconUrl: '../images/icon-location.svg',
             iconAnchor:   [22, 54],
             popupAnchor:  [-3, -76]
         });
 
         L.marker([lat, lng] , {icon: icon}).addTo(mymap);
     });
 });

}

bntElement.addEventListener('click',BuscarMapa );


