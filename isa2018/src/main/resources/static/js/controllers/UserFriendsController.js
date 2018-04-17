
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
                         toastr.info(friend.name + ' ' + friend.surname + ' accepted friend request.');
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

           $scope.openSearchPeopleModal = function(){
                $uibModal.open({
                    templateUrl : 'html/user/searchPeopleModal.html',
                    controller : 'SearchPeopleController'
                });
            }

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

       .controller('SearchPeopleController', function($localStorage, $scope, $stomp, $uibModalInstance, $log, toastr, $location, UserFriendsFactory){
            function init(){
                $scope.foundPersons = [];
            };

           var subscription = null;
           init();

           $stomp.setDebug(function (args) {
               $log.debug(args)
           });

           $stomp.connect('/stomp', {})
                 .then(function(frame){
                     subscription = $stomp.subscribe('/topic/persons/' + $localStorage.logged.data.id, function(persons, headers, res){
                         $scope.$apply(function(){
                             $scope.foundPersons = persons;
                         });
                     }, {});
                 });

           $scope.search = function(personForSearch){
               var message = { 'message' : personForSearch };
               $stomp.send('/app/searchPersons/' + $localStorage.logged.data.id, message);
           };

           $scope.addFriend = function(id){
               $stomp.send('/app/addFriend/' + $localStorage.logged.data.id + '/' + id);
               var temp = [];
               for(i=0; i<$scope.foundPersons.length; i++){
                   if($scope.foundPersons[i].id != id)
                       temp.push($scope.foundPersons[i]);
               }
               $scope.foundPersons = temp;
               toastr.success('Zahtev za prijateljstvo je poslat!');
           };

           $scope.close = function(){
               subscription.unsubscribe();
               $stomp.disconnect().then(function(){
                   $log.info('disconnected');
               })
               $uibModalInstance.dismiss('cancel');
           };
        });
