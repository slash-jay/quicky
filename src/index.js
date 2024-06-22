const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Code = require('./models/Code'); // Import the Code model

const app = express();

// MongoDB connection string
const dbURI = 'mongodb+srv://jayashankar:F8B2irSrFapM4r5B@cluster0.yi5wzlq.mongodb.net/quicky?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(dbURI)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Set view engine to ejs
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
    res.render('index', { code: '' });
});

app.post('/submit', (req, res) => {
    const code = req.body.code;
    res.redirect(`/code/${code}`);
});

app.get('/code/:code', async (req, res) => {
    const code = req.params.code;
    try {
        const existingCode = await Code.findOne({ code });
        if (existingCode) {
            res.render('code', { code: existingCode.code, text: existingCode.text });
        } else {
            res.render('code', { code, text: '' });
        }
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

app.post('/save', async (req, res) => {
    const { code, text } = req.body;
    try {
        let existingCode = await Code.findOne({ code });
        if (existingCode) {
            existingCode.text = text;
            await existingCode.save();
        } else {
            const newCode = new Code({ code, text });
            await newCode.save();
        }
        res.send('Data saved successfully');
    } catch (error) {
        res.status(500).send('Error saving data');
    }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
