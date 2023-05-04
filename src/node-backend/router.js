const express = require('express');
const router = express.Router();
const app = require('app.js');

router.post('/chat', async (req , res) => {
    const response = await app.main(req.body.question, req.body.algo);
}
)
