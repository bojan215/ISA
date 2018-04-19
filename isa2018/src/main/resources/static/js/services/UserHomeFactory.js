
angular.module('app.UserHomeFactory', [])
       .factory('UserHomeFactory', function($http){
           var factory = [];

           factory.getFriendRequestsNumber = function(id){
               return $http.get('/getFriendRequestsNumber/' + id, {"id":id});
           }
           factory.getHistory = function(user) {
               return $http.get("/VisitHistories/" + user.id);
           }

           factory.updateHistory = function(history) {
               return $http.put("/UpdateHistory", history);
           }
           return factory;
       });
