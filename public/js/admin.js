var admin = angular.module('myAdmin', ['ngResource']);

//This configures the routes and associates each route with a view and a controller
admin.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/items/',
        {
            controller: 'ItemsListCtrl',
            templateUrl: '/public/partials/items.html'
        })
        //Define a route that has a route parameter in it (:customerID)
        .when('/items/add/',
        {
            controller: 'ItemsAddCtrl',
            templateUrl: '/public/partials/add.html'
        })
        //Define a route that has a route parameter in it (:customerID)
        .when('/items/:item/edit/',
        {
            controller: 'OrdersController',
            templateUrl: '/app/partials/orders.html'
        })
        .when('/items/:item/delete/',
        {
            controller: 'OrdersController',
            templateUrl: '/app/partials/orders.html'
        })
        .otherwise({ redirectTo: '/' });
    //$locationProvider.html5Mode(true);
});

