import React from 'react';
import PropTypes from 'prop-types';
import addSong from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
    };
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>
            audio
          </code>
          .
        </audio>
        <label
          htmlFor="favorite"
          data-testid={ `checkbox-music-${trackId}` }
        >
          Favorita
        </label>
        <input
          type="checkbox"
          name="favorite"
          id="favorite"
        />
      </>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,

};

export default MusicCard;
