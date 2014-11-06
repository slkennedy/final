(function (){
	'use strict';

	App.Views.PostDetailsView = Parse.View.extend ({
		template: _.template($('#templates-post-details').html()),

		events: {
			'click .button' : 'createComment'
		},

		createComment: function (e){
			var post = this.model;
			e.preventDefault();
			var comment = new App.Models.Comment();
			comment.set ('commentContent', $('textarea[name="comment"]').val());
			comment.set ('postAuthor', Parse.User.current());
			comment.set ('post', post);
			
			comment.save({
				success: function (comment){
					console.log('success', comment)
					var relation = post.relation('comments');
					relation.add(comment);
					post.save();

				},
				error: function (post, err){
					console.log('boo', err)
				}
			});

			// var query = new Parse.Query(App.Models.School);
			// query.equalTo('objectId', $('.school-list').val());
			// query.first().then(function (school) {
			// 	var course = new App.Models.Course();
			// 	course.set ('courseName', $('input[name="courseName"]').val());
			// 	course.set ('semester', $('select[name="semester"]').val());
			// 	course.set ('year', +$('select[name="year"]').val());
			// 	course.set('school', school);

			// 	course.save({
			// 		success: function (user){
			// 			App.router.navigate('userPage', {trigger:true})
			// 		},
			// 		error: function (user, error){
			// 			console.log(error);
			// 		}
			// 	});
			// });
		},

		initialize: function (){
			$('.container').append(this.el);
			new App.Models.Post();
			this.render();
		},

		render: function (){
			this.$el.append(this.template({model: this.model.toJSON()}));
		}

	});
})();