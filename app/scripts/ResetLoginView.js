(function (){
	'use strict';

	App.Views.ResetLoginView = Parse.View.extend ({
		template: _.template($('#templates-reset-login').html()),

		events: {
			'click .login-button' : 'login'
		},

		login: function (e) {
			e.preventDefault();
			Parse.User.logIn (
				$('input[name="email"]').val(),
				$('input[name="password"]').val(), {
					success: function (user){
						console.log('logged in')
						App.router.navigate('userPage', {trigger:true});
					},
					error: function (user, error){
						console.log(error);
					}
				}
			);
		},

		initialize: function () {
			$('.container').append(this.el);
			this.render();
		},

		render: function () {
			this.$el.append(this.template);
		}

	});

})();