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

			course.save().then(function () {
				App.router.navigate('userPage', {trigger:true});
			});
		},

		dropCourse: function (e) {
			e.preventDefault();
			var user = Parse.User.current();
			var course = this.model;
			course.relation('members').remove(user);
			course.save().then(function () {
				App.router.navigate('userPage', {trigger:true});
			});
		},

		createPost: function (e){
			var course = this.model;
			e.preventDefault();
			var post = new App.Models.Post();
			post.set ('postContent', $('textarea[name="post"]').val());
			post.set ('postAuthor', Parse.User.current());
		    var self = this;
			post.save().then(function () {
				var relation = course.relation('posts');
				relation.add(post);
				course.save();

				self.collection.add(post);
			});
		},

		initialize: function () {
			$('.container').prepend(this.el);
			this.render();
		},


		render: function () {
			this.$el.append(this.template(this.model.toJSON()));
		}
	});	


})();