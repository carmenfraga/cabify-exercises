import { Message, MessageCopy } from "../models/message.js";

export default async (messageParams) => {
  const message = new Message(messageParams);
  const messageCopy = new MessageCopy(messageParams);

  try {
    const doc = await message.save();
    console.log("Message saved succesfully:", doc);
    const doc2 = await messageCopy.save();
    console.log("Messages saved succesfully in Copy Database", doc2);

    return doc;
  } catch (err) {
    console.error("Error while saving", err);
  }
};
