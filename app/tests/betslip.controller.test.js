describe('BetslipController:', function () {
	beforeEach(module('tipicoSportsbookControllers'));
	beforeEach(module('tipicoSportsbookServices'));

	var $controller, $rootScope, $scope;

	beforeEach(inject(function (_$controller_, _$rootScope_) {
		$controller = _$controller_;
		$rootScope = _$rootScope_;
	}));

	beforeEach(function () {
		$scope = $rootScope.$new();
		controller = $controller('BetslipController', {$scope: $scope});
	});

	it('should calculate total odds by summing the value property of all bets objects', function () {
		var arrBets = [
			{'value': 1},
			{'value': 2}
		];

		var totalOdds = controller.getTotalOdds(arrBets);
		expect(totalOdds).toEqual(3);
	});

	it('should calculate possible gain by multiplying the total stake and total odds', function () {
		var totalOdds = '3.1';
		var totalStake = 3;
		var possibleGain = controller.getPossibleGain(totalOdds, totalStake);
		expect(possibleGain).toEqual(9.3);
		expect(controller.possibleGain).not.toEqual(0);
	});

	it('should delete bets by given ID', function () {
		var betId = 16646752210;
		controller.arrBets = [
			{
				id:16646752210,
				market:"3-Way",
				matchTitle: "Bayern Munich - Borussia Dortmund",
				name: "X",
				value: "18"
			},
			{
				id: 16646752110,
				market: "3-Way",
				matchTitle: "Bayern Munich - Borussia Dortmund",
				name: "1",
				value: "1,01"
			}
		];

		var e = {};
		e.stopPropagation = function() {};
		controller.deleteBet(e, betId);
		expect(controller.arrBets.length).toEqual(1);
	});

	it('should show/hide the keypad', function () {
		var e = {};
		e.stopPropagation = function () {};
		controller.setKeypadVisibility(e, false);
		expect(controller.isKeypadVisible).toBeFalsy();
		controller.setKeypadVisibility(e, true);
		expect(controller.isKeypadVisible).toBeTruthy();

	});
});