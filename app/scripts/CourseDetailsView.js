(function (){
	'use strict';

	App.Views.CourseDetailsView = Parse.View.extend ({
		template: _.template($('#templates-course-details').html()),

		initialize: function () {
			$('.container').append(this.el);
			this.render();
		},

		render: function () {
			this.$el.append(this.template);
		}
	});


})();