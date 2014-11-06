(function (){
	'use strict';

	App.Views.PossibleCourseList = Parse.View.extend ({
		tagName: 'ul',
		className: 'possible-course-list',
	
		initialize: function () {
			$('.possible-courses-container').append(this.el);
			this.render();	
			// this.collection.on('change', this.render, this);
		},

		render: function () {
			this.collection.each(_.bind(this.renderChildren, this));
		},

		renderChildren: function (course) {
			new App.Views.PossibleCourses ({
				model: course,
				// collection: this.collection
			});
		}

	});

})();