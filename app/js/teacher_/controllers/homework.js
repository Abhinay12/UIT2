console.log("HomeWork Controller Loaded")   

App.controller('teacherHomeworkController',['$scope','$timeout','ngTableParams', 'ngTableDataService','Student','Grade',function($scope,$timeout,ngTableParams,ngTableDataService,Student,Grade){
        


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
                   $scope.sub = Student.query(
                    function(){

                             angular.forEach($scope.sub,function(value,key){
                                 $scope.studentList.push({ studentName: value.studentName ,   ID: value.studentId }) 
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
    
    
    
    
    
        
}]);