var app = angular.module('Paste', [
    'ngRoute',
    'ngSanitize',
    'ui.bootstrap'
]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(false);

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
        '$sce',
        'CSRF_TOKEN',
    function(
        $scope,
        $http,
        $location,
        $routeParams,
        $sce,
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
    $scope.prew = false;
    $scope.codeprew = false;
    $scope.paste = $routeParams.paste;


    var getCallback = function(data) {
        setTimeout(function() {
            $scope.paste = data[0].code;
            $scope.$apply();
        }, 0);
    };

    var postCallback = function(data) {
        $scope.data = data;
        $location.path('/bin/' + data.url);
    };

    if ($scope.paste) {
        $scope.prew = true;
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
        $scope.codeprew = true;
        $scope.prew = false;
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
        restrict: 'A',
        link: function(scope, element) {
                element.bind("click", function(e) {
                var zoomItem = angular.element(angular.element(document.querySelectorAll('.editor, #previewer')));
                zoomItem.toggleClass('zoom');
            });
        }
    };
});

app.directive('selected', function () {
    return {
        restrict: 'A',
        link: function(scope, element) {
            element.bind("click", function(e) {
            var row = e.toElement;
                if (row.classList[0].charAt(0) === 'L') {
                    row.classList.toggle('selected')
                };
            });
        }
    };
});

app.filter('pretty', function() {
    return function(text) {
        return prettyPrintOne(text, '', true);
    };
});