/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */




console.log('Teacher Controlle loaded')

App.controller('AdminTeacherHomeController',['$http','$filter', 'ngTableParams', 'ngTableDataService','$timeout','$scope','$resource','Department','User','toaster','Teacher','APISource','Department','Grade','Subject','$state','Upload',function($http,$filter, ngTableParams, ngTableDataService,$timeout,$scope,$resource,Department,User,toaster,Teacher,APISource,Department,Grade,Subject,$state,Upload){
        
 /*
  * Teacher submenu
  */
   console.log('Home controller loaded')   
    $scope.folders = [
    {name: 'Complete Teacher List',   folder: 'teacherList',   alert: 0, icon: "icon-list" , click : "loadTeachers()" },
    {name: 'Departments', folder: 'departments', alert: 0, icon: "icon-home", click : "" },
    {name: 'Add New Teacher',    folder: 'new',    alert: 0,  icon: "icon-user-follow",click : "" },
    {name: 'Assign Class Teacher',   folder: 'classTeachers',   alert: 0,  icon: "fa-users" ,click : "" },
    {name: 'Class-Subject List',   folder: 'class_subjects',   alert: 0,  icon: "fa-book" ,click : "" },
    {name: 'Teacher Evaluation',   folder: 'teacherEval',   alert: 0,  icon: "icon-bar-chart" ,click : "" }
    
  ];

  $scope.labels = [
    {name: 'Red',     color: 'danger'},
    {name: 'Pink',    color: 'pink'},
    {name: 'Blue',    color: 'info'},
    {name: 'Yellow',  color: 'warning'}
  ];

/*
 * End submenu
 */ 
 
 
 /*
  * Load departments
  */
 

 
 
 
 
 
 
 
 
 
 $scope.addNew = function(){
     
                               console.log("Add new")   
                               $scope.saveTeacher = function(teacherRegister){
                               teacherRegister.password = '123'    
                               $scope.newTeacher = new Teacher(teacherRegister);
                               console.log(teacherRegister)
                         
                                        $scope.newTeacher.$save(function(data){
                                               
                                             console.log(data)  
                                             $http.post(APISource.currentApiPoint+'/app/admin/userRole',{ id:data.teacherId.toString() , role:"1"}).
                                                                        success(function(data, status, headers, config) {
                                                                         
                                                                             console.log(data)
                                                                        }).
                                                                        error(function(data, status, headers, config) {
                                                                          // called asynchronously if an error occurs
                                                                          // or server returns response with an error status.
                                                                        });
                                             
                                             $scope.pop('Success','Data saved','New Teacher  '+data.teacherName+"   Added");  
                                                             
                                             $scope.teacherRegister=''
                                             
                                                        
                                        });                   
                                                                 
  
                               };
                         
     
                     };
 
 
 
 
 $scope.teacherList = function(){
                      
                           
                  };
 
 
 $scope.teacherDepartments = function(){
                          
                          $scope.depts = Department.query(function(){
                             $scope.showList = false
                          } );
     
                          console.log("Teacher depts")
                        
                        $scope.loadWizard2 = function(selectedDept){
                                                        $scope.wizard2Loading = 'whirl traditional'
                                                        $scope.existingTeachers = [];
                                                        $http.get(APISource.currentApiPoint+'/app/admin/getTeachers/'+selectedDept).
                                                                        success(function(data, status, headers, config) {
                                                                          if(data.status == true)
                                                                           {
                                                                             
                                                                                    angular.forEach(data.teachers, function(value, key) {
                                                                                      this.push(value.teacherId.toString());
                                                                                    }, $scope.existingTeachers);
                                                                           }
                                                                           console.log($scope.existingTeachers)
                                                                        }).
                                                                        error(function(data, status, headers, config) {
                                                                          // called asynchronously if an error occurs
                                                                          // or server returns response with an error status.
                                                                        });
                                                       
                                                       
                                                        $scope.deptTeacherList = Teacher.query(function(){
                                                           
                                                        var len = $scope.deptTeacherList.length
                                                        var limit = len/5
                                                        var k=0
                                                        $scope.mainArray = new Array()
                                                        for(i=0;i<limit ;i++)
                                                        {
                                                            var subarray
                                                            var jlimit = 5
                                                            var remaining = len-k
                                                            if(remaining > 5 ) {subarray = new Array(5) } else { subarray = new Array(remaining) ; jlimit = remaining }

                                                            for(j=0;j<jlimit;j++,k++)
                                                            {
                                                               /* Add extra label called checked to determine already exising teachers*/ 
                                                                if($scope.existingTeachers.indexOf($scope.deptTeacherList[k]['teacherId']) == -1 )  
                                                                  { $scope.deptTeacherList[k]['checked'] = false }
                                                                else
                                                                  {$scope.deptTeacherList[k]['checked'] = true } 
                                                                
                                                                subarray[j] = $scope.deptTeacherList[k]
                                                            }
                                                            $scope.mainArray.push(subarray)
                                                        }
                                                        
                                                        
                                                        $scope.selectedTeachers = [];
                                                        angular.forEach($scope.existingTeachers, function(value, key) {
                                                                            this.push(value);
                                                                          }, $scope.selectedTeachers);

                                                        $scope.wizard2Loading = ''

                                                        });
                                                     };
                        
                                                  
                        
                                                                      

                                                                    // toggle selection for a given fruit by name
                                                                    $scope.toggleSelection = function toggleSelection(teacher) {
                                                                      var idx = $scope.selectedTeachers.indexOf(teacher);

                                                                      // is currently selected
                                                                      if (idx > -1) {
                                                                        $scope.selectedTeachers.splice(idx, 1);
                                                                      }

                                                                      // is newly selected
                                                                      else {
                                                                        $scope.selectedTeachers.push(teacher);
                                                                      }
                                                                    };
                                                                    
                                                                    
                                                                    
                                                                  $scope.disabled = undefined;
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                                  
                                                              $scope.saveDepartmentTeachers = function(selectedTeachers,departmentName){
                                                                  
                                                                  $scope.wizard3Loading = 'whirl traditional';
                                                                  toaster.pop("wait", "Saving data"," saving please wait.. ");
                                                                  
                                                                  var postData = {
                                                                                    departmentName : departmentName.toString() ,
                                                                                    teachers : selectedTeachers
                                                                                    }; console.log(postData)
                                                                                            $http.post(APISource.currentApiPoint+'/app/admin/assignDepartment', postData).
                                                                                            success(function(data, status, headers, config) {
                                                                                              console.log(data)
                                                                                               $('.toast-wait').hide()
                                                                                               $scope.wizard3Loading = ''
                                                                                               $scope.pop('Success','Data saved','Department details added');  
                                                                                              
                                                                                            }).
                                                                                            error(function(data, status, headers, config) {
                                                                                              // called asynchronously if an error occurs
                                                                                              // or server returns response with an error status.
                                                                                            });
                                                                  
                                                              
                                                              }    
                                                                  
                                                             
     
                                                            $scope.loadDepartmentList =  function(){
                                                                   $scope.loadDepartmentListWaiting = 'whirl traditional'
                                                                   $scope.depts = Department.query(function(){
                                                                                   $scope.loadDepartmentListWaiting = ''
                                                                                 } );
                                                              } 
                                                                  
                                                                  

  
  
                          
                  };
 /*
  * 
  * End department state
  */
 
 
 
 $scope.assignClassTeacher = function(){
                                                                        
     
                                                                            $scope.classTeacherLoading = 'whirl traditional'
                                                                            console.log("Assign class teacher")
                                                                            $scope.teachersList = Teacher.query(function(){

                                                                            });
                                                                            $scope.classList = Grade.query(
                                                                                function(){
                                                                                    $scope.selectedClass = $scope.classList[0];
                                                                                    $scope.selectedClassTeacher = $scope.teachersList[0]
                                                                                    console.log($scope.classList)
                                                                                     $scope.classTeacherLoading = ''
                                                                                }    
                                                                                );
                                                                        
                                                                        $scope.saveClassTeacher = function(grade,teacher){
                                                                             toaster.pop("wait", "Saving data"," saving please wait.. ");
                                                                             $scope.classTeacherLoading = 'whirl traditional'
                                                                             var postData = { gradeId : grade ,  teacherId : teacher } 
                                                                             $http.post(APISource.currentApiPoint+'/app/admin/setClassTeacher', postData).
                                                                                            success(function(data, status, headers, config) {
                                                                                              console.log(data)
                                                                                               $('.toast-wait').hide()
                                                                                               $scope.classTeacherLoading = ''
                                                                                               $scope.pop('Success','Data saved','Class teacher successfully added');  
                                                                                              $state.go('admin.Teachers.classTeachers', {}, { reload: true })
                                                                                             
                                                                                            }).
                                                                                            error(function(data, status, headers, config) {
                                                                                              // called asynchronously if an error occurs
                                                                                              // or server returns response with an error status.
                                                                                            });
                                                                        }
                                                                           
 };
 
 
 /*
  * 
  * End of assign class teacher
  * 
  */
 
 
 
 
 
 
 /*
  * 
  *  Assign classes and subjects
  */
 
 
 
 $scope.teacherClassesAndSubjects = function(){
     
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




         $scope.saveTeacherClassSubjectList = function(teacher,grade,subjects){
              toaster.pop("wait", "Saving data"," saving please wait.. ");
             var teacherId = teacher.ID;
             var gradeName = grade.name;
             var section = grade.code
             var subjectIds = []
             angular.forEach(subjects,function(value,key){
                 subjectIds.push(value.ID);
                 
             });
            
             var postObj = { teacherId:teacherId , grade:gradeName , section:section , subjects : subjectIds };
             $http.post(APISource.currentApiPoint+'/app/admin/teacher/subjectsInGrade',postObj)
                     .success(function(data){
                         console.log(data.status)
                                if(data.status == 'success')
                                 {
                                        $('.toast-wait').hide()
                                        $scope.pop('Success','Data saved','Details successfully saved..');  
                                         setTimeout(function () {
                                                    window.location.reload();

                                            }, 1500);
                                                                                           
                                     
                                 }
                               
                             })
                     .error(function(data){
                              console.log(data)
                             });
            
         };

     










 };
 
 /*
  * end of assign classes and subjects
  */
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 $scope.pop = function(type,title,text) {
                                                                       $scope.toaster = {
                                                                                type: (type) ? type : 'success',
                                                                                title: (title) ? title :'Title',
                                                                                text:  (text) ? text :'Message'
                                                                            };  
    toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
  };
 











$scope.loadTeacherTable = function(){
                                            'use strict';
                                            // required for inner references
                                            var vm = this;
                                          console.log("Here")

                                          $scope.teacherListLoading = 'whirl traditional'
                                            // EXPORT CSV
                                            // 
                                            // -----------------------------------  
                                      
                                          var data
                                                  $scope.data = Teacher.query(function(){
                                                         

                                                          data =  $scope.data;
                                                          angular.forEach($scope.data, function(value,key){value.gradeName = parseInt(value.gradeName) ;  } );
                                                          
                                                          vm.tableParams = new ngTableParams({
                                                          page: 1,            // show first page
                                                          count: 10           // count per page
                                                      }, {
                                                          total:  $scope.data.length, // length of data4
                                                           sorting: {
                                                                                    teacherName: "asc",
                                                                                    teacherId:"asc"
                                                                                  },
                                                          getData: function($defer, params) {
                                                              $defer.resolve( $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                                                          }
                                                      });
                                                   $scope.teacherListLoading ='';
                                                   
                                                    
                                            } );
                                            

       }; 

/*
 * First time load Teacher Data
 */
       
'use strict';
                                            // required for inner references
                                            var vm = this;
                                          console.log("Here")

                                          $scope.teacherListLoading = 'whirl traditional'
                                            // EXPORT CSV
                                            // 
                                            // -----------------------------------  
                                      
                                          var data
                                                  $scope.data = Teacher.query(function(){
                                                         
                                                       
                                                          data =  $scope.data;
														  console.log(JSON.stringify(data))
                                                          angular.forEach($scope.data,  function(value,key){value.gradeName = parseInt(value.gradeName) ;  } );
                                                          
                                                          vm.tableParams = new ngTableParams({
                                                          page: 1,            // show first page
                                                          count: 10           // count per page
                                                      }, {
                                                          total:  $scope.data.length, // length of data4
                                                           sorting: {
                                                                                    teacherName: "asc",
                                                                                    teacherId:"asc"
                                                                                  },
                                                          getData: function($defer, params) {
                                                              $defer.resolve( $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                                                          }
                                                      });
                                                   $scope.teacherListLoading ='';
                                                   
                                                    
                                            } );
                                            
       $scope.teacherEval =  function()                            
                                {
                                    
                                        $scope.years = ['2014','2015','2016','2017','2018']
                                        console.log('Teacher Evauation');
                                        $scope.classTeacherLoading = 'whirl traditional'
                                                                            console.log("Assign class teacher")
                                                                            $scope.teachersList = Teacher.query(function(){

                                                                            });
                                                                            
                                                                        
                                                                            
                                    

                                };
                                                      
                                                     

                                                            $scope.upload = function (files,id,year) {
                                                                
                                                                console.log(id+year)
                                                             
                                                                if (files && files.length) {
                                                                    for (var i = 0; i < files.length; i++) {
                                                                        var file = files[i];
                                                                        Upload.upload({
                                                                            url: APISource.currentApiPoint+'/app/teacherEval/upload',
                                                                            headers: { "X-Auth-Token": getLocalToken() },
                                                                            data : {  'teacherId' : id,
                                                                                       'year' : year  },
                                                                            fields: {
                                                                                'username': $scope.username 

                                                                            },
                                                                            file: file ,


                                                                        }).progress(function (evt) {
                                                                            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                                                                            $scope.log = 'progress: ' + progressPercentage + '% ' +
                                                                                        evt.config.file.name + '\n' + $scope.log;
                                                                        }).success(function (data, status, headers, config) {
                                                                            $scope.log = 'file ' + config.file.name + '  uploaded. Response: ' + JSON.stringify(data) + '\n' ;
                                                                            console.log(data)
                                                                            $scope.$apply();
                                                                        });
                                                                    }
                                                                }
                                                            };   
                                            
                                            

 
        
}]);


