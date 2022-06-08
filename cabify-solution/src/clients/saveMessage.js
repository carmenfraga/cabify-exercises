import { Message, MessageCopy } from "../models/message.js";


export default async (messageParams) => {
  const message = new Message(messageParams);
  const messageCopy = new MessageCopy(messageParams)

  try {
    const doc = await message.save();
    const doc2 = await messageCopy.save()

    console.log("Message saved succesfully:", doc);
    console.log("Messages saved succesfully in Copy Database", doc2)
    return true
  } catch (err) {
    console.log("Error while saving", err);
  }
}
