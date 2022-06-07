import getCredit from "../clients/getCredit.js";
import saveCredit from "../clients/saveCredit.js";


export default async (req, res) => {
    console.log('reqbody------>', req.body.amount)

    const currentBudget = await getCredit()
    console.log("CURRENT BUDGET----->", currentBudget)

    const totalBudget = currentBudget[0].amount + req.body.amount

    const budget = await saveCredit(totalBudget)

    console.log('TOTAL BUDGET---->', totalBudget)

    res.json('Your credit is updated');
}
