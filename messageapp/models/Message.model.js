const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
    {
        destination: {
            type: String,
            trim: true,
            required: [true, 'Destination is required']
        },
        body: {
            type: String,
            required: [true, 'Message is required'],
        },
        number: {
            type: Number,
            required: [true, 'Number is required'],
            trim: true
        }
    },
    {
        timestamps: true,
    }
);

const Message = model("Message", messageSchema);

module.exports = Message;