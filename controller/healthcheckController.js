const healthcheck = (req, res) => {
    res.json({
        status: "ok",
        timestamp: new Date()
    });
};

export default { healthcheck };