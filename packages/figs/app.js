'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Figs = new Module('figs');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Figs.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Figs.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Figs.menus.add({
    'roles': ['authenticated'],
    'title': 'Figs',
    'link': 'all figs'
  });
  Figs.menus.add({
    'roles': ['authenticated'],
    'title': 'Create New Fig',
    'link': 'create fig'
  });

  //Figs.aggregateAsset('js','/packages/system/public/services/menus.js', {group:'footer', absolute:true, weight:-9999});
  //Figs.aggregateAsset('js', 'test.js', {group: 'footer', weight: -1});

  /*
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Figs.settings({'someSetting':'some value'},function (err, settings) {
      //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Figs.settings({'anotherSettings':'some value'});

    // Get settings. Retrieves latest saved settings
    Figs.settings(function (err, settings) {
      //you now have the settings object
    });
    */
  Figs.aggregateAsset('css', 'figs.css');

  return Figs;
});
