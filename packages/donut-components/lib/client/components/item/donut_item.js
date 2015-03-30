var itemOptions = {};
var item, itemData, animationType;

Template.donutItem.onCreated(function(){
	var instance = this;

	itemData = instance.data || 0;
	
	itemOptions = {
		easing: itemData.easing || 'easeOut',
		duration: itemData.duration || 500,
		delay: itemData.delay || 0,
		animateIn: itemData.animateIn || 'slideInFromRight',
		animateOut: itemData.animateOut || 'slideOutToLeft'
	}
});

Template.donutItem.onRendered(function(){
	item = this.$('.item');
	animationType = itemOptions.animateIn || 'slideInFromRight';
	donutAnimation.findAnimation(itemOptions, animationType, item);
});