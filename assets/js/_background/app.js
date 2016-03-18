var APP = (function(APP, Backbone, $, _, Entities) {

    function initApp() {
        var dfd = $.Deferred();

        // Add listener for alarm to fetch data periodically
        chrome.alarms.onAlarm.addListener(function callback(alarm) {
            if(alarm.name = 'fetch_data') {

                console.log("DATA FETCH");
                Entities.loadData().then(function(){
                    setBrowserActionIcon();
                    setBrowserActionBadge();
                });

                var popupView = getPopupView();
                if(popupView) { // Only exists when visible.
                    popupView.APP.WeatherApp.Controller.load();

                }
            }
        });

        //temporary disable browser action until data is loaded
        chrome.browserAction.disable();

        // Fetch data from server
        Entities.loadData().then(function(){
            console.log("DATA FETCHED");
            setBrowserActionIcon();
            setBrowserActionBadge();
            dfd.resolve();
        }, function(){
            console.log("ERROR: when loading initial data");
            dfd.reject();
        });

        return dfd.promise();

    }

    function runApp() {

        initApp().done(function(){
            console.log("APP HAS RUN")
            // enable browser action
            getDisplayOptions();

        });
    }

    function getDisplayOptions() {
        chrome.storage.sync.get({
            showUiInPopup: true
        }, function(items) {

            if(items.showUiInPopup) {
                // enable popup
                chrome.browserAction.setPopup({ popup: 'popup.html'});
                chrome.browserAction.enable();
            } else {
                chrome.browserAction.setPopup({ popup: ''})
                chrome.browserAction.enable();

                chrome.browserAction.onClicked.addListener(function callback() {
                    console.log("NEED TO OPEN WEB MODAL");
                    // check if the popup is visible


                    chrome.tabs.query({active: true/*, currentWindow: false*/}, function(tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, { message: 'check-modal-opened' }, function(response) {
                            if(!response) { return; }
                            // send message to open or close popup
                            var msg = response.iframeVisible ? 'close-modal' : 'open-modal';
                            chrome.tabs.sendMessage(tabs[0].id, { message: msg });

                            return true;
                        });
                    });

                });

            }

            chrome.alarms.create('fetch_data', { periodInMinutes: 60 });
        });
    }
    function getPopupView() {
        return chrome.extension.getViews({type: 'popup'})[0];
    }

    function setBrowserActionIcon() {
        $.when(Entities.today()).done(function(model){
            var h = new Date().getHours(),
                night = 'nt_';
            if(h > 7 && h < 20) {
                night = '';
            }
            chrome.browserAction.setIcon({ path: 'assets/img/' + night + model.get('icon') + '.gif'});
        });
    }

    function setBrowserActionBadge() {
        $.when(Entities.today()).done(function(model){
            var temp = model.get('tempC');
            if(typeof temp  !== 'number') { return; }
            chrome.browserAction.setBadgeText({ text: Math.round(temp) + ''});
        });
    }

    return {
        init: initApp,
        run: runApp
    }

}(APP || {}, Backbone, $, _, Entities));
