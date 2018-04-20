
angular.module('app.CinemaController',[])
    .controller('CinemaController', function ($scope, $location, CinemaFactory ) {
        function init() {
            console.log("Pravljenje novog bioskopa");
        }

        init();
        $scope.cinemaGuest = function (cinema) {
            if(validate(cinema)) {
                CinemaFactory.postCinema(cinema).then(function (data) {
                	$location.path('/');	
                });
                
            }
        } 

        $scope.cinema = {id:null, naziv:'', adresa:'', opis:'', ocena:'', active:false};


        function validate(cinema) {
            if(cinema.naziv == '' || cinema.adresa == ''|| cinema.opis == ''  || cinema.ocena == '' ){
                alert('Nisu popunjena sva polja!');
                return false;
            }



            return true;
        }
    });