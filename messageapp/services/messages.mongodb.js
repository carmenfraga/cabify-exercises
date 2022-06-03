const Message = require('../models/Message.model')
const axios = require("axios")


class MessagesMongodb {

    constructor() {

        this.api = axios.create({ baseURL: "http://localhost:9001" })

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