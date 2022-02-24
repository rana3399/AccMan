const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.json());

const usersApisFile = require("./usersApis.js")
const usersApis = usersApisFile();
const customersFile = require("./customersApis.js");
const customersFunc = customersFile();
const servicesFile = require("./servicesApis");
const servicesFunc = servicesFile();

const invoicesFile = require("./invoicesApis");
const invoicesFunc = invoicesFile();

const salesFile = require("./salesApis");
const salesFunc = salesFile();

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
app.post("/customers", customersFunc.addNewCustomers);
app.get("/customers/search", customersFunc.getCustomersByName);



app.get("/services", servicesFunc.getServices);
app.get("/services/search", servicesFunc.getServicesByName);
app.post("/services", servicesFunc.addNewService);

app.post("/invoices", invoicesFunc.addNewInvoice);

app.post("/sales", salesFunc.addNewSale);





const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
})
