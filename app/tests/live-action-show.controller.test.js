describe('LiveActionShowController:', function () {
	beforeEach(module('tipicoSportsbookControllers'));
	beforeEach(module('tipicoSportsbookServices'));

	var $controller, $rootScope, $scope, _;

	beforeEach(inject(function (_$controller_, _$rootScope_) {
		$controller = _$controller_;
		$rootScope = _$rootScope_;
	}));

	beforeEach(function () {
		$scope = $rootScope.$new();
		controller = $controller('LiveActionShowController', {$scope: $scope});
	});

	it('should parse live event data in order to set the correct arrow image to be show and the team name', function () {
		var data = {actionType: "Penalty", team: 1};
		controller.parseEventData(data);
		expect($scope.imageName).toEqual('penalty-left.png');
		expect($scope.teamName).toEqual(controller.objTeamNames[data.team]);
	});

	it('should define it a team action is visible', function () {
		controller.isTeamActionVisible('left');
		expect($scope.isVisibleTeam1).toBeTruthy();
		expect($scope.isVisibleTeam2).toBeFalsy();
		controller.isTeamActionVisible('right');
		expect($scope.isVisibleTeam1).toBeFalsy();
		expect($scope.isVisibleTeam2).toBeTruthy();
	});
});