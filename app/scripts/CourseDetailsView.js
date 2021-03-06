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

		initialize: function () {
			$('.container').prepend(this.el);
			this.render();
		},


		render: function () {
			this.$el.append(this.template(this.model.toJSON()));
		},

		joinCourse: function (e){	
			e.preventDefault(); 
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
			post.set ('postContent', $('textarea[name="post"]').val() || 'Untitled Post');
			post.set ('postAuthor', Parse.User.current());
			post.set ('parent', Parse.User.current());
			var postUrl = $('input[name="post-url"]').val()
			if (postUrl && postUrl.match('http://')) {
				post.set('postUrl', postUrl);
			} else if (postUrl) {
				postUrl = 'http://' + postUrl;
				post.set('postUrl', postUrl)
			} 

		    var self = this;
			post.save().then(function () {
				var relation = course.relation('posts');
				relation.add(post);
				course.save();
				self.collection.add(post);
			});

			
			$('textarea[name="post"]').val('');
			$('input[name="post-url"]').val('');
		}

	});	


})();