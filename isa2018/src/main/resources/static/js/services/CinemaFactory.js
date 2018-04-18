
angular.module('app.CinemaFactory',[])
    .factory('CinemaFactory', function ($http) {

        var factory = {};

        factory.postCinema = function(cinema) {
            return $http.post('/cinema', cinema);
        }

        return factory;

    });