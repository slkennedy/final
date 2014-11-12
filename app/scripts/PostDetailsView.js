(function (){
	'use strict';

	App.Views.PostDetailsView = Parse.View.extend ({
		className:'post-detail-container',
		template: _.template($('#templates-post-details').html()),

		events: {
			'click .create-comment-button' : 'createComment'
		},

		initialize: function (){
			$('.container').prepend(this.el);
			new App.Models.Post();
			this.render();
		},

		render: function (){
			var comments = this.collection;
			var self = this;
			var authors = this.model.get('parent');
			authors.fetch({
				success:function(author) {
					console.log('auth',author);
					var authorFirst = author.get('firstName');
					var authorLast = author.get('lastName');
					var authorPic = author.get('avatar');
					var author = authorFirst + " " + authorLast
					self.$el.append(self.template({
						model: self.model.toJSON(),
						date: moment(self.model.get('createdAt')).format('MM/DD/YY h:mm a'),
						authorFirst: authorFirst,
						authorLast: authorLast,
						authorPic: authorPic
					}));

					new App.Views.CommentsListView ({
							model: self.model, 
							collection: comments
					});					
				}
			});	
		},

		createComment: function (e){
			var post = this.model;
			e.preventDefault();
			var comment = new App.Models.Comment();
			console.log('comment', comment);
			comment.set ('commentContent', $('textarea[name="comment"]').val());
			comment.set ('commentAuthor', Parse.User.current());
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
			$('textarea[name="comment"]').val('');

		}

	});
})();