const { Pool } = require("pg");
const secrets = require("./secrets.json")
const pool = new Pool(secrets);

const api = () => {

    const getUsers = async (req, res) => {
        try {
            const result = await pool.query("select * from users")
            console.log(result.rows);

            return res
                .status(200)
                .json(result.rows)

        } catch (error) {
            console.error(error)
            res.status("404").send(error)

        }
    }

    const getCustomers = async (req, res) => {
        try {
            const result = await pool.query("select * from customers")
            console.log(result.rows);

            return res
                .status(200)
                .json(result.rows)

        } catch (error) {
            console.error(error)
            res.status("404").send(error)

        }
    }





    return {
        getUsers,
        getCustomers
    }


}

module.exports = api;