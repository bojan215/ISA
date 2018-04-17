angular.module('app.ConfirmFactory', [])
       .factory('ConfirmFactory', function($http){
            var factory = {};

           factory.confirmUser = function (user) {
                return $http.post('/confirm', {"email":user.email, "password":user.password});
           };

           return factory;
       });