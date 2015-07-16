/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


App.controller('AdminExamController',['$http','$filter', 'ngTableParams', 'ngTableDataService','$timeout','$scope','$resource','Department','User','toaster','Teacher','APISource','Department','Grade','Subject','Exam','$state',function($http,$filter, ngTableParams, ngTableDataService,$timeout,$scope,$resource,Department,User,toaster,Teacher,APISource,Department,Grade,Subject,Exam,$state){
        
 /*
  * Exam submenu
  */
   console.log('Home controller loaded')   
    $scope.folders = [
    {name: 'Exam List',   folder: 'examlist',   alert: 0, icon: "icon-list" , click : "loadTeachers()" },
    {name: 'New Exam', folder: 'new', alert: 0, icon: "icon-note", click : "" },
    {name: 'Exam Schedules',   folder: 'schedule',   alert: 0,  icon: "fa-calendar" ,click : "" },
    {name: 'Exam Syllabus',   folder: 'syllabus',   alert: 0,  icon: "fa-book" ,click : "" },
   
    {name: 'Results',    folder: 'results',    alert: 0,  icon: "icon-volume-2",click : "" } ,
    
  ];
  
  
  /*
 * First time load Teacher Data
 */
       
'use strict';
// required for inner references
                                            var vm = this;
                                          console.log("Here")

                                          $scope.examListLoading = 'whirl traditional'
                                            // EXPORT CSV
                                            // 
                                            // -----------------------------------  
                                      
                                          var data
                                                  $scope.data = Exam.query(function(){
                                                         

                                                          data =  $scope.data;
                                                         
                                                          
                                                          vm.tableParams = new ngTableParams({
                                                          page: 1,            // show first page
                                                          count: 10           // count per page
                                                      }, {
                                                          total:  $scope.data.length, // length of data4
                                                          getData: function($defer, params) {
                                                              $defer.resolve( $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                                                          }
                                                      });
                                                   $scope.examListLoading ='';
                                                   
                                                    
                                            } );
                                            
                                            
                                            
  
  
  
  
  $scope.examlistControllerFunction = function(){
       
       console.log("Exam List")   
                                          $scope.reloadExamList = function(){
                                                     
                                                                                        'use strict';
                                                                                         // required for inner references
                                                                                         var vm = this;
                                                                                       console.log("Here")

                                                                                       $scope.examListLoading = 'whirl traditional'
                                                                                         // EXPORT CSV
                                                                                         // 
                                                                                         // -----------------------------------  

                                                                                       var data
                                                                                               $scope.data = Exam.query(function(){


                                                                                                       data =  $scope.data;


                                                                                                       vm.tableParams = new ngTableParams({
                                                                                                       page: 1,            // show first page
                                                                                                       count: 10           // count per page
                                                                                                   }, {
                                                                                                       total:  $scope.data.length, // length of data4
                                                                                                       getData: function($defer, params) {
                                                                                                           $defer.resolve( $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                                                                                                       }
                                                                                                   });
                                                                                                $scope.examListLoading ='';


                                                                                         } );
                                                                            };
          
      
                                                                               
      
      
   };
  /*
   * End of exam list controller function
   */
  
   $scope.newExamControllerFunction = function(){
       
       console.log("New Exam")                                                 
                                                                                $scope.generalExam = false;
                                                                                
                                                                                $scope.classList = Grade.query(
                                                                                function(){
                                                                                    console.log($scope.classList)
                                                                                    $scope.selectedClass = $scope.classList[0];
                                                                                   
                                                                                }    
                                                                                );
                                                                        
                                                                                            $scope.disabled = undefined;


                                                                                            $scope.enable = function() {
                                                                                              $scope.disabled = false;
                                                                                            };

                                                                                            $scope.disable = function() {
                                                                                              $scope.disabled = true;
                                                                                            };

                                                                                            $scope.clear = function() {
                                                                                              $scope.person.selected = undefined;
                                                                                              $scope.address.selected = undefined;
                                                                                              $scope.country.selected = undefined;
                                                                                            };

                                                                                            $scope.person = {};
                                                                                            $scope.people = []
                                                                                            $scope.listOfTeachers = Teacher.query(function()

                                                                                               {   
                                                                                                   angular.forEach($scope.listOfTeachers,function(value,key){
                                                                                                       $scope.people.push({ name: value.teacherName ,      email: value.teacherEmailId,      ID: value.teacherId } );

                                                                                                   })

                                                                                               });



                                                                                            $scope.country = {};
                                                                                            $scope.countries = []
                                                                                            $scope.listOfClasses = Grade.query(function()

                                                                                               {   
                                                                                                   angular.forEach($scope.listOfClasses,function(value,key){
                                                                                                       $scope.countries.push({ name: value.gradeName ,   code:value.section } );

                                                                                                   });

                                                                                               });


                                                                                          $scope.subject = {}
                                                                                          $scope.subjectList = []
                                                                                                 $scope.sub = Subject.query(
                                                                                                  function(){

                                                                                                           angular.forEach($scope.sub,function(value,key){
                                                                                                               $scope.subjectList.push({ name: value.subjectName ,   ID: value.subjectId }) 
                                                                                                           })           
                                                                                                      console.log($scope.subjectList)
                                                                                                  });



                                                                                            $scope.multipleSubjects = {};
                                                                                            
                                                                                            
                                                                                            
                                                                                $scope.$watch("multipleSubjects.selectedSubjects", function(newValue, oldValue) {
                                                                                              $scope.examSyllabus = [];
                                                                                                  $scope.d = new Date();
                                                                                                  $scope.d.setHours( 10 );
                                                                                                  $scope.d.setMinutes( 0 );
                                                                                                  
                                                                                                  
                                                                                             
                                                                                               angular.forEach($scope.multipleSubjects.selectedSubjects,function(value,key){
                                                                                                 
                                                                                                  $scope.examSyllabus.push({ subjectId:value.ID , subjectName:value.name , examDate:'' , examStartTime:$scope.d , examEndTime:$scope.d , syllabus:'' });
                                                                                                  
                                                                                              });
                                                                                       //       console.log(JSON.stringify($scope.examSyllabus));
                                                                                        
                                                                                });            

                                                                                            
                                                                            $scope.saveExamDetails = function(exam,syllabus){
                                                                                
                                                                                angular.forEach(syllabus,function(value,key){
                                                                                    syllabus[key]['startTime'] = $("#"+value.subjectId).val() +" "+formatHHmm(value.examStartTime)
                                                                                    syllabus[key]['endTime'] = $("#"+value.subjectId).val() +" "+formatHHmm(value.examEndTime)
                                                                                    
                                                                                })
                                                                               
                                                                                
                                                                                     try{
																						 
                                                                                         exam.schoolclass = exam.schoolclass['gradeName'];
                                                                                         exam.grade = exam.grade['gradeId'];
                                                                                     } 
                                                                                     catch(err)
                                                                                     {}
                                                                                 
                                                                               
                                                                                var postObj =  {exam : exam , schedule:syllabus };
                                                                                
                                                                                try{
																				
                                                                                    angular.forEach(postObj.schedule,function(value,key){
                                                                                            delete postObj.schedule[key]['subjectName']
                                                                                            delete postObj.schedule[key]['examDate']
                                                                                            delete postObj.schedule[key]['examStartTime']
                                                                                            delete postObj.schedule[key]['examEndTime']
                                                                                            delete postObj.schedule[key]['$$hashKey']
                                                                                    });
                                                                                    
                                                                                        
                                                                                 }
                                                                                 catch(err){}
                                                                                
                                                                                
                                                                                console.log(JSON.stringify(postObj));
                                                                                toaster.pop("wait", "Saving exam data"," saving please wait.. ");
                                                                                $http.post(APISource.currentApiPoint+'/app/admin/exam/newExam',postObj)
                                                                                                                .success(function(data){
                                                                                                                    console.log(data);
                                                                                                                     $('.toast-wait').hide()
                                                                                                                      $scope.pop('Success','Data saved','Exam details succesfully added'); 
                                                                                                                      setTimeout(function () {
                                                                                                                                    window.location.reload();

                                                                                                                            }, 1000);

                                                                                                                })
                                                                                                                .error(function(data){
                                                                                                                    console.log(data)
                                                                                                                });
                                                                            };                
                                                                                            
                                                                                            
                                                                                            
                                                                                            
                                                                                            
      
   }; 
  /*
   * End of new Exam Controller function
   */
  
   $scope.examScheduleControllerFunction = function(){
       
       console.log("Schedule")   
         $scope.examList = Exam.query(function(){
             $scope. selectedExam = $scope.examList[0] 
         });
      
       
      
   }; 
  /*
   * 
   * End of exam schedule controller
   */ 
  
  
     $scope.examSyllabusControllerFunction = function(){
       
       console.log("examSyllabusControllerFunction")   
         $scope.examList = Exam.query(function(){
             $scope. selectedExam = $scope.examList[0] 
             $scope.selectedExamSubject = $scope. selectedExam[0]
             $scope.editSyllabus = true
         });
        
        $scope.updateSyllabus = function(id,syllabus)
                                {
                                   var putData  = syllabus
                                    toaster.pop("wait", "Saving data"," saving please wait.. "); 
                                   $http.put(APISource.currentApiPoint+'/app/exams/syllabus/'+id, putData).
                                                                                            success(function(data, status, headers, config) {
                                                                                              
                                                                                              console.log(data)
                                                                                               $('.toast-wait').hide()
                                                                                               $scope.wizard3Loading = ''
                                                                                               $scope.pop('Success','Data saved','Syllabus has been updated');  
                                                                                              
                                                                                            }).
                                                                                            error(function(data, status, headers, config) {
                                                                                              // called asynchronously if an error occurs
                                                                                              // or server returns response with an error status.
                                                                                            });  
                                };
       
       
      
   };
   
       $scope.classExamsControllerFunction = function(){
       
       console.log("classExamsControllerFunction")   
      
   };
   
       $scope.generalExamsControllerFunction = function(){
       
       console.log("generalExamsControllerFunction")   
      
   };
   
       $scope.examResultControllerFunction = function(){
       
       console.log("examResultControllerFunction")   
      
   };
   
  
  
  
  
  
  
  
   $scope.mytime = new Date();

  $scope.hstep = 1;
  $scope.mstep = 15;




/*
 * Time Picker
 */
    $scope.options = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };

  $scope.ismeridian = true;
  $scope.toggleMode = function() {
    $scope.ismeridian = ! $scope.ismeridian;
  };

  $scope.update = function() {
    var d = new Date();
    d.setHours( 14 );
    d.setMinutes( 0 );
    $scope.mytime = d;
  };

  $scope.changed = function () {
    console.log('Time changed to: ' + $scope.mytime);
  };

  $scope.clear = function() {
    $scope.mytime = null;
  };
  
  
/*
 * End Time Picker
 */  
  
  
  
/*
 * Date Picker
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
  $scope.formats = ['dd-MM-yyyyf','dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  
/*
 * End of Date Picker
 */  
  
  
  
  
  
  $scope.pop = function(type,title,text) {
                                                                       $scope.toaster = {
                                                                                type: (type) ? type : 'success',
                                                                                title: (title) ? title :'Title',
                                                                                text:  (text) ? text :'Message'
                                                                            };  
    toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
  };

  
  
  
  
  
  
  
  }]);