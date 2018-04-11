'use strict';

var app = angular.module('xenon-app', [
	'ngCookies',

	'ui.router',
	'ui.bootstrap',

	'oc.lazyLoad',

	'xenon.controllers',
	'xenon.directives',
	'xenon.factory',
	'xenon.services',

	// Added in v1.3
	'FBAngular'
]);

app.run(function()
{
	// Page Loading Overlay
	public_vars.$pageLoadingOverlay = jQuery('.page-loading-overlay');

	jQuery(window).load(function()
	{
		public_vars.$pageLoadingOverlay.addClass('loaded');
	})
});


app.config(function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, ASSETS){

	$urlRouterProvider.otherwise('/app/report-my-report');

	$stateProvider.
		// Main Layout Structure
		state('app', {
			abstract: true,
			url: '/app',
			templateUrl: appHelper.templatePath('layout/app-body'),
			controller: function($rootScope){
				$rootScope.isLoginPage        = false;
				$rootScope.isLightLoginPage   = false;
				$rootScope.isLockscreenPage   = false;
				$rootScope.isMainPage         = true;
			}
		}).
		// 报告
		state('app.report-my-report', {
			url: '/report-my-report',
			templateUrl: appHelper.templatePath('report/my-report'),
			resolve: {
				resources: function ($ocLazyLoad) {
					return $ocLazyLoad.load([
						ASSETS.core.moment,
						ASSETS.forms.daterangepicker
					]);
				}
			}
		}).
		state('app.report-team-report', {
			url: '/report-team-report',
			templateUrl: appHelper.templatePath('report/team-report'),
			resolve: {
				resources: function ($ocLazyLoad) {
					return $ocLazyLoad.load([
						ASSETS.core.moment,
						ASSETS.forms.daterangepicker
					]);
				}
			}
		}).
		// 考评
		state('app.performance-my-performance', {
			url: '/performance-my-performance',
			templateUrl: appHelper.templatePath('performance/my-performance'),
			controller: 'UIModalsCtrl',
			resolve: {
				resources: function ($ocLazyLoad) {
					return $ocLazyLoad.load([
						ASSETS.core.moment,
						ASSETS.forms.daterangepicker
					]);
				}
			}
		}).
		state('app.performance-my-check', {
			url: '/performance-my-check',
			templateUrl: appHelper.templatePath('performance/my-check'),
			controller: 'UIModalsCtrl',
			resolve: {
				resources: function ($ocLazyLoad) {
					return $ocLazyLoad.load([
						ASSETS.core.moment,
						ASSETS.forms.daterangepicker
					]);
				}
			}
		}).
		state('app.performance-report-setting', {
			url: '/performance-report-setting',
			templateUrl: appHelper.templatePath('performance/report-setting'),
			controller: 'UIModalsCtrl',
			resolve: {
				resources: function ($ocLazyLoad) {
					return $ocLazyLoad.load([
						ASSETS.core.moment,
						ASSETS.forms.daterangepicker
					]);
				}
			}
		}).
		// 邮箱
		state('app.email', {
			url: '/email',
			templateUrl: appHelper.templatePath('email/inbox')
		}).
		state('app.email-view', {
			url: '/email-view',
			templateUrl: appHelper.templatePath('email/view'),
		}).
		state('app.email-edit', {
			url: '/email-edit',
			templateUrl: appHelper.templatePath('email/edit'),
			resolve: {
				bootstrap: function($ocLazyLoad){
					return $ocLazyLoad.load([
						ASSETS.core.bootstrap,
					]);
				},
				bootstrapWysihtml5: function($ocLazyLoad){
					return $ocLazyLoad.load([
						ASSETS.forms.bootstrapWysihtml5,
					]);
				},
			}
		}).
		state('app.mailbox-message', {
			url: '/mailbox-message',
			templateUrl: appHelper.templatePath('mailbox/message'),
		}).
		// 账户管理
		state('app.account-my-account', {
			url: '/account-my-account',
			templateUrl: appHelper.templatePath('account/my-account'),
			resolve: {
				resources: function ($ocLazyLoad) {
					return $ocLazyLoad.load([
						ASSETS.core.moment,
						ASSETS.forms.daterangepicker
					]);
				}
			}
		}).
		state('app.account-worker-account-manage', {
			url: '/account-worker-account-manage',
			templateUrl: appHelper.templatePath('account/worker-account-manage'),
			resolve: {
				resources: function ($ocLazyLoad) {
					return $ocLazyLoad.load([
						ASSETS.core.moment,
						ASSETS.forms.daterangepicker
					]);
				}
			}
		});
});


app.constant('ASSETS', {
	'core': {
		'bootstrap': appHelper.assetPath('js/bootstrap.min.js'), // Some plugins which do not support angular needs this

		'jQueryUI': [
			appHelper.assetPath('js/jquery-ui/jquery-ui.min.js'),
			appHelper.assetPath('js/jquery-ui/jquery-ui.structure.min.css'),
		],

		'moment': appHelper.assetPath('js/moment.min.js'),

		'googleMapsLoader': appHelper.assetPath('app/js/angular-google-maps/load-google-maps.js')
	},

	'charts': {

		'dxGlobalize': appHelper.assetPath('js/devexpress-web-14.1/js/globalize.min.js'),
		'dxCharts': appHelper.assetPath('js/devexpress-web-14.1/js/dx.chartjs.js'),
		'dxVMWorld': appHelper.assetPath('js/devexpress-web-14.1/js/vectormap-data/world.js'),
	},

	'xenonLib': {
		notes: appHelper.assetPath('js/xenon-notes.js'),
	},

	'maps': {

		'vectorMaps': [
			appHelper.assetPath('js/jvectormap/jquery-jvectormap-1.2.2.min.js'),
			appHelper.assetPath('js/jvectormap/regions/jquery-jvectormap-world-mill-en.js'),
			appHelper.assetPath('js/jvectormap/regions/jquery-jvectormap-it-mill-en.js'),
		],
	},

	'icons': {
		'meteocons': appHelper.assetPath('css/fonts/meteocons/css/meteocons.css'),
		'elusive': appHelper.assetPath('css/fonts/elusive/css/elusive.css'),
	},

	'tables': {
		'rwd': appHelper.assetPath('js/rwd-table/js/rwd-table.min.js'),

		'datatables': [
			appHelper.assetPath('js/datatables/dataTables.bootstrap.css'),
			appHelper.assetPath('js/datatables/datatables-angular.js'),
		],

	},

	'forms': {

		'select2': [
			appHelper.assetPath('js/select2/select2.css'),
			appHelper.assetPath('js/select2/select2-bootstrap.css'),

			appHelper.assetPath('js/select2/select2.min.js'),
		],

		'daterangepicker': [
			appHelper.assetPath('js/daterangepicker/daterangepicker-bs3.css'),
			appHelper.assetPath('js/daterangepicker/daterangepicker.js'),
		],

		'colorpicker': appHelper.assetPath('js/colorpicker/bootstrap-colorpicker.min.js'),

		'selectboxit': appHelper.assetPath('js/selectboxit/jquery.selectBoxIt.js'),

		'tagsinput': appHelper.assetPath('js/tagsinput/bootstrap-tagsinput.min.js'),

		'datepicker': appHelper.assetPath('js/datepicker/bootstrap-datepicker.js'),

		'timepicker': appHelper.assetPath('js/timepicker/bootstrap-timepicker.min.js'),

		'inputmask': appHelper.assetPath('js/inputmask/jquery.inputmask.bundle.js'),

		'formWizard': appHelper.assetPath('js/formwizard/jquery.bootstrap.wizard.min.js'),

		'jQueryValidate': appHelper.assetPath('js/jquery-validate/jquery.validate.min.js'),

		'dropzone': [
			appHelper.assetPath('js/dropzone/css/dropzone.css'),
			appHelper.assetPath('js/dropzone/dropzone.min.js'),
		],

		'typeahead': [
			appHelper.assetPath('js/typeahead.bundle.js'),
			appHelper.assetPath('js/handlebars.min.js'),
		],

		'multiSelect': [
			appHelper.assetPath('js/multiselect/css/multi-select.css'),
			appHelper.assetPath('js/multiselect/js/jquery.multi-select.js'),
		],

		'icheck': [
			appHelper.assetPath('js/icheck/skins/all.css'),
			appHelper.assetPath('js/icheck/icheck.min.js'),
		],

		'bootstrapWysihtml5': [
			appHelper.assetPath('js/wysihtml5/src/bootstrap-wysihtml5.css'),
			appHelper.assetPath('js/wysihtml5/wysihtml5-angular.js')
		],
	},

	'uikit': {
		'base': [
			appHelper.assetPath('js/uikit/uikit.css'),
			appHelper.assetPath('js/uikit/css/addons/uikit.almost-flat.addons.min.css'),
			appHelper.assetPath('js/uikit/js/uikit.min.js'),
		],

		'codemirror': [
			appHelper.assetPath('js/uikit/vendor/codemirror/codemirror.js'),
			appHelper.assetPath('js/uikit/vendor/codemirror/codemirror.css'),
		],

		'marked': appHelper.assetPath('js/uikit/vendor/marked.js'),
		'htmleditor': appHelper.assetPath('js/uikit/js/addons/htmleditor.min.js'),
		'nestable': appHelper.assetPath('js/uikit/js/addons/nestable.min.js'),
	},

	'extra': {
		'tocify': appHelper.assetPath('js/tocify/jquery.tocify.min.js'),

		'toastr': appHelper.assetPath('js/toastr/toastr.min.js'),

		'fullCalendar': [
			appHelper.assetPath('js/fullcalendar/fullcalendar.min.css'),
			appHelper.assetPath('js/fullcalendar/fullcalendar.min.js'),
		],

		'cropper': [
			appHelper.assetPath('js/cropper/cropper.min.js'),
			appHelper.assetPath('js/cropper/cropper.min.css'),
		]
	},

	'email': {

	}
});