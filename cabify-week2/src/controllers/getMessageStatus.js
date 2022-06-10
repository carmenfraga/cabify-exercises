import getMessageStatus from "../clients/getMessageStatus.js";

export default async (req, res) => {
  const { messageId } = req.params;
  const messageStatus = await getMessageStatus({ messageId });

  res.json({ status: messageStatus });
};
