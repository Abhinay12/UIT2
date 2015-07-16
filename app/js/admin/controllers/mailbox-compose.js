
App.controller('adminComposeControllers', ['$scope', 'mails', '$stateParams','$http','$filter','APISource','$cookieStore', function($scope, mails, $stateParams,$http,$filter,APISource,$cookieStore) {
 
 console.log("loaded");
 $scope.currentUser = $cookieStore.get("currentUser");
 $scope.sendMail=function(contents) {
  
  var userData={

              "toId" : $scope.to ,

              "fromId" : $scope.currentUser,

              "title" : $scope.subject ,

              "messageText" : $scope.message

              }
         $http.post(APISource.currentApiPoint+'/app/conversations/new',userData,getHttpConfig())
            .success(function (data) {
                
                //console.log($scope.gradesAndSubjects);
            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }

}]);