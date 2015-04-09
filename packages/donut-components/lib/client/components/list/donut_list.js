// Template.donutList.onCreated(function(){
// 	var instance = this;
// 	var data = instance.data || 0;

// 	if (data.waitForReady && data.animateItems){
// 		instance.autorun(function () {
// 			Session.set('itemCount', 0);
// 			var ready = Blaze.getData(instance.view.parentView).dataReady;
			
// 			if (ready){
// 				var items = instance.$('.item');
// 				var data = instance.data;
// 				var options = {
// 					duration: data.duration || 500,
// 					delay: data.delay || 0,
// 					easing: data.easing || 'easeOut',
// 				}

// 				console.log(data);

// 				_.each(items, function(item, index){
// 					options.delay *= index;
// 					donutAnimation.animate($(item), data.animateIn, options);
// 				});
// 			}
// 		});
// 	} else {
// 		instance.ready = new ReactiveVar(true);
// 	}
// });

Template.donutList.onRendered(function(){
	var instance = this;
	var data = instance.data || 0;
	var options = {
		duration: data.duration || 500,
		delay: data.delay || 0,
		easing: data.easing || 'easeOut'
	}

	Session.set('itemCount', 0);

	instance.$('.transition-wrapper').get(0)._uihooks = {
	    insertElement: function(node, next){
	    	var itemCount = Session.get('itemCount') || 0;
	    	itemCount ++;
	    	Session.set('itemCount', itemCount);
	    	$(node).insertBefore(next);
	    	
	    	Meteor.setTimeout(function(){
	    		donutAnimation.animate($(node), data.itemAnimateIn, options)
	    	}, 50 * itemCount)
	    },
	    removeElement: function(node, next){
	    	var itemCount = Session.get('itemCount');
	    	itemCount ++;
	    	Session.set('itemCount', itemCount);

	    	Meteor.setTimeout(function(){
	    		// animateItemOut($(node));
	    	}, 50 * itemCount);
	    }
	}
});

Template.donutList.onDestroyed(function(){
	Session.set('itemCount', 0);
})