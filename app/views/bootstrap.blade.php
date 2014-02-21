<!doctype html>
<html lang="en" ng-app="Paste">
    <head>
    <meta charset="utf-8">
    <title>Pastry | The pastebin from Space</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    {{ HTML::style('app/css/bootstrap.css') }}
    {{ HTML::style('app/css/legacy.theme.css') }}
    {{ HTML::style('app/css/app.css') }}
</head>
<body>
    <div ng-view></div>
    {{ HTML::script('app/js/prettify.js') }}
    {{ HTML::script('app/js/angular.js') }}
    {{ HTML::script('app/js/ui-bootstrap.js') }}
    {{ HTML::script('app/js/angular-route.js') }}
    {{ HTML::script('app/js/angular-sanitize.js') }}
    {{ HTML::script('app/js/app.js') }}
    <script>angular.module("Paste").constant("CSRF_TOKEN", '<?php echo csrf_token(); ?>');</script>

</body>
</html>