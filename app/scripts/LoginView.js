(function (){
	'use strict';

	window.App = {};

	App.Models = {};
	App.Views = {};
	App.Collections = {};

	App.Views.LoginView = Parse.View.extend ({
		template: _.template($('#templates-login').html()),

		events: {
			'click .button': 'login'
		},

		login: function (e) {
			e.preventDefault();
			Parse.User.logIn (
				$('input[name="email"]').val(),
				$('input[name="password"]').val(), {
					success: function (user){
						App.Route.navigate('', {trigger:true});
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