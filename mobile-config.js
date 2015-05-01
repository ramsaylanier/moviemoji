App.info({
  name: 'Moviemoji',
  description: 'Movie synopses with pure emoji.',
  version: '0.0.3'
});

App.icons({
  'android_ldpi': 'public/favicon/android-icon-36x36.png',
  'android_mdpi': 'public/favicon/android-icon-48x48.png',
  'android_hdpi': 'public/favicon/android-icon-72x72.png',
  'android_xhdpi': 'public/favicon/android-icon-96x96.png'
});


App.launchScreens({
	'android_ldpi_portrait' : 	'public/favicon/android-splash.png',
	'android_ldpi_landscape' : 	'public/favicon/android-splash.png',
	'android_mdpi_portrait' :  	'public/favicon/android-splash.png',
	'android_mdpi_landscape' :  'public/favicon/android-splash.png',
	'android_hdpi_portrait' :  	'public/favicon/android-splash.png',
	'android_hdpi_landscape' :  'public/favicon/android-splash.png',
	'android_xhdpi_portrait' :  'public/favicon/android-splash.png',
	'android_xhdpi_landscape' : 'public/favicon/android-splash.png'
})

App.accessRule('*.jsdelivr.net');
App.accessRule('http://cdn.jsdelivr.net');
App.accessRule('http://s3.amazonaws.com');
App.accessRule('*.giphy.com');
App.accessRule('http://api.giphy.com');
