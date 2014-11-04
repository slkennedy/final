(function (){
	'use strict';

	App.Views.PossibleCourses = Parse.View.extend ({
		template: _.template($('#templates-possible-courses').html()),

		initialize: function () {
			$('.container').append(this.el);
			this.render();
		},

		render: function () {
			this.$el.append(this.template);
		}
	});

})();