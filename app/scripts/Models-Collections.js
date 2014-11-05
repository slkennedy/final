(function (){
	'use strict';

////////////////Models/////	
//////////////////////////

	App.Models.User = Parse.Object.extend ('User');

	App.Models.School = Parse.Object.extend({
		className: 'School',
		defaults: {
			avatar: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
		}
	});

	App.Models.Course = Parse.Object.extend ({
		className: 'Course'
	});

	App.Models.Post = Parse.Object.extend ({
		className: 'Post'
	});

	App.Models.Comment = Parse.Object.extend ({
		className: 'Comment'
	});

////////////////Collections///	
/////////////////////////////

	App.Collections.Schools = Parse.Collection.extend ({
		model: App.Models.School
	});

	App.Collections.Courses = Parse.Collection.extend ({
		model: App.Models.Course
		// initialize: function(){
		// 	this.query = new Parse.Query('Courses')
		// }
	});

	App.Collections.Posts = Parse.Collection.extend ({
		model: App.Models.Post
	});

	App.Collections.Comments = Parse.Collection.extend ({
		// model: Comment
	});

	App.Collections.UsersCourses = Parse.Collection.extend ({
		model: App.Models.Course,

		initialize: function (){
			// this.query = Parse.User.current().relation('courses').query();
            this.query = (new Parse.Query("Course")).equalTo('members', Parse.User.current());

			// this.query = (new Parse.Query(this.model))
			// 	.containedIn('members', Parse.User.current());
		}
	});

	App.Collections.PossibleCourses = Parse.Collection.extend ({
		model: App.Models.Course,

		initialize: function (){
            this.query = (new Parse.Query("Course")).notEqualTo('members', Parse.User.current());

			// this.query = (new Parse.Query(this.model))
			// 	.notContainedIn('members', Parse.User.current());
		}

	});

})();