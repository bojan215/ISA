
angular.module('app.UserHomeController', [])
       .controller('UserHomeController', function($localStorage, $location, $scope, $rootScope, $uibModal, $stomp, $log, toastr,  UserHomeFactory){
           function init(){
               if($localStorage.logged == null)
                   $location.path("/");
               else{
                   if($localStorage.logged.data.type != 'REGUSER')
                       $location.path("/");
                   else{
                       $scope.loggedUser = $localStorage.logged;
                       $scope.friendRequestsNumber = 0;
                       $scope.showRequests = false;
                       	
                       UserHomeFactory.getFriendRequestsNumber($scope.loggedUser.data.id).then(function(data){
                    	    
                           $scope.friendRequestsNumber = data;
                           if(data > 0)
                               $scope.showRequests = true;
                       });

                      
                   } 
               }
           }; 

           var friendRequestSubscription = null;
           var acceptedFriendRequestSubscription = null;
           init();
          // UserHomeFactory.getHistory($scope.loggedUser).success(function(data) {
          //     $scope.histories = data;
          // });
           
    
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
                     });

                     acceptedFriendRequestSubscription = $stomp.subscribe('/topic/friendAcceptedRequest/' + $localStorage.logged.data.id, function(friend, headers, res){
                         toastr.info(friend.name + ' ' + friend.surname + ' je prihvatio zahtev za prijateljstvo.');
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
           $scope.historyToShow = $rootScope.historyToShow;
           $scope.ocene = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
           $scope.bioskopOcena = $scope.ocene[4];
           $scope.pozoristeOcena = $scope.ocene[4];
           $scope.projekcijaOcena = $scope.ocene[4];
      

          
           $scope.ocena = function() {
               $scope.historyToShow.bioskopOcena = $scope.bioskopOcena;
               $scope.historyToShow.pozoristeOcena = $scope.pozoristeOcena;
               $scope.historyToShow.projekcijaOcena = $scope.projekcijaOcena;
               UserHomeFactory.updateHistory($scope.historyToShow).success(function(data) {
                   $location.path("/user");
               })
           }
       })
    
