class AppError extends Error {
    constructor(statusCode, payload) {
        super();
        this.statusCode = statusCode;
        this.payload = payload;
    }
}

module.exports = AppError;
