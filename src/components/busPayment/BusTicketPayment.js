import React, { Component } from 'react';
import { Modal, Form, Button, Icon, Segment, Grid, ModalHeader } from 'semantic-ui-react';

export default class BusTicketPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentModalClose: true,
      userName: '',
      email: '',
      mobileNo: '',
      cardNo: '',
      cvvNo: '',
      userNameErrorLabel: '',
      emailErrorLabel: '',
      mobileNoErrorLabel: '',
      cardNoErrorLabel: '',
      cvvNoErrorLabel: '',
      userNameErrorCheck: false,
      emailErrorCheck: false,
      mobileNoErrorCheck: false,
      cardNoErrorCheck: false,
      cvvNoErrorCheck: false,
      paymentModalSuccess: false,
    };
    this.reset = this.reset.bind(this);
    this.onUserNameChange = this.onUserNameChange.bind(this);
    this.onUserEmailChange = this.onUserEmailChange.bind(this);
    this.onMobileNumberChange = this.onMobileNumberChange.bind(this);
    this.onCardNumberChange = this.onCardNumberChange.bind(this);
    this.onCvvNumberChange = this.onCvvNumberChange.bind(this);

    this.validateUserName = this.validateUserName.bind(this);
    this.validateUserEmail = this.validateUserEmail.bind(this);
    this.validateMobileNo = this.validateMobileNo.bind(this);
    this.validateCardNo = this.validateCardNo.bind(this);
    this.validateCvvNo = this.validateCvvNo.bind(this);

    this.onPaymentClick = this.onPaymentClick.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);

    this.paymentSuccessModalClose = this.paymentSuccessModalClose.bind(this);
  }

  //setting User name
  onUserNameChange(event) {
    this.setState({ userName: event.target.value });
  }

  //Setting User email
  onUserEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  //Setting User mobile no
  onMobileNumberChange(event) {
    this.setState({ mobileNo: event.target.value });
  }

  //SEtting Card no
  onCardNumberChange(event) {
    this.setState({ cardNo: event.target.value });
  }

  //Setting CVV no
  onCvvNumberChange(event) {
    this.setState({ cvvNo: event.target.value });
  }

  //Validating User Name
  validateUserName() {
    const { userName } = this.state;
    if (userName.length === 0) {
      this.setState({ userNameErrorCheck: true, userNameErrorLabel: 'Please enter userName' });
    } else {
      this.setState({ userNameErrorCheck: false, userNameErrorLabel: '' });
    }
  }

  //Validating User email
  validateUserEmail() {
    const { email } = this.state;
    if (email.includes('.') && email.includes('@')) {
      this.setState({ emailErrorCheck: false, emailErrorLabel: '' });
    } else {
      this.setState({ emailErrorCheck: true, emailErrorLabel: 'Email address must contain at least "." & "@" ' });
    }
  }

  //Validating User mobile no
  validateMobileNo() {
    const { mobileNo } = this.state;
    if (mobileNo.length === 10) {
      this.setState({ mobileNoErrorCheck: false, mobileNoErrorLabel: '' });
    } else {
      this.setState({ mobileNoErrorCheck: true, mobileNoErrorLabel: 'MobileNo should be 10 digits only' });
    }
  }

  //Validating Card No
  validateCardNo() {
    const { cardNo } = this.state;
    if (cardNo.length === 0) {
      this.setState({ cardNoErrorCheck: true, cardNoErrorLabel: 'Please enter valid details of Debit/Credit card' });
    } else {
      this.setState({ cardNoErrorCheck: false, cardNoErrorLabel: '' });
    }
  }

  //Validating CVV no
  validateCvvNo() {
    const { cvvNo } = this.state;
    if (cvvNo.length === 0) {
      this.setState({ cvvNoErrorCheck: true, cvvNoErrorLabel: 'Please enter valid CVV no' });
    } else {
      this.setState({ cvvNoErrorCheck: false, cvvNoErrorLabel: '' });
    }
  }

  /* Payment Click */
  onPaymentClick() {
    this.validateUserName();
    this.validateUserEmail();
    this.validateMobileNo();
    this.validateCardNo();
    this.validateCvvNo();
    const { userName, email, mobileNo, cardNo, cvvNo } = this.state;
    if (
      userName.length !== 0 &&
      (email.includes('.') && email.includes('@')) &&
      mobileNo.length === 10 &&
      cardNo.length !== 0 &&
      cvvNo.length !== 0
    ) {
      this.setState({ paymentModalSuccess: true });
    }
  }

  /*Payment modal close */
  paymentSuccessModalClose() {
    this.setState({ paymentModalSuccess: false, userName: '', email: '', mobileNo: '', cardNo: '', cvvNo: '' });
  }

  reset() {
    const { paymentModalClose } = this.props;
    paymentModalClose();
  }

  //on Cancel click
  onCancelClick() {
    this.setState({
      userNameErrorLabel: '',
      emailErrorLabel: '',
      mobileNoErrorLabel: '',
      cardNoErrorLabel: '',
      cvvNoErrorLabel: '',
      userNameErrorCheck: false,
      emailErrorCheck: false,
      mobileNoErrorCheck: false,
      cardNoErrorCheck: false,
      cvvNoErrorCheck: false,
      userName: '',
      email: '',
      mobileNo: '',
      cardNo: '',
      cvvNo: '',
    });
  }

  render() {
    const { paymentModalOpen, sourcePoint, destinationPoint, pickupPoint, dropupPoint, totalAmount } = this.props;
    const {
      userNameErrorCheck,
      userNameErrorLabel,
      emailErrorCheck,
      emailErrorLabel,
      mobileNoErrorCheck,
      mobileNoErrorLabel,
      cardNoErrorCheck,
      cardNoErrorLabel,
      cvvNoErrorCheck,
      cvvNoErrorLabel,
      userName,
      email,
      mobileNo,
      cardNo,
      cvvNo,
      paymentModalSuccess,
    } = this.state;
    return (
      <div>
        <Modal open={paymentModalOpen} onClose={this.reset} closeIcon>
          <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 450 }}>
              <ModalHeader className="login-header">
                <Icon name="bus" size="big" className="login-icon" />
                Payment Details
              </ModalHeader>
              <Form size="large" className="login-form">
                <Segment stacked className="login-box">
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="Name"
                    className="login-input"
                    onChange={this.onUserNameChange}
                    error={userNameErrorCheck}
                    label={<b style={{ color: 'red' }}>{userNameErrorLabel}</b>}
                    value={userName}
                  />
                  <Form.Input
                    fluid
                    icon="envelope outline"
                    iconPosition="left"
                    placeholder="Email Address"
                    className="login-input"
                    onChange={this.onUserEmailChange}
                    error={emailErrorCheck}
                    label={<b style={{ color: 'red' }}>{emailErrorLabel}</b>}
                    value={email}
                  />
                  <Form.Input
                    fluid
                    icon="mobile alternate"
                    iconPosition="left"
                    placeholder="Mobile no"
                    className="login-input"
                    onChange={this.onMobileNumberChange}
                    type="number"
                    label={<b style={{ color: 'red' }}>{mobileNoErrorLabel}</b>}
                    error={mobileNoErrorCheck}
                    value={mobileNo}
                  />

                  <Form.Input
                    fluid
                    icon="credit card outline"
                    iconPosition="left"
                    placeholder="Card No"
                    onChange={this.onCardNumberChange}
                    label={<b style={{ color: 'red' }}>{cardNoErrorLabel}</b>}
                    error={cardNoErrorCheck}
                    value={cardNo}
                    className="login-input"
                  />

                  <Form.Input
                    fluid
                    icon="closed captioning outline"
                    iconPosition="left"
                    placeholder="CVV"
                    type="password"
                    onChange={this.onCvvNumberChange}
                    label={<b style={{ color: 'red' }}>{cvvNoErrorLabel}</b>}
                    error={cvvNoErrorCheck}
                    value={cvvNo}
                    className="login-input"
                  />

                  <Button color="teal" size="large" className="login-button" onClick={this.onPaymentClick}>
                    Make Payment
                  </Button>
                  <Button color="teal" size="large" className="login-button" onClick={this.onCancelClick}>
                    Cancel
                  </Button>
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>

          <Modal open={paymentModalSuccess} size="small">
            <Modal.Header style={{ color: '#4183c4', fontWeight: 'bold' }}>Payment Details</Modal.Header>
            <Modal.Content className="register-modal-content ">
              <div style={{ color: 'green', fontWeight: '200%', fontSize: '16px' }}>
                Your bus ticket booking got confirmed...
              </div>
              <Grid celled className="ticket-table">
                <Grid.Row>
                  <Grid.Column className="column-width">
                    <b>Source Point</b>
                  </Grid.Column>
                  <Grid.Column className="column-width">
                    <b>Destination Point</b>
                  </Grid.Column>
                  <Grid.Column className="column-width">
                    <b>PickUp Point</b>
                  </Grid.Column>
                  <Grid.Column className="column-width">
                    <b>Drop Point</b>
                  </Grid.Column>
                  <Grid.Column className="column-width">
                    <b>Total Payable Amount</b>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column className="column-width">{sourcePoint}</Grid.Column>
                  <Grid.Column className="column-width">{destinationPoint}</Grid.Column>
                  <Grid.Column className="column-width">{pickupPoint}</Grid.Column>
                  <Grid.Column className="column-width">{dropupPoint}</Grid.Column>
                  <Grid.Column className="column-width">{totalAmount}</Grid.Column>
                </Grid.Row>
              </Grid>
              <Button className="registered-modal" onClick={this.paymentSuccessModalClose}>
                OK
              </Button>
            </Modal.Content>
          </Modal>
        </Modal>
      </div>
    );
  }
}
