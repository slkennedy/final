(function (){
	'use strict';

	window.App = {};

	App.Models = {};
	App.Views = {};
	App.Collections = {};

////////////////Models/////	
//////////////////////////

	var School = Parse.Object.extend({
		className: 'School'
	});

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
			'logout':'logout',
			'myaccount' : 'myaccount'
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
		},

		myaccount: function (){
			$('.container').empty();
			new App.Views.MyAccountView();
		},
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

		events: {
			'click .button': 'createAccount'
		},

		initialize: function (){
			console.log('initalize start');
			var self = this;
			this.collection = new Schools();
			this.collection.fetch().then( function (){
				$('.container').append(self.el);
				self.render();
			})
			console.log('intialize ends');
		},

		render: function (){
			this.$el.html(this.template({schools: this.collection.toJSON()}));
		},

		createAccount: function (e){
			e.preventDefault();
			
			var query = new Parse.Query(School);
			query.equalTo('objectId', $('.school-list').val());
			query.first().then(function (school){
				var user = new Parse.User ();
				user.set ('firstName', $('input[name="firstName"]').val());
				user.set ('lastName', $('input[name="lastName"]').val());
				user.set ('school', school);
				user.set ('username', $('input[name="email"]').val());
				user.set ('email', $('input[name="email"]').val());			
				user.set ('password', $('input[name="password"]').val());

				var $uploadFile = $('.avatar')[0];
				if ($uploadFile.files.length > 0){
					var file = $uploadFile.files[0];
				 	var parseFile = new Parse.File(file.name, file);
				 	
				 	parseFile.save().then(function (success){
				 		user.set('avatar', parseFile._url);

				 		user.signUp(null, {
							success: function (user){
								App.Route.navigate('', {trigger:true});
							},
							error: function (user, error){
								console.log(error)
								alert('error: '+error.code+' '+error.message);
						}
					});	
				} else{ 
					user.set('avatar', 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png')
				}
			});
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
						console.log('logged in')
						App.Route.navigate('myaccount', {trigger:true});
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

	App.Views.MyAccountView = Parse.View.extend ({
		template: _.template($('#templates-my-account').html()),

		initialize: function (){
			console.log('initialize starts');
			$('.container').append(this.el);
			this.render();
			console.log('initialize ends');
		},

		render: function (){
			console.log('render starts');
			this.$el.append(this.template);
			console.log('render ends');
		}

	})

////////////////Glue Code/////	
/////////////////////////////
	$(document).ready(function (){
		Parse.initialize("OZul0dIztIqSycVvaNZf2T8u7cEIiHrFGQ7ugiPO", "jEmTlFjwtlOorQaCnp4zjUp00wFkTdwfHvbacqGS");
		App.Route = new App.Router();
		Parse.history.start();
	});

})();