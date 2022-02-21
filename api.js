const { Pool } = require("pg");
const secrets = require("./secrets.json")
const pool = new Pool(secrets);

const api = () => {

    const getUsers = async (req, res) => {
        const result = await pool.query("select * from users")
        console.log(result.rows);

        return res
            .status(200)
            .json(result.rows)

    }

    return {
        getUsers,
    }
}

module.exports = api;