import Budget from "../models/budget.js";
import mutex from "../mutex.js"




export default (conditions) => {
    const credit = new Credit(conditions)


    // Budget.create(conditions);

    const query = { name: 'credit' }
    return Budget.findOneAndUpdate(query, { amount: conditions })


}

