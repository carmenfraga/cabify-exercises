import http from "http";

import getCredit from "../clients/getCredit.js";
import saveCredit from "../clients/saveCredit.js";
import updateMessage from "../clients/updateMessage.js";

export default async (messageId, message) => {
  const body = JSON.stringify(message);

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
        saveCredit(parseInt(credit.amount - value));
        await updateMessage(messageId, {
          ...message,
          status: postRes.statusCode === 200 ? "OK" : "ERROR",
        });
      }

      if (postRes.statusCode !== 200) {
        throw new Error("Error in the messageapp request");
      }
    } catch (error) {
      console.log(error.message);
      saveCredit(parseInt(credit.amount + value)); // Bug: En caso de tener crédito 0 + error request REGALO 1€
    }
  });

  postReq.on("timeout", async () => {
    console.error("Timeout Exceeded!");
    postReq.abort();

    try {
      await updateMessage(messageId, {
        ...message,
        status: "TIMEOUT",
      });
    } finally {
    }
  });

  postReq.on("error", (error) => {});

  postReq.write(body);
  postReq.end();
};
