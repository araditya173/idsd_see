const prompt = require('prompt-sync')();

class Player {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }
}

class Team {
  
  constructor() {
    this.players = [];
  }

  addPlayer(player) {
    this.players.push(player);
  }

  getAverageScore() {
    if (this.players.length === 0) {
      return 0;
    }

    const totalScore = this.players.reduce((sum, player) => sum + player.score, 0);
    return totalScore / this.players.length;
  }

  getMinimumScore() {
    if (this.players.length === 0) {
      return null;
    }

    let minScore = 0;
    let playerName = '';

    for (const player of this.players) {
      if (player.score < minScore) {
        minScore = player.score;
        playerName = player.name;
      }
    }

    return {
      minScore: minScore,
      playerName: playerName
    };
  }

  getMaximumScore() {
    if (this.players.length === 0) {
      return null;
    }

    let maxScore = -Infinity;
    let playerName = '';

    for (const player of this.players) {
      if (player.score > maxScore) {
        maxScore = player.score;
        playerName = player.name;
      }
    }

    return {
      maxScore: maxScore,
      playerName: playerName
    };
  }
}

// Example usage
const team = new Team();

// Get the number of players from the user
const numPlayers = parseInt(prompt('Enter the number of players: '));

// Prompt the user to enter player names and scores
for (let i = 0; i < numPlayers; i++) {
  const name = prompt(`Enter the name of player ${i + 1}: `);
  const score = parseFloat(prompt(`Enter the score of player ${i + 1}: `));

  const player = new Player(name, score);
  team.addPlayer(player);
}

// Calculate average score
const averageScore = team.getAverageScore();
console.log('Average score:', averageScore);

// Get minimum score and player name
const { minScore, playerName: minPlayerName } = team.getMinimumScore();
console.log('Minimum score:', minScore);
console.log('Player with minimum score:', minPlayerName);

// Get maximum score and player name
const { maxScore, playerName: maxPlayerName } = team.getMaximumScore();
console.log('Maximum score:', maxScore);
console.log('Player with maximum score:', maxPlayerName);
