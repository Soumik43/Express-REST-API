const express = require("express");
const {
    getUsers,
    createUser,
    findUserById,
    findUser,
    deleteUserById,
    updateUserById,
} = require("../controllers/User.controllers");

const route = express.Router();

route.route("/users").get(getUsers);
route.route("/users/createUser").post(createUser);
route.route("/users/:id").get(findUserById);
route.route("/findUser").get(findUser);
route.route("/deleteUser/:id").delete(deleteUserById);
route.route("/updateUser").post(updateUserById);

module.exports = route;
