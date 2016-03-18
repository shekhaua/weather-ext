/**
 * Created by Andrei on 8/22/15.
 */
require.config({
    baseUrl: './assets/js',
    paths: {
        //tpl: 'vendor/text', //template loader https://github.com/requirejs/text
        'jquery': 'vendor/jquery',
        'underscore': 'vendor/underscore',
        'backbone': 'vendor/backbone',
        //'localstorage': 'vendor/backbone.localstorage',
        'marionette': 'vendor/backbone.marionette'
    },
    shim: {
        /*underscore: {
            exports: '_'
        },*/
        /*backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },*/
        //localstorage: ['backbone'],
        /*marionette: {
            deps: ['backbone'],
            exports: 'Marionette'
        },*/
        'jquery-ui': ['jquery'],
        'backbone': ['jquery', 'underscore'],
        //'localstorage' : ['backbone'],
        'marionette' : ['backbone']
    },
    waitSeconds: 0
});

require(['app'], function (APP) {
    var options = {
        debugLevel: 4,
        something: "some value",
        another: "#some-selector"
    };

    // APP INIT -----------------
    APP.start(options);
});