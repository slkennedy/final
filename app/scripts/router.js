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
			'resetLogin' : 'resetLogin',
			'logout':'logout',
			'userPage' : 'userPage',
			'update' : 'update',
			'courses/:courseId' : 'courseDetails',
			'createCourse' : 'createCourse',
			'posts/:postId' : 'postDetails'
		},

		home: function (){
			$('.container').empty();
			$('.user-courses-container').hide();
			$('.possible-course-header').hide();
			$('.possible-courses-container').hide();

			new App.Views.HomeView();
		},

		create: function (){
			$('.container').empty();
			$('.user-courses-container').hide();
			$('.possible-course-header').hide();
			$('.possible-courses-container').hide();

			new App.Views.CreateAccountView();
		},

		login: function (){
			$('.container').empty(),
			$('.user-courses-container').hide();
			$('.possible-course-header').hide();
			$('.possible-courses-container').hide();

			new App.Views.LoginView();
		},

		resetLogin: function (){
			$('.container').empty();
			$('.user-courses-container').hide();
			$('.possible-course-header').hide();
			$('.possible-courses-container').hide();

			new App.Views.ResetLoginView();
		},

		logout: function (){
			$('.container').empty();
			$('.user-courses-container').hide();
			$('.possible-course-header').hide();
			$('.possible-courses-container').hide();

			new App.Views.LogoutView();
		},

		userPage: function (){
			$('.container').empty();
			$('.user-courses-container').empty();
			$('.possible-courses-container').empty();
			$('.user-courses-container').show();
			$('.possible-course-header').show();
			$('.possible-courses-container').show();

			new App.Views.UserPageView({
				model: Parse.User.current()
			});

			var usercourses = new App.Collections.UsersCourses()
			usercourses.fetch().then(function(){
				new App.Views.UserCourses ({
					collection: usercourses
				});
			});

			var possiblecourses = new App.Collections.PossibleCourses()
			possiblecourses.fetch().then(function(){
				new App.Views.PossibleCourseList ({
					collection: possiblecourses
				});	
			});

			/*
				This is never calling `.off` - separate function 
			*/

			possiblecourses.on('remove', function (model){
				usercourses.add(model);
			});
		},

		update: function (){
			$('.container').empty();
			$('.user-courses-container').hide();
			$('.possible-course-header').hide();
			$('.possible-courses-container').hide();

			new App.Views.UpdateAccountView ({
				model: Parse.User.current()
			});
		},

		createCourse: function (){
			$('.container').empty();
			$('.user-courses-container').hide();
			$('.possible-course-header').hide();
			$('.possible-courses-container').hide();

			new App.Views.CreateCourseView();
		},

		courseDetails: function(courseId) {
			$('.container').empty();
			$('.user-courses-container').hide();
			$('.possible-course-header').hide();
			$('.possible-courses-container').hide();

			new Parse.Query('Course').get(courseId, {
				success: function (course){
					new App.Views.CourseDetailsView({model: course});
					new App.Views.PostListView({model: course});
				}, 
				error: function (course, err){
					console.log('course not found')
				}
			});
		},

		postDetails: function (postId) {
			$('.container').empty();
			$('.user-courses-container').hide();
			$('.possible-course-header').hide();
			$('.possible-courses-container').hide();
			
			new Parse.Query('Post').get(postId, {
				success: function (post){
					new App.Views.PostDetailsView({model: post});
				}, 
				error: function (course, err){
					console.log('course not found')
				}
			});
		}

		// createPost: function (){
		// 	$('.container').empty();
		// 	$('.user-courses-container').hide();
		// 	$('.possible-courses-container').hide();
		// 	new App.Views.CreatePostView();
		// },

	});

})();