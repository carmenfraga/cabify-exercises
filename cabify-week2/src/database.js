import mongoose from "mongoose";

const server = "127.0.0.1:27017";
// const server = "mongodb:27017"
// const local = "localhost"
const database = "cabify_bootcamp";

export default mongoose.createConnection(`mongodb://${server}/${database}`, {
  useNewUrlParser: true,
});
