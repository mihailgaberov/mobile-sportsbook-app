tipicoSportsbookControllers.controller('MainController', ['$rootScope', '$scope', 'liveEventService', 'Events', 'eventDetails',
	function ($rootScope, $scope, liveEventService, Events, eventDetails) {
		var vm = this;

		vm.sendLiveAction = function () {
			setInterval(function () {
			 	liveEventService.getEventLastAction().then(function (data) {
			  		$rootScope.$broadcast(Events.LIVE_ACTION, data);
			 	});
			 }, 4000);
		}

		vm.init = function () {
			if (!_.isUndefined(eventDetails)) {
				$scope.eventDetails = eventDetails;
				setTimeout(function () {
					$rootScope.$broadcast(Events.EVENT_DETAILS, eventDetails);
				}, 100);

			} else {
				throw new Error('There is no data for the event. Please try refreshing the browser.');
			}
			vm.sendLiveAction();
		}

		vm.init();
	}
]);