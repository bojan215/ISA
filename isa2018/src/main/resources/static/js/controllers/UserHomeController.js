
angular.module('app.UserHomeController', [])
       .controller('UserHomeController', function($localStorage, $location, $scope, $sce,$compile, $rootScope, $uibModal, $stomp, $log, toastr,  UserHomeFactory){
    	   
    	 
    	    
    	    
    	   
    	   $scope.bioskopPrikaz=function(id){
    		   $scope.proj =''; 
    		   if($scope.nadjeniBioskop1[0].id===id){
    			    
    		 for(s in $scope.nadjeniBioskop1[0].sala){

    			 for(p in $scope.nadjeniBioskop1[0].sala[s].projekcije){
    				   
    				 //console.log($scope.nadjeniBioskop1[0].sala[s].projekcije);
    				for(d in $scope.projekcije){ 
    					if($scope.projekcije[d].id===$scope.nadjeniBioskop1[0].sala[s].projekcije[p]){
    					//console.log($scope.projekcije[d].naziv);  
    					$scope.proj +='<tr><td>'+$scope.projekcije[d].naziv+'</td><td>'+$scope.projekcije[d].trajanje+'</td><td>'+$scope.projekcije[d].zanr+'</td><td><button type="button" class="btn btn-success btn-md" ng-click="datumPrikaz('+$scope.projekcije[d].id+')">Izaberi</button></td></tr>';
    					
    					$scope.proj +='<tr style="display:none"><td>'+$scope.projekcije[d].termin[0]+'</td><td>'+$scope.projekcije[d].termin[1]+'</td></tr>';
    					document.getElementById("redTermin").style.display='inline';
    					document.getElementById("redTermin").innerHTML = "";
    						
    					 
    					$scope.proj=$sce.trustAsHtml($scope.proj); 
    					 
    					}       
    					}   
    			 } 
    		 }    
    			    
    			    
    			    
    			   
    			   
    			   
    			    
    		   }else if($scope.nadjeniBioskop2[0].id===id){
    			   
    			   for(s in $scope.nadjeniBioskop2[0].sala){

    	    			 for(p in $scope.nadjeniBioskop2[0].sala[s].projekcije){
    	    				   
    	    				 //console.log($scope.nadjeniBioskop1[0].sala[s].projekcije);
    	    				for(d in $scope.projekcije){ 
    	    					if($scope.projekcije[d].id===$scope.nadjeniBioskop2[0].sala[s].projekcije[p]){
    	    					//console.log($scope.projekcije[d].naziv); 
    	    						$scope.proj +='<tr><td>'+$scope.projekcije[d].naziv+'</td><td>'+$scope.projekcije[d].trajanje+'</td><td>'+$scope.projekcije[d].zanr+'</td><td><button type="button" class="btn btn-success btn-md" ng-click="datumPrikaz('+$scope.projekcije[d].id+')">Izaberi</button></td></tr>';
    	        					$scope.proj=$sce.trustAsHtml($scope.proj); }       
    	    					} 
    	    			 } 
    	    		 }    
    	    			   
    			   
    			   
    		   }
    		    
    		    
    		   
    		   
    		   
    	   };
    	   $scope.pozoristePrikaz=function(id){
    		   $scope.proj =''; 
    		   
    			    
    		 for(s in $scope.nadjenaPozorista[0].sala){

    			 for(p in $scope.nadjenaPozorista[0].sala[s].projekcije){
    				   
    				  
    				for(d in $scope.predstave){  
    					if($scope.predstave[d].id===$scope.nadjenaPozorista[0].sala[s].projekcije[p]){
    					console.log($scope.predstave[d].naziv); 
    					$scope.proj +='<tr><td>'+$scope.predstave[d].naziv+'</td><td>'+$scope.predstave[d].trajanje+'</td><td>'+$scope.predstave[d].zanr+'</td><td><button type="button" class="btn btn-success btn-md" ng-click="datumPrikaz('+$scope.predstave[d].id+')">Izaberi</button></td></tr>';
    					$scope.proj=$sce.trustAsHtml($scope.proj);
    					}        
    					}  
    			 } 
    		 }    
    			   
    			    
    			    
    			   
    			   
    			   
    			    
    		  
    		   
    		   
    	   };
    	   
    	   
    	 
    	   $scope.bp=function(){
        	   
    		   
    		   
    		   
    		  var pr=[{"id":700,"naziv":"Shutter Island","trajanje":"125","cena":600,"zanr":"Misterija","termin":[{"t":"2018/05/01 18:00:00","m":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}, {"t":"2018/05/02 18:00:00","m":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}]},
					  {"id":701,"naziv":"Prisoners","trajanje":"111","cena":500,"zanr":"Triler","termin":[{"t":"2018/05/01 18:00:00","m":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}, {"t":"2018/05/02 18:00:00","m":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}]},
					  {"id":702,"naziv":"The Town","trajanje":"102","cena":800,"zanr":"Crime","termin":[{"t":"2018/05/01 18:00:00","m":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}, {"t":"2018/05/02 18:00:00","m":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}]},
					  {"id":703,"naziv":"The Hangover","trajanje":"98","cena":300,"zanr":"Komedija","termin":[{"t":"2018/05/01 18:00:00","m":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}, {"t":"2018/05/02 18:00:00","m":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}]},
					  {"id":704,"naziv":"Inception","trajanje":"125","cena":600,"zanr":"Misterija","termin":[{"t":"2018/05/01 18:00:00","m":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}, {"t":"2018/05/02 18:00:00","m":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}]},
					  {"id":705,"naziv":"Get Out","trajanje":"111","cena":500,"zanr":"Triler","termin":[{"t":"2018/05/01 18:00:00","m":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}, {"t":"2018/05/02 18:00:00","m":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}]},
					  {"id":706,"naziv":"American Gangster","trajanje":"112","cena":800,"zanr":"Crime","termin":[{"t":"2018/05/01 18:00:00","m":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}, {"t":"2018/05/02 18:00:00","m":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}]},
					  {"id":707,"naziv":"Ride Along","trajanje":"98","cena":400,"zanr":"Komedija","termin":[{"t":"2018/05/01 18:00:00","m":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}, {"t":"2018/05/02 18:00:00","m":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}]}
					  ]; 
    		  
    		  
    		   
    		  var pre=[{"id":708,"naziv":"Rodoljupci","trajanje":"125","cena":600,"zanr":"Komedija","termin":[{"t":"2018/05/01 18:00:00","m":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}, {"t":"2018/05/02 18:00:00","m":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}]},
    			  	   {"id":709,"naziv":"Na Drini Cuprija","trajanje":"111","cena":500,"zanr":"Istorijska fikcija","termin":[{"t":"2018/05/01 18:00:00","m":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}, {"t":"2018/05/02 18:00:00","m":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}]},
    		  		   {"id":710,"naziv":"Gospodja Ministarka","trajanje":"112","cena":800,"zanr":"Komedija","termin":[{"t":"2018/05/01 18:00:00","m":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}, {"t":"2018/05/02 18:00:00","m":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}]},
    		  		   {"id":711,"naziv":"Novi Sesir","trajanje":"98","cena":400,"zanr":"Komedija","termin":[{"t":"2018/05/01 18:00:00","m":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}, {"t":"2018/05/02 18:00:00","m":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}]}
    			  ]; 
    		   
        	   var b11={
        			"id":500,   
        			"naziv":"Cineplexx – Delta City",
        			"adresa":"Jurija Gagarina 16/16A 11070 Beograd",
        			"opis":"Najveci bioskop u Beogradu...",
        			"sala":[
        				{"id":600,"naziv":"Sala 1","segment":[
        					{"naziv":"vip","mesto":["1","2","3","4","5"]},
        					{"naziv":"balkon","mesto":["6","7","8","9","10"]},
        					{"naziv":"obicno"," ":["11","12","13","14","15"]}],	
        					"projekcije":[700,701]
        				},
        				{"id":601,"naziv":"Sala 2","segment":[
        					{"naziv":"vip","mesto":["1","2","3","4","5"]},
        					{"naziv":"balkon","mesto":["6","7","8","9","10"]},
        					{"naziv":"obicno","mesto":["11","12","13","14","15"]}],	
        					"projekcije":[702,703]
        				}]
	    
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
        					"projekcije":[704,705]
        				}, 
        				{"id":604,"naziv":"Sala 2","segment":[
        					{"naziv":"vip","mesto":["1","2","3","4","5"]},
        					{"naziv":"balkon","mesto":["6","7","8","9","10"]},
        					{"naziv":"obicno","mesto":["11","12","13","14","15"]}],
        					"projekcije":[706,707] 
        				}]
        			
	   
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
        					"projekcije":[708,709]
        				 }, 
        				{"id":606,"naziv":"Sala 2","segment":[
        					{"naziv":"vip","mesto":["1","2","3","4","5"]},
        					{"naziv":"balkon","mesto":["6","7","8","9","10"]},
        					{"naziv":"obicno","mesto":["11","12","13","14","15"]}],	
        					"projekcije":[710,711]
        				}]
	   
        	   };
        	   $scope.projekcije=pr;
        	   $scope.predstave=pre;
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
                	   $scope.proj ="";
                	   $scope.bio1=false;
                	   $scope.bio2=false;
                	   $scope.poz1=false;
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
    
