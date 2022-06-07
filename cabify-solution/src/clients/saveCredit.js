import locks from 'locks'
const mutex = locks.createMutex()
import Budget from "../models/budget.js";




export default (conditions) => {


    // Budget.create(conditions);

    const query = { name: 'credit' }

    mutex.lock(async () => {
        const doc = async () => await Budget.findOneAndUpdate(query, { amount: conditions })

        console.log('We got the lock!');
        // do stuff
        doc()
        mutex.unlock();
        console.log('We got Unlock!');

    });


}

