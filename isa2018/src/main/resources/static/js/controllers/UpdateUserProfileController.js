angular.module('app.UpdateUserProfileController', [])
.controller('UpdateUserProfileController', function ($localStorage,toastr, $scope,  $location, $stomp, $log,  UserProfileFactory) {
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
		
         
           
           $scope.update = function(user){
               if(validateUser(user)) {
            	   user.id=$localStorage.logged.data.id; 
                   UserProfileFactory.updateRegUser(user).then(function (data) {
                	   console.log("UPDATE"); 
                       if (data != null) {
                           $localStorage.logged = data;
                           $scope.userUpdate = $localStorage.logged;
                           $scope.disconnect();
                           $location.path("/user");	
                           alert("Profil uspesno azuriran!");
                       } else {
                           alert("Nije moguce promeniti informacije");
                       }
                   });
               }
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
               if(user.city == '') {
                   checked = false;
                   toastr.error('Grad mora biti popunjen')
               }
               if(user.phoneNum == '') {
                   checked = false;
                   toastr.error('Telefon mora biti popunjen')
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