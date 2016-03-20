require.config({
    baseUrl: './assets/js',
    paths: {
        'jquery': 'vendor/jquery',
        'underscore': 'vendor/underscore',
        'backbone': 'vendor/backbone',
        'marionette': 'vendor/backbone.marionette'
    },
    shim: {
        'jquery-ui': ['jquery'],
        'backbone': ['jquery', 'underscore'],
        'marionette' : ['backbone']
    },
    waitSeconds: 0
});

require(['app'], function (APP) {
    // APP INIT -----------------
    APP.start();
});