/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Array.prototype.contains = function(elem)
{
   for (var i in this)
   {
       if (this[i] == elem) return true;
   }
   return false;
};

App.controller('classesController', ['$filter','$scope', '$timeout', '$resource','Grade','Teacher','ngTableParams','ngTableDataService','toaster','SchoolClasses', function($filter,$scope, $timeout, $resource,Grade,Teacher,ngTableParams,ngTableDataService,toaster,SchoolClasses) {
        

        
$scope.my_data = []    

$scope.loadGradeTree = function(callBack){
    
                                        $scope.grades = SchoolClasses.query(function() {
                                          
                                        var grade;
                                        var grades = [];
                                        var sections = [];
                                                angular.forEach($scope.grades, function(value, key) {
                                             
                                                    angular.forEach(value.grades , function(v,k){
                                                      
                                                        sections.push({label:v.section , data : { grade:v.name ,section : v.section } })
                                                     });
                                                             
                                                     
                                                     grades.push({label : value.className , children: sections , data : { grade:value.className   }})
                                                    
                                                     sections = [];
                                                });
                                             
                                               $scope.my_data = grades;
                                               callBack();

                                      });
                     };  
        
   
        

               $scope.my_tree_handler = function(branch) {

                               
                                       
                                      $scope.output = (branch.data.section===undefined) ?   'You selected  : Class ' + branch.data.grade : 'You selected  : Class ' + branch.data.grade+' section '+branch.data.section  ;
                                      $scope.gradeFilter = branch.data.grade
                                      $scope.sectionFilter = branch.data.section
                                      console.log(branch)
                                     
                                 
                               console.log($scope.gradeFilter)  
                               console.log($scope.sectionFilter)  
                               return $scope.output;  
   
                 };



  var treedata_avm = [
    {
      label: 'Loading..',
      children: [
        {
          label: 'Loading..',
          
        } 
      ]
    }
  ];

 
  $scope.my_data = treedata_avm

  
  var tree;
  // This is our API control variable
  $scope.my_tree = tree = {};
                
        
        $scope.try_async_load = function() {
                                    $scope.treeLoading = 'whirl traditional'
                                    $scope.my_data = [];
                                    $scope.loadGradeTree(function(){
                                        tree.expand_all();
                                        $scope.treeLoading ='';
                                    });
                    

                                  };
  
  
  
  
  
  
/*
 * 
 * Add new class
 */  
$scope.output = "Click an item to select";
$scope.sections = ["A","B","C","D","E","F","G","H","I","J"];
$scope.teacherLoading = 'whirl traditional'
$scope.teachers = Teacher.query(function(){
    
    $scope.teacherLoading = '';
});
  
  
  
  
  
    
  'use strict';
  // required for inner references
  var vm = this;
  $scope.dataLoad = 'whirl traditional'
  var data;
  $scope.data = Grade.query(function(){
                                                          $scope.data
                                                          angular.forEach($scope.data, function(value,key){value.gradeName = parseInt(value.gradeName) ;  } );
                                                          
                                                          vm.tableParams = new ngTableParams({
                                                          page: 1,            // show first page
                                                          count: 10           // count per page
                                                      }, {
                                                          total:  $scope.data.length, // length of data4
                                                          counts : [],
                                                          getData: function($defer, params) {
                                                              $defer.resolve( $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                                                          }
                                                      });
                                                   $scope.dataLoad ='';
                                                    
                                            } );
  
  
  
  
  
  
  
  
/*
 *  DATA TABLE
 */  
  

  
 $scope.loadGradeTable = function(){
                                                        'use strict';
                                            // required for inner references
                                            var vm = this;



                                          $scope.dataLoad = 'whirl traditional'
                                            // EXPORT CSV
                                            // -----------------------------------  
                                           var data
                                                  $scope.data = Grade.query(function(){
                                                         

                                                          data =  $scope.data;
                                                          angular.forEach($scope.data, function(value,key){value.gradeName = parseInt(value.gradeName) ;  } );
                                                          
                                                          vm.tableParams = new ngTableParams({
                                                          page: 1,            // show first page
                                                          count: 10           // count per page
                                                      }, {
                                                          total:  $scope.data.length, // length of data4
                                                          counts : [],
                                                          getData: function($defer, params) {
                                                              $defer.resolve( $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                                                          }
                                                      });
                                                   $scope.dataLoad ='';
                                                   
                                                    
                                            } );
                                            

       }; 

  
  
$scope.refreshData = function() { 
                                  $scope.try_async_load();
                                  $scope.loadGradeTable(function(){})
                          }
  
 

$scope.saveClass = function(){
                          $scope.newGrade = new Grade($scope.fields)
                          $scope.newGrade.$save(function(data) {
                                                            //data saved. $scope.entry is sent as the post body.
                                                                                                                      
                                                              $scope.pop('Success','Data saved','New Class  '+data.gradeName+" "+data.section+"  Added");  
                                                              $scope.try_async_load();
                                                              $scope.loadGradeTable()
                                                             
                                                     $scope.gradeFilter=''; $scope.sectionFilter='';                  

                          });
    
               };
 

  
  
  
  /**
   * TOASTER DIALOGUE
   * 
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





