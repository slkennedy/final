(function (){
	'use strict';

	App.Views.UpdateAccountView = Parse.View.extend ({
		template: _.template($('#templates-update-account').html()),

		events: {
			'click .update-account' : 'updateAccount'
		},

		updateAccount: function (e){
			e.preventDefault();
			var firstName = $('input[name="firstName"]').val();
			var lastName = $('input[name="lastName"]').val();
			var email = $('input[name="email"]').val();
			var password = $('input[name="password"]').val();

			this.model.set('firstName', firstName);
			this.model.set('lastName', lastName);
			this.model.set('email', email);
			this.model.set('password', password);

			this.model.save().then(function() {
				App.router.navigate('userPage', {trigger:true});
			});
		},

		initialize: function () {
			$('.container').append(this.el);
			this.render();
		},

		render: function (){
			this.$el.append(this.template(this.model.toJSON()));
		}
	});

})();