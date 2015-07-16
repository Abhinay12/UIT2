/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
App.factory('Grade', function($resource,APISource) {


 return $resource( APISource.currentApiPoint+'/app/admin/grades/:id?max='+10000,
  {}, { 
    loan: { 
      method: 'GET',
      isArray: false 
    } 
  });
  
});

App.factory('SchoolClasses', function($resource,APISource) {


 return $resource( APISource.currentApiPoint+'/app/admin/schoolclasses/:id?max='+100000+'?sort=class_name&order=asc',
  {}, { 
    loan: { 
      method: 'GET',
      isArray: false 
    } 
  });
  
});

App.factory('Teacher', function($resource,APISource) {


 return $resource( APISource.currentApiPoint+'/app/admin/teachers/:id?max='+100000,
  {}, { 
    loan: { 
      method: 'GET',
      isArray: false 
    } 
  });
  
});

App.factory('Student', function($resource,APISource) {


 return $resource( APISource.currentApiPoint+'/app/admin/students/:id?max='+10000,
  {}, { 
    loan: { 
      method: 'GET',
      isArray: false 
    } 
  });
  
});

App.factory('Department', function($resource,APISource) {


 return $resource( APISource.currentApiPoint+'/app/admin/departments/:id?max='+10000,
  {}, { 
    loan: { 
      method: 'GET',
      isArray: false 
    } 
  });
  
});


App.factory('User', function($resource,APISource) {


 return $resource( APISource.currentApiPoint+'/app/users/:id?max='+10000,
  {}, { 
    loan: { 
      method: 'GET',
      isArray: false 
    } 
  });
  
});


App.factory('Department', function($resource,APISource) {


 return $resource( APISource.currentApiPoint+'/app/admin/departments:id?max='+10000,
  {}, { 
    loan: { 
      method: 'GET',
      isArray: false 
    } 
  });
  
});


App.factory('Subject', function($resource,APISource) {


 return $resource( APISource.currentApiPoint+'/app/admin/subjects:id?max='+10000,
  {}, { 
    loan: { 
      method: 'GET',
      isArray: false 
    } 
  });
  
});

App.factory('Exam', function($resource,APISource) {


 return $resource( APISource.currentApiPoint+'/app/exams:id?max='+10000,
  {}, { 
    loan: { 
      method: 'GET',
      isArray: false 
    } 
  });
  
});

App.factory('ClassTimeTable', function($resource,APISource) {


 return $resource( APISource.currentApiPoint+'/app/timetables:id?max='+10000,
  {}, { 
    loan: { 
      method: 'GET',
      isArray: false 
    } 
  });
  
});
App.factory('ClassFee', function($resource,APISource) {


 return $resource( APISource.currentApiPoint+'/app/admin/classFees:id?max='+10000,
  {}, { 
    loan: { 
      method: 'GET',
      isArray: false 
    } 
  });
  
});

App.directive('myDatePicker', function() {
  return{
    restrict: 'A',
    link: function(scope, element){
      $(element).datepicker({dateFormat: "dd/mm/yy"});
    }
  };
});