import mongoose from "mongoose";

import database from "../database.js";

const budgetSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'credit'
    },
    amount: Number


});

export default database.model("Budget", budgetSchema);
