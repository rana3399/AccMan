const express = require("express");
const bcrypt = require("bcrypt");
const fs = require("fs");

const { Pool } = require("pg");
const secrets = require("../secrets.json")
const pool = new Pool(secrets);

const usersDb = require("../database/db.json");
const generateJWT = require("../utils/generateJWT");

const authenticate = require("../middleware/authenticate");

const router = require('express').Router();

// user registration / sign-up
const getSignUp = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await usersDb.filter((user) => user.email === email);
        if (user.length > 0) {
            return res.status(400).json({ error: "User already exist!" });
        }

        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);

        let newUser = {
            id: usersDb.length,
            name: name,
            email: email,
            password: bcryptPassword,
        };

        // const pretty = JSON.stringify(newUser, null, 4)
        usersDb.push(newUser);

        await fs.writeFileSync("./database/db.json", JSON.stringify(usersDb));
        const jwtToken = generateJWT(newUser.id);

        const result = await pool.query(
            `INSERT INTO users (user_name, user_email)
        VALUES ($1, $2) returning id`,
            [name, email]);

        if (result.rows.length > 0) {

            return res.status(201).send({
                jwtToken: jwtToken,
                isAuthenticated: true,
                new_user_id: result.rows[0].id
            });
        } else {
            return res.status(201).send("Please check your input data!")
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send({ error: error.message });
    }
}

// user sign-in / login
const getSignIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await usersDb.filter((user) => user.email === email);
        if (user.length === 0) {
            return res
                .status(401)
                .json({ error: "Invalid Credential", isAuthenticated: false });
        }

        const isValidPassword = await bcrypt.compare(password, user[0].password);

        if (!isValidPassword) {
            return res
                .status(401)
                .json({ error: "Invalid Credential", isAuthenticated: false });
        }

        const jwtToken = generateJWT(user[0].id);

        return res.status(200).send({ jwtToken, isAuthenticated: true, status: "Login successful." });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ error: error.message });
    }
}

// user authorization
const getAuthorization = (req, res) => {
    try {
        res.status(200).send({ isAuthenticated: true });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ error: error.message, isAuthenticated: false });
    }
}

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

router.get("/", getUsers)
router.post("/sign-up", getSignUp);
router.post("/sign-in", getSignIn);
router.post("/auth", authenticate, getAuthorization);
router.get("/", getUsers);

module.exports = router;