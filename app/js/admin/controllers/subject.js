/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
App.controller('AdminSubjectController',['$http','$filter', 'ngTableParams', 'ngTableDataService','$timeout','$scope','$resource','Department','User','toaster','Teacher','APISource','Department','Grade','Subject','Exam','$state',function($http,$filter, ngTableParams, ngTableDataService,$timeout,$scope,$resource,Department,User,toaster,Teacher,APISource,Department,Grade,Subject,Exam,$state){
        
          console.log('Subject controller loaded')   
    $scope.folders = [
    {name: 'Add new subject',   folder: 'new',   alert: 0, icon: "icon-plus" , click : "" },
   {name: 'View subject list',   folder: 'list',   alert: 0, icon: "icon-list" , click : "" } ,
   {name: 'Subjects in Classes',   folder: 'classSubjects',   alert: 0, icon: "icon-note" , click : "" }
        ];

        
                                          var vm = this;
                                          console.log("Here")

                                          $scope.subjectListLoading = 'whirl traditional'
                                            // EXPORT CSV
                                            // 
                                            // -----------------------------------  
                                      
                                          var data
                                                  $scope.data = Subject.query(function(){
                                                         

                                                          data =  $scope.data;
                                                         
                                                          
                                                          vm.tableParams = new ngTableParams({
                                                          page: 1,            // show first page
                                                          count: 10          // count per page
                                                      }, {
                                                          total:  $scope.data.length, // length of data4
                                                          getData: function($defer, params) {
                                                              $defer.resolve( $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                                                          }
                                                      });
                                                   $scope.subjectListLoading ='';
                                                   
                                                    
                                            } );      
        
        
        
       $scope.reloadSubject = function(){
                                            $scope.subjectListLoading = 'whirl traditional'
                                            // EXPORT CSV
                                            // 
                                            // -----------------------------------  
                                      
                                          var data
                                                  $scope.data = Subject.query(function(){
                                                         

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
                                                   $scope.subjectListLoading ='';
                                                   
                                  
                                                    
                                            } );
                                            

       };    
        
        
      $scope.classSubjectControllerFunction = function(){
          
                                                                        $scope.subjectListLoading = 'whirl traditional'
                                                                        $http.get(APISource.currentApiPoint+'/app/admin/subjectTeacherList').
                                                                                            success(function(data, status, headers, config) {
                                                                                               $scope.classList = data
                                                                                               $scope.selectedClass = $scope.classList[0]
                                                                                               $scope.subjectListLoading =''; 
                                                                                            }).
                                                                                            error(function(data, status, headers, config) {
                                                                                              // called asynchronously if an error occurs
                                                                                              // or server returns response with an error status.
                                                                                            });
                                                                             
      };
      
      
            $scope.addSubjects = function(){
          
                                                                        $scope.subjectListLoading = 'whirl traditional'
                                                                        $http.get(APISource.currentApiPoint+'/app/admin/subjectTeacherList').
                                                                                            success(function(data, status, headers, config) {
                                                                                               $scope.classList = data
                                                                                               $scope.selectedClass = $scope.classList[0]
                                                                                               $scope.subjectListLoading =''; 
                                                                                            }).
                                                                                            error(function(data, status, headers, config) {
                                                                                              // called asynchronously if an error occurs
                                                                                              // or server returns response with an error status.
                                                                                            });
                                                                             
      }  

      
           $scope.addNewSubject = function(data){
          
                console.log(JSON.stringify(data)+"subjects");
               
                $http.post(APISource.currentApiPoint+'/app/admin/subjects',data)
                                              .success(function(data){
                                                  console.log(data);
                                            
                                                                        $scope.pop('Success',data,'Subect details added'); 
                                                                       // setTimeout(function () {
                                                                         //             window.location.reload();

                                                                           //   }, 1000);

                                                                  
                                              })
                                              .error(function(data){
                                                  console.log(data)
                                              });
                                                                    
                                                                             
      }  
      
      $scope.newSubject = function(subject)
                      {
                          toaster.pop("wait", "New Subject"," saving please wait.. ");
                           $scope.newSub = new Subject(subject)
                          $scope.newSub.$save(function(data) {
                                $('.toast-wait').hide()
                                $scope.pop('Success','Data saved','New subject'+subject.subjectName+' Added'); 
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

