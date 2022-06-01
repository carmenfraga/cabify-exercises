const messagesService = require("../services/messages.service");
const router = require("express").Router();



router.post('/messages', (req, res, next) => {

  const { destination, body } = req.body

  messagesService
    .sendMessage({ destination, body })
    .then((message) => res.status(200).json(message.data))
    .catch(err => res.status(500).json({ message: "this message has not been sent" }))
})


module.exports = router;
