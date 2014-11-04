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
		className: 'Class'
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
		// model: Course
		// initialize: function(){
		// 	this.query = 
		// }
	});

	App.Collections.Posts = Parse.Collection.extend ({
		// model: App.Models.Post
	});

	App.Collections.Comments = Parse.Collection.extend ({
		// model: Comment
	});

	App.Collections.UsersCourses = Parse.Collection.extend ({
		// model: Course, 

		// initialize: function (){
		// 	this.query = new Parse.Query(User);
		// 	this.query
		// }
	});

})();