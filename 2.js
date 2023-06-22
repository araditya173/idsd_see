const { MongoClient } = require('mongodb');
const prompt = require('prompt-sync')();

// Connection URI
const uri = 'mongodb+srv://adityarabsc22:araditya32@cluster0.iaibmzj.mongodb.net/wednes?retryWrites=true&w=majority';

// Create a MongoDB client
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Function to connect to the MongoDB database
async function connectToDatabase() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// Function to add a player
async function addPlayer() {
  try {
    const name = prompt('Enter the name of the player: ');
    const score = parseFloat(prompt('Enter the score of the player: '));

    const collection = client.db().collection('players');

    // Create a new player document
    const player = { name, score };

    // Insert the player document into the collection
    const result = await collection.insertOne(player);
    console.log('Player added:', result.insertedId);
  } catch (error) {
    console.error('Error adding player:', error);
  }
}

// Function to get all players
async function getAllPlayers() {
  try {
    const collection = client.db().collection('players');

    // Retrieve all players from the collection
    const players = await collection.find().toArray();
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

    const collection = client.db().collection('players');

    // Update the player's score
    const result = await collection.updateOne({ name }, { $set: { score: newScore } });
    console.log('Player updated:', result.modifiedCount);
  } catch (error) {
    console.error('Error updating player:', error);
  }
}

// Function to delete a player
async function deletePlayer() {
  try {
    const name = prompt('Enter the name of the player to delete: ');

    const collection = client.db().collection('players');

    // Delete the player from the collection
    const result = await collection.deleteOne({ name });
    console.log('Player deleted:', result.deletedCount);
  } catch (error) {
    console.error('Error deleting player:', error);
  }
}

// Main function to execute the program
async function main() {
  await connectToDatabase();

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
        client.close();
        console.log('Disconnected from MongoDB');
        return;
      default:
        console.log('Invalid choice. Please try again.');
    }
  }
}

// Call the main function to start the program
main().catch(console.error);
