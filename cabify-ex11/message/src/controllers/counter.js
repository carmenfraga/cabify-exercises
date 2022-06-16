const promClient = require('prom-client');


const counter = new promClient.Counter ({
  name: 'message_test_counter',
  help: 'Example of a counter',
  labelNames: ['code']
})


module.exports = setInterval = (code) => {
  counter.inc({ code: code })
}

