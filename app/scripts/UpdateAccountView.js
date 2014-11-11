(function (){
	'use strict';

	App.Views.UpdateAccountView = Parse.View.extend ({
		className: 'update-account-div',
		template: _.template($('#templates-update-account').html()),

		events: {
			'click .update-account' : 'updateAccount'
		},

		initialize: function () {
			$('.container').append(this.el);
			this.render();
		},

		render: function (){
			this.$el.append(this.template(this.model.toJSON()));
		},

		updateAccount: function (e){
			var self = this;
			e.preventDefault();

			var firstName = $('input[name="firstName"]').val();
			var lastName = $('input[name="lastName"]').val();
			var email = $('input[name="email"]').val();
			var password = $('input[name="password"]').val();

			this.model.set('firstName', firstName);
			this.model.set('lastName', lastName);
			this.model.set('email', email);
			this.model.set('password', password);

			console.log(this.model.get('school'));

			var $uploadFile = $('.avatar')[0];
			if ($uploadFile.files.length > 0) {
				var file = $uploadFile.files[0];
				var parseFile = new Parse.File(file.name, file);

				parseFile.save().then(function (success){
					user.set('avatar', parseFile._url);
				});

				self.model.save().then(function() {
					App.router.navigate('userPage', {trigger:true});
				});
			} else { 
				this.model.save().then(function() {
					App.router.navigate('userPage', {trigger:true});
				});
			}
		}
	});

})();