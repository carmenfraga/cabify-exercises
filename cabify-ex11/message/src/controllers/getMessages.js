const getMessages = require("../clients/getMessages");
const setInterval = require("./counter");



module.exports = function(req, res) {
  setInterval('messages')
  getMessages().then(messages => {
    res.json(messages);
  });
};
