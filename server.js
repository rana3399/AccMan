const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.json());

const usersApisFile = require("./usersApis.js")
const usersApis = usersApisFile();
const customersFile = require("./customersApis.js");
const customersFunc = customersFile();

const authorizationApiFile = require("./routes/user");
const authApis = authorizationApiFile();

const authenticate = require("./middleware/authenticate");


const cors = require("cors");
const corsOptions = {
    origin: "http://localhost:3000",
};
app.use(cors(corsOptions));


app.get("/users", usersApis.getUsers)
app.post("/user/sign-up", authApis.getSignUp);
app.post("/user/sign-in", authApis.getSignIn);
app.post("user/auth", authenticate, authApis.getAuthorization);

app.get("/customers", customersFunc.getCustomers);
app.get("/customers", customersFunc.getCustomersById);
app.get("/customers", customersFunc.getCustomersByName);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
})
