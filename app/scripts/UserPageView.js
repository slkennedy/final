(function (){
	'use strict';

	App.Views.UserPageView = Parse.View.extend ({
		template: _.template($('#templates-user-page').html()),

		initialize: function (){
		
			$('.container').append(this.el);
			this.render();
		},

		render: function (){
			this.$el.append(this.template(this.model.toJSON()));
		}
	});

})();