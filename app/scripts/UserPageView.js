(function (){
	'use strict';

	App.Views.UserPageView = Parse.View.extend ({
		className: 'user-page-container',

		template: _.template($('#templates-user-page').html()),

		initialize: function (){
			$('.container').append(this.el);
			this.render();
		},

		render: function (){
			this.$el.append(this.template(this.model.toJSON()));
			
			var usercourses = new App.Collections.UsersCourses()
			usercourses.fetch().then(function(){
				var enrolled = new App.Views.UserCourses ({
					collection: usercourses
				});
				
				var possiblecourses = new App.Collections.PossibleCourses()
				possiblecourses.fetch().then(function(){
					new App.Views.PossibleCourseList ({
						collection: possiblecourses,
						siblingCollection: usercourses
					});
				});
			});
			


		}
	});

})();