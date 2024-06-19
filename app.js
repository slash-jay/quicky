const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const entryRoutes = require('./routes/entryRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// MongoDB connection string
const dbURI = 'mongodb+srv://jayashankar:F8B2irSrFapM4r5B@cluster0.yi5wzlq.mongodb.net/quicky?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error('MongoDB connection error:', err));

// Use routes
app.use('/', entryRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
