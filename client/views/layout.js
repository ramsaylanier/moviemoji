Template.layout.events({
	'click .movie-title': function(e){
		var item = $(e.currentTarget);
		var parent = item.parents('.movie-item');
		var href = item.attr('href');
		var leftOffset = item.offset().left;
		var topOffset = item.offset().top;
		var windowScroll = $(window).scrollTop();

		var flipper = item.parents('.card-flipper');


		flipper.toggleClass('flipped');

		donutTransition.flipItem(flipper, parent);

		parent.velocity({
			zindex: 100
		}, 1);

		parent.velocity({
			scale: 1.1
		}, {duration: 400, easing: [300, 20], queue: false});

		parent.velocity({
			width: "300vw",
			left: -leftOffset
		}, {duration: 400, easing: [300, 30], delay: 0, queue: false});

		parent.velocity({
			height: "100vh",
			top: -topOffset + windowScroll
		}, {duration: 300, easing: [300, 30], delay: 300, queue: false});

		Meteor.setTimeout(function(){
			Router.go(href);
		}, 700);
	}		
})
