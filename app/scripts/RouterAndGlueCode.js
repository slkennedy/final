(function (){
	'use strict';

	window.App = {};

	App.Models = {};
	App.Views = {};
	App.Collections = {};

////////////////Router/////	
//////////////////////////

	App.Router = Parse.Router.extend ({

		initialize: function (){
			this.render();
		},

		render: function (){
			console.log(this.collection);

		},

		routes: {
			''      :'home',
			'create':'create',
			'login' :'login',
			'logout':'logout'
		},

		home: function (){
			$('.container').empty();
			new App.Views.HomeView();
		},

		create: function (){
			$('.container').empty();
			new App.Views.CreateAccountView({collection: Schools});
		},

		login: function (){
			$('.container').empty(),
			new App.Views.LoginView();
		},

		logout: function (){
			$('.container').empty();
			new App.Views.LogoutView();
		}

	});

////////////////Glue Code/////	
/////////////////////////////
	$(document).ready(function (){
		Parse.initialize("OZul0dIztIqSycVvaNZf2T8u7cEIiHrFGQ7ugiPO", "jEmTlFjwtlOorQaCnp4zjUp00wFkTdwfHvbacqGS");
		App.Route = new App.Router();
		Parse.history.start();
	});

})();