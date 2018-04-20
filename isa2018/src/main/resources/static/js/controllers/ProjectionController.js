
angular.module('app.ProjectionController',[])
    .controller('ProjectionController', function ($scope, $location, ProjectionFactory ) {
        function init() {
            console.log("Pravljenje nove projekcije");
        }

        init();
        $scope.projectionGuest = function (projection) {
            if(validate(projection)) {
                ProjectionFactory.postProjection(projection).then(function (data) {
                	$location.path('/');	
                });
                
            }
        } 

        $scope.projection = {id:null, naziv:'', glumci:'', zanr:'', imeReditelj:'', trajanje:'', poster:'', ocena:'', opis:'', sala:'', termin:'', cena:'', active:false};


        function validate(projection) {
            if(projection.naziv == '' || projection.glumci == ''|| projection.zanr == ''  || projection.imeReditelj == '' || projection.trajanje == '' || projection.poster == ''|| projection.ocena == ''  || projection.opis == '' || projection.sala == '' || projection.termin == '' || projection.cena == ''){
                alert('Nisu popunjena sva polja!');
                return false;
            }



            return true;
        }
    });