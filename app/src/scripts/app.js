var tipicoSportsbookControllers = angular.module('tipicoSportsbookControllers', []);
var tipicoSportsbookServices = angular.module('tipicoSportsbookServices', []);

var app = angular.module('tipicoMobileSportsbook',
	['ngRoute', 'tipicoSportsbookServices', 'tipicoSportsbookControllers', 'foundation.common', 'foundation.offcanvas', 'bc.AngularKeypad']);

app.config(['$routeProvider', function ($routeProvider) {

	$routeProvider
		.when('/', {
			templateUrl: 'views/live-bets.html',
			controller: 'MainController',
			resolve: {
				eventDetails: ['liveEventService', function (liveEventService) {
					return liveEventService.getEventDetails();
				}]
			}
		})
		.otherwise({redirectTo: '/'});

}]).constant('_', window._).config(function (KeypadConfigProvider) {
	KeypadConfigProvider.backspaceTemplate = '../img/icons/backspace.svg';
	KeypadConfigProvider.numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0];
}).run([function () {

}]);
