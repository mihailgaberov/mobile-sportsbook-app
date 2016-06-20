describe('MainController:', function () {
	beforeEach(module('tipicoSportsbookControllers'));
	beforeEach(module('tipicoSportsbookServices'));

	var $controller, $rootScope, $scope;

	beforeEach(inject(function (_$controller_, _$rootScope_) {
		$controller = _$controller_;
		$rootScope = _$rootScope_;
		spyOn($rootScope, '$broadcast');
	}));

	beforeEach(function () {
		$scope = $rootScope.$new();
		var eventDetails = {};
		controller = $controller('MainController', {$scope: $scope, eventDetails: eventDetails});
	});

	beforeEach(function () {
    	controller.sendLiveAction = jasmine.createSpy("sendLiveAction");
    	controller.init = jasmine.createSpy("init");
    	jasmine.clock().install();
	});

  afterEach(function () {
    jasmine.clock().uninstall();
  });


  it("should broadcast the last action data after 4 seconds", function() {
    setTimeout(function () {
      controller.sendLiveAction();
    }, 4000);

    expect(controller.sendLiveAction).not.toHaveBeenCalled();

    jasmine.clock().tick(4001);

    expect(controller.sendLiveAction).toHaveBeenCalled();
  });

  it("should init the project by broadcasting the event details data", function() {
    setTimeout(function () {
      controller.init();
    }, 100);

    expect(controller.init).not.toHaveBeenCalled();

    jasmine.clock().tick(101);

    expect(controller.init).toHaveBeenCalled();
  });
});