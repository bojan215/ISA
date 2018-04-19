
angular.module('app.UserProfileController', [])
       .controller('UserProfileController', function ($localStorage,$uibModal ,toastr, $scope,  $location, $stomp, $log,  UserProfileFactory) {
          function init(){
              if($localStorage.logged == null){
            	  console.log("LOGGED NULL");
                  $location.path("/");
              } else {
                  if ($localStorage.logged.data.type != 'REGUSER'){
                	  console.log("NIJE REGUSER");
                      $location.path("/")
                  }else {
                	  console.log("INIT"); 
                      $scope.loggedUser = $localStorage.logged;
                      $scope.friendRequestsNumber = 0;
                      $scope.showRequests = false;
                      UserProfileFactory.getFriendRequestsNumber($scope.loggedUser.data.id).then(function (data) {
                    	 
                          $scope.friendRequestsNumber = data;
                          if (data > 0)
                              $scope.showRequests = true;
                      });
                  }
              }
          };
          
           var friendRequestSub = null;
           var acceptedFriendRequestSub = null;
           init();

           $stomp.setDebug(function(args){
               $log.debug(args);
           });
           
           $stomp.connect('/stomp', {})
               .then(function(frame){
            	   friendRequestSub = $stomp.subscribe('/topic/friendRequest/' + $localStorage.logged.data.id, function(numberOfRequests, headers, res){
                       toastr.info('Imate novi zahtev za prijateljstvo!');
                       $scope.friendRequestsNumber = numberOfRequests;
                       if(numberOfRequests > 0)
                           $scope.showRequests = true;
                   });

            	   acceptedFriendRequestSub = $stomp.subscribe('/topic/friendAcceptedRequest/' + $localStorage.logged.data.id, function(friend, headers, res){
                       toastr.info(friend.name + ' ' + friend.surname + ' je prihvatio zahtev za prijateljstvo.');
                   });
               });

           $scope.logOut = function(){
               $scope.disconnect();
               $localStorage.logged = null;
               $location.path("/");
           };

           $scope.disconnect = function(){
        	   friendRequestSub.unsubscribe();
        	   acceptedFriendRequestSub.unsubscribe();
               $stomp.disconnect().then(function(){
                   $log.info('disconnected');
               });
           };

 
       });
