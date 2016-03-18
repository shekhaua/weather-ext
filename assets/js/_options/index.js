// Saves options to chrome.storage.sync.
function save_options() {
    var showUiInPopup = document.getElementById('popup').checked;
    chrome.storage.sync.set({
        showUiInPopup: showUiInPopup
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value showUiInPopup = true.
    chrome.storage.sync.get({
        showUiInPopup: true
    }, function(items) {
        document.getElementById('popup').checked = items.showUiInPopup;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);