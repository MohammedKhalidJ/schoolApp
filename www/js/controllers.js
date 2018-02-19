angular.module('starter.controllers', ['ionic','ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistCtrl', function($scope, $stateParams, $location, $cordovaSms) {
  var path = $location.path().split("/")[3];
  var studentData = JSON.parse(localStorage.getItem("studentData"));
    
    for(var cnt=0;cnt<studentData.length;cnt++) {
        if(studentData[cnt].rollNo == path) {
            $scope.StudentName = studentData[cnt].studentName;
            $scope.PhoneNumber = studentData[cnt].parentNo;
        }
    }
    
    $scope.sendMessage = function() {
      $scope.sendSMS();
    }

    document.addEventListener("deviceready", function() {
 
      var options = {
        replaceLineBreaks: false, // true to replace \n by a new line, false by default
        android: {
          intent: '' // send SMS with the native android SMS messaging
            //intent: '' // send SMS without open any other app
            //intent: 'INTENT' // send SMS inside a default SMS app
        }
      };

      $scope.sendSMS = function() {
        var message = document.getElementById("MessagetoSend").value;
        $cordovaSms
          .send($scope.PhoneNumber, $scope.message, options)
          .then(function() {
            alert('Success');
            // Success! SMS was sent
          }, function(error) {
            alert('Error');
            // An error occurred
          });
      }
    });
    
})

.controller('studentdetailsCtrl', function($scope, $ionicModal, $timeout) {
  
  $scope.studentData = {};
  $scope.studentDataContainer = [];
    
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/addstudents.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
    
  // Triggered in the login modal to close it
  $scope.closeStudentWindow = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.openStudentWindow = function() {
    $scope.modal.show();
  };
  
  $scope.resetForm = function() {
    document.myForm.reset();
  }
  
  $scope.checkData = function() {
    if (localStorage.getItem("studentData") === null) {
    } else {
      var previousData = JSON.parse(localStorage.getItem("studentData"));
        
      for(var cnt=0; cnt<previousData.length; cnt++){
        $scope.studentDataContainer.push(previousData[cnt]);    
      }
    }      
  }
  
  // Perform the login action when the user submits the login form
  $scope.addStudentDetail = function() {
    
    $scope.studentDataContainer = [];
    if (localStorage.getItem("studentData") === null) {
      $scope.studentDataContainer.push($scope.studentData);    
      localStorage.setItem("studentData", JSON.stringify($scope.studentDataContainer));
    } else {
      var previousData = JSON.parse(localStorage.getItem("studentData"));
        
      for(var cnt=0; cnt<previousData.length; cnt++){
        $scope.studentDataContainer.push(previousData[cnt]);    
      }
        
      $scope.studentDataContainer.push($scope.studentData);
      localStorage.setItem("studentData", JSON.stringify($scope.studentDataContainer));
    }
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.resetForm();
      $scope.closeStudentWindow();
    }, 1000);
  };
  
  $scope.deleteStudentDetail = function() {
    
  }
  
  $scope.editStudentDetail = function() {
    
  }
  
  $scope.checkData();


})

.controller('DashboardCtrl', function($scope, $stateParams) {
  
  $scope.studentDataContainer = [];
  $scope.FetchData = function() {
      if (localStorage.getItem("studentData") === null) {
        } else {
          var previousData = JSON.parse(localStorage.getItem("studentData"));

          for(var cnt=0; cnt<previousData.length; cnt++){
            $scope.studentDataContainer.push(previousData[cnt]);    
          }
        }
  };
  
  $scope.FetchData();
});
