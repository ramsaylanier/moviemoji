easingFunc = [ .3, 0.8, 0.1, 1 ];

animateMenuToggle = function(toggle, state){
	var bar1 = toggle.children('.bar-1');
	var bar2 = toggle.children('.bar-2');
	var bar3 = toggle.children('.bar-3');

	var offset = $('.shelf').outerWidth() - 20;

	if (state == 'close'){
		bar1.velocity({
		"top": "6px"
		}, 300, easingFunc)
		.velocity({
			"rotateZ":"45deg"
		}, {duration: 300, easing: easingFunc, delay: 100});

		bar2.velocity({
			"opacity": 0
		}, {duration: 300, delay: 100, easing: easingFunc})

		bar3.velocity({
			"top": "-7px"
		}, 300, easingFunc)
		.velocity({
			"rotateZ":"-45deg",
			"top": "-6px"
		}, {duration: 300, easing: easingFunc, delay: 100});

		toggle.velocity({
			right: -offset
		}, {duration: 300, easing: easingFunc, delay: 100}).
		velocity({
			rotateZ: "90deg"
		}, {duration: 300, easing: easingFunc, delay: 0})
	} else if (state == 'open'){
		bar1
		.velocity({
			"rotateZ":"0deg"
		}, 300, easingFunc)
		.velocity({
			"top": "0px"
		}, 300, easingFunc)

		bar2.velocity({
			"opacity": 1
		}, {duration: 300, delay: 300, easing: easingFunc})

		bar3.velocity({
			"rotateZ":"0deg"
		}, 300, easingFunc)
		.velocity({
			"top": "0px"
		}, 300, easingFunc)

		toggle.velocity({
			right: 20
		}, {duration: 300, easing: easingFunc, delay: 0}).
		velocity({
			rotateZ: "0deg"
		}, {duration: 300, easing: easingFunc, delay: 0})
	}
}

loginAnimation = function(){
	var element = $('.login');
	var content = $('.card-flipper');

	content.removeClass('flipped').addClass('blown-up');

	donutTransition.blowUp(element, content);

	Meteor.setTimeout(function(){
		Session.set('login', null);
		Session.set('loggedIn', true);
		Router.go('/');

	}, 500);
}