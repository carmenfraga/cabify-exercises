import bodyParser from "body-parser";
import express from "express";
import { ValidationError, Validator } from "express-json-validator-middleware";

import getMessages from "./src/controllers/getMessages.js";
import getMessageStatus from "./src/controllers/getMessageStatus.js";
import reloadCredit from "./src/controllers/reloadCredit.js";
import messageQueue from "./src/queue/messageQueue.js";

const app = express();

const validator = new Validator({ allErrors: true });
const { validate } = validator;

const messageSchema = {
  type: "object",
  required: ["destination", "body"],
  properties: {
    destination: {
      type: "string",
    },
    body: {
      type: "string",
    },
  },
};

const budgetSchema = {
  type: "object",
  required: ["amount"],
  properties: {
    amount: {
      type: "number",
    },
  },
};

app.post(
  "/message",
  bodyParser.json(),
  validate({ body: messageSchema }),
  messageQueue
);

app.get("/messages", getMessages);

app.get("/message/:messageId/status", getMessageStatus);

app.post(
  "/credit",
  bodyParser.json(),
  validate({ body: budgetSchema }),
  reloadCredit
);

app.use((err, req, res, _next) => {
  console.log(res.body);
  if (err instanceof ValidationError) {
    res.sendStatus(400);
  } else {
    res.sendStatus(500);
  }
});

const port = 9003;
app.listen(port, () => {
  console.log("App started on PORT: ", port);
});
