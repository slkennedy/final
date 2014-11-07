(function (){
	'use strict';

	App.Views.CreateCourseView = Parse.View.extend ({
		template: _.template($('#templates-create-course').html()),

		events: {
			'click .button' : 'createCourse'
		},

		initialize: function (){
			$('.container').append(this.el);
			this.render();
		},

		render: function (){
			var self = this;
			Parse.User.current().get('school').fetch()
				.then(function(school){
					self.$el.append(self.template(school.toJSON()))
				})
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