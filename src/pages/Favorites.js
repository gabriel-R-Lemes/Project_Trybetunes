import React from 'react';
// import PropTypes from 'prop-types';
import Header from '../components/Header';

class Favorites extends React.Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
        <p>Area Favoritos</p>
      </div>
    );
  }
}

// Login.propTypes = {

// };

export default Favorites;
