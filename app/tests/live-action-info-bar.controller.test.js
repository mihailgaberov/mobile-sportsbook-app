describe('LiveActionInfoBarController:', function () {
	beforeEach(module('tipicoSportsbookControllers'));
	beforeEach(module('tipicoSportsbookServices'));

	var $controller, $rootScope, $scope;

	beforeEach(inject(function (_$controller_, _$rootScope_) {
		$controller = _$controller_;
		$rootScope = _$rootScope_;
	}));

	beforeEach(function () {
		$scope = $rootScope.$new();
		$scope.eventData = {'team1': 'team 1'};
		controller = $controller('LiveActionInfoBarController', {$scope: $scope});
	});

	it('should parse last action data to show team name and action type', function () {
		var data = {actionType: "Penalty", team: 1};

		controller.parseLiveActionData(data);

		expect(controller.lastAction).toEqual('Penalty');
		expect(controller.teamName).toEqual('team 1');
	});



});