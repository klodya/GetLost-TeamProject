var MapWrapper = function(container, center, zoom){
  this.markers = [];
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
   this.markers.push(marker);
 },

  clearMarkers: function(){
    for(i=0; i < this.markers.length; i++){
      this.markers[i].setMap(null);
    }
  }
};

module.exports = MapWrapper;