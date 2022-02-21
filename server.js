const express = require("express");
const cors = require("cors");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

const apiFile = require("./api.js")
const api = apiFile();

app.get("/users", api.getUsers)

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`);
})
