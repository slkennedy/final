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

		resetLogin: function (){
			$('.container').empty();
		
			new App.Views.ResetLoginView();
		},

		logout: function (){
			$('.container').empty();

			new App.Views.LogoutView();
		},

		userPage: function (){
			$('.container').empty();
			$('.user-courses-container').empty();
			$('.possible-courses-container').empty();

			var user = Parse.User.current();
			if( user === null) {
				App.router.navigate('login', {trigger:true});

			}else {
				new App.Views.UserPageView({
					model: Parse.User.current()
				});
			}
			

			// var usercourses = new App.Collections.UsersCourses()
			// usercourses.fetch().then(function(){
			// 	new App.Views.UserCourses ({
			// 		collection: usercourses
			// 	});
			// });

			// var possiblecourses = new App.Collections.PossibleCourses()
			// possiblecourses.fetch().then(function(){
			// 	new App.Views.PossibleCourseList ({
			// 		collection: possiblecourses
			// 	});	
			// });

			/*
				This is never calling `.off` - separate function 
			*/

			// possiblecourses.on('remove', function (model){
			// 	usercourses.add(model);
			// });
		},

		update: function (){
			$('.container').empty();
			
			var user = Parse.User.current();
			if( user === null) {
				App.router.navigate('login', {trigger:true});
				
			}else {
				new App.Views.UpdateAccountView ({
					model: Parse.User.current()
				});
			}
		},

		createCourse: function (){
			$('.container').empty();

			new App.Views.CreateCourseView();
		},

		courseDetails: function(courseId) {
			$('.container').empty();

			new Parse.Query('Course').get(courseId, {
				success: function (course){
					var posts = course.relation('posts').query().collection();
					posts.fetch();
					new App.Views.CourseDetailsView({
						model: course,
						collection: posts
					});
					new App.Views.PostListView({
						model: course,
						collection: posts
					});
				}, 
				error: function (course, err){
					console.log('course not found')
				}
			});
		},

		postDetails: function (postId) {
			$('.container').empty();

			new Parse.Query('Post').get(postId, {
				success: function (post){
					var comments = post.relation('comments').query().collection();
					comments.fetch().then(function(comments){

						new App.Views.PostDetailsView({
							model: post,
							collection: comments
						});
					});

					
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