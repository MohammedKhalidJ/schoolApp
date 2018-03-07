angular.module('starter.controllers', ['ionic','ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  
})

.controller('LoginCtrl', function($scope, $state) {
  $scope.doLogin = function() {
    if($scope.UserName == "TACW" && $scope.Password == "12345"){
      $state.go('app.dashboard');
    } else {
      alert("Enter the required value");
    }
  }
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
        $cordovaSms
          .send($scope.PhoneNumber, $scope.MessagetoSend, options)
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
  $scope.editIndex = 0;
    
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/addstudents.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.addmodal = modal;
  });
    
  $ionicModal.fromTemplateUrl('templates/editstudents.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.editmodal = modal;
  });
    
  // Triggered in the login modal to close it
  $scope.closeStudentWindow = function() {
    $scope.addmodal.hide();
  };

  // Open the login modal
  $scope.openStudentWindow = function() {
    $scope.addmodal.show();
    $scope.resetaddForm();      
  };
    
  // Triggered in the login modal to close it
  $scope.closeEditStudentWindow = function() {
    $scope.editmodal.hide();
  };

  // Open the login modal
  $scope.openEditStudentWindow = function() {
    $scope.editmodal.show();
  };
  
  $scope.resetaddForm = function() {
    document.myaddForm.reset();
  }
  
  $scope.reseteditForm = function() {
    document.myeditForm.reset();
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
    if($scope.studentData.studentName == "" || $scope.studentData.studentName == null, $scope.studentData.rollNo == "" || $scope.studentData.rollNo == null, $scope.studentData.standard == "" || $scope.studentData.standard == null, $scope.studentData.parentNo == "" || $scope.studentData.parentNo == null) {
        alert("Please enter the Mandatory Fields");
    } else {
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
          $scope.closeStudentWindow();
          $scope.resetaddForm();
        }, 1000);
    }
  };
  
  $scope.deleteStudentDetail = function(index) {
    var getData = JSON.parse(localStorage.getItem("studentData"));
    getData.splice(index,1);
    $scope.studentDataContainer= getData;  
    localStorage.setItem("studentData", JSON.stringify($scope.studentDataContainer));
  }
  
  $scope.setStudentDetail = function(index) {
    $scope.editIndex = index;
    $scope.openEditStudentWindow();
    var getData = JSON.parse(localStorage.getItem("studentData"));
    $scope.studentData.studentName = getData[index].studentName;
    $scope.studentData.rollNo = getData[index].rollNo;
    $scope.studentData.standard = getData[index].standard;
    $scope.studentData.section = getData[index].section;
    $scope.studentData.bloodGroup = getData[index].bloodGroup;
    $scope.studentData.parentName = getData[index].parentName;
    $scope.studentData.parentNo = getData[index].parentNo;
  }
  
  $scope.editStudentDetail = function() {
    if($scope.studentData.studentName == "" || $scope.studentData.studentName == null, $scope.studentData.rollNo == "" || $scope.studentData.rollNo == null, $scope.studentData.standard == "" || $scope.studentData.standard == null, $scope.studentData.parentNo == "" || $scope.studentData.parentNo == null) {
        alert("Please enter the Mandatory Fields");
    } else {
      var getData = JSON.parse(localStorage.getItem("studentData"));
      getData.splice($scope.editIndex,1,$scope.studentData);
      $scope.studentDataContainer= getData;  
      localStorage.setItem("studentData", JSON.stringify($scope.studentDataContainer));
        
      $timeout(function() {
          $scope.reseteditForm();
          $scope.closeEditStudentWindow();
          $scope.studentData = {};
        }, 1000);
    }
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
})
    
.controller('FeedbackCtrl', function($scope, $stateParams, $cordovaSms) { 
   $scope.adminNumber = "8248604861";
    
   $scope.invokemsgFunc = function() {
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
        $cordovaSms
          .send($scope.adminNumber, $scope.adminText, options)
          .then(function() {
            alert('Success');
            // Success! SMS was sent
          }, function(error) {
            alert('Error');
            // An error occurred
          });
      }
    });
});
