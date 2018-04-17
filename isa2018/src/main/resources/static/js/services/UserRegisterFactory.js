
angular.module('app.UserRegisterFactory',[])
    .factory('UserRegisterFactory', function ($http) {

        var factory = {};

        factory.postUser = function(user) {
            return $http.post('/registerUser', user);
        }

        return factory; 

    });