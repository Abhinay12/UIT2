/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
console.log('Notice loaded');

App.controller('NoticeController', ['$scope','Notice','ngTableParams','ngTableDataService','toaster', function($scope,Notice,ngTableParams,ngTableDataService,toaster) {
  'use strict';
  
  
  // required for inner references
  var vm = this;
  $scope.dataLoad = 'whirl traditional'
  var data;
  $scope.data = Notice.query(function(){
                                                          $scope.data
                                                         
                                                          
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
  
  
  
  
  
  
    $scope.saveNotice = function(noticeInstance){
        
        console.log(JSON.stringify(noticeInstance));
         toaster.pop("wait", "Saving data"," saving please wait.. ");
         $scope.newNotice = new Notice(noticeInstance)
                           $scope.newNotice.$save(function(data) {
                                                            //data saved. $scope.entry is sent as the post body.
                                                                      $('.toast-wait').hide()                                                  
                                                              
                               $scope.pop('Success','Data saved','New Notice  '+data.gradeName+" "+data.section+"  Added");  
                                                                     

                          });
    };
    
    
   
  
    
    
    
    
    
    
    
 /*
  * POP up msg
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

