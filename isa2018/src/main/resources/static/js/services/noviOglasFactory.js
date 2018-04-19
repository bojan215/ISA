
angular.module('app.noviOglasFactory',[])
    .factory('noviOglasFactory', function ($http) {

        var factory = {};

        factory.postOglas = function(oglas) {
            return $http.post('/postOglas', oglas);
        }

        return factory; 

    });