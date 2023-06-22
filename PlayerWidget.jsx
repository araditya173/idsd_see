import React from 'react';
import WidgetWrapper from 'components/WidgetWrapper';

class PlayerWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      name: '',
      score: '',
      updateIndex: null,
    };
  }

  componentDidMount() {
    this.setState({ players: this.getStoredPlayers() });
  }

  getStoredPlayers() {
    const storedPlayers = localStorage.getItem('players');
    return storedPlayers ? JSON.parse(storedPlayers) : [];
  }

  setStoredPlayers(players) {
    localStorage.setItem('players', JSON.stringify(players));
  }

  addPlayer() {
    const { name, score } = this.state;
    const player = { name, score };

    this.setState((prevState) => ({
      players: [...prevState.players, player],
      name: '',
      score: '',
    }), () => {
      this.setStoredPlayers(this.state.players);
    });
  }

  deletePlayer(index) {
    this.setState((prevState) => {
      const updatedPlayers = [...prevState.players];
      updatedPlayers.splice(index, 1);
      return { players: updatedPlayers };
    }, () => {
      this.setStoredPlayers(this.state.players);
    });
  }

  updatePlayer(index) {
    const { name, score } = this.state;

    this.setState((prevState) => {
      const updatedPlayers = [...prevState.players];
      updatedPlayers[index] = { name, score };
      return { players: updatedPlayers, name: '', score: '', updateIndex: null };
    }, () => {
      this.setStoredPlayers(this.state.players);
    });
  }

  setUpdatePlayer(index) {
    const { name, score } = this.state;
    const player = this.state.players[index];

    this.setState({
      name: player.name,
      score: player.score,
      updateIndex: index,
    });
  }

  render() {
    const { players, name, score, updateIndex } = this.state;

    return (
        <WidgetWrapper>
      <div>
        <h2>Player List</h2>
        <ul>
          {players.map((player, index) => (
            <li key={index}>
              {player.name} - {player.score}
              <button onClick={() => this.deletePlayer(index)}>Delete</button>
              <button onClick={() => this.setUpdatePlayer(index)}>Update</button>
            </li>
          ))}
        </ul>

        <h2>{updateIndex !== null ? 'Update Player' : 'Add Player'}</h2>
        <form onSubmit={e => { e.preventDefault(); updateIndex !== null ? this.updatePlayer(updateIndex) : this.addPlayer(); }}>
          <input type="text" value={name} onChange={e => this.setState({ name: e.target.value })} placeholder="Name" required />
          <input type="number" value={score} onChange={e => this.setState({ score: e.target.value })} placeholder="Score" required />
          <button type="submit">{updateIndex !== null ? 'Update' : 'Add'}</button>
        </form>
      </div>
      </WidgetWrapper>
    );
  }
}

export default PlayerWidget;
