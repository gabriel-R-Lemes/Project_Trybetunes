import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      isChecked: false,
    };
  }

  handleChange = async () => {
    const { trackName, previewUrl, trackId } = this.props;
    const track = {
      trackName,
      previewUrl,
      trackId,
    };
    this.setState({ loading: true });
    await addSong(track);
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
            onClick={ this.handleChange }
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
