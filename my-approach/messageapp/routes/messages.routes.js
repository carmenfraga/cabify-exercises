const router = require('express').Router()
const messageAppService = require("../services/messageApp.service");
const Message = require('../models/Message.model');
const { response } = require('express');


router.post('/messages', (req, res, next) => {

    const { destination, body, number } = req.body
    console.log('soooooooy req.body------->', req.body)


    if (destination == "" || body == "") {

        res.status(422).json({ message: "Fields must not be empty" })

    } else if (!destination || !body) {

        res.status(400).json({ message: "Both keys, destination and body are required" })

    } else if (typeof destination != 'string' || typeof body != 'string') {

        res.status(406).json({ message: "Fields must be filled with text" })

    } else {

        messageAppService
            .sendMessage({ destination, body })
            .then((response) => console.log(res.status(200).json, response.data))
            .then(() => {

                return Message
                    .create({ destination, body, number })
                    .then(response => Message.findByIdAndUpdate(response.id, { state: 'SENT' }))
                    .then(response => res.status(200).json({ message: "Message successfully recorded" }))
                    .catch(err => res.status(504).json({ message: "Message recorded as sent, but not confirmed" }))
            })

            .catch((err) => {

                Message
                    .create({ destination, body, number })
                    .then(response => Message.findByIdAndUpdate(response.id, { state: 'NOT-SENT' }))
                    .then(response => res.status(500).json({ message: "The message was not sent" }))

            })

    }

})


router.get('/messages', (req, res, next) => {

    Message
        .find()
        .then((allMessages) => res.status(200).json(allMessages))
        .catch(err => res.status(500).json(err))
});


router.delete('/messages', (req, res, next) => {

    Message
        .deleteMany()
        .then(() => {
            res.json({ message: "Messages have been deleted" })
        })
        .catch(err => res.status(500).json(err))
})


module.exports = router
