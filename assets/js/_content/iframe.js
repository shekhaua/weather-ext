var FRAME = (function(){

    var FRAME = null;

    function createIframe () {

        var frame = document.createElement('iframe');
        frame.id = 'weather-ext';
        frame.width = '210';
        frame.height = '392';
        frame.style.position = 'fixed';
        frame.style.right = '10px';
        frame.style.top = '5px';
        frame.style.transition = '.3s ease-out';
        frame.style.transitionProperty = 'transform, opacity';
        frame.style.zIndex = '2147483647';
        frame.setAttribute('name', 'weather-ext');
        frame.setAttribute('title', 'weather-ext');
        frame.setAttribute('frameborder', '0');
        frame.setAttribute('marginheight', '0');
        frame.setAttribute('marginwidth', '0');
        frame.setAttribute('scrolling', 'no');
        frame.src = chrome.runtime.getURL('popup.html');
        var placeholder = document.getElementsByTagName('body')[0];
        placeholder.appendChild(frame);

        FRAME = document.getElementById('weather-ext');
    }


    function isIframeVisible() {
        if(!FRAME) { return; }
        var s = window.getComputedStyle(FRAME);
        return s.opacity === '1';
    }

    function showIframe() {
        if(!FRAME) { return; }
        FRAME.style.transform = 'translateX(0)';
        FRAME.style.opacity = '1';
    }

    function hideIframe(){
        if(!FRAME) { return; }
        FRAME.style.removeProperty('transform');
        FRAME.style.removeProperty('opacity');
    }

    return {
        createInframe: createIframe,
        isIframeVisible: isIframeVisible,
        showIframe: showIframe,
        hideIframe: hideIframe
    }
}());





