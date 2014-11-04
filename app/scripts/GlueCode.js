(function (){
	'use strict';

	window.App = {};

	App.Models = {};
	App.Views = {};
	App.Collections = {};

////////////////Glue Code/////	
/////////////////////////////
	$(document).ready(function (){
		Parse.initialize("OZul0dIztIqSycVvaNZf2T8u7cEIiHrFGQ7ugiPO", "jEmTlFjwtlOorQaCnp4zjUp00wFkTdwfHvbacqGS");
		App.router = new App.Router();
		Parse.history.start();

		
	});

})();