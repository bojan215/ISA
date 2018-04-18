
angular.module('app.BusinessController',[])
    .controller('BusinessController', function ($scope, $location, BusinessFactory ) {
        function init() {
            console.log("Prikaz izvestaja o poslovanju");
        }

        init();
        $scope.businessGuest = function (business) {
            if(validate(business)) {
                BusinessFactory.postBusiness(business).then(function (data) {
                	$location.path('/');	
                });
                
            }
        } 

        $scope.cinema = {id:null, ambientevaluation:'', projectionevaluation:'', graphic:'', income:'', active:false};


        function validate(cinema) {
            if(business.ambientevaluation == '' || business.projectionevaluation == ''|| business.graphic == ''  || business.income == '' ){
                alert('Nisu popunjena sva polja!');
                return false;
            }



            return true;
        }
    });