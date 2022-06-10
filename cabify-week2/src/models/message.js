import mongoose from "mongoose";

import database from "../database.js";
import databaseCopy from "../database-copy.js";

const messageSchema = new mongoose.Schema({
  destination: String,
  body: String,
  status: {
    type: String,
    enum: ["ERROR", "OK", "TIMEOUT", "QUEUED", "PROCESSING", "EXECUTED"],
  },
});

const Message = database.model("Message", messageSchema);
const MessageCopy = databaseCopy.model("MessageCopy", messageSchema);

export { Message, MessageCopy };
