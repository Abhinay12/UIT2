App.controller('editStudentController',["$scope","$http","$stateParams","Student","toaster","APISource","Grade",function($scope,$http,$stateParams,Student,toaster,APISource,Grade){
 
        console.log("Student Edit Controller Loaded");
    
    $scope.changeClass = false;    
        
        
    $scope.studentId = $stateParams.sid;
    $scope.classList = Grade.query( function(){  $scope.selectedClass = $scope.classList[0];});
    
  $http.get(APISource.currentApiPoint+"/app/admin/students/"+$scope.studentId)
        .success(function(data){
          console.log(JSON.stringify(data))  
          $scope.selectedStudent =  data;
          $scope.currentClass = data.grade + "" +data.section
  console.log(data)
           
        })
        .error(function(data){
            
        });

   
   
   
   $scope.updateBasicInfo = function(selectedStudent){
       delete selectedStudent.present_address
       delete selectedStudent.father
       delete selectedStudent.mother
       delete selectedStudent.local_guardian
       delete selectedStudent.grade
       delete selectedStudent.father_id
       delete selectedStudent.mother_id
       delete selectedStudent.local_guardian_id
       selectedStudent.dob = $('#dob').val()
       console.log(JSON.stringify(selectedStudent));
       toaster.pop("wait", "Updating Student basic info"," saving please wait.. ");
             $http.put(APISource.currentApiPoint+"/app/admin/students/"+$scope.studentId ,selectedStudent)
            .success(function(data){
                  $('.toast-wait').hide()
                                                                        $scope.pop('Success','Data saved','Notice info Updated'); 
                                                                         setTimeout(function () {
                                                                                      window.location.reload();

                                                                           }, 1000);
            })
            .error(function(data){})
    };
       
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   $scope.updateAddress = function(address){
       
       console.log("Update address");
       console.log(JSON.stringify(address))
          $http.put(APISource.currentApiPoint+"/app/admin/addresses/"+$scope.studentId,address)
            .success(function(data){
                                
                            $('.toast-wait').hide()
                                                                        $scope.pop('Success','Data saved','Address Updated successfully'); 
                                                                      setTimeout(function () {
                                                                                      window.location.reload();
//
                                                                           }, 1000);
               
            })
            .error(function(data){
                console.log(data);
                $('.toast-wait').hide()
                $scope.pop('error','Failed','Some error has been occured , check wheather username already exist'); 
                
            });
       
   };
   
   $scope.updateParentInfo = function(parentId,parentInfo)
   {
       delete parentInfo.children
       delete parentInfo.username
       console.log("update parent");
       console.log("Id = "+parentId);
       console.log("Data : ");
       console.log(JSON.stringify(parentInfo));
       
        $http.put(APISource.currentApiPoint+"/app/admin/guardian/"+parentId,parentInfo)
            .success(function(data){
                                
                            $('.toast-wait').hide()
                                                                        $scope.pop('Success','Data saved','Parent details Updated successfully'); 
                                                                      setTimeout(function () {
                                                                                      window.location.reload();
//
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