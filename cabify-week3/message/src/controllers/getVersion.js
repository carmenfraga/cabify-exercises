export default (req, res) => {

    const messageServiceEnvironment = process.env.SERVICE_NAME

    res.json(messageServiceEnvironment);
    console.log(messageServiceEnvironment);
};
