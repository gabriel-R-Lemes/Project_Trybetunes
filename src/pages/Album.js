import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      results: [],
      collection: {},
    };
  }

  getMusicsFromAPI = async () => {
    const { match } = this.props;
    const result = await getMusics(match.params.id);
    const onlyTracks = result.filter((album, index) => {
      if (index > 0) {
        return album;
      } return null;
    });
    this.setState({ collection: result[0] }, this.setState({ results: onlyTracks }));
  };

  render() {
    const { results, collection } = this.state;
    this.getMusicsFromAPI();
    return (
      <div data-testid="page-album">
        <Header />
        <h2
          data-testid="artist-name"
        >
          Artist
          <p>{ collection.artistName }</p>
        </h2>
        <h3
          data-testid="album-name"
        >
          <p>{ collection.collectionName }</p>
          <p>{ collection.artistName }</p>
        </h3>
        { results.map((album) => (
          <div key={ album.trackId }>
            <br />
            <MusicCard
              trackName={ album.trackName }
              previewUrl={ album.previewUrl }
              trackId={ album.trackId }
              key={ album.trackName }
            />
          </div>
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
