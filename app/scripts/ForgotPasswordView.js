(function (){
	'use strict';

	App.Views.ForgotPasswordView = Parse.View.extend ({
		className: 'forgot-password-wrapper',
		template: _.template($('#templates-forgot-pass').html()),

		events: {
			'click .reset-password' : 'resetPassword'
		},

		resetPassword: function () {
			var email = $('input[name="emailPassword"]').val();
			Parse.User.requestPasswordReset(email, {
			  success: function() {
			  	App.router.navigate('resetLogin', {trigger:true});
			  },
			  error: function(error) {
			    // Show the error message somewhere
			    alert("Error: " + error.code + " " + error.message);
			  }
			});
		},

		initialize: function () {
			$('.request-password').append(this.el);
			this.render();
		},

		render: function () {
			this.$el.append(this.template)
		}

	});

})();