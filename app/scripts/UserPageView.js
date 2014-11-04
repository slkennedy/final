(function (){
	'use strict';

	App.Views.UserPageView = Parse.View.extend ({
		template: _.template($('#templates-user-page').html()),

		initialize: function (){
			// var options = _.defaults({}, opts, {
			// 	users: opts.users
			// })

			// opts.users
			// this.users = options.users
			// console.log(opts.model);
			// console.log(opts);
			// console.log(opts.course);
			$('.container').append(this.el);
			this.render();
		},

		render: function (){
			console.log(this);
			this.$el.append(this.template(this.model.toJSON()));
		}
	});

})();