define(['app'], function (MAIN) {

    MAIN.module('WeatherApp.Controller', function(Controller, MAIN, Backbone, Marionette, $, _) {

        Controller.load = function () {
            require(['apps/weather/views', 'entities/forecast'], function(Views) {
                var todayWeatherPromise = MAIN.request('entities:today:weather');

                $.when(todayWeatherPromise).then(function(model) {

                    var todayWeatherView = new MAIN.WeatherApp.Views.WeatherToday({model: model});
                    MAIN.todayWeatherRegion.show(todayWeatherView);

                    $.when(MAIN.request('entities:forecast:weather')).then(function(collection){
                        var forecastCollectionView = new MAIN.WeatherApp.Views.WeatherForecastCollection(
                            { collection: collection }
                        );
                        MAIN.weekWeatherRegion.show(forecastCollectionView);
                    }, function(){});

                }, function() {});
            });
        }
    });

    return MAIN.WeatherApp.Controller;
});