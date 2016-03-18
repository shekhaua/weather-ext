define(['marionette', 'common/window', 'config/marionette/application'], function (Marionette, window) {

    // APP DECLARATION ----------------
    var APP = new Marionette.Application();

    // REGIONS INIT ------------
    //Warning: deprecated
    APP.addRegions({
        todayWeatherRegion: '#today-weather-region',
        weekWeatherRegion: '#week-weather-region',
        footerRegion: '#footer-region'
    });

    // APP EVENTS ---------------
    //"before:start" / onBeforeStart: fired just before the Application starts and before the initializers are executed.
    APP.on("before:start", function(opt){
        opt.moreData = "Yo dawg, I heard you like options so I put some options in your options!";
        console.log("Before Start", opt);
    });

    //"start" / onStart: fires after the Application has started and after the initializers have been executed.
    APP.on("start", function(opt) {
        //<!-- this === APP -->

        if (Backbone.history){
            /*
            * Each sub-app need to be required before backbon's history object is started
            * */
            require(['apps/weather'], function () {
                /*
                 * https://html.spec.whatwg.org/multipage/browsers.html#history
                 * http://backbonejs.org/#History-start
                 * https://lostechies.com/derickbailey/2011/09/26/seo-and-accessibility-with-html5-pushstate-part-1-introducing-pushstate/
                 * http://diveintohtml5.info/history.html
                 * */
                Backbone.history.start(/*{pushState: true}*/);

                if (APP.getCurrentRoute() === '') {
                    //https://lostechies.com/derickbailey/2011/08/28/dont-execute-a-backbone-js-route-handler-from-your-code/
                    // !!! Don't pass trigger true (not recommended)
                    //this.navigate('contacts'/*, {trigger:true}*/);
                    //APP.trigger('load:app:weather');

                }
            });


        }
        console.log("Start", opt);
    });

    window.APP = APP;

    return APP;
});

chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
    if (!request.message) return;
    console.log("app.js", request, sender, sendResponse);
    switch (request.message){
        case 'open-modal':
            APP.trigger('load:app:weather');
            break;
        case 'close-modal':
            APP.todayWeatherRegion.clear();
            APP.weekWeatherRegion.clear();
            break;
    }
});

