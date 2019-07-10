// This is a settings file and should be loaded first to be available to the the rest of the app.

const customMessages = [
    {
        id: 'default',          // default message for all pages
        delay: 3000,            // delay to render message
        pathname: '',           // show on all pages of the website
        text: [                 // each string represents a paragraph
            'This is a sample proactive message.',
            'Open up the widget and get to know us. You won\'t regret it!'
        ]
    },
    {
        id: 'custom',               // the id is used for cookie management
        delay: 4000,
        pathname: '/custom.html',   // show only on a specific page
        text: [                     // each string represents a paragraph
            'This is a custom proactive message.',
            'Are you looking for a custom message?'
        ]
    }
];
const defaultDelay = 5000;      // if no delay is set in the message object, this will be the value used
const cookieResetDelay = 180;   // time in minutes
