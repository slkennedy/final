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
			console.log(this.siblingcollection);
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
			'click .button' : 'joinCourse'
		},

		joinCourse: function (e){	
			e.preventDefault(); 	
		    var course = this.model;
			var user = Parse.User.current();

			var relationToCourse = course.relation('members');
			relationToCourse.add(user);

			course.save();
			
			console.log(this.siblingcollection);
			this.siblingcollection.add(course);
			this.collection.remove(course);
			this.remove();
		},

		initialize: function (siblingcollection) {
			this.siblingcollection = siblingcollection.siblingcollection;
			console.log(this.siblingcollection);
			$('.possible-course-list').append(this.el);
			this.render();
		},

		render: function () {
			this.$el.append(this.template(this.model.toJSON()));
		}
	});

})();