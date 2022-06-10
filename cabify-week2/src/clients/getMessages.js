import { Message, MessageCopy } from "../models/message.js";

const messages = (conditions = {}) => Message.find(conditions)
const messagesCopy = (conditions = {}) => MessageCopy.find(conditions)

export default (messages, messagesCopy)
