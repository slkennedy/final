(function (){
	'use strict';

	window.App = {};

	App.Models = {};
	App.Views = {};
	App.Collections = {};

	App.Views.HomeView = Parse.View.extend ({
		template: _.template($('#templates-home').html()),

		initialize: function (){
			$('.container').append(this.el);
			this.render();
		},

		render: function (){
			this.$el.html(this.template);
		}
	});
})();