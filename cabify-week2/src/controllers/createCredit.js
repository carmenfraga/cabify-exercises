import saveCredit from "../clients/saveCredit.js";


export default async (req, res) => {
    console.log('reqbody------>', req.body)
    const budget = await saveCredit(req.body.amount)

    res.json(budget);
}
