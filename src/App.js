import React from 'react';
import './App.css';

const initialState = {
  loading: true,
  image: '',
  status: '',
};
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      ...initialState,
    };

    this.fetchDogs = this.fetchDogs.bind(this);
    this.renderDogs = this.renderDogs.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  componentDidMount() {
    this.fetchDogs();
  }

  handleClick() {
    this.setState({ ...initialState });
    this.fetchDogs();
  }

  fetchDogs() {
    const url = 'https://dog.ceo/api/breeds/image/random';
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          loading: false,
          image: data.message,
          status: data.status,
        });
      });
  }

  renderDogs() {
    const { image, status } = this.state;
    return (
      <div className="img-container">
        <img src={ image } alt={ status } />
      </div>
    );
  }

  renderButton() {
    return (
      <button
        type="button"
        className="button-dogs"
        id="button-dogs"
        onClick={ this.handleClick }
      >
        Fetch another dog
      </button>
    );
  }

  render() {
    const { loading } = this.state;
    const loadingMessage = <h1 className="load-text">Loading...</h1>;
    return (
      <div>
        <header className="header-container">
          <h1>Dog API</h1>
        </header>
        <main className="main-container">
          <div>
            {loading ? loadingMessage : this.renderDogs()}
          </div>
          {!loading && this.renderButton()}
        </main>
      </div>
    );
  }
}

export default App;
