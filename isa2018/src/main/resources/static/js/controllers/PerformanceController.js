
angular.module('app.PerformanceController',[])
    .controller('PerformanceController', function ($scope, $location, PerformanceFactory ) {
        function init() {
            console.log("Pravljenje nove predstave");
        }

        init();
        $scope.performanceGuest = function (performance) {
            if(validate(performance)) {
                PerformanceFactory.postPerformance(performance).then(function (data) {
                	$location.path('/');	
                });
                
            }
        } 

        $scope.performance = {id:null, naziv:'', glumci:'', zanr:'', imeReditelj:'', trajanje:'', poster:'', ocena:'', opis:'', sala:'', termin:'', cena:'', active:false};


        function validate(performance) {
            if(performance.naziv == '' || performance.glumci == ''|| performance.zanr == ''  || performance.imeReditelj == '' || performance.trajanje == '' || performance.poster == ''|| performance.ocena == ''  || performance.opis == '' || performance.sala == '' || performance.termin == '' || performance.cena == ''){
                alert('Nisu popunjena sva polja!');
                return false;
            }



            return true;
        }
    });