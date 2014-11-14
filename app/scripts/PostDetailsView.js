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
			var self = this;
			var post = this.model;
			e.preventDefault();
			var comment = new App.Models.Comment();
			comment.set ('commentContent', $('textarea[name="comment"]').val());
			comment.set ('commentAuthor', Parse.User.current());
			comment.set ('post', post);

			var commentUrl = $('input[name="comment-url"]').val()
			if (commentUrl && commentUrl.match('http://')) {
				comment.set('commentUrl', commentUrl);
			} else if (commentUrl) {
				commentUrl = 'http://' + commentUrl;
				comment.set('commentUrl', commentUrl)
			}
			
			comment.save().then(function () {
				var relation = post.relation('comments');
				relation.add(comment);
				post.save();
				self.collection.add(comment);
			});
			
		$('textarea[name="comment"]').val('');

		}

	});
})();