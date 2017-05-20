function isThisPageSupportedEmailProvider() {
    var emailContainer = document.getElementById('roster_comm_link');
    return (emailContainer !== null);
}

function getEmailAddress() {
    var title = document.title;
    var splitedTitle = title.split('-');
    if (splitedTitle.length == 3) {
        return splitedTitle[1].trim();
    } else {
        return null;
    }
}