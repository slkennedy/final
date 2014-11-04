(function (){
	'use strict';

	window.App = {};

	App.Models = {};
	App.Views = {};
	App.Collections = {};

////////////////Models/////	
//////////////////////////

	var User = Parse.Object.extend ('User');

	var School = Parse.Object.extend({
		className: 'School',
		defaults: {
			avatar: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
		}
	});

	var Course = Parse.Object.extend ({
		className: 'Class'
	});

	var Post = Parse.Object.extend ({
		className: 'Post'
	});

	var Comment = Parse.Object.extend ({
		className: 'Comment'
	});

////////////////Collections///	
/////////////////////////////

	var Schools = Parse.Collection.extend ({
		model: School
	});

	var Courses = Parse.Collection.extend ({
		model: Course
		// initialize: function(){
		// 	this.query = 
		// }
	});

	var Posts = Parse.Collection.extend ({
		model: Post
	});

	var Comments = Parse.Collection.extend ({
		model: Comment
	});

	var UsersCourses = Parse.Collection.extend ({
		model: Course, 

		// initialize: function (){
		// 	this.query = new Parse.Query(User);
		// 	this.query
		// }
	})

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
			'userPage' : 'userPage',
			'update' : 'update'
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

		userPage: function (){
			$('.container').empty();
			// var coment = new fsdf()
			// cmment.fet

			new App.Views.UserPageView({
				model: Parse.User.current(),
				// user: user
			});

			new App.Views.UserCourses ({
				model: new Course()
			})

			new App.Views.PossibleCourses ({
				model: new Course()
			})
		},

		update: function (){
			$('.container').empty();
			new App.Views.UpdateAccountView ({
				model: Parse.User.current()
			});
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
							},
						});
					});	
				} else {
					user.set('avatar', 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png');

					user.signUp(null, {
						success: function (user){
							App.Route.navigate('', {trigger:true});
						},
						error: function (user, error){
							console.log(error)
							alert('error: '+error.code+' '+error.message);
						}
					});
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
						App.Route.navigate('userPage', {trigger:true});
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

	App.Views.UserPageView = Parse.View.extend ({
		template: _.template($('#templates-user-page').html()),

		initialize: function (opts){
			// var options = _.defaults({}, opts, {
			// 	users: opts.users
			// })

			// opts.users
			// this.users = options.users
			console.log(opts.model);
			console.log(opts);
			console.log(opts.course);
			$('.container').append(this.el);
			this.render();
		},

		render: function (){
			this.$el.append(this.template(this.model.toJSON()));
		}
	});

	App.Views.UserCourses = Parse.View.extend ({
		template: _.template($('#templates-user-courses').html()),

		initialize: function () {
			$('.container').append(this.el);
			this.render();
		},

		render: function () {
			this.$el.append(this.template(this.model.toJSON()));
		}
	});

	App.Views.PossibleCourses = Parse.View.extend ({
		template: _.template($('#templates-possible-courses').html()),

		initialize: function () {
			$('.container').append(this.el);
			this.render();
		},

		render: function () {
			this.$el.append(this.template(this.model.toJSON()));
		}
	});

	App.Views.UpdateAccountView = Parse.View.extend ({
		template: _.template($('#templates-update-account').html()),

		events: {
			'click .button' : 'updateAccount'
		},

		updateAccount: function (){
			user.get('firstName').set($('input[name="firstName"]').val());
			// user.set ('lastName', $('input[name="lastName"]').val());
			// user.set ('username', $('input[name="email"]').val());
			// user.set ('email', $('input[name="email"]').val());			
			// user.set ('password', $('input[name="password"]').val());

			user.save();
		},

		initialize: function () {
			$('.container').append(this.el);
			this.render();
		},

		render: function (){
			this.$el.append(this.template(this.model.toJSON()));
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