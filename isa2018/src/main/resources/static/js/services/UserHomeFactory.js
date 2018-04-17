
angular.module('app.UserHomeFactory', [])
       .factory('UserHomeFactory', function($http){
           var factory = [];

           factory.getFriendRequestsNumber = function(id){
               return $http.get('/getFriendRequestsNumber/' + id, {"id":id});
           }

           return factory;
       });
