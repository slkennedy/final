(function (){
	'use strict';

	App.Views.PostDetailsView = Parse.View.extend ({
		className:'post-detail-container',
		template: _.template($('#templates-post-details').html()),

		events: {
			'click .create-comment-button' : 'createComment'
		},

		createComment: function (e){
			var post = this.model;
			e.preventDefault();
			var comment = new App.Models.Comment();
			console.log('comment', comment);
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
		},

		initialize: function (){
			// console.log(this.model.toJSON());
			// console.log(this.model);
			// console.log(this);
			// console.log(this.collection);
			$('.container').append(this.el);
			new App.Models.Post();
			// console.log(this.model.toJSON());
			this.render();
		},

		render: function (){
			this.$el.append(this.template({model: this.model.toJSON()}));
		}

	});
})();