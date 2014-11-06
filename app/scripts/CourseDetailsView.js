(function (){
	'use strict';

	App.Views.CourseDetailsView = Parse.View.extend ({
		template: _.template($('#templates-course-details').html()),

		events: {
			'click .create-post' : 'createPost'
		},

		createPost: function (e){
			var course = this.model;
			e.preventDefault();
			var post = new App.Models.Post();
			post.set ('postContent', $('textarea[name="post"]').val());
			post.set ('postAuthor', Parse.User.current());
			

			post.save({
				success: function (post){
					console.log('success', post)
					var relation = course.relation('posts');
					relation.add(post);
					course.save();

				},
				error: function (post, err){
					console.log('boo', err)
				}
			});

		},

		initialize: function () {
			$('.container').append(this.el);
			new App.Models.Course();
			this.render();
		},


		render: function () {
			this.$el.append(this.template({model: this.model.toJSON()}));
		}
	});	


})();