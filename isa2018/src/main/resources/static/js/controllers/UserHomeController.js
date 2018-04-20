
angular.module('app.UserHomeController', [])
       .controller('UserHomeController', function($localStorage, $location, $scope, $rootScope, $uibModal, $stomp, $log, toastr,  UserHomeFactory){
    	   $scope.bp=function(){
        	   
        	   var b11={
        			"id":500,   
        			"naziv":"Cineplexx – Delta City",
        			"adresa":"Jurija Gagarina 16/16A 11070 Beograd",
        			"opis":"Najveci bioskop u Beogradu...",
        			"sala":[
        				{"id":600,"naziv":"Sala 1","segment":[
        					{"naziv":"vip","mesto":["1","2","3","4","5"]},
        					{"naziv":"balkon","mesto":["6","7","8","9","10"]},
        					{"naziv":"obicno","mesto":["11","12","13","14","15"]}],	
        					"projekcija":[{"id":700,"naziv":"Shutter Island","trajanje":"125","cena":600,"zanr":"Misterija","termin":["2017/05/01 18:00:00", "2017/05/02 18:00:00"]},
        								  {"id":701,"naziv":"Prisoners","trajanje":"111","cena":500,"zanr":"Triler","termin":["2017/05/01 21:00:00", "2017/05/02 21:00:00"]}
        						]
        				},
        				{"id":601,"naziv":"Sala 2","segment":[
        					{"naziv":"vip","mesto":["1","2","3","4","5"]},
        					{"naziv":"balkon","mesto":["6","7","8","9","10"]},
        					{"naziv":"obicno","mesto":["11","12","13","14","15"]}],	
        					"projekcija":[{"id":703,"naziv":"The Town","trajanje":"102","cena":800,"zanr":"Crime","termin":["2017/05/01 18:00:00", "2017/05/02 18:00:00"]},
        								  {"id":704,"naziv":"The Hangover","trajanje":"98","cena":300,"zanr":"Komedija","termin":["2017/05/01 21:00:00", "2017/05/02 21:00:00"]}
        						]}]
	   
        	   };
        	   var b12={
        			"id":501,   
        			"naziv":"Arena Cineplex",
        			"adresa":"Bul. Mihajla pupina 3 21000 Novi Sad",
        			"opis":"Najveci bioskop u Novom Sadu...",
        			"sala":[ 
        				{"id":603,"naziv":"Sala 1","segment":[
        					{"naziv":"vip","mesto":["1","2","3","4","5"]},
        					{"naziv":"balkon","mesto":["6","7","8","9","10"]},
        					{"naziv":"obicno","mesto":["11","12","13","14","15"]}],	
        					"projekcija":[{"id":705,"naziv":"Inception","trajanje":"125","cena":600,"zanr":"Misterija","termin":["2017/05/01 18:00:00", "2017/05/02 18:00:00"]},
        								  {"id":706,"naziv":"Get Out","trajanje":"111","cena":500,"zanr":"Triler","termin":["2017/05/01 21:00:00", "2017/05/02 21:00:00"]}
        						]
        				},
        				{"id":604,"naziv":"Sala 2","segment":[
        					{"naziv":"vip","mesto":["1","2","3","4","5"]},
        					{"naziv":"balkon","mesto":["6","7","8","9","10"]},
        					{"naziv":"obicno","mesto":["11","12","13","14","15"]}],	
        					"projekcija":[{"id":707,"naziv":"American Gangster","trajanje":"112","cena":800,"zanr":"Crime","termin":["2017/05/01 18:00:00", "2017/05/02 18:00:00"]},
        								  {"id":708,"naziv":"Ride Along","trajanje":"98","cena":400,"zanr":"Komedija","termin":["2017/05/01 21:00:00", "2017/05/02 21:00:00"]}
        						]}]
	   
        	   };
        	   var p1={
        			"id":502,   
        			"naziv":"Srpsko narodno pozorište",
        			"adresa":"Pozorišni trg 1, 21000 Novi Sad",
        			"opis":"Prvo pozoriste...",
        			"sala":[
        				{"id":605,"naziv":"Sala 1","segment":[
        					{"naziv":"vip","mesto":["1","2","3","4","5"]},
        					{"naziv":"balkon","mesto":["6","7","8","9","10"]},
        					{"naziv":"obicno","mesto":["11","12","13","14","15"]}],	
        					"predstava":[{"id":709,"naziv":"Rodoljupci","trajanje":"125","cena":600,"zanr":"Komedija","termin":["2017/05/01 15:00:00", "2017/05/02 15:00:00"]},
        								  {"id":710,"naziv":"Na Drini Cuprija","trajanje":"111","cena":500,"zanr":"Istorijska fikcija","termin":["2017/05/01 19:00:00", "2017/05/02 19:00:00"]}
        						]
        				},
        				{"id":606,"naziv":"Sala 2","segment":[
        					{"naziv":"vip","mesto":["1","2","3","4","5"]},
        					{"naziv":"balkon","mesto":["6","7","8","9","10"]},
        					{"naziv":"obicno","mesto":["11","12","13","14","15"]}],	
        					"predstava":[{"id":711,"naziv":"Gospodja Ministarka","trajanje":"112","cena":800,"zanr":"Komedija","termin":["2017/05/01 15:00:00", "2017/05/02 15:00:00"]},
        								  {"id":712,"naziv":"Novi Sesir","trajanje":"98","cena":400,"zanr":"Komedija","termin":["2017/05/01 19:00:00", "2017/05/02 19:00:00"]}
        						]}]
	   
        	   };
        	   $scope.nadjeniBioskop1=[b11];
        	   $scope.nadjeniBioskop2=[b12];
        	   $scope.nadjenaPozorista=[p1];
        	   console.log($scope.nadjeniBioskop1);
        	   console.log($scope.nadjeniBioskop2);
        	   console.log($scope.nadjenaPozorista); 
        	   
  
           };

    	   
    	   function init(){
        	
               if($localStorage.logged == null)
                   $location.path("/");
               else{
                   if($localStorage.logged.data.type != 'REGUSER')
                       $location.path("/");
                   else{
                	   $scope.bp();
                	   $scope.show_me=false;
                	   $scope.show_me1=false;
                	   $scope.show_me2=false;
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
           $scope.sortByName = function(){
               $scope.viewMode = 'naziv';
           }

           $scope.sortBySurname = function(){
               $scope.viewMode = 'adresa';
           }

           $scope.resetSort = function(){
               $scope.viewMode = 'not';
           }

                      
  
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
    
