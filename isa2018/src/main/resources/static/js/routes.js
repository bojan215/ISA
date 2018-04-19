var app = angular.module('app.routes', ['ngRoute']);

app.config(['$routeProvider','$httpProvider', function ($routeProvider, $httpProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'html/home.html'
    	})
        .when('/register',{
            templateUrl : 'html/register.html'
        })
         .when('/user',{
            templateUrl : 'html/user/regUserHome.html'
        })
        .when('/user/profile',{
            templateUrl : 'html/user/userProfile.html'
        })
        .when('/user/searchPeople',{
            templateUrl : 'html/user/searchPeople.html'
        })
        .when('/user/updateProfile',{
            templateUrl : 'html/user/updateUserInfo.html'
        })
        .when('/user/friends',{
            templateUrl : 'html/user/userFriends.html'
        })
        .when('/user/friendRequests',{
            templateUrl : 'html/user/userFriendRequests.html'
        })
        .when('/cinema',{
            templateUrl : 'html/cinema.html'
        })
        .when('/theatre',{
            templateUrl : 'html/theatre.html'
        })
        .when('/home',{
            templateUrl : 'html/home.html'
        })
        .when('/login',{ 
            templateUrl : 'html/login.html'
        })
    	.when('/projection',{
    		templateUrl : 'html/projection.html'
    	})
    	.when('/performance',{ 
    		templateUrl : 'html/performance.html'
    	})
    	.when('/business',{ 
    		templateUrl : 'html/business.html'
    	});
    
}]); 
