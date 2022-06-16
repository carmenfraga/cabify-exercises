const sendMessage = require("../jobs/sendMessage");
const setInterval = require("./counter");


module.exports = function(req, res) {
  setInterval('messages')
  sendMessage(req.body)
    .then(messageId => {
      const response = {
        messageId
      };

      res.statusCode = 200;
      res.end(JSON.stringify(response));
    })
    .catch(error => {
      console.error(error);
      res.statusCode = 500;
      res.end(JSON.stringify(error));
    });
};
