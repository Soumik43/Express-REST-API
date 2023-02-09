module.exports.successResponseMessage = (req, res, statusCode, payload) => res.status(statusCode).json(payload);
module.exports.errorResponseMessage = (error, req, res) => res.status(error.statusCode).json(error.payload);
