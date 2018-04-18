
angular.module('app.ProjectionFactory',[])
    .factory('ProjectionFactory', function ($http) {

        var factory = {};

        factory.postProjection = function(projection) {
            return $http.post('/projection', projection);
        }

        return factory;

    });