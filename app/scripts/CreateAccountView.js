(function (){
	'use strict';

	App.Views.CreateAccountView = Parse.View.extend ({
		template: _.template($('#templates-create-account').html()),

		events: {
			'click .button': 'createAccount'
		},

		initialize: function (){
			var self = this;
			this.collection = new App.Collections.Schools();
			this.collection.fetch().then( function (){
				$('.container').append(self.el);
				self.render();
			});
			//constructs the suggestion engine
			// var states = new Bloodhound({
			//   datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
			//   queryTokenizer: Bloodhound.tokenizers.whitespace,
			//   // `states` is an array of state names defined in "The Basics"
			//   local: $.map(states, function(state) { return { value: state }; })
			// });
			 
			// // kicks off the loading/processing of `local` and `prefetch`
			// states.initialize();
			 
			// $('#bloodhound .typeahead').typeahead({
			//   hint: true,
			//   highlight: true,
			//   minLength: 1
			// },
			// {
			//   name: 'states',
			//   displayKey: 'value',
			//   // `ttAdapter` wraps the suggestion engine in an adapter that
			//   // is compatible with the typeahead jQuery plugin
			//   source: states.ttAdapter()
			// });
		},

		render: function (){
			this.$el.html(this.template({schools: this.collection.toJSON()}));
		},

		createAccount: function (e){
			e.preventDefault();
			
			var query = new Parse.Query(App.Models.School);
			query.equalTo('objectId', $('.school-list').val());
			query.first().then(function (school){
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
				 	
				 	parseFile.save().then(function (success){
				 		user.set('avatar', parseFile._url);

				 		user.signUp(null, {
							success: function (user){
								App.router.navigate('userPage', {trigger:true});
							},
							error: function (user, error){
								console.log(error)
								alert('error: '+error.code+' '+error.message);
							},
						});
					});	
				} else {
					user.set('avatar', 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png');

					user.signUp(null, {
						success: function (user){
							App.router.navigate('', {trigger:true});
						},
						error: function (user, error){
							console.log(error)
							alert('error: '+error.code+' '+error.message);
						}
					});
				}
			});
		}
	});

})();