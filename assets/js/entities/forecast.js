define(['app'], function(APP) {
    'use strict';
    APP.module('Entities.Forecast', function(Forecast, APP, Backbone, Marionette, $, _) {

        var API = {
            getTodayWeather: function() {
                var dfd = $.Deferred();
                if (chrome && chrome.runtime && chrome.runtime.getBackgroundPage) {

                    // we are running popup
                    chrome.runtime.getBackgroundPage(function callback(BkgPage) {
                        $.when(BkgPage.Entities.today()).then(function(data){
                            dfd.resolve(data);
                        },function(){
                            dfd.reject();
                        });
                    });
                } else {

                    require(['_background/entities'], function(Entities) {
                        $.when(Entities.today()).then(function(data){
                            dfd.resolve(data);
                        },function(){
                            dfd.reject();
                        });
                    });
                }

                return dfd.promise();
            },
            getWeatherForecast: function() {
                var dfd = $.Deferred();
                if (chrome && chrome.runtime && chrome.runtime.getBackgroundPage) {
                    // we are running popup
                    chrome.runtime.getBackgroundPage(function callback(BkgPage) {
                        $.when(BkgPage.Entities.forecast()).then(function (collection) {
                            dfd.resolve(collection);
                        }, function () {
                            dfd.reject('ERROR when getting Forecast collection');
                        });
                    });
                } else {
                    require(['_background/entities'], function(Entities) {
                        $.when(Entities.forecast()).then(function (collection) {
                            dfd.resolve(collection);
                        }, function () {
                            dfd.reject('ERROR when getting Forecast collection');
                        });
                    });

                }
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
