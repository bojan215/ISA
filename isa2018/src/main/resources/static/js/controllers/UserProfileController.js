
angular.module('app.UserProfileController', [])
       .controller('UserProfileController', function ($localStorage, $scope, $uibModal, $location, $stomp, $log, toastr, UserProfileFactory) {
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
                       toastr.info(friend.name + ' ' + friend.surname + ' accepted friend request.');
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

           $scope.openUpdateModal = function () {
               $uibModal.open({
                   templateUrl : 'html/user/updateUserInfoModal.html',
                   controller : 'UpdateUserProfileController',
               }).result.then(function(updatedUser){
                   $scope.loggedUser = updatedUser;
               });
           }
 
       })
       
       
       
       .controller('UpdateUserProfileController', function ($localStorage, $scope, toastr, $uibModalInstance, $location, UserProfileFactory) {
           function init(){
               $scope.userToUpdate = jQuery.extend(true, {}, $localStorage.logged);
           };

           init();
        

           
           
           $scope.update = function(user){
               if(validateUser(user)) {
                   UserProfileFactory.updateRegUser(user).then(function (data) {
                       if (data != null) {
                           $localStorage.logged = data;
                           $scope.userToUpdate = $localStorage.logged;
                           $uibModalInstance.close($localStorage.logged);
                       } else {
                           alert("Nije moguce promeniti informacije");
                       }
                   });
               }
           };
           $scope.close = function(){
               $uibModalInstance.dismiss('cancel');
           };
           
           function validateUser(user){
               var checked = true;
               if(user.name == '') {
                   checked = false;
                   toastr.error('Ime mora biti popunjeno');
               }
               if(user.surname == '') {
                   checked = false;
                   toastr.error('Prezime mora biti popunjeno')
               }
               if(user.email == '') {
                   checked = false;
                   toastr.error('Unesite email') 
               }
               var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
               if(!re.test(user.email)){
                   toastr.error('Email adresa nije validna');
                   checked = false;
               }
               return checked;
           }
       });
