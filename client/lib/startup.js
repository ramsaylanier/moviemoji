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

	SEO.config({
	    title: 'Moviemoji - movies with emoji.',
	    meta: {
	      'description': 'Movie synopses with pure emoji. Two thumbs wayyyy up.'
	    },
	    og: {
	      'image': 'http://moviemoji.com/img/logo.png' 
	    },
	    twitter: {
	    	'card': 'summary_large_image',
	    	'site': '@moviemojiapp',
	    	'description': 'Create and share movie synopses with nothing but emoji. Two thumbs wayyyy up.',
	    	'title': 'Moviemoji',
	    	'image': 'http://moviemoji.com/img/logo.png'
	    }
	});
})