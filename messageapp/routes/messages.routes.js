const router = require('express').Router()
const messagesService = require("../services/messages.service");


router.post('/messages', (req, res, next) => {

    const { destination, body } = req.body

    if (destination == "" || body == "") {

        res.status(422).json({ message: "Fields must not be empty" })

    } else if (!destination || !body) {

        res.status(400).json({ message: "Both keys, destination and body are required" })

    } else if (typeof destination != 'string' || typeof body != 'string') {

        res.status(400).json({ message: "Fields must be filled with text" })

    } else {

        messagesService
            .sendMessage({ destination, body })
            .then((message) => res.status(200).json(message.data))
            .catch(err => res.status(500).json(err))

    }

})


module.exports = router
