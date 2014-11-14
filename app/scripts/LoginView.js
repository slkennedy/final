(function (){
	'use strict';

	App.Views.LoginView = Parse.View.extend ({
		className: 'login-wrapper',
		template: _.template($('#templates-login').html()),

		events: {
			'click .login-button': 'login',
			'click .forgot-password' : 'forgotPassword',
		},

		forgotPassword: function () {
			$('.forgot-password-wrapper').remove();
			new App.Views.ForgotPasswordView ();
		},

		login: function (e) {
			e.preventDefault();
			Parse.User.logIn (
				$('input[name="email"]').val(),
				$('input[name="password"]').val(), {
					success: function (user){
						App.router.navigate('userPage', {trigger:true});
					},
					error: function (user, error){
						console.log(error);
					}
				}
			);
		},

		initialize: function (){
			$('.container').append(this.el);
			this.render();
		},

		render: function (){
			this.$el.append(this.template);
		}

	});


})();