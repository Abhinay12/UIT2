///////////////////////////////////////////////////////////
function getLocalToken() {
return sessionStorage["authToken"];
}
function setLocalToken(value) {
sessionStorage["authToken"] = value;
}
////////////////////////////////////
function getHttpConfig() {
  console.log("getAhttp called");
return {
headers: {
'X-Auth-Token': getLocalToken()
}
};
}
/////////////////////////////////////////////
function getHttpConfigWithContentType() {
  console.log("getAhttp called");
return {
headers: {
'X-Auth-Token': getLocalToken(),
'Content-Type' : 'application/json'
}
};
}
////////////////////////////////////////////////
function getAuthenticateHttpConfig() {
  console.log("getAuthenticateHttpConfig  called");
return {
ignoreAuthModule: true
};
}

/* AUTHOR:SARATH */
//////////////////////////////////////////////////
App.factory('UserRole',['$cookieStore','$location', function($cookieStore,$location){
      var factory = {}
      if($cookieStore.get("role")){
      var CurUserRole = $cookieStore.get("role")[0];
      console.log("Current ROle from factory : "+CurUserRole)
      var role = {ROLE_ADMIN:"admin", ROLE_TEACHER:"teacher", ROLE_PARENT:'parent'}
                  
                              factory.role=role[CurUserRole] 
                              factory.baseDirectory ='/'+role[CurUserRole] 
                              factory.currentBaseDirectory =$location.path().substr(0, $location.path().indexOf('/',1)) 
                              factory.locationPath =$location.path()
                              
                             
                          
       }
       else
        {
                              factory.role='not set' 
                              factory.baseDirectory ='not set' 
                              factory.currentBaseDirectory ='not set'
                              factory.locationPath ='not set' 
                              
                          
        }
         return factory;
}]);

