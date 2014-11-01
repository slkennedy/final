(function (){
	'use strict';

	window.App = {};

	App.Models = {};
	App.Views = {};
	App.Collections = {};

	App.Views.CreateAccountView = Parse.View.extend ({
		template: _.template($('#templates-create-account').html()),

		events: {
			'click .button': 'createAccount'
		},

		initialize: function (){
			console.log('initalize start');
			var self = this;
			this.collection = new Schools();
			this.collection.fetch().then( function (){
				$('.container').append(self.el);
				self.render();
			})
			console.log('intialize ends');
		},

		render: function (){
			this.$el.html(this.template({schools: this.collection.toJSON()}));
		},

		createAccount: function (e){
			e.preventDefault();
			
			var query = new Parse.Query(School);
			query.equalTo('objectId', $('.school-list').val());
			query.first().then( function (school){
				var user = new Parse.User ();
				user.set ('firstName', $('input[name="firstName"]').val());
				user.set ('lastName', $('input[name="lastName"]').val());
				user.set ('school', school);
				user.set ('username', $('input[name="email"]').val());
				user.set ('email', $('input[name="email"]').val());			
				user.set ('password', $('input[name="password"]').val());

				var $uploadFile = $('.avatar')[0];
				if ($uploadFile.files.length > 0){
					var file = $uploadFile.files[0];
				 	var parseFile = new Parse.File(file.name, file);
				 	console.log(file.name);
				 	console.log(file);
				 	
				 	parseFile.save();
				 	console.log(parseFile._url);
				 	console.log(parseFile._name);
				 	console.log(parseFile);
				 	// .then(function(){
				 	// 	user.set('avatar', parseFile.url());	
				 	// });
				}

				user.signUp(null, {
					success: function (user){
						App.Route.navigate('', {trigger:true});
					},
					error: function (user, error){
						console.log(error)
						alert('error: '+error.code+' '+error.message);
					}
				});	
			});
		}

	});
})();