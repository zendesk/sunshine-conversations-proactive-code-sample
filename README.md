# Proactive messages using Smooch

An oft-requested feature that we are working on, but is not yet integrated into the Smooch app is the ability to display proactive messages. 

If you would like to implement this today, we have created a workaround using the current web SDK and a tiny server (for echoing proactive messages back into the conversation).

The code in this project has been heavily commented to make it easier to understand.

Experiment and have fun with it, and please let us know if you have issues or comments. 👋

## Setup for development

1. Run `npm install` from the root project folder to setup all required dependencies.
2. Duplicate the **.env_example** file and remove **_example** from the filename. (This file contains sensitive information and should never be committed to a git repository.) 
3. Access your [Smooch dashboard](https://app.smooch.io/) and retrieve the following values.
    - Smooch App Id
    - Smooch App Key
    - Smooch App Secret
4. Run this sample locally using `npm run dev`. This will start up the server.

The sample widget is located at **http://localhost:8000**

## Settings

### Messages

Messages are set in the **proactive_messages.js** file. There is an arrray of message objects. Each message object looks like this: 

```js
const customMessages = [
    {
        id: 'default',          // default message for all pages
        delay: 3000,            // delay to render message
        pathname: '',           // show on all pages of the website
        text: [                 // each string represents a paragraph
            'This is a sample proactive message.',
            'Open up the widget and get to know us. You won\t regret it!'
        ]
    },
    {
        id: 'custom',           // the id is used for cookie management
        delay: 4000,
        pathname: '/custom',    // show only on a specific page
        text: [                 // each string represents a paragraph
            'This is a custom proactive message.',
            'Are you looking for a custom message?'
        ]
    }
];
```

### Cookies

We use a cookie to prevent spamming the user with the proactive message. A cookie will be created if the user dismisses the proactive message, or opens the widget on a page that has the proactive message. The default expiry for the cookie is 180 minutes. This can be changed in the **proactive_messages.js** file.

## Limitations

- Currently, the **index.html** and **custom.html** files contain duplicate code for the proactive message. This is definitely not DRY and hopefully not representative of your website codebase. We assume that you have some sort of templating capability and would not need to repeat the code across files but simply include it within the footer code once.

> ⚠️ **Important Note**
> Using the method detailed below could possibly incur more AUCs than normal. Normally, an AUC is created when a user types their first message to the business, but in this case the AUC is created when the user opens the web widget. The codebase uses `Smooch.startConversation()` to trigger the conversation and allow the middleware server to echo the proactive message back into the conversation.
> To learn more about the web SDK and the commands that can be run visit the [web SDK repository](https://github.com/smooch/smooch-web).

