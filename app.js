const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const indexRouter = require('./routes/index');

mongoose.connect('mongodb+srv://jayashankar:<F8B2irSrFapM4r5B>@cluster0.yi5wzlq.mongodb.net/quicky', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((error) => {
    console.error('Error connecting to MongoDB Atlas', error);
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
