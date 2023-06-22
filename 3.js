const mongoose = require('mongoose');
const prompt = require('prompt-sync')();

// Player schema
const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  }
});

// Player model
const Player = mongoose.model('Player', playerSchema);

// Connection URI
const uri = 'mongodb+srv://adityarabsc22:araditya32@cluster0.iaibmzj.mongodb.net/wednes?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');

    // Function to add a player
    async function addPlayer() {
      try {
        const name = prompt('Enter the name of the player: ');
        const score = parseFloat(prompt('Enter the score of the player: '));

        // Create a new player document
        const player = new Player({ name, score });

        // Save the player document to the database
        const savedPlayer = await player.save();
        console.log('Player added:', savedPlayer);
      } catch (error) {
        console.error('Error adding player:', error);
      }
    }

    // Function to get all players
    async function getAllPlayers() {
      try {
        const players = await Player.find();
        console.log('All players:', players);
      } catch (error) {
        console.error('Error retrieving players:', error);
      }
    }

    // Function to update a player's score
    async function updatePlayerScore() {
      try {
        const name = prompt('Enter the name of the player to update: ');
        const newScore = parseFloat(prompt('Enter the new score for the player: '));

        // Find the player by name and update the score
        const updatedPlayer = await Player.findOneAndUpdate({ name }, { score: newScore }, { new: true });
        console.log('Player updated:', updatedPlayer);
      } catch (error) {
        console.error('Error updating player:', error);
      }
    }

    // Function to delete a player
    async function deletePlayer() {
      try {
        const name = prompt('Enter the name of the player to delete: ');

        // Find the player by name and delete it
        const deletedPlayer = await Player.findOneAndDelete({ name });
        console.log('Player deleted:', deletedPlayer);
      } catch (error) {
        console.error('Error deleting player:', error);
      }
    }

    // Main function to execute the program
    async function main() {
      while (true) {
        console.log('1. Add a player');
        console.log('2. Get all players');
        console.log('3. Update a player\'s score');
        console.log('4. Delete a player');
        console.log('5. Exit');

        const choice = prompt('Enter your choice: ');

        switch (choice) {
          case '1':
            await addPlayer();
            break;
          case '2':
            await getAllPlayers();
            break;
          case '3':
            await updatePlayerScore();
            break;
          case '4':
            await deletePlayer();
            break;
          case '5':
            mongoose.disconnect();
            console.log('Disconnected from MongoDB');
            return;
          default:
            console.log('Invalid choice. Please try again.');
        }
      }
    }

    // Call the main function to start the program
    main().catch(console.error);
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });
