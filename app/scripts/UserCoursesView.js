(function (){
	'use strict';

	App.Views.UserCourses = Parse.View.extend ({
		template: _.template($('#templates-user-courses').html()),

		initialize: function () {
			$('.container').append(this.el);
			this.render();
		},

		render: function () {
			this.$el.append(this.template);
		}
	});


})();