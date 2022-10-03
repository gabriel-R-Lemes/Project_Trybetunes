import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      logged: false,
      isDisabled: true,
      clicou: false,
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.shoudEnable());
  };

  handleClick = async (event) => {
    const input = event.target.previousElementSibling;
    this.setState({ clicou: true });
    await createUser({ name: input.value });
    this.setState({ clicou: false, logged: true });
  };

  shoudEnable = () => {
    const { name } = this.state;
    const minLength = 3;
    this.setState({ isDisabled: (name.length < minLength) });
  };

  render() {
    const { name, isDisabled, logged, clicou } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <input
            data-testid="login-name-input"
            type="text"
            name="name"
            id="name"
            defaultValue={ name }
            onChange={ this.onInputChange }
          />
          <button
            data-testid="login-submit-button"
            type="button"
            disabled={ isDisabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
        {clicou ? <Loading /> : ''}
        {logged ? <Redirect to="/search" /> : ''}
      </div>
    );
  }
}

Login.propTypes = {
  createUser: PropTypes.func,
  isLoginButtomDisabled: PropTypes.bool,
}.isRequired;

export default Login;
