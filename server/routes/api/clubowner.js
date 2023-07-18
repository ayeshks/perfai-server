const express = require('express');
const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid');


const router = express.Router();

// Get all club owners
router.get('/', async (req, res) => {
    try {
      const clubowners = await loadClubOwnerCollection();
      const owners = await clubowners.find({}).toArray();
      res.json(owners);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to get club owners' });
    }
  });

// Create a new club owner
router.post('/clubOwners', async (req, res) => {
  try {
    const { OfirstName, OlastName, email, phoneNumber } = req.body;
    const clubOwnerCollection = await loadClubOwnerCollection();
  
    // Create a new club owner
    const newClubOwner = {
      OfirstName,
      OlastName,
      email,
      phoneNumber
    };

    await clubOwnerCollection.insertOne(newClubOwner);
    res.status(201).json({ success: true, message: 'Club owner created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to create club owner' });
  }
});


async function loadClubOwnerCollection() {
  const client = await MongoClient.connect('mongodb+srv://ayeshs:19970720a@cluster1.68uy6q1.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
  });
  return client.db('perfai').collection('clubowner');
}

module.exports = router;
