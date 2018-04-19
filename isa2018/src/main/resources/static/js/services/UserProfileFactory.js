
angular.module('app.UserProfileFactory', [])
       .factory('UserProfileFactory', function($http){
           var factory = {};

           factory.updateRegUser = function(usr){
               return $http.put('/updateRegUser', {"id": usr.id, "name": usr.name, "surname": usr.surname, "city": usr.city, "phoneNum": usr.phoneNum,"email": usr.email, "password": usr.password });
           }

           factory.getFriendRequestsNumber = function(id){
               return $http.get('/getFriendRequestsNumber/' + id, {"id":id});
           }

           return factory;
       });