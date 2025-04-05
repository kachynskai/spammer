const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const contactsRoutes = require('../routes/contactsRoutes.js');
const emailRoutes = require('../routes/emailRoutes.js');

const PORT = process.env.PORT || 5001;

const server = express();

server.use(cors());

server.use(express.json());
mongoose.connect('mongodb://localhost:27017/spam_db')
    .then(() => console.log("Database was successfully connected!"))
    .catch(err => {
        console.log('Connection to MongoDB was failed: ', err);
        process.exit(1);
    });


server.use('/contacts', contactsRoutes);
server.use('/send', emailRoutes);

server.get('/', (req, res) => {
    res.send("API is running");
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
