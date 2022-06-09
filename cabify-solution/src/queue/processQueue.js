import updateMessage from "../clients/updateMessage.js";
import sendMessage from "../controllers/sendMessage.js";

export default async (job) => {
  const messageId = job.data._id;
  console.log("MESSAGE ID", messageId);
  const processingMessage = {
    ...job.data,
    status: "PROCESSING",
  };
  console.log("PROCESSING", processingMessage);
  console.log("processing message");
  const updatedMessage = await updateMessage(messageId, processingMessage);

  await sendMessage(messageId, updatedMessage);
  const executedMessage = {
    ...job.data,
    status: "EXECUTED",
  };
  console.log(
    "executed message",
    await updateMessage(messageId, executedMessage)
  );
};
