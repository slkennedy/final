(function (){
	'use strict';

	App.Views.UpdateAccountView = Parse.View.extend ({
		template: _.template($('#templates-update-account').html()),

		events: {
			'click .button' : 'updateAccount'
		},

		updateAccount: function (){
			user.get('firstName').set($('input[name="firstName"]').val());
			// user.set ('lastName', $('input[name="lastName"]').val());
			// user.set ('username', $('input[name="email"]').val());
			// user.set ('email', $('input[name="email"]').val());			
			// user.set ('password', $('input[name="password"]').val());

			user.save();
		},

		initialize: function () {
			$('.container').append(this.el);
			this.render();
		},

		render: function (){
			// this.$el.append(this.template(this.model.toJSON()));
		}
	});

})();