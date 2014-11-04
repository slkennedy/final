(function (){
	'use strict';

	App.Views.LogoutView = Parse.View.extend ({

		initialize: function (){
			Parse.User.logOut();
			this.render();
		},

		render: function (){
			App.router.navigate('login', {trigger: true});
		}
	});


})();