chrome.runtime.onStartup.addListener(function callback() {
    console.log("STARTUP");
});

chrome.runtime.onInstalled.addListener(function callback() {
    console.log("INSTALLED");
});

chrome.runtime.onSuspend.addListener(function callback() {
    console.log("SUSPENDED");
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(!request.message) { return; }

    switch(request.message) {
        case 'get-today-weather-data':
            Entities.localWeather.today().then(function(data){
                console.log('get-today-weather-data: ', data);
                sendResponse(data);
            });
            break;
        case 'get-forecast-weather-data':
            Entities.localWeather.forecast().then(function(data){
                console.log('get-forecast-weather-data: ', data)
                sendResponse(data)
            })
            break;
    }

    return true;
});

BKG.run();