const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://adityarabsc22:araditya32@cluster0.iaibmzj.mongodb.net/wednes?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Create a player schema
const playerSchema = new mongoose.Schema({
  name: String,
  score: Number
});

// Create a player model
const Player = mongoose.model('Player', playerSchema);

// Add a player
app.post('/players', (req, res) => {
  const { name, score } = req.body;
  const player = new Player({ name, score });

  player.save()
    .then(() => {
      res.status(201).json({ message: 'Player added successfully' });
    })
    .catch((error) => {
      console.error('Error saving player:', error);
      res.status(500).json({ error: 'Error saving player' });
    });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
