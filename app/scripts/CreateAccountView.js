(function (){
	'use strict';

	App.Views.CreateAccountView = Parse.View.extend ({
		className: 'create-account-div',
		template: _.template($('#templates-create-account').html()),

		events: {
			'click .create-account-button': 'createAccount'
		},

		initialize: function (){
			var self = this;
			this.collection = new App.Collections.Schools();
			this.collection.fetch().then(function (){
				$('.container').append(self.el);
				self.render();
			});
		},

		render: function (){
			var self = this;

			this.$el.html(this.template({schools: this.collection.toJSON()}));
			var stringMatcher = function (strs) { 

				return function findMatches(q, cb) {
					var matches, substrRegex;
					matches = [];

					substrRegex = new RegExp (q, 'i');

					$.each(strs, function (i, str){
						if (substrRegex.test(str)) {
							matches.push({value:str});
						}
					});

					cb(matches);
				};
			};

			var schools = self.collection.toJSON();

			var school = _.pluck(schools, 'Name');


			$('.typeahead').typeahead({
				hint: true,
				highlight: true
			}, {
				name: 'schools', 
				displayKey: 'value',
				source: stringMatcher(school) 
			});
			
		},

		createAccount: function (e){
			e.preventDefault();
			
			var query = new Parse.Query(App.Models.School);
			query.equalTo('Name', $('.tt-input').val());
			query.first().then(function (school){
				var user = new Parse.User ();
				user.set ('firstName', $('input[name="firstName"]').val());
				user.set ('lastName', $('input[name="lastName"]').val());
				user.set ('school', school);
				user.set ('username', $('input[name="email"]').val());
				user.set ('email', $('input[name="email"]').val());			
				user.set ('password', $('input[name="password"]').val());

				var $uploadFile = $('.avatar-input')[0];
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
							App.router.navigate('userPage', {trigger:true});
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