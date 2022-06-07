import getCredit from "../clients/getCredit.js";
import saveCredit from "../clients/saveCredit.js";


export default async (req, res) => {
    console.log('reqbody------>', req.body.amount)

    const currentBudget = await getCredit()
    console.log("CURRENT BUDGET----->", currentBudget)

    const totalBudget = currentBudget[0].amount + req.body.amount

    const budget = await saveCredit(totalBudget)

    const currentBudget2 = await getCredit()

    console.log('TOTAL BUDGET---->', totalBudget)
    console.log('TOTAL BUDGET2---->', currentBudget2)


    res.json('Your credit is updated');
}
