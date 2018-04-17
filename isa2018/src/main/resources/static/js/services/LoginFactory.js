
angular.module('app.LoginFactory', [])
       .factory('LoginFactory', function($http){
           var factory = {};

           factory.getUser = function(user){
               return $http.post('/login', {"email":user.email, "password":user.password}); 
           };

           return factory;
       });