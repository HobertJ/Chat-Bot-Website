const express = require('express');
const router = express.Router();
const app = express();
const main = require("./app.js");


module.exports = (app) => {
    app.post('/chat', async (req , res) => {
        console.log(req.body.question);
        console.log(req.body.algo);
        const response = await main(req.body.question, req.body.algo);
        res.json({ message: response });
    });

};