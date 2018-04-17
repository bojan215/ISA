
angular.module('app.UserProfileFactory', [])
       .factory('UserProfileFactory', function($http){
           var factory = {};

           factory.updateRegUser = function(usr){
               return $http.put('/updateRegUser', {"name": usr.name, "surname": usr.surname, "city": usr.city, "phoneNum": usr.phoneNum, "password": usr.password, "email": usr.email, "id": usr.id});
           }

           factory.getFriendRequestsNumber = function(id){
               return $http.get('/getFriendRequestsNumber/' + id, {"id":id});
           }

           return factory;
       });