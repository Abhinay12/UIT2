/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

App.controller('AdminTimeTableController',['$http','$filter', 'ngTableParams', 'ngTableDataService','$timeout','$scope','$resource','Department','User','toaster','Teacher','APISource','Department','Grade','Subject','Exam','ClassTimeTable','$state',function($http,$filter, ngTableParams, ngTableDataService,$timeout,$scope,$resource,Department,User,toaster,Teacher,APISource,Department,Grade,Subject,Exam,ClassTimeTable,$state){
    
     console.log("AdminTimeTableController loaded")
     $scope.folders = [
    {name: 'Class TimeTables',   folder: 'classTimeTable',   alert: 0, icon: "fa-home " , click : "loadTeachers()" },
     {name: 'New Class TimeTable',   folder: 'newClassTimeTable',   alert: 0, icon: "icon-plus" , click : "loadTeachers()" } 

    
  ];
  
  
  
  
     $scope.classTTControllerFunction = function(){
               
                         console.log(" $scope.classTTControllerFunction ");    $scope.classListLoading = 'whirl traditional'
                                                                                $scope.classList = Grade.query(
                                                                                function(){
                                                                                   
                                                                                }    
                                                                                );
                                                                        
                                                                         $scope.classTimeTableLoading = 'whirl traditional'
                                                                         $http.post( APISource.currentApiPoint+'/app/admin/classTimetables', {}).
                                                                                    success(function(data, status, headers, config) {
                                                                                        $scope.classTimeTableList = data
                                                                                        $scope.selectedClass = data[0];
                                                                                        $scope.selectedDay = $scope.selectedClass.timetables[0] 
                                                                                          $scope.classTimeTableLoading = ''
                                                                                    }).
                                                                                    error(function(data, status, headers, config) {
                                                                                      // called asynchronously if an error occurs
                                                                                      // or server returns response with an error status.
                                                                                    });
                                                                        
                                                                        
                                                                        
      };
      /*
       * End of  $scope.classTTControllerFunction
       */
  
  $scope.teacherTTControllerFunction = function(){
             console.log(" $scope.TeacherTTControllerFunction ");
     }; 
     /*
      * End of teacherTTControllerFunction
      */
     
  
  
  
  
  
  
  /*
   * New Class Timetable
   * 
   */
  
  $scope.newClassTimeTable = function(){
      
      
      console.log("New Class TimeTable")
  };
  
  
  /*
   * End of new Class TimeTable
   */
  
  
  
  
    
    }]);