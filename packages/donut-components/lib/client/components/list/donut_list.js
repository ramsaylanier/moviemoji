Template.donutList.onRendered(function(){
	var instance = this;
	var data = instance.data || 0;
	var options = {
		duration: data.duration || 500,
		delay: data.delay || 0,
		easing: data.easing || 'easeOut'
	}

	Session.set('itemCount', 0);

	instance.autorun(function(){
		console.log(instance.data.dataReady);

		var items = instance.findAll('.item');

		_.each(items, function(item, index){
			Meteor.setTimeout(function(){
	    		donutAnimation.animate($(item), data.itemAnimateIn, options)
	    	}, 50 * index);
		});
	});
});

Template.donutList.onDestroyed(function(){
	console.log('listDestroyed');
	Session.set('itemCount', 0);
})