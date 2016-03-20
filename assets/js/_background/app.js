var BKG = (function(BKG, $) {

    function runApp() {

        initApp().done(function(){
            console.log("APP HAS RUN")
            // enable browser action
            chrome.browserAction.enable();

        });
    }

    function initApp() {
        var dfd = $.Deferred();

        // Add listener for alarm to fetch data periodically
        chrome.alarms.onAlarm.addListener(function callback(alarm) {
            if(alarm.name = 'fetch_data') {

                console.log("DATA FETCH");
                Entities.localWeather.loadDataInCache().then(function(data){
                    setBrowserActionIcon(data);
                    setBrowserActionBadge(data);
                });

                /*var popupView = getPopupView();
                if(popupView) { // Only exists when visible.
                    popupView.APP.WeatherApp.Controller.load();
                }*/
            }
        });

        chrome.alarms.create('fetch_data', { periodInMinutes: 60 });

        //temporary disable browser action until data is loaded
        chrome.browserAction.disable();

        // Fetch data from server
        Entities.localWeather.today().then(function(data){
            console.log("DATA FETCHED", data);
            setBrowserActionIcon(data);
            setBrowserActionBadge(data);
            dfd.resolve();
        }, function(){
            console.log("ERROR: when loading initial data");
            dfd.reject();
        }).always(function(){

        });

        // check display options
        chrome.storage.sync.get({
            showUiInPopup: true
        }, function(items) {

            if(items.showUiInPopup) {
                // enable popup
                //chrome.browserAction.setPopup({ popup: 'popup.html'});
                //chrome.browserAction.enable();
            } else {
                chrome.browserAction.setPopup({ popup: ''})

                chrome.browserAction.onClicked.removeListener(onBrowserActionClicked);
                chrome.browserAction.onClicked.addListener(onBrowserActionClicked);

                function onBrowserActionClicked() {

                    console.log("NEED TO OPEN WEB MODAL");
                    // check if the popup is visible
                    chrome.tabs.query({active: true/*, currentWindow: false*/}, function(tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, { message: 'check-modal-opened', to: 'content' }, function(response) {
                            if(!response) { return; }
                            // send message to open or close popup
                            var msg = response.iframeVisible ? 'close-modal' : 'open-modal';
                            chrome.tabs.sendMessage(tabs[0].id, { message: msg });
                            return true;
                        });
                    });

                }

            }

        });

        return dfd.promise();

    }

    function setBrowserActionIcon(data) {

        var date = new Date(),
            h = date.getHours(),
            m = date.getMinutes(),
            sunrise = data.sun_phase.sunrise,
            sunset = data.sun_phase.sunset,
            night = 'nt_';
        if(h > parseInt(sunrise.hour) && m > parseInt(sunrise.minute)
            && h < parseInt(sunset.hour) && m < parseInt(sunset.minute)) {
            night = '';
        }

        chrome.browserAction.setIcon({ path: 'assets/img/' + night + data.current_observation.icon + '.gif'});
    }

    function setBrowserActionBadge(data) {
        var current = data.current_observation,
            temp = current.temp_c;
        if(typeof temp  !== 'number') { return; }
        chrome.browserAction.setBadgeText({ text: Math.round(temp) + ''});
    }

    function getPopupView() {
        return chrome.extension.getViews({type: 'popup'})[0];
    }

    return {
        run: runApp
    }

}(BKG || {}, $));
