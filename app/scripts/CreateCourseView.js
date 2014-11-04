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
			this.$el.append(this.template);
		},

		createCourse: function (e){
			e.preventDefault();
			var course = new Parse.Course();
			course.set ('courseName', $('input[name="courseName"]').val());
			course.set ('semester', $('input[name="semester"]').val());
			course.set ('year', $('input[name="year"]').val());

			course.save();
		}
	});

})();