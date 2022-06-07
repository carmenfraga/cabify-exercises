import locks from 'locks'
const mutex = locks.createMutex()
import { Budget, BudgetCopy } from "../models/budget.js";




export default (conditions) => {


    // Budget.create(conditions);

    const query = {}

    mutex.lock(async () => {
        const doc = async () => await Budget.findOneAndUpdate(query, { amount: conditions })
        const doc2 = async () => await BudgetCopy.findOneAndUpdate(query, { amount: conditions })


        console.log('We got the lock!');
        // do stuff
        doc()
        doc2()
        mutex.unlock();
        console.log('We got Unlock!');

    });


}

