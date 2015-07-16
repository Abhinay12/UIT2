App.controller('eventListController', ['$filter','$scope', '$timeout', '$resource','Grade','Event','ngTableParams','ngTableDataService','toaster', function($filter,$scope, $timeout, $resource,Grade,Event,ngTableParams,ngTableDataService,toaster)
    {
        console.log("Event List Loaded");
        
         'use strict';
  // required for inner references
  var vm = this;
  $scope.dataLoad = 'whirl traditional'
  var data
  $scope.data = Event.query(function(){
                                                          data = $scope.data
                                                          console.log(data)
                                                          vm.tableParams = new ngTableParams({
                                                          page: 1,            // show first page
                                                          count: 10           // count per page
                                                      }, {
                                                          total:  $scope.data.length, // length of data4
                                                          getData: function($defer, params) {
                                                              $defer.resolve( $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                                                          }
                                                      });
                                                   $scope.dataLoad =''
                                                    
                                            } );

        
    }]);