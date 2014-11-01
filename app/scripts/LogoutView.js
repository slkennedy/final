(function (){
	'use strict';

	window.App = {};

	App.Models = {};
	App.Views = {};
	App.Collections = {};

	App.Views.LogoutView = Parse.View.extend ({

		initialize: function (){
			Parse.User.logOut();
			this.render();
		},

		render: function (){
			App.Route.navigate('login', {trigger:true});
		}
	});
})();