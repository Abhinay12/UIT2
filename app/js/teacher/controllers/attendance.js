
App.controller('teacherAttendanceController',['$http','$filter', 'ngTableParams', 'ngTableDataService','$timeout','$scope','$resource','Department','User','toaster','Teacher','APISource','Department','Grade','Subject','Exam','$state',function($http,$filter, ngTableParams, ngTableDataService,$timeout,$scope,$resource,Department,User,toaster,Teacher,APISource,Department,Grade,Subject,Exam,$state){
        
        console.log('Admin Attendance controllers')
        /*
 * Date picker 
 */

$scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.initDate = new Date('2016-15-20');
  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];


var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd='0'+dd
} 

if(mm<10) {
    mm='0'+mm
} 

today = dd+'-'+mm+'-'+yyyy;
/*
 * End of Date PIcker
 */
   
          //$scope.teachersList = Teacher.query(function(){ });

           $scope.classList = Grade.query(
                                                                                function(){
                                                                                    $scope.selectedClass = $scope.classList[0];
                                                                                    $scope.selectedClassTeacher = $scope.teachersList[0]
                                                                                    console.log($scope.classList)
                                                                                     $scope.classTeacherLoading = ''
                                                                                }    
                                                                                );

           ////////////////////


    $scope.ids = {};
    $scope.students = [] 
    
    $scope.getList = function()
                       {   $scope.studentIds = []
                            $("input:checkbox").each(
                                       function()
                                                  {
                                                    if(this.checked)
                                                        {
                                                           $scope.studentIds.push(this.id)
                                                         }
                                                        })
                 
                                            }
    
    
    $scope.allPresent=false;
    $scope.present_flag="A";

    $scope.allOrNot=function(){
      $scope.allPresent=!$scope.allPresent;
      if($scope.allPresent){
        $scope.present_flag="P";
      }
      else{
        $scope.present_flag="A"; 
      }
      console.log($scope.allPresent);
    }

$scope.aDate=today;
    $scope.makeAttendance=function() {
      $scope.getList();
      console.log($scope.studentIds);
      console.log($scope.aDate)
     
      var userdata={
      "present_flag" : $scope.present_flag,
      "date" : $scope.aDate,
      "grade" :  $scope.selectedClass.gradeName,
      "section" :  $scope.selectedClass.section,
      
      }
    
     if($scope.present_flag=='A')
      userdata.studentList=$scope.studentIds;
      
         $http.post(APISource.currentApiPoint+'/app/teacher/attendance/save',userdata,getHttpConfig())
            .success(function (data) {
                //$scope.gradesAndSubjects =data.gradesAndSubjects;
                //console.log($scope.gradesAndSubjects);
                $('.toast-wait').hide()
                 $scope.wizard3Loading = ''              
               $scope.pop('Success','Data saved','Exam   details added');  
            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }
        
        }]);