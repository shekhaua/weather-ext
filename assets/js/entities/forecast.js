define(['app'], function(APP) {

    'use strict';

    APP.module('Entities.Forecast', function(Forecast, APP, Backbone, Marionette, $, _) {

        var TodayWeatherModel = Backbone.Model.extend({});

        var ForecastModel = Backbone.Model.extend({});

        var ForecastCollection = Backbone.Collection.extend({
            model: ForecastModel
        });

        function parseForecastCollectionData(forecast) {

            var simpleForecast = forecast.simpleforecast && forecast.simpleforecast.forecastday;
            var collection = simpleForecast.map(function(item){
                return {
                    day: item.date.day,
                    month: item.date.month,
                    monthNameShort: item.date.monthname_short,
                    year: item.date.year,
                    weekday: item.date.weekday_short,
                    highTemp: {
                        fahrenheit: item.high.fahrenheit,
                        celsius: item.high.celsius
                    },
                    lowTemp: {
                        fahrenheit: item.low.fahrenheit,
                        celsius: item.low.celsius
                    },
                    conditions: item.conditions,
                    icon: item.icon,
                    iconUrl: item.icon_url

                };
            });

            var txtForecast = forecast.txt_forecast && forecast.txt_forecast.forecastday;
            for(var x = 0, i = 0; x < txtForecast.length && i < collection.length; x=x+2, i++){
                collection[i].dayForecast = {
                    icon: txtForecast[x].icon
                };
                collection[i].nightForecast = {
                    icon: txtForecast[x+1].icon
                };
            }
            return collection;
        }

        var API = {
            getTodayWeather: function() {
                var dfd = $.Deferred();
                // get data from background page
                // if iframe
                chrome.runtime.sendMessage({message: 'get-today-weather-data'}, function(responseData) {
                    if(responseData) {
                        dfd.resolve(new TodayWeatherModel(responseData));
                    } else {
                        console.log('Error: getTodayWeather');
                        dfd.reject("Error in getTodayWeather");
                    }
                    return true;
                });
                // if popup
                //TODO: add popup logic
                return dfd.promise();
            },
            getWeatherForecast: function() {
                var dfd = $.Deferred();
                chrome.runtime.sendMessage({message: 'get-forecast-weather-data', to: 'background'}, function(responseData) {
                    if(responseData) {
                        dfd.resolve(new ForecastCollection(parseForecastCollectionData(responseData)));
                    } else {
                        console.log('Error: getWeatherForecast');
                        dfd.reject("Error in getWeatherForecast");
                    }
                    return true;
                });
                return dfd.promise();
            }
        };

        // REQUEST RESPONSE HANDLERS -----------
        APP.reqres.setHandler('entities:today:weather', function (){
            return API.getTodayWeather();
        });

        APP.reqres.setHandler('entities:forecast:weather', function(){
            return API.getWeatherForecast();
        });

    });

    return APP.Entities.Forecast
});
