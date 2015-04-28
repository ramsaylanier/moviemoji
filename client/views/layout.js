Template.layout.events({
	'click .movie-item': function(e){
		e.preventDefault();
		var item = $(e.currentTarget);
		var target = $(e.target);
		var href = item.find('.movie-title').attr('href');
		var leftOffset = item.offset().left;
		var topOffset = item.offset().top;
		var windowScroll = $(window).scrollTop();

		if (target.is('polygon') || target.is('button') || target.is('svg')){
			return false;
		} else if (target.hasClass('movie-author')){
			href = target.attr('href');
		}

		var flipper = item.children('.card-flipper');


		flipper.toggleClass('flipped');

		donutTransition.flipItem(flipper, parent);

		item.velocity({
			zindex: 100
		}, 1);

		item.velocity({
			scale: 1.1
		}, {duration: 400, easing: [300, 20], queue: false});

		item.velocity({
			width: "300vw",
			left: -leftOffset
		}, {duration: 400, easing: [300, 30], delay: 0, queue: false});

		item.velocity({
			height: "100vh",
			top: -topOffset + windowScroll
		}, {duration: 300, easing: [300, 30], delay: 300, queue: false});

		Meteor.setTimeout(function(){
			item.velocity({
				zindex: 1,
				width: "100%",
				left: 0,
				top: 0,
				scale: 1,
				height: 0
			}, 1000);
			Router.go(href);
		}, 1000);
	}		
})

Template.registerHelper('username', function(){
	return Router.current().params.username;
});

Template.registerHelper('currentUsername', function(){
	return Meteor.user().username;
});

Template.registerHelper('menuItems', function(){
	var menuItems = [];

	if (Meteor.user()){
		menuItems = [
			{name: 'Dashboard', url:'/dashboard'},
			{name: 'Favorites', url:'/' + Meteor.user().username + '/favorites'},
		]
	} else {
		menuItems = [
			{name: 'Login', url:'/login', classes: 'login-link'}
		]
	}

	return menuItems;
});