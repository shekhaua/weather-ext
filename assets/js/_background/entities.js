
var Entities = Entities || {};

Entities.localWeather = (function(Entities){
    'use strict';
    // url model
    //http://api.wunderground.com/api/7eaec3b21b154448/geolookup/conditions/forecast/q/52.406223499999996,4.6552739999999995.json

    // defaults
    var baseUrl = 'http://api.wunderground.com/api/',
        key = '7eaec3b21b154448';

    // data cache
    var cache = null,
        error = null;

    function getUrl(position) {
        return baseUrl + key + '/geolookup/conditions/forecast/astronomy/q/' + position.coords.latitude + ',' + position.coords.longitude + '.json';
    }

    function getCurrentLocation() {
        var dfd = $.Deferred();

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(dfd.resolve);
        } else {
            dfd.reject('Geolocation is not supported in current browser');
        }

        return dfd.promise();
    }

    function loadDataInCache () {
        return getCurrentLocation().then(function(position){
            return $.get(getUrl(position)).done(function(data){
                console.log('LOADED IN CACHE');
                cache = data;
                error = null;
                return data;
            }).fail(function(reason){
                console.log('ERROR: loadDataInCache');
                cache = null;
                error = reason;
                return reason;
            });
        });
    }

    function getWeatherToday() {
        if (!cache) {
            return loadDataInCache();
        } else {
            console.log("LOADED FROM CACHE");
            return $.Deferred().resolve(cache).promise();
        }
    }

    function getWeatherForecast() {
        if (!cache) {
            return loadDataInCache().then(function(data){
                return data.forecast;
            });
        } else {
            console.log("LOADED FROM CACHE");
            return $.Deferred().resolve(cache.forecast).promise();
        }
    }

    return {
        today: getWeatherToday,
        forecast: getWeatherForecast,
        loadDataInCache: loadDataInCache
    }
}(Entities || {}));