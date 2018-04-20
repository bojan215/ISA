
angular.module('app.TheatreController',[])
    .controller('TheatreController', function ($scope, $location, TheatreFactory ) {
        function init() {
            console.log("Pravljenje novog pozorista");
        }

        init();
        $scope.theatreGuest = function (theatre) {
            if(validate(theatre)) {
                TheatreFactory.postTheatre(theatre).then(function (data) {
                	$location.path('/');	
                });
                
            }
        } 

        $scope.theatre = {id:null, naziv:'', adresa:'', opis:'', ocena:'', active:false};
 

        function validate(cinema) {
            if(theatre.naziv == '' || theatre.adresa == ''|| theatre.opis == ''  || theatre.ocena == '' ){
                alert('Nisu popunjena sva polja!');
                return false;
            }



            return true;
        }
    });