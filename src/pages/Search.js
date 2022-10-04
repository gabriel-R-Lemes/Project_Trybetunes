import React from 'react';
import { Link } from 'react-router-dom';
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
      returnedAPI: false,
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.shoudEnable());
  };

  handleClick = async () => {
    const { name } = this.state;
    this.setState({ search: name, awaiting: true, returnedAPI: false });
    const result = await searchAlbumsAPI(name);
    await this.setState({ awaiting: false, responseOfSearch: result });
    await this.setState({ name: '', returnedAPI: true });
  };

  shoudEnable = () => {
    const { name } = this.state;
    const minLength = 2;
    this.setState({ isDisabled: (name.length < minLength) });
  };

  render() {
    const {
      name,
      isDisabled,
      awaiting,
      responseOfSearch,
      search,
      returnedAPI,
    } = this.state;
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
    const resultAlbum = 'Resultado de álbuns de: ';
    return (
      <div data-testid="page-search">
        <Header />
        { awaiting ? <Loading /> : myForms }
        <h2>
          { resultAlbum }
          { search }
        </h2>
        {responseOfSearch.map((album) => (
          <div
            key={ album.collectionId }
          >
            <img src={ album.artworkUrl100 } alt={ album.collectionName } />
            <h3>{ album.collectionName }</h3>
            <p>{ album.artistName }</p>
            <Link
              to={ `/album/${album.collectionId}` }
              data-testid={ `link-to-album-${album.collectionId}` }
            >
              Redirect Álbum
            </Link>
            <br />
          </div>))}
        { returnedAPI && responseOfSearch.length > 0 ? ''
          : <p>Nenhum álbum foi encontrado</p> }
      </div>
    );
  }
}

export default Search;
