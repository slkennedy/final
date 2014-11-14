(function (){
	'use strict';

	App.Views.PossibleCourseList = Parse.View.extend ({
		tagName: 'ul',
		className: 'possible-course-list',
		template: _.template($('#templates-possible-course-header').html()),
	
		initialize: function (opts) {
			this.siblingcollection = opts.siblingCollection;
			$('.user-page-container').append(this.el);
			this.render();	
		},

		render: function () {
			this.$el.append(this.template);
			this.collection.each(_.bind(this.renderChildren, this));
		},

		renderChildren: function (course) {
			new App.Views.PossibleCourses ({
				collection: this.collection,
				siblingcollection: this.siblingcollection,
				model: course,
			});
		}

	});

	App.Views.PossibleCourses = Parse.View.extend ({
		tagName: 'li',
		className: 'possible-course-items',
		template: _.template($('#templates-possible-courses').html()),

		events: {
			'click .join-course-button' : 'joinCourse'
		},

		joinCourse: function (e){	
			e.preventDefault(); 	
		    var course = this.model;
			var user = Parse.User.current();

			var relationToCourse = course.relation('members');
			relationToCourse.add(user);

			course.save();
			
			this.siblingcollection.add(course);
			this.collection.remove(course);
			this.remove();
		},

		initialize: function (siblingcollection) {
			this.siblingcollection = siblingcollection.siblingcollection;
			$('.possible-course-list').append(this.el);
			this.render();
		},

		render: function () {
			$('li').removeClass('corner');
			this.$el.append(this.template(this.model.toJSON()));
			$('li:nth-of-type(even)').addClass('corner');

		}
	});

})();