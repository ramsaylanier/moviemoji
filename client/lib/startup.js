Meteor.startup(function(){
	var loginStyle = "popup";

	// if (Meteor.Device.isPhone()){
	// 	loginStyle = "redirect";
	// }

	Meteor.call('serviceConfig', loginStyle, function(error){
		if (error)
			Errors.throw(error.reason, 'error')
	});

	FB.init({
		appId: Meteor.settings.public.facebook.appId,
		version: 'v2.3'
	})
})