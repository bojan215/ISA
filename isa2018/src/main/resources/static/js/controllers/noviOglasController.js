angular.module('app.noviOglasController',[])
    .controller('noviOglasController', function ($scope, $location, noviOglasFactory ) {
    	function init() {
            console.log("dodavanje novog oglasa"); 
        }

        init();
        $scope.dodaj = function (oglas) {
            if(validate(oglas)) {
                noviOglasFactory.postOglas(oglas).then(function (data) {
                	$location.path('/');	
                });
                
            }
        } 

        $scope.newOglas = {id:null, naziv:'', opis:'', datum:'', type:'REGUSER',  active:false};


        function validate(oglas) {
            if(oglas.naziv == '' || oglas.opis == ''|| oglas.datum == '' ){
                alert('Nisu popunjena sva polja!');
                return false;
            }


            return true;
        }
    });