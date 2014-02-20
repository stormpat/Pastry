var app = angular.module('Paste', ['ngRoute', 'ui.bootstrap']);

app.config(['$routeProvider', function($routeProvider) {

    $routeProvider.when('/', {
        templateUrl: 'app/partials/index.html',
        controller: 'PasteCtrl'
    });
    $routeProvider.when('/paste/:paste', {
        templateUrl: 'app/partials/show.html',
        controller: 'PasteCtrl'
    });
    $routeProvider.otherwise({
        redirectTo: '/'
    });

}]);

app.controller('PasteCtrl', [
        '$scope',
        '$http',
        '$location',
        '$routeParams',
        'CSRF_TOKEN',
    function(
        $scope,
        $http,
        $location,
        $routeParams,
        CSRF_TOKEN) {

    $scope.TIPS = {
        new: "Create new paste",
        submit: "Save the paste",
        zoom: "Focus the current paste",
        trash: "Trash the paste",
        fork: "Fork the paste",
        favorite: "Favorite the paste",
    };

    //$scope.paste = '';
    $scope.paste = $routeParams.paste;

    var getCallback = function(data) {
        $scope.paste = data;
    };

    var postCallback = function(data, status) {
        $scope.data = data;
        console.log(status);
        $location.path('/paste');
    };

    if ($scope.paste) {
        $http.get('/paste/' + $scope.paste).success(getCallback);
    }

    $scope.submit = function() {
        $http.post('/paste', {
            csrf_token: CSRF_TOKEN,
            code: $scope.paste,
        }).success(postCallback);
    };








    $scope.zoom = function() {
        console.log('ZOOM IN');

    };

    $scope.trash = function() {
        $scope.paste = '';
    };

}]);
