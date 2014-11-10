(function (){
	'use strict';

	App.Views.PostListView = Parse.View.extend ({
		tagName: 'ul',
		className: 'post-list',
		template: _.template($('#templates-course-details').html()),

		initialize: function () {
			$('.post-list-container').append(this.el);
			new App.Models.Course();
			
			// var course = this.model;
			// var relation = course.relation('posts');
			// this.collection = relation.query().collection();
			// console.log(this.collection);
			this.collection.on('add remove sync', this.render, this);

			this.render();
		},

		render: function () {
			var self = this;
			var course = this.model;
			this.$el.empty();
			// var relation = course.relation('posts');
			// var collection = relation.query().collection()
			// this.collection.fetch().then(function (collection){
				var sortedCollection = _.sortBy(this.collection.models, 'createdAt');
				_.each(sortedCollection.reverse(), _.bind(self.renderChildren, self));
				// self.collection.each(_.bind(self.renderChildren, self));
			// });

		},

		renderChildren: function (post) {
			new App.Views.PostsView ({
				model: post,
			});

		}
	});	

	App.Views.PostsView = Parse.View.extend ({
		tagName: 'li',
		className: 'post-item',
		template: _.template($('#templates-post-list').html()),

		initialize: function () {
			$('.post-list').append(this.el);
			this.render();
		},

		render: function () {
			this.$el.append(this.template(this.model.toJSON()));
		}
	});

})();