define(['app'], function (MAIN) {

    MAIN.module('WeatherApp', function (WeatherApp, MAIN, Backbone, Marionette, $, _) {
        /*
         * Add Router for weather app
         * */
        WeatherApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                'weather': 'loadWeatherApp'
            }
        });

        var API = {
            loadWeatherApp: function (){
                require(['apps/weather/controller'], function (Controller) {
                    Controller.load();
                });
            }
        }
        /*
         * Add routing events for weather main app
         * */
        MAIN.on('load:app:weather', function(){
            MAIN.navigate('/weather');
            API.loadWeatherApp();
        });

        WeatherApp.addInitializer(function(){
            new WeatherApp.Router({
                controller: API
            });
        });

    });

    return MAIN.WeatherApp;
});
