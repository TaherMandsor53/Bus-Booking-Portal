import { Card, Icon } from 'semantic-ui-react';
import React, { Component } from 'react';
import SearchBusModal from '../busModal/SearchBusModal';
import LoginForm from '../loginForm/LoginForm';
import RegisterUser from '../loginForm/RegisterUser';

export default class SearchBusCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      loginCard: false,
      registerCard: false,
    };
    this.modalOpenFunc = this.modalOpenFunc.bind(this);
    this.modalCloseFunc = this.modalCloseFunc.bind(this);
    this.onLoginCardClick = this.onLoginCardClick.bind(this);
    this.onRegisterCardClick = this.onRegisterCardClick.bind(this);
  }

  modalOpenFunc() {
    this.setState({ modalOpen: true });
  }

  modalCloseFunc() {
    this.setState({ modalOpen: false, loginCard: false, registerCard: false });
  }

  onLoginCardClick() {
    this.setState({ loginCard: true });
  }

  onRegisterCardClick() {
    this.setState({ registerCard: true });
  }

  render() {
    const { searchBusDesc, busLogin, showDiscount } = this.props;
    const { modalOpen, loginCard, registerCard } = this.state;

    return (
      <div>
        <p className="discount-text">
          Registered users can avail special discounts, Why are you waiting Registered now with Bus Portal...
        </p>
        <Card href="#card-example-link-card" onClick={this.modalOpenFunc} className="card-content">
          <Card.Content>
            <Icon name="search" size="huge" />
            <Card.Description>{searchBusDesc}</Card.Description>
          </Card.Content>
        </Card>
        <Card href="#card-example-link-card" onClick={this.onLoginCardClick} className="card-content">
          <Card.Content>
            <Icon name="user outline" size="huge" />
            <Card.Description>{busLogin}</Card.Description>
          </Card.Content>
        </Card>
        <Card href="#card-example-link-card" onClick={this.onRegisterCardClick} className="card-content">
          <Card.Content>
            <Icon name="user" size="huge" />
            <Card.Description>Want to Join!</Card.Description>
          </Card.Content>
        </Card>

        <Card href="#card-example-link-card" className="card-content">
          <Card.Content>
            <Icon name="certificate" size="huge" />
            <Card.Description>*Discount Offers*</Card.Description>
          </Card.Content>
        </Card>

        <SearchBusModal modalOpen={modalOpen} modalClose={this.modalCloseFunc} />
        <LoginForm loginModalOpen={loginCard} modalClose={this.modalCloseFunc} />
        <RegisterUser registerModalOpen={registerCard} onRegisterClose={this.modalCloseFunc} />
      </div>
    );
  }
}
