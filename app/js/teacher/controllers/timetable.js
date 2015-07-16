console.log("TimeTable controller")
App.controller('teacherTimeTableController',['$scope','$timeout','ngTableParams', 'ngTableDataService','APISource','$http',function($scope,$timeout,ngTableParams,ngTableDataService,APISource,$http){
        

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
  $scope.format = $scope.formats[2];

/*
 * End of Date PIcker
 */

console.log("teacherTimeTableController  Loaded");

//////////////////////////////


   
    ////////////////
$scope.getTimetable = function() {
 
console.log("hi");
$http.get(APISource.currentApiPoint+'/app/teacher/timetable/',getHttpConfig()).
success(function(data) {
  $scope.timetable=data;
  $scope.currentDay=data.Monday;
      $scope.day='Monday';
   console.log(data);
     
 
}).
error(function(data) {
    console.log("error");
  console.log(data);

});
};

$scope.getTimetable();

//////
   $scope.setCurrentDay =function(day){
    $scope.day=day;
     
       $scope.currentDay= $scope.timetable[day];
     
    };

}]);