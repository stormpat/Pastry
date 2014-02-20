var app = angular.module('Paste', [
    'ngRoute',
    'ui.bootstrap'
]);

app.config(['$routeProvider', function($routeProvider) {

    $routeProvider.when('/', {
        templateUrl: 'app/partials/index.html',
        controller: 'PasteCtrl'
    });
    $routeProvider.when('/bin/:paste', {
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

    $scope.dis = true;
    $scope.paste = $routeParams.paste;

    var getCallback = function(data) {
        //$scope.paste = data;
        setTimeout(function() {
            $scope.paste = data;
            $scope.$apply();
        }, 0);
    };

    var postCallback = function(data) {
        $scope.data = data;
        $location.path('/bin/' + data.url);
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

    $scope.fork = function() {
        $scope.dis = false;
    };

    $scope.trash = function() {
        $scope.paste = '';
    };

    $scope.favorite = function() {
        console.log('The favorite method is not yet implemented. Needs more server-side stuff :)');
    };

}]);

app.directive('zoom', function () {
    return {
        restrict : 'A',
        link: function(scope, element) {
                element.bind("click", function(e) {
                var editor = angular.element(angular.element(document.querySelector('.editor')));
                editor.toggleClass('zoom');
            });
        }
    };
});

app.filter('pretty', function(){
    return function(text) {
        return prettyPrintOne(text);
    };
});