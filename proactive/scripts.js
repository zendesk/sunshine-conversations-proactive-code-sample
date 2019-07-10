// This file needs to be loaded first into the DOM

// get the current url
let currentPath = window.location.pathname;
    currentPath = currentPath.substr(-1) === '/' ? currentPath.slice(0, -1) : currentPath;

// target the proactive div
const proactiveDiv = document.getElementById('proactive');

// create the proactiveMessage object and populate with default message
let proactiveMessage = customMessages[0];

// the message starts out hidden
let proactiveVisible = false;

// loop through the proactive messages and add the one that matches the current url
// or add the default one for ALL pages.
customMessages.forEach(message => {
    proactiveMessage = (currentPath === message.pathname) ? message : proactiveMessage;
});

// This is the main function to show the proactive message
const showProactiveMessage = () => {
    proactiveMessage.text.forEach(p => {
        const par = document.createElement('p');
        const text = document.createTextNode(p);
        par.appendChild(text);
        document.getElementById('proactive-main-message').appendChild(par)
    });
    // we wait for a set amount of time
    // this value is set in the proactive_messages.js file
    setTimeout(() => {
        // only show the message if the websdk is NOT open.
        if (!Smooch.isOpened()) {
            proactiveDiv.classList.add('proactive-visible');
            proactiveVisible = true;
        }; 
    }, proactiveMessage.delay || defaultDelay);
    // adding an event listener to dismiss the message
    proactiveDiv.addEventListener('click', destroyProactiveMessage)
}

const destroyProactiveMessage = () => {
    // if the user didn't click on the close button
    if (event && event.target && event.target.id !== 'proactive-close-button') {
        Smooch.open();
    } else {
        proactiveVisible = false;
    }
    // remove event listener
    proactiveDiv.removeEventListener('click', destroyProactiveMessage);
    // destroy the proactive message
    proactiveDiv && proactiveDiv.remove();
    // set the cookie, so that the message will not reappear for a set amount of time
    // delay is set in the proactive_messages.js file
    document.cookie = `${proactiveMessage.id}=true;Max-Age=${cookieResetDelay*60}`;
}