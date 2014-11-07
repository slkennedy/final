(function (){
	'use strict';

	App.Views.PostListView = Parse.View.extend ({
		tagName: 'ul',
		className: 'post-list',
		template: _.template($('#templates-course-details').html()),

		initialize: function () {
			$('.post-list-container').append(this.el);
			new App.Models.Course();
			this.render();

		},

		render: function () {
			var course = this.model;
			console.log(course);
			console.log(this.model.attributes);
			console.log(this.model.get('posts'));
			window.course = this.model;
			// course.get('posts').fetch()
			// 	.then(function (post) {
			// 		console.log(post);
			// 		// collection.each(_.bind(this.renderChildren, this));
			// });
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
			console.log(this.model);
;			this.$el.append(this.template({model: this.model}));
		}
	})

})();