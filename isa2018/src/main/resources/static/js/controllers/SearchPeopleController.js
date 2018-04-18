 angular.module('app.SearchPeopleController', [])  
	.controller('SearchPeopleController', function($localStorage, $scope, $stomp,  $log, toastr, $location, UserFriendsFactory){
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
               
            	$scope.foundPersons = [];

            };

           var subscription = null;
           var friendRequestsSubscription = null;	
           var acceptedFriendRequestSubscription = null;
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
           friendRequestsSubscription = $stomp.subscribe('/topic/friendRequest/' + $localStorage.logged.data.id, function(numberOfRequests, headers, res){
                    toastr.info('Imate zahtev za prijateljstvo!');
                    $scope.friendRequestsNumber = numberOfRequests;
                    if(numberOfRequests > 0)
                    $scope.showRequests = true;
                     });
           acceptedFriendRequestSubscription = $stomp.subscribe('/topic/friendAcceptedRequest/' + $localStorage.logged.data.id, function(friend, headers, res){
               toastr.info(friend.name + ' ' + friend.surname + ' accepted friend request.');
           

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

     
           $scope.search = function(personSearch){
               var message = { 'message' : personSearch };
               $stomp.send('/app/searchPersons/' + $localStorage.logged.data.id, message);
           };

           $scope.addFriend = function(id){ 
               $stomp.send('/app/addFriend/' + $localStorage.logged.data.id + '/' + id);
               var nasao = [];
               for(i=0; i<$scope.foundPersons.length; i++){
                   if($scope.foundPersons[i].id != id)
                       nasao.push($scope.foundPersons[i]);
               }
               $scope.foundPersons = nasao;
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