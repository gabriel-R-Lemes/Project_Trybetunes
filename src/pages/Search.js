import React from 'react';
// import PropTypes from 'prop-types';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      isDisabled: true,
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.shoudEnable());
  };

  handleClick = async () => {
  };

  shoudEnable = () => {
    const { name } = this.state;
    const minLength = 2;
    this.setState({ isDisabled: (name.length < minLength) });
  };

  render() {
    const { name, isDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            placeholder="Digite o nome do Artista"
            name="name"
            id="name"
            defaultValue={ name }
            onChange={ this.onInputChange }
            data-testid="search-artist-input"
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

// Login.propTypes = {

// };

export default Search;
