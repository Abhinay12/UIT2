console.log("Edit Subject");

App.controller('EditSubjectController',["$scope","$http","$stateParams","Subject","toaster","APISource",function($scope,$http,$stateParams,Subject,toaster,APISource){
        
          $scope.subId = $stateParams.sid;
         $http.get(APISource.currentApiPoint+"/app/admin/subjects/"+ $scope.subId)
        .success(function(data){
          $scope.subjectData =  data;
            console.log(data)
           
        })
        .error(function(data){
            
        });

$scope.updateSubject = function(subject)
         {
     
     
              toaster.pop("wait", "Updating subject info"," saving please wait.. ");
              $http.put(APISource.currentApiPoint+"/app/admin/subjects/"+$scope.subId,subject)
              .success(function(data){
                  $('.toast-wait').hide()
                                                                        $scope.pop('Success','Data saved','Subject info Updated'); 
                                                                         setTimeout(function () {
                                                                                      window.location.reload();

                                                                           }, 1000);
            })
            .error(function(data){
                
                 console.log(data);
                $('.toast-wait').hide()
                $scope.pop('error','Failed','Some error has been occured , check wheather subject name already exist'); 
            });
    
         };
     
     
     
     
 





}]);