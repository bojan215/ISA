
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

        $scope.projection = {id:null, name:'', actors:'', type:'', director:'', dutration:'', poster:'', evaluation:'', description:'', hall:'', term:'', price:'', active:false};


        function validate(projection) {
            if(projection.name == '' || projection.actors == ''|| projection.type == ''  || projection.director == '' || projection.dutration == '' || projection.poster == ''|| projection.evaluation == ''  || projection.description == '' || projection.hall == '' || projection.term == '' || projection.price == ''){
                alert('Nisu popunjena sva polja!');
                return false;
            }



            return true;
        }
    });