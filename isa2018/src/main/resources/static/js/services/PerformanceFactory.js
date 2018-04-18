
angular.module('app.PerformanceFactory',[])
    .factory('PerformanceFactory', function ($http) {

        var factory = {};

        factory.postPerformance = function(performance) {
            return $http.post('/permormance', performance);
        }

        return factory;

    });