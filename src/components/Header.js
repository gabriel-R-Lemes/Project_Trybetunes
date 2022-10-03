import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      users: '',
    };
  }

  componentDidMount() {
    this.makingGetUser();
  }

  makingGetUser = async () => {
    this.setState({ loading: false });
    const user = await getUser();
    this.setState({ loading: true, users: user });
  };

  render() {
    const { loading, users } = this.state;
    return (
      <div>
        { loading
          ? (
            <header
              data-testid="header-component"
            >
              <h1
                data-testid="header-user-name"
              >
                Olá,
                { users.name }
              </h1>
            </header>
          ) : <Loading />}
        <Link to="/search" data-testid="link-to-search"> Search </Link>
        <Link to="/favorites" data-testid="link-to-favorites"> Favorites </Link>
        <Link to="/profile" data-testid="link-to-profile"> Profile </Link>
      </div>
    );
  }
}

export default Header;
