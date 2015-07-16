

App.controller('addTimeTable',["$http","$scope",'Grade','APISource','Teacher','Subject','toaster',function($http,$scope,Grade,APISource,Teacher,Subject,toaster){
console.log("New TimeTable Controller loaded");

/*
 * Class List
 */
$scope.classList = Grade.query(function(){ $scope.selectedClass = $scope.classList[0];
                                                    $scope.selectedClass = $scope.classList[0]
                                                   
                                                                                });
                                                                        
/*
 * End class List
 */
$scope.days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
$scope.selectedDay = $scope.days[0]
$scope.hours=["01","02","03","04","05","06","07","08","09","10","11","12"];
$scope.minutes=["00","05"]
var i=0;

for(i=10;i<=55;i+=5)
{
    $scope.minutes.push(i.toString())
}
$scope.s_zone="AM";
$scope.s_hour="00";
$scope.s_minute="00";
$scope.e_zone="AM";
$scope.e_hour="00"
$scope.e_minute="00";


/*
 * Teacher List
 */

  $scope.teachersList = Teacher.query(function(){ $scope.teachersList.push({teacherId:'0' ,teacherName:'Not Applicable'}) });
  $scope.subjectList = Subject.query(function(){ $scope.subjectList.push({subjectName:'Interval', subjectId:'0' } ) });
/*
 * End teacher LIst
 */

/*
 * element to POST
 */
   // $scope.timeTableEntries = { gradeId:$scope.selectedClass.gradeId , day:$scope.selectedDay , timetables:$scope.timeTableElement }
    
/*
 * 
 */

 var counter=0;
    $scope.timeTableElement = [ {id:counter,  start : '08:00:AM', end:'09:00:AM' , teacherId : '' , subject:''} ];

    $scope.newItem = function($event){
        counter++;
        $scope.timeTableElement.push(  { id:counter, start : '00:00', end : '00:00', teacherId : '',subject:''} );
        $event.preventDefault();
    }
    $scope.inlinef= function($event,inlinecontrol){
        var checkbox = $event.target;
        if(checkbox.checked){
            $('#'+ inlinecontrol).css('display','inline');
        }else{
            $('#'+ inlinecontrol).css('display','');
        }

    }
    $scope.showitems = function($event){
        $('#displayitems').css('visibility','none');
    };
    
    
 /*
  * POST to server
  */   
 $scope.postTimetable = function()
 {
      toaster.pop("wait", "Saving data"," saving please wait.. ");
     $scope.timeTableEntries = { gradeId:$scope.selectedClass.gradeId , day:$scope.selectedDay , timetables:$scope.timeTableElement };
     console.log(JSON.stringify($scope.timeTableEntries));
     $http.post(APISource.currentApiPoint+'/app/admin/timetable/save',$scope.timeTableEntries)
             .success(function(data){
                 console.log(data);
                  $('.toast-wait').hide()
                   $scope.pop('Success','Data saved','TimeTable Entries details added'); 
                   setTimeout(function () {
                                 window.location.reload();
                                
                         }, 1000);
                                                                                          
             })
             .error(function(data){
                 console.log(data)
             });
     
 };
 
 
 
 
   $scope.pop = function(type,title,text) {
                                                                       $scope.toaster = {
                                                                                type: (type) ? type : 'success',
                                                                                title: (title) ? title :'Title',
                                                                                text:  (text) ? text :'Message'
                                                                            };  
    toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
  };

    
    
        
}]);