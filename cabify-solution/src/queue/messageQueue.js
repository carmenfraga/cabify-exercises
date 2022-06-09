import Queue from "bull";

import getCredit from "../clients/getCredit.js";
import saveMessage from "../clients/saveMessage.js";

const queue = new Queue("myQueue", {
  redis: { host: "localhost", port: 6379 },
});

queue.process((job, done) => {
  console.log("PROCESS", job.data);
  // const messageId = job.data.id;
  // const processingMessage = {
  //   ...job.data,
  //   status: "PROCESSING",
  // };

  done();
});

const messageQueue = async (req, res) => {
  try {
    const credit = await getCredit();

    if (credit.amount > 0) {
      const message = await saveMessage({
        ...req.body,
        status: "QUEUED",
      });
      queue.add(message);
      res.statusCode = 200;
      res.end("Processing message");
    } else {
      throw new Error("There is not credit there");
    }
  } catch (error) {
    console.log(error.message);
    res.statusCode = 500;
    res.end(`Internal server error: SERVICE ERROR ${error.message}`);
  }
};

export default messageQueue;
