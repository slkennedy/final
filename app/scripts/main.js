(function (){
	'use strict';

	window.App = {};

	App.Models = {};
	App.Views = {};
	App.Collections = {};

////////////////Models/////	
//////////////////////////

////////////////Collections///	
/////////////////////////////

////////////////Router/////	
//////////////////////////

////////////////Views/////	
/////////////////////////

////////////////Glue Code/////	
/////////////////////////////
$(document).ready(function (){
		Parse.initialize("OZul0dIztIqSycVvaNZf2T8u7cEIiHrFGQ7ugiPO", "jEmTlFjwtlOorQaCnp4zjUp00wFkTdwfHvbacqGS");
		App.Route = new App.Router();
		Parse.history.start();
	});

})();