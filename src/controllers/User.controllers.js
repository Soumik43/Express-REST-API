const Users = require("../../data/Users.json");
const User = require("../models/User.models");
const fs = require("fs");
const { successResponseMessage, errorResponseMessage } = require("../helpers/messages");
const AppError = require("../helpers/AppError");

module.exports.getUsers = (req, res) => {
    return successResponseMessage(req, res, 201, {
        data: [...Users],
    });
};

module.exports.createUser = (req, res) => {
    const { id, name, profileImage, introduction, profileLink } = req.body;
    const user = new User(req.body);
    Users.push(user);
    const jsonContent = JSON.stringify(Users);
    fs.writeFileSync("data/Users.json", jsonContent);
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
    const { id, data } = req.body;
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
    fs.writeFileSync("data/Users.json", JSON.stringify(Users));
    return successResponseMessage(req, res, 201, {
        message: "User updated!",
        data: data,
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
    fs.writeFileSync("data/Users.json", JSON.stringify(Users));
    return successResponseMessage(req, res, 201, {
        message: "User deleted!",
        data: user,
    });
};
