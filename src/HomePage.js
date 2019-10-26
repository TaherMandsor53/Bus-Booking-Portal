import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import SearchBusCard from './components/searchBusCard/SearchBusCard';
import { Label, Icon } from 'semantic-ui-react';
import LoginForm from './components/loginForm/LoginForm';
import store from './store';
import { Provider } from 'react-redux';
import SearchBusModal from './components/busModal/SearchBusModal';
import { requestUserDetails } from '../src/action/action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: false,
      showUserName: false,
      loggedInUserName: '',
    };
    this.showLoginModal = this.showLoginModal.bind(this);
    this.closeLoginModal = this.closeLoginModal.bind(this);
  }

  componentDidMount() {
    const { requestUserDetails } = this.props;
    requestUserDetails();
  }

  showLoginModal() {
    this.setState({ showLogin: true, showUserName: false });
  }
  closeLoginModal() {
    const { userDetailsData } = this.props;
    const userName = userDetailsData[0].name;
    this.setState({ showLogin: false, showUserName: true, loggedInUserName: userName });
  }
  render() {
    const searchBusDesc = 'Search Buses';
    const { showLogin, loggedInUserName, showUserName } = this.state;
    const { userDetailsData } = this.props;

    console.log('User Values on HomePage:', userDetailsData);
    return (
      <div className="App">
        <Provider store={store}>
          <LoginForm />
          <SearchBusModal />
        </Provider>
        <div className="homepage-panel">
          <Label className="homepage-icon-label">
            <Icon name="bus" size="huge" className="homepage-icon" />
          </Label>
          <Label className="homepage-label">Bus Booking Portal</Label>

          <Label onClick={this.showLoginModal} className="homepage-user-icon-label">
            <Icon name="user outline" size="huge" className="homepage-user-icon" />
          </Label>
          <Label className="homepage-user-label">Ram Pandit </Label>
          {/* {showUserName ? (
            <Label className="homepage-user-label">{loggedInUserName} </Label>
          ) : (
            <Label onClick={this.showLoginModal} className="homepage-user-label">
              Login
            </Label>
          )} */}
        </div>

        <Carousel autoPlay={true} interval={5000}>
          <img src={require('./assests/SRSBusImage.jpg')} alt="Not available" />
          <img src={require('./assests/RajRatanTravels.png')} alt="Not available" />
          <img src={require('./assests/BusBedImages.jpg')} alt="Not available" />
          <img src={require('./assests/BusInsideImages.jpg')} alt="Not available" />
          <img src={require('./assests/AppleTravelsBusImage.jpg')} alt="Not available" />
        </Carousel>

        <SearchBusCard searchBusDesc={searchBusDesc} busLogin="Login" showDiscount={showUserName} />
        <LoginForm loginModalOpen={showLogin} modalClose={this.closeLoginModal} />
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
)(HomePage);
