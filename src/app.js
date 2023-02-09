const express = require("express");
const userRoute = require("./routes/User.routes");
const app = express();
require("dotenv").config();

app.use(express.json());

app.use(userRoute);

app.listen(process.env.PORT, () => {
    console.log("done");
});
