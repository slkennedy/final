(function (){
	'use strict';

	App.Views.PossibleCourses = Parse.View.extend ({
		template: _.template($('#templates-possible-courses').html()),

		events: {
			'click .button' : 'joinCourse'
		},

		joinCourse: function (e){
			// var course = $(e.target).attr('data-value');

			// var query = new Parse.Query('Course')
			// 	.equalTo('objectId', course);
			// query.first().then(function(course){
		    var course = this.collection.get($(e.target).attr('data-value'));
			var user = Parse.User.current();
			// var relationToUser = user.relation('courses');
			// relationToUser.add(course);

			var relationToCourse = course.relation('members');
			relationToCourse.add(user);

			course.save();
			// user.save();

			// });

		},

		initialize: function () {
			$('.possible-courses-container').append(this.el);
			this.render();

		},

		render: function () {
			console.log(this.collection);
			this.$el.append(this.template({courses: this.collection.toJSON()}));
		}
	});

})();