const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.json());

const apiFile = require("./api.js")
const api = apiFile();
const authorizationApi = require("./routes/user");
const userApis = authorizationApi();

const authenticate = require("./middleware/authenticate");


const cors = require("cors");
const corsOptions = {
    origin: "http://localhost:3000",
};
app.use(cors(corsOptions));


app.get("/users", api.getUsers)
app.post("/user/sign-up", userApis.getSignUp);
app.post("/user/sign-in", userApis.getSignIn);
app.post("user/auth", authenticate, userApis.getAuthorization);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
})
