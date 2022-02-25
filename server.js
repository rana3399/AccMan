const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.json());



//const usersApisFile = require("./usersApis.js")
//const usersApis = usersApisFile();
const customersFile = require("./customersApis.js");
const customersFunc = customersFile();

const invoicesFile = require("./invoicesApis");
const invoicesFunc = invoicesFile();

const usersRouter = require("./routes/user");
app.use('/users', usersRouter);

const salesRouter = require("./routes/salesApis");
app.use('/sales', salesRouter);

const servicesRouter = require("./routes/servicesApis");
app.use('/services', servicesRouter);


const cors = require("cors");
const corsOptions = {
    origin: "http://localhost:3000",
};
app.use(cors(corsOptions));


app.get("/customers", customersFunc.getCustomers);
app.get("/customers", customersFunc.getCustomersById);
app.post("/customers", customersFunc.addNewCustomers);
app.get("/customers/search", customersFunc.getCustomersByName);


app.post("/invoices", invoicesFunc.addNewInvoice);



const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
})
