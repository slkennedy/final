(function (){
	'use strict';

	App.Views.PossibleCourseList = Parse.View.extend ({
		tagName: 'ul',
		className: 'possible-course-list',
	
		initialize: function () {
			$('.possible-courses-container').append(this.el);
			this.render();	
		},

		render: function () {
			this.collection.each(_.bind(this.renderChildren, this));
		},

		renderChildren: function (course) {
			new App.Views.PossibleCourses ({
				collection: this.collection,
				model: course,
			});
		}

	});

	App.Views.PossibleCourses = Parse.View.extend ({
		tagName: 'li',
		className: 'possible-course-items',
		template: _.template($('#templates-possible-courses').html()),

		events: {
			'click .button' : 'joinCourse'
		},

		joinCourse: function (e){	
			e.preventDefault(); 	
		    var course = this.model;
			var user = Parse.User.current();

			var relationToCourse = course.relation('members');
			relationToCourse.add(user);

			course.save();
			
			this.collection.remove(course);
			this.remove();
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