'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [ '$scope', '$http', '$timeout', function($scope, $http, $timeout) {

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
    $http.get('questions.json').
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
    if(n == $scope.answer){
      $scope.right = n;
      $scope.correct++;
    } else{
      $scope.wrong = n;
      $scope.right = $scope.answer;
    }

    if($scope.questionNumber%5 != 0) {
      $scope.questionNumber++;
      $timeout( function(){setQuestion();}, 500);
    } else{
      $timeout( function(){
        $scope.end = true;
      }, 500);
    }
  };

  init();
}]);