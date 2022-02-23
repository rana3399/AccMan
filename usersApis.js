const { Pool } = require("pg");
const secrets = require("./secrets.json")
const pool = new Pool(secrets);

const usersApis = () => {
    const getUsers = async (req, res) => {
        try {
            const result = await pool.query("select * from users")
            return res
                .status(200)
                .json(result.rows)

        } catch (error) {
            console.error("error", error)
            res.status("404").send(error.name)
        }
    }

    return {
        getUsers
    }


}

module.exports = usersApis;