(function (){
	'use strict';

	App.Views.PossibleCourses = Parse.View.extend ({
		tagName: 'li',
		className: 'possible-course-items',
		template: _.template($('#templates-possible-courses').html()),

		events: {
			'click .button' : 'joinCourse'
		},

		joinCourse: function (e){
			// var course = $(e.target).attr('data-value');

			// var query = new Parse.Query('Course')
			// 	.equalTo('objectId', course);
			// query.first().then(function(course){
		    var course = this.model;
			var user = Parse.User.current();
			// var relationToUser = user.relation('courses');
			// relationToUser.add(course);

			var relationToCourse = course.relation('members');
			relationToCourse.add(user);

			course.save();
			// user.save();
			// });
			this.remove();
			this.collection.add(this.model);
		},

		initialize: function () {
			$('.possible-course-list').append(this.el);
			this.render();
		},

		render: function () {
			this.$el.append(this.template(this.model.toJSON()));
		}
	});

})();