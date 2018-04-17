
angular.module('app.UserFriendRequestsFactory', [])
       .factory('UserFriendRequestsFactory', function ($http) {
           var factory = [];

           factory.getFriendRequestsNumber = function(id){
               return $http.get('/getFriendRequestsNumber/' + id, {"id":id});
           }

           factory.getFriendRequests = function(id){
               return $http.get('/getFriendRequests/' + id, {"id" : id});
           }

           factory.ignoreFriendRequest = function(friendId, id){
                return $http.get('/ignoreFriendRequest/' + friendId + '/' + id, {"friendId" : friendId, "id" : id});
           }

           return factory;
       });