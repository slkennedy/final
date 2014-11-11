(function (){
	'use strict';

	App.Views.CommentsListView = Parse.View.extend ({
		tagName: 'ul',
		className: 'comment-list',

		initialize: function (post) {
			// console.log(model);
			console.log(this.collection);
			$('.comment-list-container').append(this.el);
			new App.Models.Post();
			this.render();
		},

		render: function (){
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
		template: _.template($('#templates-comment-list').html()),

		initialize: function (siblingCollection) {
			$('.comment-list').append(this.el);
			this.render();
		},

		render: function () {
			this.$el.append(this.template(this.model.toJSON()));
		}
	});

})();