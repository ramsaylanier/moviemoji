var fadeIn = function(element){
	return {"opacity": 1};
}

var fadeOut = function(element){
	return {"opacity": 0};
}

var swingIn = function(element){

	element.velocity({
		rotateX: '-90deg'
	}, 0)

	element.velocity({
		"rotateX": '0deg',
		opacity: 1
	}, {duration: 2000, easing: [500, 25],})

	// element.velocity({
	// 	rotateX: '-90deg'
	// }, 0).
	// velocity({
	// 	rotateX: '25deg',
	// 	opacity: 1
	// }, 300, "easeOut").
	// velocity({
	// 	rotateX: '-20deg',
	// 	opacity: 1
	// }, 250, "easeOut").
	// velocity({
	// 	rotateX: '15deg',
	// 	opacity: 1
	// }, 200, "easeOut").
	// velocity({
	// 	rotateX: '-10deg',
	// 	opacity: 1
	// }, 150, "easeOut").
	// velocity({
	// 	rotateX: '5deg',
	// 	opacity: 1
	// }, 100, "easeOut").
	// velocity({
	// 	rotateX: '-3deg',
	// 	opacity: 1
	// }, 100, "easeOut").
	// velocity({
	// 	rotateX: '2deg',
	// 	opacity: 1
	// }, 50, "easeOut").
	// velocity({
	// 	rotateX: '0deg',
	// 	opacity: 1
	// }, 25, "easeOut");
}

var twistIn = function(element){
	element.velocity({
		translateX: ["-50%", [250, 15], "-50%"],
		translateY: ["-50%", [250, 15], "-50%"],
		rotateY: ["-45deg"]
	}, 0);

	var easing = [10, 5];

	element.velocity({
		top: ["50%", easing, "120vh"]
	}, {duration: 1000, queue: false});

	element.velocity({
		rotateZ: ["0deg", easing, "90deg"],
	}, {duration: 1000, queue: false});

	element.velocity({
		rotateY: "0deg"
	}, {duration: 1000, delay: 0, queue: false});

	element.velocity({
		rotateX: ["0deg", easing, "-0deg"],
		opacity: 1
	}, {duration: 1000, queue: false});

	// return {top: "50%", rotateZ: "0deg", rotateY:"0deg", rotateX:"0deg", translateX: "-50%", translateY: "-50%"}
}

var flipCard = function(flipper, card){

	if (!flipper.hasClass('flipped')){
		flipper.velocity({
			rotateY: "0deg"
		}, 1000, [300, 25]);

		card.velocity({
			height: 200,
			width: 200
		}, 1000, [300, 25]);
	} else {
		flipper.velocity({
			rotateY: "180deg"
		}, 1000, [300, 25]);

		card.velocity({
			height: 400,
			width: 400
		}, 1000, [300, 25]);
	}
}

var blowUp = function(element, content){
	element.velocity({
		top: 0,
		left: 0,
		width: "100vw",
		height: "100vh",
	}, 500, [.8, .6, .8, 1]);

	content.velocity({
		rotateY: "0deg"
	}, 500, [.8, .6, .8, 1]);
}

donutTransition['fadeIn'] = fadeIn;
donutTransition['fadeOut'] = fadeOut;
donutTransition['swingIn'] = swingIn;
donutTransition['twistIn'] = twistIn;
donutTransition['flipCard'] = flipCard;
donutTransition['blowUp'] = blowUp;
