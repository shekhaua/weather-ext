

chrome.runtime.onStartup.addListener(function callback() {
    console.log("STARTUP");
});
chrome.runtime.onInstalled.addListener(function callback() {
    console.log("INSTALLED");
});
chrome.runtime.onSuspend.addListener(function callback() {
    console.log("SUSPENDED");
});

/*chrome.runtime.onMessageExternal.addListener(
    function(request, sender, sendResponse) {
        if (sender.url == blacklistedWebsite)
            return;  // don't allow this web page access
        if (request.openUrlInEditor)
            openUrl(request.openUrlInEditor);
    });*/

// listen to another pages
/*chrome.runtime.onMessage.addListener(
 function(request, sender, sendResponse) {
 console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
 if (request.greeting == "hello")
 sendResponse({farewell: "goodbye"});
 });*/
// send a message
/*chrome.tabs.query({active: true, currentWindow: false}, function(tabs) {
 chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
 console.log(response.farewell);
 });
 });*/


APP.run();