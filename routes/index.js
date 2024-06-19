const express = require('express');
const router = express.Router();
const Entry = require('../models/Entry');

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/editor', async (req, res) => {
    const { code } = req.body;
    let entry = await Entry.findOne({ code });
    if (!entry) {
        entry = new Entry({ code, text: '' });
        await entry.save();
    }
    res.render('editor', { entry });
});

router.post('/save', async (req, res) => {
    const { code, text } = req.body;
    await Entry.findOneAndUpdate({ code }, { text });
    res.redirect('/');
});

module.exports = router;
