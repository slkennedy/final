(function (){
	'use strict';

	App.Views.CommentsListView = Parse.View.extend ({
		tagName: 'ul',
		className: 'comment-list',

		initialize: function (post) {
			$('.comment-list-container').append(this.el);
			this.render();
			this.collection.on('add remove sync', this.render, this);

		},

		render: function (){
			// this.$el.append(this.template);
			var self = this;
			var post = this.model;
			this.$el.empty();
			var sortedCollection = _.sortBy(this.collection.models, 'createdAt');
			_.each(sortedCollection.reverse(), _.bind(self.renderChildren, self));
		},

		renderChildren: function (comment) {
			new App.Views.CommentItemsView({
				model: comment
			});

		}
	});

	App.Views.CommentItemsView = Parse.View.extend ({
		tagName: 'li',
		className: 'comment-item',
		template: _.template($('#templates-comment-items').html()),

		initialize: function () {
			$('.comment-list').append(this.el);
			this.render();
		},

		render: function () {
			var self = this;
			this.model.set ('parent', this.model.get('commentAuthor'));		
			var authors = this.model.get('parent');
			authors.fetch().then(function (){
				var date = self.model.createdAt;
				var formatDate = moment(date).format('MM/DD/YY, h:mm a')
				
				self.$el.append(self.template({
					model: self.model.toJSON(),
					date: formatDate,
					author: authors.toJSON()
				}));		
			});	
		}
	});

})();