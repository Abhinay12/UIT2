App.controller('editTeacher',["$scope","$stateParams","$http","Teacher","APISource","toaster",function($scope,$stateParams,$http,Teacher,APISource,toaster){
console.log('Edit Teacher Controller Loaded');

$scope.teacherId = $stateParams.tid;
$http.get(APISource.currentApiPoint+"/app/admin/teachers/"+$scope.teacherId)
        .success(function(data){
          $scope.selectedTeacher =  data;
  console.log(data)
           
        })
        .error(function(data){
            
        });

$scope.saveTeacher = function(teacherInfo){
      toaster.pop("wait", "Updating teacher info"," saving please wait.. ");
                                   
    $http.put(APISource.currentApiPoint+"/app/admin/teachers/"+$scope.teacherId,teacherInfo)
            .success(function(data){
                                
                            $('.toast-wait').hide()
                                                                        $scope.pop('Success','Data saved','TeacherInfo Updated'); 
                                                                         setTimeout(function () {
                                                                                      window.location.reload();

                                                                           }, 1000);
               
            })
            .error(function(data){
                console.log(data);
                $('.toast-wait').hide()
                $scope.pop('error','Failed','Some error has been occured , check wheather username already exist'); 
                
            });
};
        



$scope.pop = function(type,title,text) { $scope.toaster = {  type: (type) ? type : 'success',
                                                              title: (title) ? title :'Title',
                                                               text:  (text) ? text :'Message'
                                                         };  
    toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
  };


}]);