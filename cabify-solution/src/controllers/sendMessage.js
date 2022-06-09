import http from "http";

import getCredit from "../clients/getCredit.js";
import saveCredit from "../clients/saveCredit.js";
import saveMessage from "../clients/saveMessage.js";

export default async (req, res) => {
  const body = JSON.stringify(req.body);

  const credit = await getCredit();
  console.log(credit);

  const postOptions = {
    host: "127.0.0.1",
    // host: "messageapp",
    port: 3000,
    path: "/message",
    method: "post",
    json: true,
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(body),
    },
  };

  const postReq = http.request(postOptions);

  postReq.on("response", async (postRes) => {
    try {
      const credit = await getCredit();
      const value = 1;

      if (credit.amount > 0) {
        await saveCredit(parseInt(credit.amount - value));
        await saveMessage({
          ...req.body,
          status: postRes.statusCode === 200 ? "OK" : "ERROR",
        });
      } else {
        res.end("There is not credit there");
      }

      if (postRes.statusCode !== 200) {
        throw new Error("Error in the messageapp request");
      }

      res.statusCode = 200;
      res.end(postRes.body);
    } catch (error) {
      console.log(error.message);
      res.statusCode = 500;
      const credit = await getCredit();
      const value = 1;
      await saveCredit(parseInt(credit.amount + value)); // Bug: En caso de tener crédito 0 + error request REGALO 1€
      res.end(`Internal server error: SERVICE ERROR ${error.message}`);
    }
  });

  postReq.on("timeout", async () => {
    console.error("Timeout Exceeded!");
    postReq.abort();

    try {
      await saveMessage({
        ...req.body,
        status: "TIMEOUT",
      });
    } finally {
      res.statusCode = 500;
      res.end("Internal server error: TIMEOUT");
    }
  });

  postReq.on("error", (error) => {
    res.statusCode = 500;
    res.end(error.message);
  });

  postReq.write(body);
  postReq.end();
};
