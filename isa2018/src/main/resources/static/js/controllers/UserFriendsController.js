
angular.module('app.UserFriendsController', [])
       .controller('UserFriendsController', function ($localStorage, $scope, $uibModal,$location, $stomp, $log,  toastr, UserFriendsFactory){
           function init(){ 
               if($localStorage.logged == null)
                   $location.path("/");
               else {
                   if ($localStorage.logged.data.type != 'REGUSER')
                       $location.path("/")
                   else {
                       $scope.loggedUser = $localStorage.logged;
                       $scope.friends = [];
                       $scope.viewMode = 'not';
                       UserFriendsFactory.getFriends($scope.loggedUser.data.id).then(function (data) {
                           if (data != null) {
                               $scope.friends = data;
                           } else {
                               alert("Greska! Pokusajte opet");
                           }
                       });
                       $scope.friendRequestsNumber = 0;
                       $scope.showRequests = false;
                       UserFriendsFactory.getFriendRequestsNumber($scope.loggedUser.data.id).then(function (data) {
                           $scope.friendRequestsNumber = data;
                           if (data > 0)
                               $scope.showRequests = true;
                       });
                   }
               }
           };

           var friendRequestsSubscription = null;
           var acceptedFriendRequestSubscription = null;
           var deleteFriendSubscription = null;
           init();

           $scope.sortByName = function(){
               $scope.viewMode = 'name';
           }

           $scope.sortBySurname = function(){
               $scope.viewMode = 'surname';
           }

           $scope.resetSort = function(){
               $scope.viewMode = 'not';
           }

           $stomp.setDebug(function(args){
               $log.debug(args);
           });

           $stomp.connect('/stomp', {})
                 .then(function(frame){
                     friendRequestsSubscription = $stomp.subscribe('/topic/friendRequest/' + $localStorage.logged.data.id, function(numberOfRequests, headers, res){
                         toastr.info('Imate zahtev za prijateljstvo!');
                         $scope.friendRequestsNumber = numberOfRequests;
                         if(numberOfRequests > 0)
                             $scope.showRequests = true;
                     });

                     acceptedFriendRequestSubscription = $stomp.subscribe('/topic/friendAcceptedRequest/' + $localStorage.logged.data.id, function(friend, headers, res){
                         toastr.info(friend.name + ' ' + friend.surname + ' je prihvatio zahtev za prijateljstvo.');
                         UserFriendsFactory.getFriends($scope.loggedUser.data.id).then(function(data){
                             if(data != null){
                                 $scope.friends = data;
                             }else{
                                 alert("Greska! Pokusajte opet");
                             }
                         });
                     });

                     deleteFriendSubscription = $stomp.subscribe('/topic/deleteFriend/' + $localStorage.logged.data.id, function(friend, headers, res){
                         UserFriendsFactory.getFriends($scope.loggedUser.data.id).then(function(data){
                             if(data != null){
                                 $scope.friends = data;
                             }else{
                                 alert("Greska! Pokusajte opet");
                             }
                         });
                     });
                 });

           $scope.logOut = function(){
               $scope.disconnect();
               $localStorage.logged = null;
               $location.path("/");
           };

           $scope.disconnect = function(){
               friendRequestsSubscription.unsubscribe();
               acceptedFriendRequestSubscription.unsubscribe();
               deleteFriendSubscription.unsubscribe();
               $stomp.disconnect().then(function(){
                   $log.info('disconnected');
               });
           };

          

            $scope.delete = function(friendId){
                $stomp.send('/app/deleteFriend/' + $scope.loggedUser.data.id + '/' + friendId);
                var temp = [];
                for(i = 0; i<$scope.friends.length; i++){
                    if($scope.friends[i].id != friendId)
                        temp.push($scope.friends[i]);
                }
                $scope.friends = temp;
            }
       })

       ;
