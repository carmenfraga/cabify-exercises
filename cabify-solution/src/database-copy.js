import mongoose from "mongoose";

const server = "127.0.0.1:27018";
// const server = "mongobackup:27017"
const local = "localhost"
const database = "cabify_bootcamp-copy";

export default mongoose.createConnection(`mongodb://${server}/${database}`, {
    useNewUrlParser: true,
});
