define(['app'], function(APP){

    function onMessageReceived(request, sender, sendResponse){
        if (!request.message) return;
        console.log("app.js", request, sender);
        switch (request.message){
            case 'open-modal':
                APP.trigger('load:app:weather');
                break;
            case 'close-modal':
                APP.todayWeatherRegion.clear();
                APP.weekWeatherRegion.clear();
                break;
        }
    }
    chrome.extension.onMessage.removeListener(onMessageReceived);
    chrome.extension.onMessage.addListener(onMessageReceived);
});

