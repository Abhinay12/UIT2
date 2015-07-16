console.log("Mail controlelrs")
 App.controller('teacherMailboxController', ["$scope", "colors","APISource","$http","$stateParams","$cookieStore", function($scope, colors,APISource,$http,$stateParams,$cookieStore) {

 console.log('sp:');
 console.log($stateParams.folder)
  $scope.folders = [
    {name: 'Inbox',   folder: 'inbox',   alert: 42, icon: "fa-inbox" },
    {name: 'Starred', folder: 'starred', alert: 10, icon: "fa-star" },
    {name: 'Sent',    folder: 'sent',    alert: 0,  icon: "fa-paper-plane-o" },
    {name: 'Draft',   folder: 'draft',   alert: 5,  icon: "fa-edit" },
    {name: 'Trash',   folder: 'trash',   alert: 0,  icon: "fa-trash"}
  ];

  $scope.labels = [
    {name: 'Red',     color: 'danger'},
    {name: 'Pink',    color: 'pink'},
    {name: 'Blue',    color: 'info'},
    {name: 'Yellow',  color: 'warning'}
  ];

  $scope.mail = {
    cc: false,
    bcc: false
  };
  // Mailbox editr initial content
  $scope.content = "<p>Type something..</p>";
  var api;
        ////////////////
        if($stateParams.folder=='inbox'){
         api='/app/conversations/get';
         $cookieStore.put("mailFolder",'inbox');
        }
        else{
          api='/app/conversations/sent';
          $cookieStore.put("mailFolder",'sent');
        }
$scope.getAllMail = function() {
 

$http.get(APISource.currentApiPoint+api,getHttpConfig()).
success(function(data) {
 
  
   
  $scope.mails =data.conversations;
   console.log($scope.mails);
     
 
}).
error(function(data) {
    console.log("error");
  console.log(data);

});
};

$scope.getAllMail();

    /////////////////////////////////////////////////////////////////////////
 $scope.currentUser = $cookieStore.get("currentUser");
$scope.sendMail=function() {
  alert("hi");
  var userData={

              "toId" : $scope.to ,

              "fromId" : $scope.currentUser,

              "title" :$scope.subject ,

              "messageText" : "This is a test message sent to ravi by mathew "

              }
         $http.post(APISource.currentApiPoint+'/app/conversations/new',userData,getHttpConfig())
            .success(function (data) {
                
                //console.log($scope.gradesAndSubjects);
            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }

}]);

////

App.controller('TMailViewController', ['$scope', 'mails', '$stateParams','$http','$filter','APISource','$cookieStore', function($scope, mails, $stateParams,$http,$filter,APISource,$cookieStore) {
 
    //$scope.mail = 'mail';
 //$scope.mails='j';
  $scope.previousPage = $cookieStore.get("mailFolder");
 var api;
        ////////////////
        if( $scope.previousPage=='inbox'){
         api='/app/conversations/get';
        
        }
        else{
          api='/app/conversations/sent';
          
        }
 $scope.getMail=function(){
    $http.get(APISource.currentApiPoint+api,getHttpConfig()).
    success(function(data) {
 
  
   
  $scope.mails =data;
  $scope.loadThread($stateParams.mid);
  
     
 
}).
error(function(data) {
    console.log("error");
  console.log(data);

});
}
$scope.getMail();
////////////
//$scope.mails={"numberOfConversations":3,"conversations":[{"threadId":"4","numberOfMessages":6,"fromId":"manish@test.com","toId":"mathew","inTrash":false,"isRead":false,"title":"Message from Manish","toDate":"Monday, 22 June 2015, 10:06:03 AM","messages":[{"messageId":"12","fromId":"Mathew","toId":"Manish","messageText":"Good night manish...","messageTime":"Monday, 22 June 2015, 10:06:03 AM"},{"messageId":"7","fromId":"Mathew","toId":"Manish","messageText":"Yes manish , mathew here","messageTime":"Monday, 22 June 2015, 10:06:03 AM"},{"messageId":"8","fromId":"Manish","toId":"Mathew","messageText":"I am also fine mathew , Good night","messageTime":"Monday, 22 June 2015, 10:06:03 AM"},{"messageId":"9","fromId":"Mathew","toId":"Manish","messageText":"I am fine manish How are you","messageTime":"Monday, 22 June 2015, 10:06:03 AM"},{"messageId":"11","fromId":"Manish","toId":"Mathew","messageText":"How are you maathew","messageTime":"Monday, 22 June 2015, 10:06:03 AM"},{"messageId":"10","fromId":"Manish","toId":"Mathew","messageText":"Hai this is Manush","messageTime":"Monday, 22 June 2015, 10:06:03 AM"}]},{"threadId":"5","numberOfMessages":6,"fromId":"shashi@test.com","toId":"mathew","inTrash":false,"isRead":false,"title":"Message from shashi","toDate":"Monday, 22 June 2015, 10:06:04 AM","messages":[{"messageId":"15","fromId":"Mathew","toId":"shashi","messageText":"Yes shashi , mathew here","messageTime":"Monday, 22 June 2015, 10:06:04 AM"},{"messageId":"17","fromId":"Mathew","toId":"shashi","messageText":"Good night shashi...","messageTime":"Monday, 22 June 2015, 10:06:04 AM"},{"messageId":"13","fromId":"shashi","toId":"Mathew","messageText":"I am also fine mathew , Good night","messageTime":"Monday, 22 June 2015, 10:06:04 AM"},{"messageId":"18","fromId":"shashi","toId":"Mathew","messageText":"How are you maathew","messageTime":"Monday, 22 June 2015, 10:06:04 AM"},{"messageId":"14","fromId":"Mathew","toId":"shashi","messageText":"I am fine shashi How are you","messageTime":"Monday, 22 June 2015, 10:06:04 AM"},{"messageId":"16","fromId":"shashi","toId":"Mathew","messageText":"Hai this is shashi","messageTime":"Monday, 22 June 2015, 10:06:04 AM"}]},{"threadId":"6","numberOfMessages":6,"fromId":"malini@test.com","toId":"mathew","inTrash":false,"isRead":false,"title":"Message from Malini","toDate":"Monday, 22 June 2015, 10:06:04 AM","messages":[{"messageId":"19","fromId":"Malini","toId":"Mathew","messageText":"I am also fine mathew , Good night","messageTime":"Monday, 22 June 2015, 10:06:04 AM"},{"messageId":"22","fromId":"Malini","toId":"Mathew","messageText":"Hai this is Manush","messageTime":"Monday, 22 June 2015, 10:06:04 AM"},{"messageId":"24","fromId":"Malini","toId":"Mathew","messageText":"How are you maathew","messageTime":"Monday, 22 June 2015, 10:06:04 AM"},{"messageId":"21","fromId":"Mathew","toId":"Malini","messageText":"Yes malini , mathew here","messageTime":"Monday, 22 June 2015, 10:06:04 AM"},{"messageId":"20","fromId":"Mathew","toId":"Malini","messageText":"Good night malini...","messageTime":"Monday, 22 June 2015, 10:06:04 AM"},{"messageId":"23","fromId":"Mathew","toId":"Malini","messageText":"I am fine malini How are you","messageTime":"Monday, 22 June 2015, 10:06:04 AM"}]}]};
          $scope.loadThread = function(thread){
         var log ;
        var date1;
            angular.forEach($scope.mails.conversations, function(value, key) {
                
                if(parseInt(value.threadId) == parseInt(thread))
               {
                  log = value;
                  
               }
            });
        //$scope.date1=date1;
         $scope.mail = log;
         console.log($scope.mail);
    };

 // $scope.loadThread($stateParams.mid);
  /////
 // $scope.currentUser = $cookieStore.get("currentUser");

  $scope.replyMail=function() {
  
  var userData={
                "threadId" : $stateParams.mid ,

                "messageText" :$scope.replyText ,

                "fromId" :   $scope.mail.fromId ,

                "toId" : $scope.mail.toId

              }
         $http.post(APISource.currentApiPoint+'/app/conversations/reply',userData,getHttpConfig())
            .success(function (data) {
                
                //console.log($scope.gradesAndSubjects);
                $scope.getMail();
                $scope.replyText='';
            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }

}]);