(function (){
	'use strict';

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
			'update' : 'update',
			'courses/:course' : 'courseDetails',
			'createCourse' : 'createCourse'
		},

		home: function (){
			$('.container').empty();
			new App.Views.HomeView();
		},

		create: function (){
			$('.container').empty();
			new App.Views.CreateAccountView();
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
				model: Parse.User.current()
				// user: user
			});


			var usercourses = new App.Collections.Courses()
			usercourses.fetch().then(function(){
				new App.Views.UserCourses ({

				});
			});

			var possiblecourses = new App.Collections.PossibleCourses()
			possiblecourses.fetch().then(function(){
				new App.Views.PossibleCourses ({
					collection: possiblecourses
				});	
			});
		},

		courseDetails: function (course){
			$('.container').empty();

			var courseQuery = new Parse.Query('Course');
			courseQuery.equalTo('courseName', Course);
			var collection = courseQuery.collection ();
			collection.fetch().then(function (opts){
				new App.Views.CourseDetailsView({collection: this.collection});
			});
		},

		update: function (){
			$('.container').empty();
			new App.Views.UpdateAccountView ({
				model: Parse.User.current()
			});
		},

		createCourse: function (){
			$('.container').empty();
			new App.Views.CreateCourseView();
		},
	});

})();