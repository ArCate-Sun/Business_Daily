'use strict';

var layout = angular.module('daily.layout', []);

layout.controller('PageFrameworkCtrl', function ($rootScope) {

	$rootScope.isLoginPage = false;
	$rootScope.isLightLoginPage = false;
	$rootScope.isLockscreenPage = false;
	$rootScope.isMainPage = true;

});

layout.service('$UIModalSrv', function ($scope, $rootScope, $modal) {

	$scope.openModal = function(modal_id, modal_size, modal_backdrop)
	{
		$rootScope.currentModal = $modal.open({
			templateUrl: modal_id,
			size: modal_size,
			backdrop: typeof modal_backdrop == 'undefined' ? true : modal_backdrop
		});
	};

});