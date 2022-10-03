import React from 'react';
// import PropTypes from 'prop-types';
import Header from '../components/Header';

class Album extends React.Component {
  render() {
    return (
      <div data-testid="page-album">
        <Header />
        <p>Album!!!</p>
      </div>
    );
  }
}

// Login.propTypes = {

// };

export default Album;
