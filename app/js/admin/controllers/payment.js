/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


App.controller('AdminPaymentController',['$http','$filter', 'ngTableParams', 'ngTableDataService','$timeout','$scope','$resource','User','toaster','Teacher','APISource','Grade','ClassFee', '$state',function($http,$filter, ngTableParams, ngTableDataService,$timeout,$scope,$resource,User,toaster,Teacher,APISource,Grade,ClassFee,$state){
        
 /*
  * Exam submenu
  */
   console.log('Home controller loaded')   
    $scope.folders = [
    {name: 'Add new Fees',   folder: 'newFee',   alert: 0, icon: "icon-calendar" , click : "" } ,
    {name: 'Student Payment Schedule',   folder: 'studentPaySchedule',   alert: 0, icon: "fa-credit-card" , click : "" , extra:"" } ,
  
   
    
  ];
  
  
  
  
  $scope.classPayments =  function(){
      $scope.months = ['APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC','JAN','FEB','MAR']
      $scope.quarters = ['1st Quarter' , '2nd Quarter' ,'3rd Quarter' ,'4th Quarter']
      console.log("Class Payments");                                            $scope.classTeacherLoading = 'whirl traditional'
      
                                                                                $scope.classList = Grade.query(
                                                                                function(){
                                                                                    $scope.selectedClass = $scope.classList[0];
                                                                                   
                                                                                      $scope.feeList = ClassFee.query(
                                                                                function(){
                                                                                    console.log(JSON.stringify($scope.feeList))
                                                                                    $scope.selectedFee = $scope.feeList[0];
                                                                                    
                                                                                });       
                                                                                            
                                                                                    $scope.classTeacherLoading = '';
                                                                                    
                                                                                }
                                                                                        
                                                                                );
      
  };
  
  $scope.newFee = function(){
      
      console.log("New fee")
                                                                                $scope.classList = Grade.query(
                                                                                function(){
                                                                                    $scope.selectedClass = $scope.classList[0];
                                                                                });
      
  };
  
  $scope.studentPaySchedule = function(){
      console.log("Pay Schedule");
                                                                                $scope.classList = Grade.query(
                                                                                function(){
                                                                                    $scope.selectedClass = $scope.classList[0];
                                                                                    
                                                                                });
                                                                                $scope.feeList = ClassFee.query(
                                                                                function(){
                                                                                    console.log(JSON.stringify($scope.feeList))
                                                                                    $scope.selectedFee = $scope.feeList[0];
                                                                                    
                                                                                });
      
  };
  
  
   $scope.payFees = function(){
       
       console.log("Pay fees");
       
                                                                                $scope.classList = Grade.query(
                                                                                function(){
                                                                                    $scope.selectedClass = $scope.classList[0];
                                                                                   
                                                                                      $scope.feeList = ClassFee.query(
                                                                                function(){
                                                                                    console.log(JSON.stringify($scope.feeList))
                                                                                    $scope.selectedFee = $scope.feeList[0];
                                                                                    
                                                                                });       
                                                                                            
                                                                                    $scope.classTeacherLoading = '';
                                                                                    
                                                                                }
                                                                                        
                                                                                );
   
   
   };
       
       
       
       
  
  
  
  }]);