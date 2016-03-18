
/*
var Entities = Entities || {};

Entities.Forecast = (function(Entities, Backbone, $, _){
    'use strict';
    //http://api.wunderground.com/api/7eaec3b21b154448/geolookup/conditions/forecast/q/52.406223499999996,4.6552739999999995.json

    var key = '7eaec3b21b154448',
        dataCache = null,
        TodaysWeatherModel = null,
        ForecastModelCollection = null;

    var TodayWeatherModel = Backbone.Model.extend({

        requestUrl: '',

        initialize: function (attributes, options) {
            if (!options) return;
            this.requestUrl = "http://api.wunderground.com/api/" + key + "/geolookup/conditions/forecast/q/" +
                options.lat + "," + options.long + ".json";
        },

        url: function() {
            return this.requestUrl;
        },

        defaults: {
            city: '',
            state: '',
            weather: '',
            tempF: 0,
            tempC: 0,
            humidity: 0,
            wind_mph: 0,
            wind_kph: 0,
            icon: '',
            iconUrl: ''
        },

        parse : function( data, xhr ) {
            var ob = data.current_observation;
            dataCache = data;

            return {
                city: ob.display_location.city,
                state: ob.display_location.state_name,
                weather: ob.weather,
                tempF: ob.temp_f,
                tempC: ob.temp_c,
                humidity: ob.relative_humidity,
                wind_mph: ob.wind_mph,
                wind_kph: ob.wind_kph,
                icon: ob.icon,
                iconUrl: ob.icon_url

            };
        }
    });

    var ForecastModel = Backbone.Model.extend({});

    var ForecastCollection = Backbone.Collection.extend({
        model: ForecastModel
    });

    function getLocation() {
        var dfd = $.Deferred();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(dfd.resolve);
        } else {
            dfd.reject('Geolocation is not supported in current browser');
        }

        return dfd.promise();
    }

    function initForecastCollection() {
        if (!dataCache) return $.Deferred().reject().promise();

        var forecastArray = dataCache.forecast && dataCache.forecast.simpleforecast
            && dataCache.forecast.simpleforecast.forecastday;

        var collection = forecastArray.map(function(item){
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

        var txtForecast = dataCache.forecast && dataCache.forecast.txt_forecast &&
            dataCache.forecast.txt_forecast.forecastday;

        for(var x = 0, i = 0; x < txtForecast.length && i < collection.length; x=x+2, i++){
            collection[i].dayForecast = {
                icon: txtForecast[x].icon
            };
            collection[i].nightForecast = {
                icon: txtForecast[x+1].icon
            };
        }
        ForecastModelCollection = new ForecastCollection(collection);
        return $.Deferred().resolve(ForecastModelCollection).promise();
    }

    function loadTodayWeather() {
        var dfd = $.Deferred();

        $.when(getLocation()).then(function(position){

            var model = new TodayWeatherModel(null, { lat: position.coords.latitude, long: position.coords.longitude });

            model.fetch({
                success: function (data){
                    TodaysWeatherModel = data;
                    dfd.resolve(data);
                },
                error: function () {
                    dfd.reject("Couldn't fetch TodayWeatherModel");
                }
            });

        }, function(error){
            console.log('ERROR: loadTodayWeather');
        });

        return dfd.promise();
    }

    function getTodaysWeather() {
        return (TodaysWeatherModel) ? $.Deferred().resolve(TodaysWeatherModel).promise() : loadTodayWeather();
    }

    function getForecastCollection() {
        return (ForecastModelCollection) ? $.Deferred().resolve(ForecastModelCollection).promise() : initForecastCollection();
    }

    function loadWeatherData() {
        return $.when(getTodaysWeather()).then(getForecastCollection);
    }
    // PUBLIC API
    return {
        today: getTodaysWeather,
        forecast: getForecastCollection,
        loadData: loadWeatherData
    }

}(Entities || {}, Backbone, $, _));
*/

(function (root, factory) {
    if(typeof define === "function" && define.amd) {
        define(["backbone"], factory);
    } else if(typeof module === "object" && module.exports) {
        module.exports = factory(require("backbone"));
    } else {
        root.Entities = factory(root.Backbone);
    }
}(this, function(Backbone) {

    'use strict';
    //http://api.wunderground.com/api/7eaec3b21b154448/geolookup/conditions/forecast/q/52.406223499999996,4.6552739999999995.json

    var key = '7eaec3b21b154448',
        dataCache = null,
        TodaysWeatherModel = null,
        ForecastModelCollection = null;

    var TodayWeatherModel = Backbone.Model.extend({

        requestUrl: '',

        initialize: function (attributes, options) {
            if (!options) return;
            this.requestUrl = "https://api.wunderground.com/api/" + key + "/geolookup/conditions/forecast/q/" +
                options.lat + "," + options.long + ".json";
        },

        url: function() {
            return this.requestUrl;
        },

        defaults: {
            city: '',
            state: '',
            weather: '',
            tempF: 0,
            tempC: 0,
            humidity: 0,
            wind_mph: 0,
            wind_kph: 0,
            icon: '',
            iconUrl: ''
        },

        parse : function( data, xhr ) {
            var ob = data.current_observation;
            dataCache = data;

            return {
                city: ob.display_location.city,
                state: ob.display_location.state_name,
                weather: ob.weather,
                tempF: ob.temp_f,
                tempC: ob.temp_c,
                humidity: ob.relative_humidity,
                wind_mph: ob.wind_mph,
                wind_kph: ob.wind_kph,
                icon: ob.icon,
                iconUrl: ob.icon_url

            };
        }
    });

    var ForecastModel = Backbone.Model.extend({});

    var ForecastCollection = Backbone.Collection.extend({
        model: ForecastModel
    });

    function getLocation() {
        var dfd = $.Deferred();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(dfd.resolve);
        } else {
            dfd.reject('Geolocation is not supported in current browser');
        }

        return dfd.promise();
    }

    function initForecastCollection() {
        if (!dataCache) return $.Deferred().reject().promise();

        var forecastArray = dataCache.forecast && dataCache.forecast.simpleforecast
            && dataCache.forecast.simpleforecast.forecastday;

        var collection = forecastArray.map(function(item){
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

        var txtForecast = dataCache.forecast && dataCache.forecast.txt_forecast &&
            dataCache.forecast.txt_forecast.forecastday;

        for(var x = 0, i = 0; x < txtForecast.length && i < collection.length; x=x+2, i++){
            collection[i].dayForecast = {
                icon: txtForecast[x].icon
            };
            collection[i].nightForecast = {
                icon: txtForecast[x+1].icon
            };
        }
        ForecastModelCollection = new ForecastCollection(collection);
        return $.Deferred().resolve(ForecastModelCollection).promise();
    }

    function loadTodayWeather() {
        var dfd = $.Deferred();

        $.when(getLocation()).then(function(position){

            var model = new TodayWeatherModel(null, { lat: position.coords.latitude, long: position.coords.longitude });

            model.fetch({
                success: function (data){
                    TodaysWeatherModel = data;
                    dfd.resolve(data);
                },
                error: function () {
                    dfd.reject("Couldn't fetch TodayWeatherModel");
                }
            });

        }, function(error){
            console.log('ERROR: loadTodayWeather');
        });

        return dfd.promise();
    }

    function getTodaysWeather() {
        return (TodaysWeatherModel) ? $.Deferred().resolve(TodaysWeatherModel).promise() : loadTodayWeather();
    }

    function getForecastCollection() {
        return (ForecastModelCollection) ? $.Deferred().resolve(ForecastModelCollection).promise() : initForecastCollection();
    }

    function loadWeatherData() {
        return $.when(getTodaysWeather()).then(getForecastCollection);
    }

    // PUBLIC API
    return {
        today: getTodaysWeather,
        forecast: getForecastCollection,
        loadData: loadWeatherData
    }

}));