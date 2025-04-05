const express = require("express");
const Contact = require("../models/Contact");
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find({}).sort({lastName:1})
        res.json(contacts);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.json(contact);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newContact = await Contact.create(req.body);
        res.status(201).json(newContact);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedContact);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.json({ message: 'Contact deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;