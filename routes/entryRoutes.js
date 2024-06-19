const express = require('express');
const router = express.Router();
const Entry = require('../models/entry');

// Route to fetch data based on code
router.post('/entry', async (req, res) => {
    const { code } = req.body;
    try {
        const entry = await Entry.findOne({ code });
        res.render('index', { code, data: entry ? entry.data : '' });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Route to update data
router.post('/update', async (req, res) => {
    const { code, data } = req.body;
    try {
        await Entry.updateOne({ code }, { data }, { upsert: true });
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
