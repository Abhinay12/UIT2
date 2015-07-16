/**=========================================================
 * Module: access-login.js
 * for login api
 =========================================================*/

App.controller('LoginFormController', ['$scope', '$http', '$state','Data','authService', '$cookieStore','$location','$rootScope', function($scope, $http, $state,Data,authService, $cookieStore,$location,$rootScope) {

  // bind here all data from the form
  $scope.account = {};
  // place the message if something goes wrong
  $scope.authMsg = '';

 //////////////////////////////////////
$scope.$on('updateHeader', function() {
  console.info('updateHeader event received')
  $scope.isAuthenticated = $cookieStore.get("loggedIn") == "true";
  $scope.currentUser = $cookieStore.get("currentUser");
  var roleArray = { ROLE_ADMIN:'admin' , ROLE_PARENT : 'parent',ROLE_TEACHER : 'teacher' }
  $scope.role=roleArray[$cookieStore.get("role")];
  console.log("role c "+$scope.role);
  $location.path('/'+$scope.role+'/home')
  
 
 });

//////////////////////////////////////////////
//////////////////////////////////////////////

$scope.login = function() {
    $scope.loading = 'whirl traditional'
    $http.post(Data.currentApiPoint+'/api/login', {username: $scope.account.email, password: $scope.account.password}, getAuthenticateHttpConfig()).
    success(function(data) {
     
      $rootScope.username = data
      console.log('authentication token: ' + data.access_token);
      console.log('authentication username: ' + data.username);
      console.log('authentication roles: ' + data.roles);
      $cookieStore.put("loggedIn", "true");
      $cookieStore.put("currentUser", data.username);
      $cookieStore.put("role", data.roles);
    
      setLocalToken(data.access_token);
        authService.loginConfirmed({}, function(config) {
        var localToken = getLocalToken();
        var headerToken = config.headers["X-Auth-Token"];
        if(!headerToken || (headerToken != localToken)) {
          console.log('X-Auth-Token not on original request or different; updating it');
          console.info('Local Token: ' + localToken);
          console.info('Header Token: ' + headerToken);
          config.headers["X-Auth-Token"] = getLocalToken();
        }
        return config;
      });
      
        $scope.$emit('updateHeader');
    }).
    error(function(data) {
      console.log(data);
      console.log('login error: ' + data);
      $scope.loading = ''
      //$rootScope.$broadcast('event:auth-loginFailed', data);
    });

    }

 





}]);



