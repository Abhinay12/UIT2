console.log("HomeWork Controller Loaded")   

App.controller('teacherHomeworkController',['$scope','$timeout','ngTableParams', 'ngTableDataService','Student','Grade','$http','APISource',function($scope,$timeout,ngTableParams,ngTableDataService,Student,Grade,$http,APISource){
        


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

/*
 * End of Date PIcker
 */
    
    
    /*
     * Pick students
     */
    
                $scope.disabled = undefined;

                $scope.enable = function() {
                  $scope.disabled = false;
                };

                $scope.disable = function() {
                  $scope.disabled = true;
                };
                $scope.students = {}
                $scope.studentList = []
                 $scope.studentIds = []
                   $scope.sub = Student.query(
                    function(){

                             angular.forEach($scope.sub,function(value,key){
                                 $scope.studentList.push({ studentName: value.studentName ,   ID: value.studentId}) ;
                                
                             })           
                        console.log($scope.studentList)
                    });



              $scope.multipleStudents = {};
    
      /*
       * End of pick students
       */
    
                                                                        $scope.allStudents = true
                                                                                $scope.classList = Grade.query(
                                                                                function(){
                                                                                    $scope.selectedClass = $scope.classList[0];
                                                                                    $scope.selectedClassTeacher = $scope.teachersList[0]
                                                                                    console.log($scope.classList)
                                                                                     $scope.classTeacherLoading = ''
                                                                                }    
                                                                                );
    
    
    /////////////////
   $scope.studentIdList = new Array()
      

    $scope.sendHomework = function() {
      angular.forEach($scope.multipleStudents.selectedStudents,function(value,key){
                                 $scope.studentIdList.push(value.ID) 
                      });
      console.log($scope.mode);
      var userData;
      if($scope.mode=='s'){
      userData={
                "gradeFlag" : "s",
                "grade": $scope.selectedClass.gradeName,
                 "section": $scope.selectedClass.section,
                 "subject": $scope.subject,
                "studentList":$scope.studentIdList,
               "homework": $scope.homework,
                "dueDate": $scope.date,
                "message": $scope.message
      }
    }
    else if($scope.mode=='g'){
       userData={
                "gradeFlag" : "g",
                "grade": $scope.selectedClass.gradeName,
                 "section": $scope.selectedClass.section,
                 "subject": $scope.subject,
                "homework": $scope.homework,
                "dueDate": $scope.date,
                "message": $scope.message
      }
    }
        
      
      console.log($scope.homeworkData);
      $http.post(APISource.currentApiPoint+'/app/teacher/homework/save',userData,getHttpConfig()).
      success(function(data) {
        //$location.path("/message-details");
      console.log(data);
      }).
      error(function(data) {
          console.log("error");
        console.log(data);

      });
      };

      /////////////////////////////////////////////////////////////////////////
//get grades and sections
$scope.getClasses=function() {
         $http.get(APISource.currentApiPoint+'/app/teacher/getAllSubjectsInAllGrades',getHttpConfig())
            .success(function (data) {
                $scope.gradesAndSubjects =data.gradesAndSubjects;
                //console.log($scope.gradesAndSubjects);
            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }

////////////////////////////////////////////////////////////////////////
    $scope.getClasses();
    
        
}]);