'use strict';

var login = angular.module('daily.login', []);

login.controller('LoginCtrl', function ($rootScope, $loginSrv) {

	// 设置页面常量
	$rootScope.isLoginPage = true;
	$rootScope.isLightLoginPage = true;
	$rootScope.isLockscreenPage = false;
	$rootScope.isMainPage = false;

	// 处理登录表格
	setTimeout(function () {
		$(".fade-in-effect").addClass('in');
	}, 1);

	var rules = {
		username: {
			required: true,
			rangelength: [6, 16]
		},

		passwd: {
			required: true,
			rangelength: [6, 16]
		}
	};

	var messages = {
		username: {
			required: '请输入您的用户名.',
			rangelength: '用户名应为 6 至 16 位'
		},

		passwd: {
			required: '请输入您的密码.',
			rangelength: '密码应为 6 至 16 位'
		}
	};

	// 登录凭借格式验证和提交
	$loginSrv.validateLoginForm("form#login", rules, messages, $loginSrv.submitHandler);

	// Set Form focus
	$("form#login .form-group:has(.form-control):first .form-control").focus();
});

login.service('$loginSrv', function () {

	var $srv = this;

	this.login = function (username, password, func_succ) {

		$.ajax({
			url: 'login-check',
			method: 'POST',
			dataType: 'json',
			data: {
				do_login: true,
				username: username,
				password: password
			},
			success: func_succ
		});
	};

	this.execLoginResponser = function (resp, form) {

		showLoadingBar({
			delay: .5,
			pct: 100,
			finish: function () {

				// Redirect after successful login page (when progress bar reaches 100%)
				if (resp.accessGranted) {
					window.location.hash = '#/app/index';
					//$('body').removeClass('login-page login-light lockscreen-page');
				}
			}
		});

		// 移除警告信息
		$(".errors-container .alert").slideUp('fast');

		// 显示错误信息
		if (resp.accessGranted == false) {
			$(".errors-container").html('<div class="alert alert-danger">\
										<button type="button" class="close" data-dismiss="alert">\
											<span aria-hidden="true">&times;</span>\
											<span class="sr-only">关闭</span>\
										</button>\
										' + resp.errors + '\
									</div>');


			$(".errors-container .alert").hide().slideDown();
			$(form).find('#passwd').select();

		}
	};

	this.submitHandler = function (form) {

		var username = $(form).find('#username').val();
		var password = $(form).find('#password').val();
		var func_resp = $srv.execLoginResponser;

		showLoadingBar(70); // Fill progress bar to 70% (just a given value)
		$srv.login(username, password, func_resp);

	};

	this.validateLoginForm = function (loginFormSelector, rules, messages, submitHandler) {


		$(loginFormSelector).validate({
			rules: rules,
			messages: messages,
			submitHandler: submitHandler
		});
	}
});