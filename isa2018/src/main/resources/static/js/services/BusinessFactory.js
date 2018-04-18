
angular.module('app.BusinessFactory',[])
    .factory('BusinessFactory', function ($http) {

        var factory = {};

        factory.postBusiness = function(business) {
            return $http.post('/business', business);
        }

        return factory;

    });