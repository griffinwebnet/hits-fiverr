var extScope;
var app = angular.module('app', ['angularSoundManager', 'ngRoute', 'ngAnimate']);

// ============ Route Providers =============== //
app.config(function ($routeProvider) {
  $routeProvider.when('/', {
      controller: 'appCtrl',
      templateUrl: './pages/homepage.html'
    })
    .when('/player', {
      templateUrl: './pages/player.html'
    })
    .when('/thanks', {
      controller: 'thanksCtrl',
      templateUrl: './pages/thanks.html'
    })
    .when('/contact', {
      templateUrl: './pages/contact.html'
    })
});

app.controller('appCtrl', function ($scope, $http, SongFactory) {
  extScope = $scope;
  listurl = "https://api.hits101radio.com/app-api/station-list.json?v=" + Math.floor(1000 + Math.random() * 9000);
  console.log(listurl);
  $http.get(listurl).then(function (response) {
    $scope.songs = response.data;
    console.log($scope.songs);
  });

  // Init variables
  $scope.isPlaying = false;
  $scope.songHover = false;
  $scope.$on('track:loaded', function (event, data) {
    var scUrl = $scope.currentPlaying.url;
    var id3url = $scope.currentPlaying.id3 + "?v=" + Math.floor(1000 + Math.random() * 9000);
    console.log("id3 url: " + id3url);


    $http.get(id3url).then(function (response) {
      id3raw = response.data;
      console.log(id3raw);
      striptags = id3raw.toString().split("128,")[1];
        //console.log("striptags: " + striptags);
        trackdata = striptags.replace("</body></html>", "");
        //console.log("trackdata: " + trackdata);
        values = trackdata.toString().split(' - ');
        //console.log("values: " + values);
        one = values[0];
        two = values[1];
        
        if(one == null || one == ""){
          one = "Hits Radio"
        }
        if(two == null || two == ""){
          two = "TItle Unknown [ERR]"
        }
        

         console.log("Artist:" + one);
         console.log("Title: " + two);
  
        $scope.currentPlaying.trackTitle = two;
        $scope.currentPlaying.trackArtist = one;
  
  
    });


  });
})
app.controller('thanksCtrl', function ($scope, $location, $timeout) {

  $timeout(function () {
    $location.path('/player');
  }, 3000);

});


app.factory('SongFactory', function ($http) {
  var factory = {};
  factory.getSongs = function () {
    return $http.get('');
  };
  return factory;
});