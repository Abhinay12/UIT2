App.controller('teacherHomeController', ['$scope', '$modal','$cookieStore', function ($scope, $modal,$cookieStore) {

  
       $scope.currentUser = $cookieStore.get("currentUser");  
       console.log(  $scope.currentUser);
  

}]);