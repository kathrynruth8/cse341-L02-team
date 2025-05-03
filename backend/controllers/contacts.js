const { ObjectId } = require('mongodb');
const { getDb } = require('../db/connect'); // your db connection file

module.exports = {
  getAllContacts: async (req, res) => {
    try {
      const db = getDb().db(); // .db() gets the actual database object
      const contacts = await db.collection('contacts').find().toArray();
      res.status(200).json(contacts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  getSingleContact: async (req, res) => {
    try {
      const db = getDb().db();
      const id = new ObjectId(req.params.id);
      const contact = await db.collection('contacts').findOne({ _id: id });
      if (!contact)
        return res.status(404).json({ message: 'Contact not found' });
      res.status(200).json(contact);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
