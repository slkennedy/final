(function (){
	'use strict';

	App.Views.CommentsListView = Parse.View.extend ({
		tagName: 'ul',

		initialize: function () {

			this.render();

		},

		render: function (){

		},

		renderChildren: function () {
			new App.Views.CommentItemsView({

			});
		}

	});

	App.Views.CommentItemsView = Parse.View.extend ({
		tagName: 'li',
		className: 'comment',
		template: _.template('#templates-comment-list').html()),

		initialize: function () {

		},

		render: function () {

		}
	});

})();