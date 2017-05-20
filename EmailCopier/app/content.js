var emailAddress = "";
var isReady = false;

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.action === 'getEmailAddress') {
        loadEmailAddress(function () {
            sendResponse({ data: emailAddress });
        });
    }
});

function documentReady() {
    isReady = true;

    loadEmailAddress(function (email) {
        console.log(email);
        chrome.runtime.sendMessage({ method: "storeEmailAddress", userData: email }, function (response) {
            //nothing
        });
    });
}

function loadEmailAddress(callBack) {
    if (isThisPageSupportedEmailProvider()) {
        emailAddress = getEmailAddress();
    }
    
    if (typeof callBack != 'undefined') {
        callBack(emailAddress);
    }
}


document.onreadystatechange = function() {
    if (document.readyState === "complete") {
        documentReady();
    }
}