var MapWrapper = function(container, center, zoom){
  this.markers = [];
  this.selectedPlaces = [];
  this.googleMap = new google.maps.Map(container,
 {
   center: center,
   zoom: zoom
 });
  this.initSave = this.initSave.bind(this);
  this.initSave();
}

MapWrapper.prototype = {

 createMarker: function(place){

  var marker = new google.maps.Marker({
     position: {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()},
     map: this.googleMap
   });
   this.markers.push(marker);
    
  var infowindow = new google.maps.InfoWindow({content: place.name});
     marker.addListener('mouseover', function() {      
       infowindow.open(this.googleMap, marker);
     });

  marker.addListener('mouseout',function(){
    infowindow.close();
   });

  marker.addListener('click', function(event){
    if(!this.selectedPlaces.includes(place)){
      this.selectedPlaces.push(place);
      this.addPlace(place);
    } 
    console.log(this.selectedPlaces);
  }.bind(this))
 },

 addPlace:function(item) {
   var ul = document.getElementById('places-list');
   var place = document.createElement("li");
   place.innerHTML = item.types[0] +": "+ item.name;
   ul.appendChild(place);
 },
 
  clearMarkers: function(){
    for(i=0; i < this.markers.length; i++){
      this.markers[i].setMap(null);
    }
  },

  saveCityList: function(url, callback){
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.setRequestHeader('content-type', 'application/json');
    request.onload = function(){

      callback(request.response);
    };
    var data = {name: document.getElementById('city-name').innerText, places: this.selectedPlaces};
    request.send(JSON.stringify(data));
    
  
  },

  initSave: function (){
    var localUrl = "http://localhost:3000/cities";

  var test = function(){
    console.log(this);
    this.clearMarkers();
  }.bind(this);
    var boomButton = document.getElementById('save-button')
    boomButton.onclick = function (){
      this.saveCityList(localUrl, function(response){
        var data = JSON.parse(response);
        var todoDiv = document.getElementById('todo-list');

       

        for(city of data){
          var todoLI = document.createElement('li');
          todoLI.id ='city';
          todoLI.innerText = city.name;
          todoDiv.appendChild(todoLI);
          
          todoLI.onclick = test;
        }


       
        
      });
    }.bind(this);




  //console.log(this);
  }
}

module.exports = MapWrapper;



