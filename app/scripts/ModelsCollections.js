(function (){
	'use strict';

	window.App = {};

	App.Models = {};
	App.Views = {};
	App.Collections = {};

////////////////Models/////	
//////////////////////////

	var School = Parse.Object.extend('School');

////////////////Collections///	
/////////////////////////////

	var Schools = Parse.Collection.extend ({
		model: School
	});

})();