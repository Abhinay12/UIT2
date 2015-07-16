App.controller('eventEditController',["$scope","$stateParams","$http","APISource","toaster","Event","Grade",function($scope,$stateParams,$http,APISource,toaster,Event,Grade){
        
 $scope.hours=["01","02","03","04","05","06","07","08","09","10","11","12"];
$scope.minutes=["00","05"]
var i=0;

for(i=10;i<=55;i+=5)
{
    $scope.minutes.push(i.toString())
}
      
        
        
        
        
        
         $scope.eventId = $stateParams.eid;
         $http.get(APISource.currentApiPoint+"/app/admin/events/"+$scope.eventId)
        .success(function(data){
          $scope.eventInfo =  data;
          console.log(JSON.stringify(data))
          //04:00:AM
          console.log(data['startTime'].substr(6,2))
                $scope.s_zone=data['startTime'].substr(6,2);
                $scope.s_hour=data['startTime'].substr(0,2);
                $scope.s_minute=data['startTime'].substr(3,2);
                $scope.e_zone=data['endTime'].substr(6,2)
                $scope.e_hour=data['endTime'].substr(0,2)
                $scope.e_minute=data['endTime'].substr(3,2)
               
           
        })
        .error(function(data){
            
        });


$scope.classList = Grade.query(  function(){ });




$scope.updateEvent = function(eventInfo)
                        {
                            // eventInfo['eventDate'] = $("#e_date").val();
                             console.log(JSON.stringify(eventInfo));
                             toaster.pop("wait", "Updating event info"," saving please wait.. ");
                                   
                                $http.put(APISource.currentApiPoint+"/app/admin/events/"+$scope.eventId,eventInfo)
                                        .success(function(data){

                                                        $('.toast-wait').hide()
                                                                                                    $scope.pop('Success','Data saved','TeacherInfo Updated'); 
                                                                                                     setTimeout(function () {
                                                                                                                  window.location.reload();
//
                                                                                                       }, 1000);

                                        })
                                        .error(function(data){
                                            console.log(data);
                                            $('.toast-wait').hide()
                                            $scope.pop('error','Failed','Some error has been occured'); 

                                        });

                        };







$scope.pop = function(type,title,text) { $scope.toaster = {  type: (type) ? type : 'success',
                                                              title: (title) ? title :'Title',
                                                               text:  (text) ? text :'Message'
                                                         };  
    toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
  };




}]);

