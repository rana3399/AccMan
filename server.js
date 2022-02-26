const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.json());

const cors = require("cors");
const corsOptions = {
    origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

const usersRouter = require("./routes/user");
app.use('/users', usersRouter);

const customersRouter = require("./routes/customersApis");
app.use('/customers', customersRouter);

const servicesRouter = require("./routes/servicesApis");
app.use('/services', servicesRouter);


const salesRouter = require("./routes/salesApis");
app.use('/sales', salesRouter);

const invoicesRouter = require("./routes/invoicesApis");
app.use("/invoices", invoicesRouter);

const reportsRouter = require("./routes/reportsApis");
app.use("/reports", reportsRouter);

app.use((req, res, next) => {
    const err = new Error("Not found!")
    err.status = "404"
    next(err)

});

// error handler

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })

})


const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
})
