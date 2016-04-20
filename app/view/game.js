'use strict';

angular.module('insticator.game', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/game', {
    templateUrl: 'view/game.html',
    controller: 'GameCtrl'
  });
}])

.controller('GameCtrl', [ '$scope', '$http', '$timeout', function($scope, $http, $timeout) {

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


  function init(){
    //get question data from json
    $http.get('asset/questions.json').
    success(function(data) {
      $scope.data = shuffle(data);
      $scope.start();
    }).
    error(function(data) {
      // log error
    });
  }

  function setQuestion(){
    $scope.right = 0;
    $scope.wrong = 0;
    $scope.question = $scope.data[0]['question']['title'];
    $scope.image = $scope.data[0]['question']['graphicUrl'];
    $scope.option1 = $scope.data[0]['options'][0]['title'];
    $scope.option2 = $scope.data[0]['options'][1]['title'];
    $scope.option3 = $scope.data[0]['options'][2]['title'];
    $scope.option4 = $scope.data[0]['options'][3]['title'];
    for (var i = 0; i < 4; i++) {
        if($scope.data[0]['options'][i]['title'] == $scope.data[0]['result']['title']){
          $scope.answer = i+1;
        }
    }
    $scope.data.splice(0,1);
  };

  $scope.start = function(){
    $scope.correct = 0;
    $scope.questionNumber = 1;
    $scope.end = false;
    setQuestion();
  };

  $scope.choose = function(n){
    if(n == 1){
      $scope.right = n;
      $scope.correct++;
    } else{
      $scope.wrong = n;
      $scope.right = $scope.answer;
    }

    if($scope.questionNumber%5 != 0) {
      $scope.questionNumber++;
      console.log($scope.correct);
      $timeout( function(){setQuestion();}, 500);
    } else{
      $timeout( function(){
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
      }, 500);
    }
  };

  init();
}]);