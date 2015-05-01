App.info({
  name: 'Moviemoji',
  description: 'Movie synopses with pure emoji.',
  version: '0.1.0'
});

App.icons({
  'android_ldpi': 'public/favicon/android-icon-36x36.png',
  'android_mdpi': 'public/favicon/android-icon-48x48.png',
  'android_hdpi': 'public/favicon/android-icon-72x72.png',
  'android_xhdpi': 'public/favicon/android-icon-96x96.png'
});


App.launchScreens({
	'android_ldpi_portrait' : 	'public/favicon/android-splash-200-320.9.png',
	'android_ldpi_landscape' : 	'public/favicon/android-splash-320-200.9.png',
	'android_mdpi_portrait' :  	'public/favicon/android-splash-320-480.9.png',
	'android_mdpi_landscape' :  'public/favicon/android-splash-480-320.9.png',
	'android_hdpi_portrait' :  	'public/favicon/android-splash-480-800.9.png',
	'android_hdpi_landscape' :  'public/favicon/android-splash-800-480.9.png',
	'android_xhdpi_portrait' :  'public/favicon/android-splash-720-1280.9.png',
	'android_xhdpi_landscape' : 'public/favicon/android-splash-1280-720.9.png'
})

App.accessRule('*.jsdelivr.net');
App.accessRule('http://cdn.jsdelivr.net');
App.accessRule('http://s3.amazonaws.com');
App.accessRule('*.giphy.com');
App.accessRule('http://api.giphy.com');
