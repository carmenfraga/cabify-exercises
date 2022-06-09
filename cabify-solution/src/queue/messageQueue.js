import Queue from "bull";

import getCredit from "../clients/getCredit.js";
import saveMessage from "../clients/saveMessage.js";
import processQueue from "./processQueue.js";

const queue = new Queue("myQueue", {
  redis: { host: "localhost", port: 6379 },
});

queue.process(async (job, done) => {
  await processQueue(job);

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
    console.error(error.message);
    res.statusCode = 500;
    res.end(`Internal server error: SERVICE ERROR ${error.message}`);
  }
};

export default messageQueue;
