Template.layout.events({
	'click .movie-item': function(e){
		var item = $(e.currentTarget);
		var href = item.find($('.movie-title')).attr('href');
		var leftOffset = item.offset().left;
		var topOffset = item.offset().top;
		var windowScroll = $(window).scrollTop();

		var flipper = item.children($('.card-flipper'));


		flipper.toggleClass('flipped');

		donutTransition.flipItem(flipper, item);

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
			Router.go(href);
		}, 700);
	}		
})
