import mongoose from "mongoose";
import databaseCopy from "../database-copy.js";
import database from "../database.js";


const budgetSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'credit'
    },
    amount: Number


});


const Budget = database.model("Budget", budgetSchema);
const BudgetCopy = databaseCopy.model("BudgetCopy", budgetSchema)


export { Budget, BudgetCopy }
