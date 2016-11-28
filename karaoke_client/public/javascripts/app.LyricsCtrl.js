angular.module('karaokeApp')
  .controller('LyricsCtrl', function($scope, $http, $location, $routeParams, $rootScope) {

    // song ID the user clicked from songs page
    var currentId = $routeParams.id;

    $scope.longestWord = "";
    $scope.first = "";
    $scope.second = "";

    $scope.yay = true;
    $scope.nay = true;
    $scope.game = false;

    $scope.fetch = function() {
      console.log(currentId)
      $http.get('http://localhost:9292/songs/' + currentId).success(function (results) {
        
        var lyrics = results.lyrics;
        var lyricsArray = lyrics.split(" ");

        var longestWord = 0;
        var missingWord = null;

        for (var i = 0; i < lyricsArray.length; i++) {
          if (lyricsArray[i].length > longestWord) {
              longestWord = lyricsArray[i].length 
              missingWord = lyricsArray[i]
          };
        };

        // Removes period, comma or question mark from word
        missingWord = missingWord.replace(/[.,?]/g, '');
        $scope.longestWord = missingWord

        console.log(lyrics);
        console.log("Missing word: " + missingWord);

        // Split lyrics into two parts for user interface
        var index = lyrics.indexOf(missingWord);  // Gets the first index where a space occours
        var firstPart = lyrics.substr(0, index); // Gets the first part
        var secondPart = lyrics.substr(index + missingWord.length); // Gets the second part

        $scope.first = firstPart;
        $scope.second = secondPart;

      }).error(function(err) {
        console.log('Fetch failed; it didn\'t happen');
        console.log(err);
      });
    };

    $scope.fetch();

    $scope.updateScore = function() {
      $http({
          url: 'http://localhost:9292/points/' + $rootScope.id,
          method: 'PATCH',
          params: { score: $rootScope.points }
        }).success(function(results) {
          console.log("This is the user's new score: " + results.score);
        }).error(function(err) {
          console.log('Score updated Ajax request failed.');
          console.log(err);
        });
    };

    $scope.changeRoute = function(path) {
      $location.path('/' + path + '' );
    };

    $scope.changeRouteAdd = function() {
    $location.path('/add');
     };

    $scope.changeRouteAccount = function() {
      // goto create
      $location.path('/user');
    };

    $scope.changeRouteSongs = function() {
      // goto create
      $location.path('/songs');
    };

    $scope.guessLyric = function(guess) {
      console.log("This is their guess: " + guess);
      var answer = $scope.longestWord;
      $scope.game = true;
      if ( guess.toLowerCase() === answer.toLowerCase() ){
          console.log("You're so smart :) ");
          $rootScope.points++;
          $scope.updateScore();
          $scope.yay = false;
      } else {
          console.log("Boo, you suk.");
          $rootScope.points--;
          $scope.updateScore();
          $scope.nay = false;
      };
    };

});