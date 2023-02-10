const Users = require("../../data/Users.json");
const User = require("../models/User.models");
const fsPromises = require("fs/promises");
const { successResponseMessage, errorResponseMessage } = require("../helpers/messages");
const AppError = require("../helpers/AppError");
const { DATA_PATH } = require("../config/path");

module.exports.getUsers = (req, res) => {
    return successResponseMessage(req, res, 201, {
        data: [...Users],
    });
};

module.exports.createUser = (req, res) => {
    const user = new User(req.body);
    Users.push(user);
    const userAlreadyExists = Users.indexOf((currUser) => user.id === currUser.id);
    if (userAlreadyExists) {
        return errorResponseMessage(
            new AppError(400, {
                message: "User with ID already present!",
            }),
            req,
            res
        );
    }
    fsPromises
        .writeFile(DATA_PATH, JSON.stringify(Users))
        .then(() =>
            successResponseMessage(req, res, 201, {
                message: "User created!",
                data: user,
            })
        )
        .catch((err) => {
            throw new AppError(500, {
                message: "Internal server error!",
                err: err,
            });
        });
    return successResponseMessage(req, res, 201, {
        message: "User added successfully!",
        data: [...Users],
    });
};

module.exports.findUserById = (req, res) => {
    const { id } = req.params;
    let user = Users.find((curruser) => curruser.id === id);
    if (user === undefined) {
        return errorResponseMessage(
            new AppError(404, {
                message: "No user found",
            }),
            req,
            res
        );
    }
    return successResponseMessage(req, res, 201, {
        message: "User found",
        data: user,
    });
};

module.exports.findUser = (req, res) => {
    const data = req.body;
    if (Object.keys(data).length === 0) {
        return errorResponseMessage(
            new AppError(404, {
                message: "Please enter details of user!",
            }),
            req,
            res
        );
    }
    let keys = Object.keys(data);
    let user = Users.filter((currIntern) => {
        let userFound = true;
        for (let key of keys) {
            if (currIntern[key] !== data[key]) {
                userFound = false;
            }
        }
        return userFound;
    });
    if (user.length === 0) {
        return errorResponseMessage(
            new AppError(400, {
                message: "No user found!",
            }),
            req,
            res
        );
    }
    return successResponseMessage(req, res, 201, {
        message: "Users found!",
        data: user,
    });
};

module.exports.updateUserById = (req, res) => {
    const data = req.body;
    const { id } = req.params;
    let index = Users.findIndex((user) => user.id === id);
    if (index === -1) {
        return errorResponseMessage(
            new AppError(400, {
                message: "No user found!",
            }),
            req,
            res
        );
    }
    if (Object.keys(data).includes("id")) {
        data.id = Users[index].id;
    }
    Users[index] = Object.assign({}, Users[index], data);
    fsPromises
        .writeFile(DATA_PATH, JSON.stringify(Users))
        .then(() =>
            successResponseMessage(req, res, 201, {
                message: "User updated!",
                data: data,
            })
        )
        .catch((err) => {
            throw new AppError(500, {
                message: "Internal server error!",
                err: err,
            });
        });
};

module.exports.deleteUserById = (req, res) => {
    const { id } = req.params;
    const index = Users.findIndex((user) => user.id === id);
    if (index === -1) {
        return errorResponseMessage(
            new AppError(400, {
                message: "No user found!",
            }),
            req,
            res
        );
    }
    const user = Users.find((user) => user.id === id);
    Users.splice(index, 1);
    fsPromises
        .writeFile(DATA_PATH, JSON.stringify(Users))
        .then(() =>
            successResponseMessage(req, res, 201, {
                message: "User deleted!",
                data: user,
            })
        )
        .catch((err) => {
            throw new AppError(500, {
                message: "Internal server error!",
                err: err,
            });
        });
};
