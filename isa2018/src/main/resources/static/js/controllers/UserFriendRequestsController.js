
angular.module('app.UserFriendRequestsController', [])
       .controller('UserFriendRequestsController', function($localStorage, $scope, $uibModal,$location ,$stomp, $log, toastr, UserFriendRequestsFactory){
           function init(){
               if($localStorage.logged == null)
                   $location.path("/");
               else {
                   if ($localStorage.logged.data.type != 'REGUSER')
                       $location.path("/");
                   else {
                       $scope.loggedUser = $localStorage.logged;
                       $scope.friendRequestsNumber = 0;
                       $scope.showRequests = false;
                       UserFriendRequestsFactory.getFriendRequestsNumber($scope.loggedUser.data.id).then(function (data) {
                           $scope.friendRequestsNumber = data;
                           if (data > 0)
                               $scope.showRequests = true;
                       });
                       $scope.friendRequests = [];
                       UserFriendRequestsFactory.getFriendRequests($scope.loggedUser.data.id).then(function (data) {
                           if (data != null) {
                               $scope.friendRequests = data;
                           } else {
                               alert("Greska! Pokusajte opet.");
                           }
                       });
                   }
               }
           };

           var friendRequestSubscription = null;
           var acceptedFriendRequestSubscription = null;
           init();

           $stomp.setDebug(function(args){
               $log.debug(args);
           });

           $stomp.connect('/stomp', {})
               .then(function(frame){
                   friendRequestSubscription = $stomp.subscribe('/topic/friendRequest/' + $localStorage.logged.data.id, function(numberOfRequests, headers, res){
                       toastr.info('Imate novi zahtev za prijateljstvo!');
                       $scope.friendRequestsNumber = numberOfRequests;
                       if(numberOfRequests > 0)
                           $scope.showRequests = true;
                       UserFriendRequestsFactory.getFriendRequests($scope.loggedUser.data.id).then(function(data){
                           if(data != null) {
                               $scope.friendRequests = data;
                           }else{
                               alert("Greska! Pokusajte opet.");
                           }
                       });
                   });

                   acceptedFriendRequestSubscription = $stomp.subscribe('/topic/friendAcceptedRequest/' + $localStorage.logged.data.id, function(friend, headers, res){
                       toastr.info(friend.name + ' ' + friend.surname + ' accepted friend request.');
                   });
               });

           $scope.logOut = function(){
               $scope.disconnect();
               $localStorage.logged = null;
               $location.path("/");
           };

           $scope.disconnect = function(){ 
               friendRequestSubscription.unsubscribe();
               acceptedFriendRequestSubscription.unsubscribe();
               $stomp.disconnect().then(function(){
                   $log.info('disconnected');
               });
           };

           $scope.accept = function(id){
               $stomp.send('/app/acceptFriendRequest/' + $scope.loggedUser.data.id + '/' + id);
               var temp = [];
               for(i = 0; i<$scope.friendRequests.length; i++){
                   if($scope.friendRequests[i].id != id)
                       temp.push($scope.friendRequests[i]);
               }
               $scope.friendRequests = temp;
               $scope.friendRequestsNumber -= 1;
               if($scope.friendRequestsNumber > 0)
                   $scope.showRequests = true;
               else
                   $scope.showRequests = false;
           }

           $scope.ignore = function(id){
               UserFriendRequestsFactory.ignoreFriendRequest($scope.loggedUser.data.id, id).then(function(data){
                   var temp = [];
                   for(i = 0; i<$scope.friendRequests.length; i++){
                       if($scope.friendRequests[i].id != id)
                           temp.push($scope.friendRequests[i]);
                   } 
                   $scope.friendRequests = temp;
                   $scope.friendRequestsNumber -= 1;
                   if($scope.friendRequestsNumber > 0)
                       $scope.showRequests = true;
                   else
                       $scope.showRequests = false;
               });
           }
       });
