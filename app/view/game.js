'use strict';

angular.module('insticator.game', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/game', {
    templateUrl: 'view/game.html',
    controller: 'GameCtrl'
  });
}])

.controller('GameCtrl', [ '$scope', '$http', '$timeout', function($scope, $http, $timeout) {

  //shuffle array
  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  //init
  function init(){
    //get question data from json
    $http.get('asset/questions.json').
    success(function(data) {
      $scope.round = 0;
      $scope.data = shuffle(data);
      $scope.start();
    }).
    error(function(data) {
      console.log('unable to get the data.');
    });
  };

  //game begin
  $scope.start = function(){
    $scope.correct = 0;
    $scope.round = 1;
    $scope.questionIndex = 0;
    $scope.end = false;
    setQuestion($scope.data);
  };

  //game again
  $scope.again = function(){
    $scope.correct = 0;
    $scope.round ++;
    $scope.end = false;
    $scope.questionIndex = 0;
    setQuestion($scope.data);
  };

  //set up view question
  function setQuestion(data){
    $scope.questions = data.slice(($scope.round-1) * 5, ($scope.round * 5));
    console.log($scope.questions);
  };

  //choose
  $scope.choose = function(select, answer, index){
    $scope.selectedIndex = index;
    $scope.show = true;
    if(select == answer){
      $scope.correct++;
      console.log('you are right!');
    }

    if(($scope.questionIndex +1 )%5 != 0) {
      $timeout( function(){
        $scope.questionIndex ++;
      }, 500).then(function(){
        $scope.show = false;
      });
    } else{
      $timeout( function(){
        $scope.questionIndex ++;
      }, 500).then(function(){
        $scope.show = false;
        $scope.end = true;

        $('.count').each(function () {
          $(this).prop('Counter',0).animate({
            Counter: $(this).text()
          }, {
            duration: 1000,
            easing: 'swing',
            step: function (now) {
              $(this).text("0"+Math.ceil(now));
            }
          });
        });

      });

    }
  };

  init();
}]);