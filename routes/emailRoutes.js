const express = require("express");
const Contact = require("../models/Contact");
const router = express.Router();
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: "anatoliy34361@gmail.com",
        pass: "ddso nbxj dfcz jpmh"
    }
});
router.get('/', async (req, res) => {
    const messages = [
        "Привіт! Не забувай вийти надвір і поглянути на сонечко!",
        "Нагадую не пропустити запис на САЗ!!",
        "Бажаю міцного здоровʼя, для цього саме час зʼїсти апельсин!"
    ];
    res.json({ messages });
});

router.post('/', async (req, res) => {
    const { subject, message, sendTo } = req.body;

    try {
        let contacts;
        if (sendTo === 'all') {
            contacts = await Contact.find({});
        } else {
            contacts = await Contact.find({ email: sendTo });
        }

        const emailList = contacts.map(c => c.email);

        const mailOptions = {
            from: 'anatoliy34361@gmail.com',
            to: emailList,
            subject: subject,
            text: message
        };

        await transporter.sendMail(mailOptions);
        res.json({ message: "Розсилку успішно відправлено!" });

    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;