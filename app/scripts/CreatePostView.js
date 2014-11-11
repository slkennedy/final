// (function (){
// 	'use strict';

// 	App.Views.CreatePostView = Parse.View.extend ({
// 		template: _.template($('#templates-create-post').html()),

// 		events: {
// 			'click .button' : 'createPost'
// 		},

// 		initialize: function (){''
// 			$('.container').append(this.el);
// 			this.render();
// 			// var self = this;
// 			// this.collection = new App.Collections.Schools();
// 			// this.collection.fetch().then( function (){
// 			// 	$('.container').append(self.el);
// 			// 	self.render();
// 			// });
// 		},

// 		render: function (){
// 			this.$el.append(this.template);
// 		},

// 		createPost: function (e){
// 			e.preventDefault();
// 			var post = new App.Models.Post();
// 			post.set ('postTitle', $('input[name="postTitle"]').val());
// 			post.set ('postBody', $('input[name="postBody"]').val());
// 			post.set ('postAuthor', Parse.User.current());
// 			// post.relation ('')

// 			post.save({
// 				success: function (user){
// 					console.log('success', user)
// 				},
// 				error: function (user, err){
// 					console.log('boo', err)
// 				}
// 			});

// 			// var query = new Parse.Query(App.Models.School);
// 			// query.equalTo('objectId', $('.school-list').val());
// 			// query.first().then(function (school) {
// 			// 	var course = new App.Models.Course();
// 			// 	course.set ('courseName', $('input[name="courseName"]').val());
// 			// 	course.set ('semester', $('select[name="semester"]').val());
// 			// 	course.set ('year', +$('select[name="year"]').val());
// 			// 	course.set('school', school);

// 			// 	course.save({
// 			// 		success: function (user){
// 			// 			App.router.navigate('userPage', {trigger:true})
// 			// 		},
// 			// 		error: function (user, error){
// 			// 			console.log(error);
// 			// 		}
// 			// 	});
// 			// });
// 		}

// 	});

// })();