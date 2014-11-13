!function(){"use strict";window.App={},App.Models={},App.Views={},App.Collections={},$(document).ready(function(){Parse.initialize("OZul0dIztIqSycVvaNZf2T8u7cEIiHrFGQ7ugiPO","jEmTlFjwtlOorQaCnp4zjUp00wFkTdwfHvbacqGS"),App.router=new App.Router,Parse.history.start()})}(),function(){"use strict";App.Models.User=Parse.Object.extend("User"),App.Models.School=Parse.Object.extend({className:"School",defaults:{avatar:"http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"}}),App.Models.Course=Parse.Object.extend({className:"Course"}),App.Models.Post=Parse.Object.extend({className:"Post"}),App.Models.Comment=Parse.Object.extend({className:"Comment"}),App.Collections.Schools=Parse.Collection.extend({model:App.Models.School}),App.Collections.Courses=Parse.Collection.extend({model:App.Models.Course}),App.Collections.Posts=Parse.Collection.extend({model:App.Models.Post}),App.Collections.Comments=Parse.Collection.extend({}),App.Collections.UsersCourses=Parse.Collection.extend({model:App.Models.Course,initialize:function(){this.query=new Parse.Query("Course").equalTo("members",Parse.User.current())}}),App.Collections.PossibleCourses=Parse.Collection.extend({model:App.Models.Course,initialize:function(){this.query=new Parse.Query("Course").notEqualTo("members",Parse.User.current())}}),App.Collections.PostList=Parse.Collection.extend({model:App.Models.Course})}(),function(){"use strict";App.Views.CreateAccountView=Parse.View.extend({className:"create-account-div",template:_.template($("#templates-create-account").html()),events:{"click .create-account-button":"createAccount"},initialize:function(){var e=this;this.collection=new App.Collections.Schools,this.collection.fetch().then(function(){$(".container").append(e.el),e.render()})},render:function(){var e=this;this.$el.html(this.template({schools:this.collection.toJSON()}));var t=function(e){return function(t,s){var n,o;n=[],o=new RegExp(t,"i"),$.each(e,function(e,t){console.log(e),o.test(t)&&n.push({value:t})}),s(n),console.log(n)}},s=e.collection.toJSON(),n=_.pluck(s,"Name");console.log(n),$(".typeahead").typeahead({hint:!0,highlight:!0},{name:"schools",displayKey:"value",source:t(n)})},createAccount:function(e){e.preventDefault();var t=new Parse.Query(App.Models.School);t.equalTo("Name",$(".tt-input").val()),t.first().then(function(e){var t=new Parse.User;t.set("firstName",$('input[name="firstName"]').val()),t.set("lastName",$('input[name="lastName"]').val()),t.set("school",e),t.set("username",$('input[name="email"]').val()),t.set("email",$('input[name="email"]').val()),t.set("password",$('input[name="password"]').val());var s=$(".avatar-input")[0];if(s.files.length>0){var n=s.files[0],o=new Parse.File(n.name,n);o.save().then(function(){t.set("avatar",o._url),t.signUp(null,{success:function(){App.router.navigate("userPage",{trigger:!0})},error:function(e,t){console.log(t),alert("error: "+t.code+" "+t.message)}})})}else t.set("avatar","http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"),t.signUp(null,{success:function(){App.router.navigate("userPage",{trigger:!0})},error:function(e,t){console.log(t),alert("error: "+t.code+" "+t.message)}})})}})}(),function(){"use strict";App.Views.CreateCourseView=Parse.View.extend({className:"create-course-container",template:_.template($("#templates-create-course").html()),events:{"click .create-course-button":"createCourse"},initialize:function(){$(".container").append(this.el),this.render()},render:function(){var e=this;Parse.User.current().get("school").fetch().then(function(t){e.$el.append(e.template(t.toJSON()))})},createCourse:function(e){e.preventDefault();var t=Parse.User.current(),s=new Parse.Query(App.Models.School);s.equalTo("objectId",$(".school-list").val()),s.first().then(function(e){var s=new App.Models.Course;s.set("courseName",$('input[name="courseName"]').val()),s.set("semester",$('select[name="semester"]').val()),s.set("year",+$('select[name="year"]').val()),s.set("school",e);var n=s.relation("members");n.add(t),s.save({success:function(){App.router.navigate("userPage",{trigger:!0})},error:function(e,t){console.log(t)}})})}})}(),function(){"use strict";App.Views.HomeView=Parse.View.extend({template:_.template($("#templates-home").html()),initialize:function(){$(".container").append(this.el),this.render()},render:function(){this.$el.html(this.template)}})}(),function(){"use strict";App.Views.LoginView=Parse.View.extend({className:"login-wrapper",template:_.template($("#templates-login").html()),events:{"click .login-button":"login","click .forgot-password":"forgotPassword"},forgotPassword:function(){$(".forgot-password-wrapper").remove(),new App.Views.ForgotPasswordView},login:function(e){e.preventDefault(),Parse.User.logIn($('input[name="email"]').val(),$('input[name="password"]').val(),{success:function(){console.log("logged in"),App.router.navigate("userPage",{trigger:!0})},error:function(e,t){console.log(t)}})},initialize:function(){$(".container").append(this.el),this.render()},render:function(){this.$el.append(this.template)}})}(),function(){"use strict";App.Views.LogoutView=Parse.View.extend({initialize:function(){Parse.User.logOut(),this.render()},render:function(){App.router.navigate("login",{trigger:!0})}})}(),function(){"use strict";App.Views.UpdateAccountView=Parse.View.extend({className:"update-account-div",template:_.template($("#templates-update-account").html()),events:{"click .update-account":"updateAccount"},initialize:function(){$(".container").append(this.el),this.render()},render:function(){this.$el.append(this.template(this.model.toJSON()))},updateAccount:function(e){var t=this;e.preventDefault();var s=$('input[name="firstName"]').val(),n=$('input[name="lastName"]').val(),o=$('input[name="email"]').val(),i=$('input[name="password"]').val();this.model.set("firstName",s),this.model.set("lastName",n),this.model.set("email",o),this.model.set("password",i),console.log(this.model.get("school"));var r=$(".avatar-input")[0];if(r.files.length>0){var a=r.files[0],l=new Parse.File(a.name,a);l.save().then(function(){user.set("avatar",l._url)}),t.model.save().then(function(){App.router.navigate("userPage",{trigger:!0})})}else this.model.save().then(function(){App.router.navigate("userPage",{trigger:!0})})}})}(),function(){"use strict";App.Views.UserCourses=Parse.View.extend({tagName:"ul",className:"user-course-list",template:_.template($("#templates-user-course-list").text()),initialize:function(){$(".user-page-container").append(this.el),this.render(),this.collection.on("add remove sync",this.render,this)},render:function(){this.$el.empty().append(this.template),$(".user-course-item").remove(),this.collection.each(_.bind(this.renderChildren,this))},renderChildren:function(e){new App.Views.UserCourseItems({model:e})}}),App.Views.UserCourseItems=Parse.View.extend({tagName:"li",className:"user-course-item",template:_.template($("#templates-user-courses").text()),initialize:function(){$(".user-course-list").append(this.el),this.render()},render:function(){$("li").removeClass("corner"),this.$el.append(this.template(this.model.toJSON())),$("li:nth-of-type(2)").addClass("corner")}})}(),function(){"use strict";App.Views.UserPageView=Parse.View.extend({className:"user-page-container",template:_.template($("#templates-user-page").html()),initialize:function(){$(".container").append(this.el),this.render()},render:function(){this.$el.append(this.template(this.model.toJSON()));var e=new App.Collections.UsersCourses;e.fetch().then(function(){var t=(new App.Views.UserCourses({collection:e}),new App.Collections.PossibleCourses);t.fetch().then(function(){new App.Views.PossibleCourseList({collection:t,siblingCollection:e})})})}})}(),function(){"use strict";App.Router=Parse.Router.extend({initialize:function(){this.render()},render:function(){},routes:{"":"home",create:"create",login:"login",resetLogin:"resetLogin",logout:"logout",userPage:"userPage",update:"update","courses/:courseId":"courseDetails",createCourse:"createCourse","posts/:postId":"postDetails"},home:function(){$(".container").empty(),new App.Views.HomeView},create:function(){$(".container").empty(),new App.Views.CreateAccountView},login:function(){$(".container").empty(),new App.Views.LoginView},resetLogin:function(){$(".container").empty(),new App.Views.ResetLoginView},logout:function(){$(".container").empty(),new App.Views.LogoutView},userPage:function(){$(".container").empty(),$(".user-courses-container").empty(),$(".possible-courses-container").empty();var e=Parse.User.current();null===e?App.router.navigate("login",{trigger:!0}):new App.Views.UserPageView({model:Parse.User.current()})},update:function(){$(".container").empty();var e=Parse.User.current();null===e?App.router.navigate("login",{trigger:!0}):new App.Views.UpdateAccountView({model:Parse.User.current()})},createCourse:function(){$(".container").empty(),new App.Views.CreateCourseView},courseDetails:function(e){$(".container").empty(),new Parse.Query("Course").get(e,{success:function(e){var t=e.relation("posts").query().collection();t.fetch(),new App.Views.CourseDetailsView({model:e,collection:t}),new App.Views.PostListView({model:e,collection:t})},error:function(){console.log("course not found")}})},postDetails:function(e){$(".container").empty(),new Parse.Query("Post").get(e,{success:function(e){var t=e.relation("comments").query().collection();t.fetch().then(function(t){new App.Views.PostDetailsView({model:e,collection:t}),console.log("comments",t)})},error:function(){console.log("course not found")}})}})}(),function(){"use strict";App.Views.CourseDetailsView=Parse.View.extend({className:"course-details-container",template:_.template($("#templates-course-details").html()),events:{"click .create-post":"createPost","click .drop-course":"dropCourse","click .join-course":"joinCourse"},initialize:function(){$(".container").prepend(this.el),this.render()},render:function(){this.$el.append(this.template(this.model.toJSON())),console.log(this.model)},joinCourse:function(e){e.preventDefault(),console.log(this.model);var t=this.model,s=Parse.User.current(),n=t.relation("members");n.add(s),t.save().then(function(){App.router.navigate("userPage",{trigger:!0})})},dropCourse:function(e){e.preventDefault();var t=Parse.User.current(),s=this.model;s.relation("members").remove(t),s.save().then(function(){App.router.navigate("userPage",{trigger:!0})})},createPost:function(e){var t=this.model;e.preventDefault();var s=new App.Models.Post;s.set("postContent",$('textarea[name="post"]').val()||"Untitled Post"),s.set("postAuthor",Parse.User.current()),s.set("parent",Parse.User.current());var n=$('input[name="post-url"]').val();console.log("form input",n),n&&n.match("http://")?s.set("postUrl",n):n&&(n="http://"+n,s.set("postUrl",n));var o=this;s.save().then(function(){var e=t.relation("posts");e.add(s),t.save(),o.collection.add(s)}),$('textarea[name="post"]').val(""),$('input[name="post-url"]').val("")}})}(),function(){"use strict";App.Views.PostDetailsView=Parse.View.extend({className:"post-detail-container",template:_.template($("#templates-post-details").html()),events:{"click .create-comment-button":"createComment"},initialize:function(){$(".container").prepend(this.el),new App.Models.Post,this.render()},render:function(){var e=this.collection,t=this,s=this.model.get("parent");s.fetch({success:function(s){console.log("auth",s),console.log("self",t.model);var n=s.get("firstName"),o=s.get("lastName"),i=s.get("avatar"),s=n+" "+o;t.$el.append(t.template({model:t.model.toJSON(),date:moment(t.model.get("createdAt")).format("MM/DD/YY h:mm a"),authorFirst:n,authorLast:o,authorPic:i})),new App.Views.CommentsListView({model:t.model,collection:e})}})},createComment:function(e){var t=this.model;e.preventDefault();var s=new App.Models.Comment;console.log("comment",s),s.set("commentContent",$('textarea[name="comment"]').val()),s.set("commentAuthor",Parse.User.current()),s.set("post",t),s.save({success:function(e){console.log("success",e);var s=t.relation("comments");s.add(e),t.save()},error:function(e,t){console.log("boo",t)}}),$('textarea[name="comment"]').val("")}})}(),function(){"use strict";App.Views.PossibleCourseList=Parse.View.extend({tagName:"ul",className:"possible-course-list",template:_.template($("#templates-possible-course-header").html()),initialize:function(e){this.siblingcollection=e.siblingCollection,$(".user-page-container").append(this.el),this.render()},render:function(){this.$el.append(this.template),this.collection.each(_.bind(this.renderChildren,this))},renderChildren:function(e){new App.Views.PossibleCourses({collection:this.collection,siblingcollection:this.siblingcollection,model:e})}}),App.Views.PossibleCourses=Parse.View.extend({tagName:"li",className:"possible-course-items",template:_.template($("#templates-possible-courses").html()),events:{"click .join-course-button":"joinCourse"},joinCourse:function(e){e.preventDefault();var t=this.model,s=Parse.User.current(),n=t.relation("members");n.add(s),t.save(),this.siblingcollection.add(t),this.collection.remove(t),this.remove()},initialize:function(e){this.siblingcollection=e.siblingcollection,$(".possible-course-list").append(this.el),this.render()},render:function(){this.$el.append(this.template(this.model.toJSON()))}})}(),function(){"use strict";App.Views.PostListView=Parse.View.extend({tagName:"ul",className:"post-list",template:_.template($("#templates-course-details").html()),initialize:function(){$(".post-list-container").append(this.el),new App.Models.Course,this.collection.on("add remove sync",this.render,this),this.render()},render:function(){{var e=this;this.model}this.$el.empty();var t=_.sortBy(this.collection.models,"createdAt");_.each(t.reverse(),_.bind(e.renderChildren,e))},renderChildren:function(e){new App.Views.PostsView({model:e})}}),App.Views.PostsView=Parse.View.extend({tagName:"li",className:"post-item",template:_.template($("#templates-post-list").html()),initialize:function(){$(".post-list").append(this.el),this.render()},render:function(){var e=this.model.createdAt,t=moment(e).format("MM/DD/YY, h:mm a");console.log(e),this.$el.append(this.template({model:this.model.toJSON(),date:t}))}})}(),function(){"use strict";App.Views.ForgotPasswordView=Parse.View.extend({className:"forgot-password-wrapper",template:_.template($("#templates-forgot-pass").html()),events:{"click .reset-password":"resetPassword"},resetPassword:function(){var e=$('input[name="emailPassword"]').val();Parse.User.requestPasswordReset(e,{success:function(){App.router.navigate("resetLogin",{trigger:!0})},error:function(e){alert("Error: "+e.code+" "+e.message)}})},initialize:function(){$(".request-password").append(this.el),this.render()},render:function(){this.$el.append(this.template)}})}(),function(){"use strict";App.Views.ResetLoginView=Parse.View.extend({template:_.template($("#templates-reset-login").html()),events:{"click .login-button":"login"},login:function(e){e.preventDefault(),Parse.User.logIn($('input[name="email"]').val(),$('input[name="password"]').val(),{success:function(){console.log("logged in"),App.router.navigate("userPage",{trigger:!0})},error:function(e,t){console.log(t)}})},initialize:function(){$(".container").append(this.el),this.render()},render:function(){this.$el.append(this.template)}})}(),function(){"use strict";App.Views.CommentsListView=Parse.View.extend({tagName:"ul",className:"comment-list",initialize:function(){$(".comment-list-container").append(this.el),this.render()},render:function(){{var e=this;this.model}this.$el.empty();var t=_.sortBy(this.collection.models,"createdAt");_.each(t.reverse(),_.bind(e.renderChildren,e))},renderChildren:function(e){new App.Views.CommentItemsView({model:e})}}),App.Views.CommentItemsView=Parse.View.extend({tagName:"li",className:"comment-item",template:_.template($("#templates-comment-items").html()),initialize:function(){console.log(this.model),$(".comment-list").append(this.el),this.render()},render:function(){this.$el.append(this.template(this.model.toJSON()))}})}();