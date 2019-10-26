import React, { Component } from 'react';
import { Button, Form, Grid, Segment, Modal, ModalHeader, Icon } from 'semantic-ui-react';

export default class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      email: '',
      mobileNo: '',
      pass: '',
      confirmPass: '',
      userNameErrorLabel: '',
      emailErrorLabel: '',
      mobileNoErrorLabel: '',
      passErrorLabel: '',
      userNameErrorCheck: false,
      emailErrorCheck: false,
      mobileNoErrorCheck: false,
      passErrorCheck: false,
      showDataGrid: false,
      userDataObject: {},
      registeredModalOpen: false,
    };

    this.Reset = this.Reset.bind(this);
    this.onUserNameChange = this.onUserNameChange.bind(this);
    this.onUserEmailChange = this.onUserEmailChange.bind(this);
    this.onMobileNumberChange = this.onMobileNumberChange.bind(this);
    this.onPassChange = this.onPassChange.bind(this);
    this.onConfirmPassChange = this.onConfirmPassChange.bind(this);
    this.validateUserDetails = this.validateUserDetails.bind(this);

    this.validateUserName = this.validateUserName.bind(this);
    this.validateUserEmail = this.validateUserEmail.bind(this);
    this.validateMobileNo = this.validateMobileNo.bind(this);
    this.validatePass = this.validatePass.bind(this);

    this.onCancelClick = this.onCancelClick.bind(this);
    this.registeredModalClose = this.registeredModalClose.bind(this);
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

  //Setting Users password
  onPassChange(event) {
    this.setState({ pass: event.target.value });
  }

  //Setting Confirm Password
  onConfirmPassChange(event) {
    this.setState({ confirmPass: event.target.value });
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

  //Validating User Password
  validatePass() {
    const { pass, confirmPass } = this.state;
    if (pass.length === 0 && confirmPass.length === 0) {
      this.setState({ passErrorCheck: true, passErrorLabel: 'Please enter password & confirm password' });
    } else {
      if (pass === confirmPass) {
        this.setState({ passErrorCheck: false, passErrorLabel: '' });
      } else {
        this.setState({ passErrorCheck: true, passErrorLabel: 'Password & Confirm password must be same' });
      }
    }
  }

  //Validating User Details
  validateUserDetails() {
    this.validateUserName();
    this.validateUserEmail();
    this.validateMobileNo();
    this.validatePass();
    const { userName, email, mobileNo, pass } = this.state;
    this.setState({
      userDataObject: {
        userName: this.state.userName,
        email: this.state.email,
        mobileNo: this.state.mobileNo,
        pass: this.state.pass,
      },
    });
    if (
      userName.length !== 0 &&
      (email.includes('.') && email.includes('@')) &&
      mobileNo.length === 10 &&
      pass.length !== 0
    ) {
      this.setState({ registeredModalOpen: true });
    }
  }

  //on Close click
  Reset() {
    const { onRegisterClose } = this.props;

    this.setState({
      userNameErrorLabel: '',
      emailErrorLabel: '',
      mobileNoErrorLabel: '',
      passErrorLabel: '',
      userNameErrorCheck: false,
      emailErrorCheck: false,
      mobileNoErrorCheck: false,
      passErrorCheck: false,
      showDataGrid: false,
      userName: '',
      email: '',
      mobileNo: '',
      pass: '',
      confirmPass: '',
    });
    onRegisterClose();
  }

  //on Cancel click
  onCancelClick() {
    this.setState({
      userNameErrorLabel: '',
      emailErrorLabel: '',
      mobileNoErrorLabel: '',
      passErrorLabel: '',
      userNameErrorCheck: false,
      emailErrorCheck: false,
      mobileNoErrorCheck: false,
      passErrorCheck: false,
      userName: '',
      email: '',
      mobileNo: '',
      pass: '',
      confirmPass: '',
      showDataGrid: false,
    });
  }

  //success modal Close
  registeredModalClose() {
    this.setState({
      showDataGrid: true,
      registeredModalOpen: false,
      userName: '',
      email: '',
      mobileNo: '',
      pass: '',
      confirmPass: '',
    });
  }

  render() {
    const { registerModalOpen } = this.props;

    const {
      userNameErrorCheck,
      userNameErrorLabel,
      emailErrorCheck,
      emailErrorLabel,
      mobileNoErrorCheck,
      mobileNoErrorLabel,
      passErrorCheck,
      passErrorLabel,
      userName,
      email,
      mobileNo,
      pass,
      confirmPass,
      userDataObject,
      showDataGrid,
      registeredModalOpen,
    } = this.state;
    return (
      <div>
        <Modal open={registerModalOpen} closeIcon onClose={this.Reset}>
          <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 450 }}>
              <ModalHeader className="login-header">
                <Icon name="bus" size="big" className="login-icon" />
                Bus Portal Registration
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
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    className="login-input"
                    onChange={this.onPassChange}
                    label={<b style={{ color: 'red' }}>{passErrorLabel}</b>}
                    error={passErrorCheck}
                    value={pass}
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Confirm Password"
                    type="password"
                    className="login-input"
                    onChange={this.onConfirmPassChange}
                    error={passErrorCheck}
                    value={confirmPass}
                  />

                  <Button color="teal" size="large" className="login-button" onClick={this.validateUserDetails}>
                    Register
                  </Button>
                  <Button color="teal" size="large" className="login-button" onClick={this.onCancelClick}>
                    Cancel
                  </Button>
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>

          <Modal open={registeredModalOpen} size="small">
            <Modal.Header>User Registration Successful</Modal.Header>
            <Modal.Content className="register-modal-content ">
              <p>You may now log-in with the email you have chosen.</p>
              <Button className="registered-modal" onClick={this.registeredModalClose}>
                OK
              </Button>
            </Modal.Content>
          </Modal>

          {showDataGrid && (
            <Grid celled className="register-table">
              <Grid.Row>
                <Grid.Column width={3}>
                  <b>User Name</b>
                </Grid.Column>
                <Grid.Column width={3}>
                  <b>User Email Address</b>
                </Grid.Column>
                <Grid.Column width={3}>
                  <b>User Mobile No</b>
                </Grid.Column>
                <Grid.Column width={3}>
                  <b>User Password</b>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={3}>{userDataObject.userName}</Grid.Column>
                <Grid.Column width={3}>{userDataObject.email}</Grid.Column>
                <Grid.Column width={3}>{userDataObject.mobileNo}</Grid.Column>
                <Grid.Column width={3}>{userDataObject.pass}</Grid.Column>
              </Grid.Row>
            </Grid>
          )}
        </Modal>
      </div>
    );
  }
}
