//not working, email address is in popup
//TODO: open popup, find element, copy email address
function isThisPageSupportedEmailProvider() {
    var emailContainer = document.getElementById('wm-login-box');
    return (emailContainer !== null);
}

function getEmailAddress() {
    return document.querySelector('.user-name').innerText;
}