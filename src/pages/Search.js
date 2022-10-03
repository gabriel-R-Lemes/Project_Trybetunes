import React from 'react';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      isDisabled: true,
      awaiting: false,
      responseOfSearch: [],
      search: '',
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.shoudEnable());
  };

  handleClick = async () => {
    const { name, search } = this.state;
    this.setState({ search: name });
    this.setState({ name: '', awaiting: true });
    const result = await searchAlbumsAPI(search);
    this.setState({ awaiting: false, responseOfSearch: result });
  };

  shoudEnable = () => {
    const { name } = this.state;
    const minLength = 2;
    this.setState({ isDisabled: (name.length < minLength) });
  };

  render() {
    const { name, isDisabled, awaiting, responseOfSearch, search } = this.state;
    const myForms = (
      <form>
        <input
          type="text"
          placeholder="Digite o nome do Artista"
          name="name"
          id="name"
          value={ name }
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
    );
    return (
      <div data-testid="page-search">
        <Header />
        { awaiting ? <Loading /> : myForms }
        { responseOfSearch.length > 0 ?
          <h2>
            Resultado de álbuns de:
            { search }
          </h2> : <span>Nenhum álbum foi encontrado</span>}
      </div>
    );
  }
}

// Login.propTypes = {

// };

export default Search;
