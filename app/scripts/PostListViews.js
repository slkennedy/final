(function (){
	'use strict';

	App.Views.PostListView = Parse.View.extend ({
		tagName: 'ul',
		className: 'post-list',
		template: _.template($('#templates-course-details').html()),

		initialize: function () {
			$('.post-list-container').append(this.el);
			new App.Models.Course();
			this.collection.on('add remove sync', this.render, this);

			this.render();
		},

		render: function () {
			var self = this;
			var course = this.model;
			this.$el.empty();
	
			var sortedCollection = _.sortBy(this.collection.models, 'createdAt');
			_.each(sortedCollection.reverse(), _.bind(self.renderChildren, self));

		},

		renderChildren: function (post) {
			new App.Views.PostsView ({
				model: post
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
			var self = this;
			this.model.set ('parent', this.model.get('postAuthor'));		
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