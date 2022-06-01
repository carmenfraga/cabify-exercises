const router = require("express").Router();


router.get("/", (req, res, next) => {
    res.json("Hello world");
});


router.use("/", require('./messages.routes'))


module.exports = router;
