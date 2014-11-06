(function (){
	'use strict';

	App.Views.UserCourses = Parse.View.extend ({
		template: _.template($('#templates-user-courses').html()),

		initialize: function () {
			$('.user-courses-container').append(this.el);
			this.render();
			this.collection.on('change', this.render, this);
		},

		render: function () {
			this.$el.append(this.template ({courses: this.collection.toJSON()}));
		}
	});

})();