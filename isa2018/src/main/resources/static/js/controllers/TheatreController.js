
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

        $scope.theatre = {id:null, name:'', adress:'', description:'', evaluation:'', active:false};
 

        function validate(cinema) {
            if(theatre.name == '' || theatre.adress == ''|| theatre.description == ''  || theatre.evaluation == '' ){
                alert('Nisu popunjena sva polja!');
                return false;
            }



            return true;
        }
    });