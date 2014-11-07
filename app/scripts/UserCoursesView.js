(function (){
	'use strict';

	App.Views.UserCourses = Parse.View.extend ({
		tagName: 'ul',
		className: 'user-course-list',
		template: _.template($('#templates-user-course-list').text()),

		initialize: function () {
			$('.user-courses-container').append(this.el);
			this.render();
			this.collection.on('add remove sync', this.render, this);
		},

		render: function () {
			$('.user-course-item').remove();
			this.collection.each(_.bind(this.renderChildren, this));
		},

		renderChildren: function (course) {
			new App.Views.UserCourseItems({
				model: course
			});
		}
	});

	App.Views.UserCourseItems = Parse.View.extend ({
		tagName:'li',
		className: 'user-course-item',
		template: _.template($('#templates-user-courses').text()),

		initialize: function () {
			$('.user-course-list').append(this.el);
			this.render();
			// this.collection.on('change', this.render, this);
		},

		render: function () {
			this.$el.append(this.template (this.model.toJSON()));
		}
	});

})();