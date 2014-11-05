(function (){
	'use strict';

	App.Views.CreateCourseView = Parse.View.extend ({
		template: _.template($('#templates-create-course').html()),

		events: {
			'click .button' : 'createCourse'
		},

		initialize: function (){
			var self = this;
			this.collection = new App.Collections.Schools();
			this.collection.fetch().then( function (){
				$('.container').append(self.el);
				self.render();
			});
		},

		render: function (){
			this.$el.append(this.template({schools: this.collection.toJSON()}));
		},

		createCourse: function (e){
			e.preventDefault();
			var query = new Parse.Query(App.Models.School);
			query.equalTo('objectId', $('.school-list').val());
			query.first().then(function (school) {
				var course = new App.Models.Course();
				course.set ('courseName', $('input[name="courseName"]').val());
				course.set ('semester', $('select[name="semester"]').val());
				course.set ('year', +$('select[name="year"]').val());
				course.set('school', school);

				course.save({
					success: function (user){
						App.router.navigate('userPage', {trigger:true})
					},
					error: function (user, error){
						console.log(error);
					}
				});
			});
		}

	});

})();