App.controller('NewGalleryController', ['$scope', 'Upload','APISource', '$timeout', function ($scope, Upload,APISource, $timeout) {
    $scope.$watch('files', function () {
        //$scope.upload($scope.files);
         $scope.uploadFiles = '';
         
         if($scope.files) { $scope.uploadFiles = $scope.files };
                                                        var len =  $scope.uploadFiles.length
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
                                                               
                                                                
                                                                subarray[j] =  $scope.uploadFiles[k]
                                                            }
                                                            $scope.mainArray.push(subarray)
                                                        }
    });
    
    
    $scope.log = '';
   
    $scope.upload = function (galleryTitle,files) {
                                      if(files.length > 0)   {
                                                         
                                                                                         
                                                          if (files && files.length) {
                                                                for (var i = 0; i < files.length; i++) {
                                                                    var file = files[i];
                                                                    Upload.upload({
                                                                        url: APISource.currentApiPoint+'/app/saveAlbums',
                                                                        headers: { "X-Auth-Token": getLocalToken() },
                                                                        file: file ,
                                                                         data : {  'title' : galleryTitle }
                                                                    }).progress(function (evt) {
                                                                        $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                                                                        $scope.log = 'progress: ' + $scope.progressPercentage + '% ' +
                                                                                    evt.config.file.name + '\n' + $scope.log;
                                                                    }).success(function (data, status, headers, config) {
                                                                        $timeout(function() {
                                                                            $scope.currentFile = config.file.name;
                                                                            $scope.log = 'file: ' + config.file.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.log;
                                                                        });
                                                                    });
                                                                }
                                                            }
                                                        };
                                                        
                                                        
                                                    }
    
}]);