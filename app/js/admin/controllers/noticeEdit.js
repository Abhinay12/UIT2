App.controller('noticeEditController',["$scope","$http","$stateParams","Notice","toaster","APISource",function($scope,$http,$stateParams,Notice,toaster,APISource){
        
   console.log("Edit Notice Loaded");
   
   $scope.noticeId = $stateParams = $stateParams.nid;
   $http.get(APISource.currentApiPoint+"/app/admin/notice/"+$scope.noticeId)
        .success(function(data){
          $scope.noticeInstance =  data;
  console.log(JSON.stringify(data))
           
        })
        .error(function(data){
            
        });


  
    $scope.updateNotice = function(notice){
        
           console.log(JSON.stringify(notice))
           toaster.pop("wait", "Updating Notice info"," saving please wait.. ");
             $http.put(APISource.currentApiPoint+"/app/admin/notice/"+$scope.noticeId ,notice)
            .success(function(data){
                  $('.toast-wait').hide()
                                                                        $scope.pop('Success','Data saved','Notice info Updated'); 
                                                                         setTimeout(function () {
                                                                                      window.location.reload();

                                                                           }, 1000);
            })
            .error(function(data){})
    };































$scope.pop = function(type,title,text) { $scope.toaster = {  type: (type) ? type : 'success',
                                                              title: (title) ? title :'Title',
                                                               text:  (text) ? text :'Message'
                                                         };  
    toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
  };

   
        
}]);