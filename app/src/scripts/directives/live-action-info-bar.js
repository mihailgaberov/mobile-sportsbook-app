tipicoSportsbookControllers.controller('LiveActionInfoBarController', ['$scope', 'Events',
		function ($scope, Events) {

			var vm = this;

			vm.objTeamNames = {
				1: $scope.eventData.team1,
				2: $scope.eventData.team2
			};

			$scope.$on(Events.LIVE_ACTION, function (e, liveEvent) {
					vm.parseLiveActionData(liveEvent, vm.objTeamNames);
			});

			vm.parseLiveActionData = function (data) {
				vm.lastAction = data.actionType;
				vm.teamName = vm.objTeamNames[data.team];
			}

		}])
	.directive('liveActionInfoBar', function () {
		return {
			controller: 'LiveActionInfoBarController',
			controllerAs: 'vm',
			restrict: 'E',
			scope: {
				eventData: '='
			},
			templateUrl: 'views/live-action-info-bar.html'
		};
	});