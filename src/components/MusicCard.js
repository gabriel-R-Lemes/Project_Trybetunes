import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      isChecked: false,
    };
  }

  componentDidMount() {
    this.checkFavorite();
  }

  checkFavorite = async () => {
    const { musica } = this.props;
    // isChecked ?
    this.setState({ loading: true });
    const alreadyFav = await getFavoriteSongs();
    this.setState({ loading: false });
    console.log(musica, alreadyFav);
    const isFav = alreadyFav.find((song) => (song.trackId === musica.trackId));
    if (isFav) {
      this.setState({ isChecked: true });
    }
  };

  handleChange = async () => {
    const { musica } = this.props;
    this.setState({ loading: true });
    await addSong(musica);
    await getFavoriteSongs();
    this.setState({ loading: false, isChecked: true });
  };

  render() {
    const { musica } = this.props;
    const { loading, isChecked } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <>
        <p>{ musica.trackName }</p>
        <audio data-testid="audio-component" src={ musica.previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>
            audio
          </code>
          .
        </audio>
        <label htmlFor="favorite">
          Favorita
          <input
            type="checkbox"
            id="favorite"
            data-testid={ `checkbox-music-${musica.trackId}` }
            onChange={ this.handleChange }
            checked={ isChecked }
          />
        </label>
      </>
    );
  }
}

MusicCard.propTypes = {
  musica: PropTypes.PropTypes.shape(),
}.isRequired;

export default MusicCard;
