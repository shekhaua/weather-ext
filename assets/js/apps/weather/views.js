define(['app', 'text!apps/weather/_tpl/today_weather.tpl', 'text!apps/weather/_tpl/forecast.tpl'], function(MAIN, todayWeatherTpl, forecastTpl){

    MAIN.module('WeatherApp.Views', function(Views, MAIN, Backbone, Marionette, $, _){

        Views.WeatherToday = Marionette.ItemView.extend({
            tagName: 'div',
            className: 'today',
            template: todayWeatherTpl,
            templateHelpers: {
                toMonth: function(num) {
                    switch (num){
                        case 0:
                            return 'Jan';
                        case 1:
                            return 'Feb';
                        case 2:
                            return 'Mar';
                        case 3:
                            return 'Apr';
                        case 4:
                            return 'May';
                        case 5:
                            return 'June';
                        case 6:
                            return 'Jul';
                        case 7:
                            return 'Aug';
                        case 8:
                            return 'Sep';
                        case 9:
                            return 'Oct';
                        case 10:
                            return 'Nov';
                        case 11:
                            return 'Dec';
                        default:
                            return '';
                    }
                },
                dayMonth: function(){
                    var date = new Date();
                    return date.getDate() + ' ' + this.toMonth(date.getMonth());
                },
                year: function(){
                    var date = new Date();
                    return date.getFullYear();
                },
                clock: function () {
                    var date = new Date();
                    return date.getHours() + ':' + this.padNumberString(date.getMinutes(), '00');
                },
                padNumberString(number, padStr) {
                    var len = padStr.length;
                    number = number.toString();
                    return number.length >= len ? number : (padStr + number).slice(-len);
                }
            },
            // Events ---
            events: {
            }
            // Handlers ---
        });

        Views.WeatherForecastItem = Marionette.ItemView.extend({
            tagName: 'div',
            className: 'forecast',
            template: forecastTpl
        });

        Views.WeatherForecastCollection = Marionette.CollectionView.extend({
            childView: Views.WeatherForecastItem
        });
    });

    return MAIN.WeatherApp.Views;
});