define(['marionette', 'common/window', 'config/marionette/application'], function (Marionette, window) {

    // APP DECLARATION ----------------
    var APP = new Marionette.Application();
    window.APP = APP;

    // REGIONS INIT ------------
    APP.addRegions({
        todayWeatherRegion: '#today-weather-region',
        weekWeatherRegion: '#week-weather-region',
        footerRegion: '#footer-region'
    });

    // APP EVENTS ---------------
    //"before:start" / onBeforeStart: fired just before the Application starts and before the initializers are executed.
    APP.on("before:start", function(options){});

    //"start" / onStart: fires after the Application has started and after the initializers have been executed.
    APP.on("start", function(options) {

        if (Backbone.history){
            /*
            * Each sub-app need to be required before backbon's history object is started
            * */
            require(['apps/weather', 'port'], function () {
                Backbone.history.start(/*{pushState: true}*/);
            });
        }
    });

    return APP;
});


