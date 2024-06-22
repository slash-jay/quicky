const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const CryptoJS = require('crypto-js');
const Code = require('./models/Code'); // Import the Code model

const app = express();

// MongoDB connection string
const dbURI = 'mongodb+srv://jayashankar:F8B2irSrFapM4r5B@cluster0.yi5wzlq.mongodb.net/quicky?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Set view engine to ejs
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

const secretKey = 'your-secret-key'; // Use a strong secret key

// Encrypt function
function encrypt(text) {
    return CryptoJS.AES.encrypt(text, secretKey).toString();
}

// Decrypt function
function decrypt(ciphertext) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}

// Routes
// Render the index page with an empty code
app.get('/', (req, res) => {
    res.render('index', { code: '' }); // Pass an empty string for code
});

// Handle submission of code from index page
app.post('/submit', (req, res) => {
    const code = req.body.code;
    const encryptedCode = encrypt(code); // Encrypt the code
    res.redirect(`/code/${encodeURIComponent(encryptedCode)}`); // Use encodeURIComponent to safely handle the encrypted string
});

// Render the code page based on the provided code
app.get('/code/:encryptedCode', async (req, res) => {
    const encryptedCode = decodeURIComponent(req.params.encryptedCode); // Decode the encrypted string
    const code = decrypt(encryptedCode); // Decrypt the code
    try {
        const existingCode = await Code.findOne({ code });
        if (existingCode) {
            res.render('code', { code: existingCode.code, text: existingCode.text });
        } else {
            res.render('code', { code, text: '' });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});

// Handle saving or updating code and text
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
        // Render index page again with an empty input field
        res.render('index', { code: '' }); // Pass an empty string for code
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).send('Error saving data');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
