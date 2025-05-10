const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect.js'); // your db connection file

module.exports = {
  getAllContacts: async (req, res) => {
    try {
      const db = getDb();
      const contacts = await db.collection('contacts').find().toArray();
      res.status(200).json(contacts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getSingleContact: async (req, res) => {
    try {
      const db = getDb();
      const id = new ObjectId(req.params.id);
      const contact = await db.collection('contacts').findOne({ _id: id });
      if (!contact)
        return res.status(404).json({ message: 'Contact not found' });
      res.status(200).json(contact);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  createContact: async (req, res) => {
    console.log(req.body); // Debug the request body

    const contact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    try {
      const db = getDb(); // Fixed line
      const response = await db.collection('contacts').insertOne(contact);
      if (response.acknowledged) {
        res.status(201).json(response);
      } else {
        res.status(500).json({
          error: 'Insert failed or not acknowledged',
        });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  updateContact: async (req, res) => {
    const contactId = req.params.id;

    // Validate the ID
    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({ message: 'Invalid contact ID' });
    }

    const updatedContact = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday,
    };

    try {
      const db = getDb();
      const result = await db
        .collection('contacts')
        .updateOne({ _id: new ObjectId(contactId) }, { $set: updatedContact });

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: 'Contact not found' });
      }

      res.status(204).send(); // No content, successful update
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  deleteContact: async (req, res) => {
    const contactId = req.params.id;

    // Check if the ID is valid
    if (!ObjectId.isValid(contactId)) {
      return res.status(400).json({ message: 'Invalid contact ID' });
    }

    try {
      const db = getDb();
      const result = await db
        .collection('contacts')
        .deleteOne({ _id: new ObjectId(contactId) });

      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Contact not found' });
      }

      res.status(204).send(); // No content, successful deletion
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
