import React, { Component } from 'react';
import { Button, Form, Grid, Message, Segment, Modal, ModalHeader, Icon, Label } from 'semantic-ui-react';
import RegisterUser from './RegisterUser';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestUserDetails } from '../../action/action';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registerModalOpen: false,
      emailValue: '',
      passValue: '',
      loggedIn: false,
      errorCheck: false,
      label: '',
    };

    this.Reset = this.Reset.bind(this);
    this.openRegister = this.openRegister.bind(this);
    this.onRegisterClose = this.onRegisterClose.bind(this);
    this.emailHandleChange = this.emailHandleChange.bind(this);
    this.passHandleChange = this.passHandleChange.bind(this);
    this.validateUser = this.validateUser.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
  }

  componentDidMount() {
    const { requestUserDetails } = this.props;
    requestUserDetails();
  }

  // componentWillReceiveProps(nextProps){
  //   if(nextProps.userDetailsData !== this.props.userDetailsData){

  //   }
  // }

  emailHandleChange(event) {
    this.setState({ emailValue: event.target.value });
  }

  passHandleChange(event) {
    this.setState({ passValue: event.target.value });
  }

  validateUser() {
    const { userDetailsData } = this.props;
    const { passValue, emailValue } = this.state;
    console.log('User Details in Login:', userDetailsData);
    const userEmailId = userDetailsData[0] && userDetailsData[0].emailId;
    const userPass = userDetailsData[0] && userDetailsData[0].password;
    if (emailValue === userEmailId && passValue === userPass && emailValue.length !== 0 && passValue.length !== 0) {
      this.setState({ loggedIn: true });
    } else {
      this.setState({ errorCheck: true, label: 'Please enter valid UserName/Password', loggedIn: false });
    }
    const { modalClose } = this.props;
    modalClose();
  }

  onLoginClick() {
    this.validateUser();
  }

  openRegister() {
    const { modalClose } = this.props;
    modalClose();
    this.setState({ registerModalOpen: true });
  }

  Reset() {
    const { modalClose } = this.props;
    modalClose();
    this.setState({ errorCheck: false, label: '' });
  }

  onRegisterClose() {
    this.setState({ registerModalOpen: false });
  }
  render() {
    const { loginModalOpen, userDetailsData } = this.props;
    console.log('user details', userDetailsData[0] && userDetailsData[0].emailId);
    const { registerModalOpen, errorCheck } = this.state;

    return (
      <div>
        <Modal open={loginModalOpen} closeIcon onClose={this.Reset}>
          <Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
            <Grid.Column style={{ maxWidth: 450 }}>
              <ModalHeader className="login-header">
                <Icon name="bus" size="big" className="login-icon" />
                Log-in to Bus Portal
              </ModalHeader>
              <Form size="large" className="login-form">
                <Segment stacked className="login-box">
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="E-mail address"
                    className="login-input"
                    onChange={this.emailHandleChange}
                    error={errorCheck}
                    label={this.state.label}
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    className="login-input"
                    onChange={this.passHandleChange}
                    error={errorCheck}
                  />

                  <Button color="teal" fluid size="large" className="login-button" onClick={this.onLoginClick}>
                    Login
                  </Button>
                </Segment>
              </Form>
              <Message className="login-message">
                New to us?{' '}
                <Label className="login-signup-label" onClick={this.openRegister}>
                  Sign Up
                </Label>
              </Message>
            </Grid.Column>
          </Grid>
        </Modal>
        <RegisterUser registerModalOpen={registerModalOpen} onRegisterClose={this.onRegisterClose} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userDetailsData: state.userDetails.userDetailsData,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestUserDetails,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm);
