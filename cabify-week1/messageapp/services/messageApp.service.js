const axios = require("axios")

class MessageAppService {

    constructor() {

        this.api = axios.create({ baseURL: "http://messageapp:3000" })

    }

    sendMessage = (message) => {

        let finalMessage = {
            "destination": message.destination,
            "body": message.body
        }

        return this.api.post('/message', finalMessage)
    }

}

const messageAppService = new MessageAppService()
module.exports = messageAppService