const express = require("express");
const {
    getUsers,
    createUser,
    findUserById,
    findUser,
    deleteUserById,
    updateUserById,
} = require("../controllers/User.controllers");
const validateUser = require("../helpers/validateUser");

const route = express.Router();

route.route("/users").get(getUsers);
route.route("/createUser").post(validateUser, createUser);
route.route("/users/:id").get(findUserById).delete(deleteUserById).patch(validateUser, updateUserById);
route.route("/findUser").get(findUser);

module.exports = route;
