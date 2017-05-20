function isThisPageSupportedEmailProvider() {
    var emailContainer = document.getElementsByClassName('nav__item nav__item--user');
    return (emailContainer !== null);
}

function getEmailAddress() {
    return document.querySelector('.nav__item--user .action .action__text').innerText;
}