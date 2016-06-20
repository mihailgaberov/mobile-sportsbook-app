describe('LiveMarketsController:', function () {
	beforeEach(module('tipicoSportsbookControllers'));
	beforeEach(module('tipicoSportsbookServices'));

	var $controller, $rootScope, $scope, liveEventService;

	beforeEach(inject(function (_$controller_, _$rootScope_, _liveEventService_) {
		$controller = _$controller_;
		$rootScope = _$rootScope_;
		spyOn($rootScope, '$broadcast');
		liveEventService = _liveEventService_;
	}));

	beforeEach(function () {
		$scope = $rootScope.$new();
		$scope.matchTitle = 'Team1 - Team2';
		controller = $controller('LiveMarketsController', {$scope: $scope});
	});

	it('should broadcast event with the bet that is to be added to the betslip', function () {
		controller.addToBetslip(123, 11, 1, '3 Way');
		var objBet = { 
						'id': 123,
						'value': 11,
						'name': 1,
						'matchTitle': $scope.matchTitle,
						'market': '3 Way'
		  			};
		expect($rootScope.$broadcast).toHaveBeenCalledWith('betDetails', objBet);
	});

	it('should get the odds from the data and add them to they source array', function () {
		var odds = [{}];
		controller.getOdds(odds);
		expect($scope.markets.length).toEqual(1);
	});
});