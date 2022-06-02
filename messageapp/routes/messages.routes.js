const router = require('express').Router()
const messagesService = require("../services/messages.service");
const Message = require('../models/Message.model');
const messagesMongodb = require('../services/messages.mongodb');
const { response } = require('express');


router.post('/messages', (req, res, next) => {

    const { destination, body, number } = req.body
    console.log('soooooooy req.body------->', req.body)


    if (destination == "" || body == "") {

        res.status(422).json({ message: "Fields must not be empty" })

    } else if (!destination || !body) {

        res.status(400).json({ message: "Both keys, destination and body are required" })

    } else if (typeof destination != 'string' || typeof body != 'string') {

        res.status(400).json({ message: "Fields must be filled with text" })

    } else {

        messagesService
            .sendMessage({ destination, body })
            .then(() => {

                messagesMongodb
                    .saveMessage({ destination, body, number })
                    .then(response => res.status(200).json({ message: "Message successfully recorded" }))
                    .catch(err => res.status(500).json({ message: "Message recorded as sent, but not confirmed" }))
            })

            .catch(err => res.status(500).json({ message: "The message was not sent" }))

    }


})


router.get('/messages', (req, res, next) => {

    messagesMongodb

        .getAllMessages()
        .then((allMessages) => res.status(200).json(allMessages))
        .catch(err => res.status(500).json(err))
});


module.exports = router
