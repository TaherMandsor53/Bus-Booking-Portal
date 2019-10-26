import React, { Component } from 'react';
import HomePage from './HomePage';
import store from './store';
import { Provider } from 'react-redux';
import LoginForm from './components/loginForm/LoginForm';
import SearchBusModal from './components/busModal/SearchBusModal';

export default class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <LoginForm />
          <HomePage />
          <SearchBusModal />
        </Provider>
      </div>
    );
  }
}
