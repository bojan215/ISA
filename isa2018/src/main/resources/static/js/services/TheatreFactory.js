
angular.module('app.TheatreFactory',[])
    .factory('TheatreFactory', function ($http) {

        var factory = {};

        factory.postTheatre = function(theatre) {
            return $http.post('/theatre', theatre);
        }

        return factory;

    });