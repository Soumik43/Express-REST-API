const { errorResponseMessage } = require("../helpers/messages");
const AppError = require("../helpers/AppError");

const validateUser = (req, res, next) => {
    const userObjKeys = ["id", "name", "profileImage", "introduction", "profileLink"];
    const isUser = userObjKeys.every((key) => Object.keys(req.body).includes(key));
    if (!isUser)
        return errorResponseMessage(
            new AppError(422, {
                message: "Invalid User body!",
            }),
            req,
            res
        );
    next();
};

module.exports = validateUser;
