App.controller('editClassController' , ["$http","$stateParams", "$scope","Grade","APISource","Teacher","toaster",function($http,$stateParams,$scope,Grade,APISource,Teacher,toaster){
        
 console.log("Edit Controller loaded")   
   $scope.gradeId = $stateParams.cid;
         $http.get(APISource.currentApiPoint+"/app/admin/grades/"+$scope.gradeId)
        .success(function(data){
          $scope.grade =  data;
  console.log(data)
           
        })
        .error(function(data){
            
        });

$scope.sections = ["A","B","C","D","E","F","G","H","I","J"];
$scope.teachers = Teacher.query(function(){

});


$scope.updateClass = function(grade){
    
    var gradeObj = {name:grade.gradeName , section:grade.section , classTeacherId : grade.classTeacherId  }
    toaster.pop("wait", "Updating class info"," saving please wait.. ");
    $http.put(APISource.currentApiPoint+"/app/admin/grades/"+$scope.gradeId,gradeObj)
            .success(function(data){
                  $('.toast-wait').hide()
                                                                        $scope.pop('Success','Data saved','Class info Updated'); 
                                                                         setTimeout(function () {
                                                                                      window.location.reload();

                                                                           }, 1000);
            })
            .error(function(data){})
    
};

$scope.t_show=false;
  $scope.pop = function(type,title,text) {
                                                                       $scope.toaster = {
                                                                                type: (type) ? type : 'success',
                                                                                title: (title) ? title :'Title',
                                                                                text:  (text) ? text :'Message'
                                                                            };  
    toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
  };



}]);