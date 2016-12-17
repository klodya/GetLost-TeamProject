var MapWrapper = function(container, center, zoom){

 this.googleMap = new google.maps.Map(container,
 {
   center: center,
   zoom: zoom
 });
}

MapWrapper.prototype = {

 createMarker: function(place){
   var marker = new google.maps.Marker({
     position: {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()},
     map: this.googleMap
   });
 },
}

module.exports = MapWrapper;