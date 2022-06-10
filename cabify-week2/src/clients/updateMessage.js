import { Message } from "../models/message.js";

export default async (id, { destination, body, status }) => {
  const updatedMessage = await Message.findByIdAndUpdate(
    id,
    {
      destination,
      body,
      status,
    },
    { new: true }
  );
  return updatedMessage;
};
