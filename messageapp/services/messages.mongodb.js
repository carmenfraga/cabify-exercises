const Message = require('../models/Message.model')


class MessagesMongodb {

    constructor() {

    }

    saveMessage = (newMessage) => {
        return Message
            .create(newMessage)
            .then(response => response.data)
            .catch(err => err.data)
    }

    getAllMessages = () => {
        return Message.find()
    }

}

const messagesMongodb = new MessagesMongodb()
module.exports = messagesMongodb