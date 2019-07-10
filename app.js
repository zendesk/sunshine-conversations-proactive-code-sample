'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const Smooch = require('smooch-core');

require('dotenv').config();
const PORT = process.env.PORT || 8000;
const APP_KEY_ID = process.env.SMOOCH_APP_KEY_ID;
const APP_SECRET = process.env.SMOOCH_APP_SECRET;
const APP_ID = process.env.SMOOCH_APP_ID;

const smooch = new Smooch({
    keyId: APP_KEY_ID,
    secret: APP_SECRET,
    scope: 'app'
});

async function handleEchoMessage(req, res) {
    const {
        appUserId,
        proactiveMessage: {
            id,
            text
        }
    } = req.body;

    for (const message of text) {
        await smooch.appUsers.sendMessage({
            appId: APP_ID,
            userId: appUserId,
            message: {
                role: 'appMaker',
                // avatarUrl: '', // You can set a custom avatar here
                type: 'text',
                text: message
            }
        });
    }

    res.sendStatus(200);
}

express()
    .use(bodyParser.json())
    .use(express.urlencoded({extended: false}))
    .use('/', express.static(__dirname + '/'))
    .post('/echo-message', handleEchoMessage)
    .listen(PORT, () => console.log(`Listening on port ${PORT}`));
