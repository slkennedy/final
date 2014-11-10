(function (){
	'use strict';

	App.Views.CourseDetailsView = Parse.View.extend ({
		className: 'course-details-container',
		template: _.template($('#templates-course-details').html()),

		events: {
			'click .create-post' : 'createPost',
			'click .drop-course' : 'dropCourse',
			'click .join-course' : 'joinCourse'

		},

		joinCourse: function (e){	
			e.preventDefault(); 
			console.log(this.model);	
		    var course = this.model;
			var user = Parse.User.current();

			var relationToCourse = course.relation('members');
			relationToCourse.add(user);

			course.save();
		},

		dropCourse: function (e) {
			e.preventDefault();
			var user = Parse.User.current();
			var course = this.model;
			course.relation('members').remove(user);
			course.save();
		},

		createPost: function (e){
			var course = this.model;
			e.preventDefault();
			var post = new App.Models.Post();
			post.set ('postContent', $('textarea[name="post"]').val());
			post.set ('postAuthor', Parse.User.current());

			post.save().then(function () {
				console.log('success', post)
				var id = post.get('objectId');
				console.log(id);
				post.set('postId', id);
				post.save().then(function () {
					var relation = course.relation('posts');
					relation.add(post);
					course.save();
				});		
			});
		},

		initialize: function () {
			$('.container').prepend(this.el);
			new App.Models.Course();
			this.render();
		},


		render: function () {
			this.$el.append(this.template(this.model.toJSON()));
		}
	});	


})();