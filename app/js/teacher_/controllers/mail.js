console.log("Mail controlelrs")
 App.controller('teacherMailboxController', ["$scope", "colors", function($scope, colors) {


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


}]);