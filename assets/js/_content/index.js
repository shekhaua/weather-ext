document.addEventListener('DOMContentLoaded', function() {

FRAME.createInframe();

chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
    if (!request.message) return;
    switch (request.message){
        case 'check-modal-opened':
            if(FRAME.isIframeVisible()) {
                sendResponse({iframeVisible: true});
            } else {
                sendResponse({iframeVisible: false});
            }
            break;
        case 'open-modal':
            FRAME.showIframe();
            break;
        case 'close-modal':
            FRAME.hideIframe();
            break;
    }
    //console.log("content_script.js", request, sender);
    return true;
});

});