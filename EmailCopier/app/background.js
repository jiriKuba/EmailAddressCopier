var isReady = false;
var emailAddress = "";
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.method == 'storeEmailAddress') {
        if (typeof message.userData != 'undefined' && message.userData !== null) {
            emailAddress = message.userData;
        }
        //console.log(emailAddress);
        sendResponse({ data: emailAddress });
        updateBadgeText("1");
    }
    else if (message.method == 'addEmailAddressToClipboard') {
        addEmailToClipboard();
    }
    else if (message.method == 'getLastEmailAddress') {
        sendResponse({ data: emailAddress });
    }
});

function addEmailToClipboard() {
    copyToClipboard(emailAddress);
}

function copyToClipboard(text) {
    var tempElement = document.createElement('div');
    tempElement.contentEditable = true;
    document.body.appendChild(tempElement);
    tempElement.innerHTML = text;
    tempElement.unselectable = "off";
    tempElement.focus();
    document.execCommand('SelectAll');
    document.execCommand("Copy", false, null);
    document.body.removeChild(tempElement);
}

function documentReady() {
    isReady = true;
    chrome.browserAction.setBadgeBackgroundColor({ color: "#444444" });
    clearBadge();
}

function clearBadge() {
    chrome.browserAction.setBadgeText({ text: "0" });
}

function updateBadgeText(text) {
    chrome.browserAction.setBadgeBackgroundColor({ color: "#0A64A4" });
    chrome.browserAction.setBadgeText({ text: text });
}

//window.onload = documentReady;
document.addEventListener('DOMContentLoaded', documentReady, false);