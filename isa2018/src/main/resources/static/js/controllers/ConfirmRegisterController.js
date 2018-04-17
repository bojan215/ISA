
angular.module('app.ConfirmRegisterController', [])
       .controller('ConfirmRegisterController', function($scope, $location, ConfirmFactory){


           $scope.confirm = function(user){
                ConfirmFactory.confirmUser(user)
                    .then(function(data){
                        if(data){
                            $location.path('/');
                        }
                    })
                    .error(function(data){
                        alert('Unesite valdinu email adresu i lozinku');
                    });
           };
       });