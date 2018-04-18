
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

        $scope.performance = {id:null, name:'', actors:'', type:'', director:'', dutration:'', poster:'', evaluation:'', description:'', hall:'', term:'', price:'', active:false};


        function validate(performance) {
            if(performance.name == '' || performance.actors == ''|| performance.type == ''  || performance.director == '' || performance.dutration == '' || performance.poster == ''|| performance.evaluation == ''  || performance.description == '' || performance.hall == '' || performance.term == '' || performance.price == ''){
                alert('Nisu popunjena sva polja!');
                return false;
            }



            return true;
        }
    });