var emailAddress = "";
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.action === 'newEmailAddress') {
        if (typeof message.userData != 'undefined' && message.userData !== null) {
            emailAddress = message.userData;
            setEmailAddressText(emailAddress);
        }
    }
});


function loadEmailAddress(callBack) {
    //tryGetLastRequest(function () {
    //    //load last but if is youtube page replace text
    //    tryGetLastEmailAddress(function (textData) {
    //        if (typeof textData != 'undefined' && textData != "")
    //            emailAddress = textData;

    //        if (typeof callBack != 'undefined') {
    //            callBack();
    //        }
    //    });
    //});

    tryGetLastEmailAddress(function (textData) {
        if (typeof textData != 'undefined' && textData != "")
            emailAddress = textData;

        if (typeof callBack != 'undefined') {
            callBack();
        }
    });
}

function copyBtnClick() {
    emailAddress = getEmailAddress();
    chrome.runtime.sendMessage({ method: "addEmailAddressToClipboard", userData: emailAddress }, function (response) {
        if (typeof response != 'undefined' && typeof response.data != 'undefined') {
            setEmailAddressText(response.data);
        }
    });
}

function getEmailAddress() {
    return document.getElementById('email-textbox').value;
}

//function tryGetEmailAddressFromCurrentPage(callback) {
//    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//        var callRefer = callback;
//        chrome.tabs.sendMessage(tabs[0].id, { action: "getEmailAddress" }, function (response) {
//            if (typeof callRefer != 'undefined') {
//                if (typeof response != 'undefined' && typeof response.data != 'undefined')
//                    callRefer(response.data);
//                else
//                    callRefer();
//            }
//        });
//    });
//}

function tryGetLastEmailAddress(callback) {
    chrome.runtime.sendMessage({ method: "getLastEmailAddress" }, function (response) {
        if (typeof response != 'undefined' && typeof response.data != 'undefined') {
            setEmailAddressText(response.data);
        }

        callback();
    });
}

function setEmailAddressText(email) {
    emailAddress = email;
    var emailTB = document.getElementById('email-textbox');
    emailTB.value = email;
    emailTB.setSelectionRange(0, emailTB.value.length);
}

function documentReady() {
    var copyBtn = document.getElementById('copy-btn');
    var emailTB = document.getElementById('email-textbox');

    if (copyBtn !== null) {
        copyBtn.addEventListener('click', copyBtnClick, false);
    }

    if (emailTB !== null) {
        emailTB.focus();
    }

    loadEmailAddress(function () {
        setEmailAddressText(emailAddress);
    });
}

//window.onload = documentReady;
document.addEventListener('DOMContentLoaded', documentReady, false);