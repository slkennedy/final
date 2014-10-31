(function (){
	'use strict';

	window.App = {};

	App.Models = {};
	App.Views = {};
	App.Collections = {};

////////////////Models/////	
//////////////////////////

	var School = Parse.Object.extend('School');

////////////////Collections///	
/////////////////////////////

	var Schools = Parse.Collection.extend ({
		model: School
	});

////////////////Router/////	
//////////////////////////

	App.Router = Parse.Router.extend ({
		initialize: function (){
			this.render();
		},

		render: function (){

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

////////////////Views/////	
/////////////////////////
	App.Views.HomeView = Parse.View.extend ({
		template: _.template($('#templates-home').html()),

		initialize: function (){
			$('.container').append(this.el);
			this.render();
		},

		render: function (){
			this.$el.html(this.template);
		}
	});

	App.Views.CreateAccountView = Parse.View.extend ({
		template: _.template($('#templates-create-account').html()),
		collection: Schools,

		events: {
			'click .button': 'createAccount'
		},

		initialize: function (){
			console.log('initalize start');
			console.log(this.collection.attributes);
			_.bindAll(this, 'createAccount');
			$('.container').append(this.el);
			this.render();
			console.log('intialize ends');
		},

		render: function (){
			console.log('render starts');
			console.log(this);
			this.$el.html(this.template(this.model));
			console.log('render ends');
		},

		createAccount: function (e){
			console.log('create account starts');
			e.preventDefault();
			var user = new Parse.User ();
			user.set ('firstName', $('input[name="firstName"]').val());
			user.set ('lastName', $('input[name="lastName"]').val());
			// user.set ('school', $('.school-list').val());
			user.set ('username', $('input[name="email"]').val());
			user.set ('email', $('input[name="email"]').val());			
			user.set ('password', $('input[name="password"]').val());
			user.set ('avatar', $('input[name="avatar"]').val());

			user.signUp(null, {
				success: function (user){
					console.log('yea');
					// Parse.User.logIn(
					// 	$('input[value="email"]').val(),
					// 	$('input[value="password"]').val(), {
					// 		success: function(user){
					// 			console.log('user created!');
					// 		},
					// 		error: function (user, error){
					// 			console.log("not cool")
					// 		}
					// 	}
					// )
				},
				error: function (){
					console.log(error)
					alert('error: '+error.code+' '+error.message);
				}
			});

			console.log('create account ends');
		}

	});

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

	App.Views.LogoutView = Parse.View.extend ({

		initialize: function (){
			Parse.User.logOut();
			this.render();
		},

		render: function (){
			App.Route.navigate('login', {trigger:true});
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