
angular.module('app.LoginController',[])
       .controller('LoginController', function ($localStorage, $scope, $location, LoginFactory) {
    	   function init() {
               console.log("login");
           }

           init();
           $scope.login = function(user){
        	   LoginFactory.getUser(user).then(function(data){ 

                   if(data){
                	   	
                       $localStorage.logged = data;
                                      
                       
                       if($localStorage.logged.data.type == 'REGUSER'){
                    	  
                    	   $location.path('/user');
                       }else if($localStorage.logged.data.type == 'BPADMIN'){  
                           $location.path('/');
                       }else if($localStorage.logged.data.type == 'FZADMIN'){
                           $location.path('/');
                       }else if($localStorage.logged.data.type == 'SISADMIN'){    
                           $location.path('/'); 
               
                       }
                    }})  
                    .catch(function(error){
                        alert("Pogresan email ili lozinka!");
                    });
           }; 
 
       }); 