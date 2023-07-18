const express = require('express');
const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Get all clubs
router.get('/', async (req, res) => {
    try {
      const clubDataCollection = await loadClubDataCollection();
      const clubs = await clubDataCollection.find({}).toArray();
      res.json(clubs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to get clubs' });
    }
  });
  
  let clubIdCounter = 0;
// Create a new club and link it to a club owner
router.post('/clubs', async (req, res) => {
  try {
    const { clubName, location, description, clubOwnerId } = req.body;
    const clubCollection = await loadClubCollection();
    
    // Create a new club
    const newClub = {
      clubName,
      location,
      description,
      clubOwnerId,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await clubCollection.insertOne(newClub);
    res.status(201).json({ success: true, message: 'Club created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to create club' });
  }
});




async function loadClubDataCollection() {
  const client = await MongoClient.connect('mongodb+srv://ayeshs:19970720a@cluster1.68uy6q1.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
  });
  return client.db('perfai').collection('club');
}

async function loadClubOwnersCollection() {
  const client = await MongoClient.connect('mongodb+srv://ayeshs:19970720a@cluster1.68uy6q1.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
  });
  return client.db('perfai').collection('clubowner');
}

module.exports = router;
