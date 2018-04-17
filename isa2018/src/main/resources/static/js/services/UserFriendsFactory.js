
angular.module('app.UserFriendsFactory', [])
       .factory('UserFriendsFactory', function($http){
          var factory = {};

           factory.getFriends = function (id) {
               return $http.get('/getFriends/' + id, {"id":id});
           }

           factory.getFriendRequestsNumber = function(id){
               return $http.get('/getFriendRequestsNumber/' + id, {"id":id});
           }

           return factory;
       });
