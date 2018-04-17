
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

        $scope.cinema = {id:null, name:'', adress:'', description:'', evaluation:'', active:false};


        function validate(cinema) {
            if(cinema.name == '' || cinema.adress == ''|| cinema.description == ''  || cinema.evaluation == '' ){
                alert('Nisu popunjena sva polja!');
                return false;
            }



            return true;
        }
    });