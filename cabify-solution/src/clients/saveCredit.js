import Budget from "../models/budget.js";




export default (conditions = {}) => {

    // Budget.create(conditions);

    const id = "629e18efc8978d9f023eca52"

    return Budget.findByIdAndUpdate(id, { amount: conditions })
}

