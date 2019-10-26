import { Modal, ModalContent, Dropdown, Button, Icon, ButtonContent, Grid, Label } from 'semantic-ui-react';
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { requestBusDetails } from '../../action/action';
import BusTicketPayment from '../busPayment/BusTicketPayment';

class SearchBusModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      pickDropVisible: false,
      sourceSelectedValue: '',
      showBusDetailsGrid: false,
      paymentModalOpen: false,
      destinationSelectedValue: '',
      sourceDestErrorMessage: '',
      sourceDestErrorCheck: false,
      pickUpOptions: {},
      dropUpOptions: {},
      busName: '',
      busType: '',
      totalDuration: '',
      seatAvailable: '',
      departureTime: '',
      arrivalTime: '',
      fare: '',
      pickupPointSelectedValue: '',
      dropupPointSelectedValue: '',
      pickDropErrorMessage: '',
      pickDropErrorCheck: false,
      noBusAvailableMessage: '',
    };
    this.handleDate = this.handleDate.bind(this);
    this.Reset = this.Reset.bind(this);
    this.searchBusModule = this.searchBusModule.bind(this);
    this.handleSourceChange = this.handleSourceChange.bind(this);
    this.handleDestinationChange = this.handleDestinationChange.bind(this);
    this.onBookBusClick = this.onBookBusClick.bind(this);
    this.onPaymentModalClose = this.onPaymentModalClose.bind(this);
    this.validateSourceDest = this.validateSourceDest.bind(this);
    this.pickPointOptions = this.pickPointOptions.bind(this);
    this.dropPointOptions = this.dropPointOptions.bind(this);
    this.handlePickUpPoint = this.handlePickUpPoint.bind(this);
    this.handleDropUpPoint = this.handleDropUpPoint.bind(this);
    this.validatePickDrop = this.validatePickDrop.bind(this);
  }

  componentDidMount() {
    const { requestBusDetails } = this.props;
    requestBusDetails();
  }

  /* Validation of Source & Destination*/
  validateSourceDest() {
    const { sourceSelectedValue, destinationSelectedValue, startDate } = this.state;

    if (sourceSelectedValue.length === 0 || destinationSelectedValue.length === 0 || startDate.length === 0) {
      this.setState({
        sourceDestErrorMessage: 'Please select proper Source, Destination & appropriate Date',
        sourceDestErrorCheck: true,
        noBusAvailableMessage: '',
      });
    } else if (sourceSelectedValue === destinationSelectedValue) {
      this.setState({
        sourceDestErrorMessage: 'Source & Destination must be different',
        sourceDestErrorCheck: true,
        noBusAvailableMessage: '',
      });
    } else {
      this.setState({
        sourceDestErrorMessage: '',
        sourceDestErrorCheck: false,
        pickDropVisible: true,
        showBusDetailsGrid: true,
      });
    }
  }

  /* Validate pick & drop Values*/
  validatePickDrop() {
    const { pickupPointSelectedValue, dropupPointSelectedValue } = this.state;
    if (pickupPointSelectedValue.length !== 0 && dropupPointSelectedValue.length !== 0) {
      this.setState({ pickDropErrorMessage: '', pickDropErrorCheck: false, paymentModalOpen: true });
    } else {
      this.setState({ pickDropErrorMessage: 'Please select Pick & Drop points', pickDropErrorCheck: true });
    }
  }

  /* Date Change function*/
  handleDate(date) {
    this.setState({
      startDate: date,
    });
  }

  /* Source Change function*/
  handleSourceChange(event, data) {
    this.setState({ sourceSelectedValue: data.value });
  }

  /* Destination Change function*/
  handleDestinationChange(event, data) {
    this.setState({ destinationSelectedValue: data.value });
  }

  /*Pick Up point handle change */
  handlePickUpPoint(event, data) {
    this.setState({ pickupPointSelectedValue: data.value });
  }

  /*Drop Up point handle change */
  handleDropUpPoint(event, data) {
    this.setState({ dropupPointSelectedValue: data.value });
  }

  /* Close modal function*/
  Reset() {
    const { modalClose } = this.props;
    modalClose();
    this.setState({
      startDate: '',
      pickDropVisible: false,
      showBusDetailsGrid: false,
      sourceDestErrorCheck: false,
      sourceDestErrorMessage: '',
      sourceSelectedValue: '',
      destinationSelectedValue: '',
      pickupPointSelectedValue: '',
      dropupPointSelectedValue: '',
      pickDropErrorCheck: false,
      pickDropErrorMessage: '',
      noBusAvailableMessage: '',
    });
  }

  /* Search button click() function*/
  searchBusModule() {
    this.validateSourceDest();
    const { sourceSelectedValue, destinationSelectedValue, startDate } = this.state;
    if (sourceSelectedValue.length !== 0 && destinationSelectedValue.length !== 0 && startDate.length !== 0) {
      this.pickPointOptions();
      this.dropPointOptions();
    }
  }

  /* Bus Booking button*/
  onBookBusClick() {
    this.validatePickDrop();
  }

  /* Payment modal close click()*/
  onPaymentModalClose() {
    this.setState({ paymentModalOpen: false });
  }

  /*PickUp Point drop Options */
  pickPointOptions() {
    const { sourceSelectedValue, destinationSelectedValue } = this.state;
    if (sourceSelectedValue === 'Mumbai' && destinationSelectedValue === 'Pune') {
      const pickUpOptions = [
        { key: 'ms1', text: 'CST', value: 'CST' },
        { key: 'ms2', text: 'Dadar', value: 'Dadar' },
        { key: 'ms3', text: 'Thane', value: 'Thane' },
      ];

      this.setState({
        pickUpOptions: pickUpOptions,
        busName: 'Raj Ratan Tours And Travels',
        busType: 'Non-AC',
        totalDuration: '5h 30m',
        departureTime: '11:30',
        arrivalTime: '17:00',
        seatAvailable: '15',
        fare: 'INR 300',
        noBusAvailableMessage: '',
      });
    } else if (sourceSelectedValue === 'Bangalore' && destinationSelectedValue === 'Pune') {
      const pickUpOptions = [
        { key: 'bs1', text: 'Old Airport', value: 'Old Airport' },
        { key: 'bs2', text: 'Rajajinagar', value: 'Rajajinagar' },
        { key: 'bs3', text: 'Anand Rao Circle', value: 'Anand Rao Circle' },
      ];

      this.setState({
        pickUpOptions: pickUpOptions,
        busName: 'Orange Tours and Travels',
        busType: 'AC',
        totalDuration: '14h 30m',
        departureTime: '16:00',
        arrivalTime: '06:30',
        seatAvailable: '8',
        fare: 'INR 3200',
        noBusAvailableMessage: '',
      });
    } else if (sourceSelectedValue === 'Indore' && destinationSelectedValue === 'Surat') {
      const pickUpOptions = [
        { key: 'is1', text: 'Choithram Square', value: 'Choithram Square' },
        { key: 'is2', text: 'Rau', value: 'Rau' },
        { key: 'is3', text: 'Crystal IT Park', value: 'Crystal IT Park' },
      ];

      this.setState({
        pickUpOptions: pickUpOptions,
        busName: 'CityLink Travels',
        busType: 'AC',
        totalDuration: '9h 45m',
        departureTime: '21:01',
        arrivalTime: '06:46',
        seatAvailable: '18',
        fare: 'INR 600',
        noBusAvailableMessage: '',
      });
    } else if (sourceSelectedValue === 'Pune' && destinationSelectedValue === 'Mumbai') {
      const pickUpOptions = [
        { key: 'ps1', text: 'Katraj', value: 'Katraj' },
        { key: 'ps2', text: 'Wakad', value: 'Wakad' },
        { key: 'ps3', text: 'Swargate', value: 'Swargate' },
      ];
      this.setState({
        pickUpOptions: pickUpOptions,
        busName: 'Apple Travels',
        busType: 'Non-AC',
        totalDuration: '5h 00m',
        departureTime: '07:30',
        arrivalTime: '12:30',
        seatAvailable: '15',
        fare: 'INR 350',
        noBusAvailableMessage: '',
      });
    } else if (sourceSelectedValue === 'Pune' && destinationSelectedValue === 'Bangalore') {
      const pickUpOptions = [
        { key: 'ps1', text: 'Katraj', value: 'Katraj' },
        { key: 'ps2', text: 'Wakad', value: 'Wakad' },
        { key: 'ps3', text: 'Swargate', value: 'Swargate' },
      ];
      this.setState({
        pickUpOptions: pickUpOptions,
        busName: 'SRS Travels',
        busType: 'AC',
        totalDuration: '14h 45m',
        departureTime: '16:45',
        arrivalTime: '07:30',
        seatAvailable: '20',
        fare: 'INR 1700',
        noBusAvailableMessage: '',
      });
    } else if (sourceSelectedValue === 'Surat' && destinationSelectedValue === 'Indore') {
      const pickUpOptions = [
        { key: 'ss1', text: 'Kamrej', value: 'Kamrej' },
        { key: 'ss2', text: 'Kim Chowkdi', value: 'Kim Chowkdi' },
        { key: 'ss3', text: 'Kadodara', value: 'Kadodara' },
      ];
      this.setState({
        pickUpOptions: pickUpOptions,
        busName: 'Raj Ratan Tours And Travels',
        busType: 'Non-AC',
        totalDuration: '9h 45m',
        departureTime: '20:45',
        arrivalTime: '06:30',
        seatAvailable: '19',
        fare: 'INR 650',
        noBusAvailableMessage: '',
      });
    } else {
      this.setState({
        pickDropVisible: false,
        showBusDetailsGrid: false,
        noBusAvailableMessage: 'Sorry currently no buses are available for selected source & destination',
      });
    }
  }

  /*DropUp Point drop Options */
  dropPointOptions() {
    const { sourceSelectedValue, destinationSelectedValue } = this.state;
    if (sourceSelectedValue === 'Mumbai' && destinationSelectedValue === 'Pune') {
      const dropUpOptions = [
        { key: 'pd1', text: 'Katraj', value: 'Katraj' },
        { key: 'pd2', text: 'Wakad', value: 'Wakad' },
        { key: 'pd3', text: 'Swargate', value: 'Swargate' },
      ];
      this.setState({ dropUpOptions: dropUpOptions });
    } else if (sourceSelectedValue === 'Bangalore' && destinationSelectedValue === 'Pune') {
      const dropUpOptions = [
        { key: 'pd1', text: 'Viman Nagar', value: 'Viman Nagar' },
        { key: 'pd2', text: 'Yerwada', value: 'Yerwada' },
        { key: 'pd3', text: 'Kharadi', value: 'Kharadi' },
      ];
      this.setState({ dropUpOptions: dropUpOptions });
    } else if (sourceSelectedValue === 'Indore' && destinationSelectedValue === 'Surat') {
      const dropUpOptions = [
        { key: 'sd1', text: 'Kamrej', value: 'Kamrej' },
        { key: 'sd2', text: 'Kim Chowkdi', value: 'Kim Chowkdi' },
        { key: 'sd3', text: 'Kadodara', value: 'Kadodara' },
      ];
      this.setState({ dropUpOptions: dropUpOptions });
    } else if (sourceSelectedValue === 'Pune' && destinationSelectedValue === 'Mumbai') {
      const dropUpOptions = [
        { key: 'md1', text: 'CST', value: 'CST' },
        { key: 'md2', text: 'Dadar', value: 'Dadar' },
        { key: 'md3', text: 'Thane', value: 'Thane' },
      ];
      this.setState({ dropUpOptions: dropUpOptions });
    } else if (sourceSelectedValue === 'Pune' && destinationSelectedValue === 'Bangalore') {
      const dropUpOptions = [
        { key: 'bd1', text: 'Old Airport', value: 'Old Airport' },
        { key: 'bd2', text: 'Rajajinagar', value: 'Rajajinagar' },
        { key: 'bd3', text: 'Anand Rao Circle', value: 'Anand Rao Circle' },
      ];
      this.setState({ dropUpOptions: dropUpOptions });
    } else if (sourceSelectedValue === 'Surat' && destinationSelectedValue === 'Indore') {
      const dropUpOptions = [
        { key: 'id1', text: 'Choithram Square', value: 'Choithram Square' },
        { key: 'id2', text: 'Rau', value: 'Rau' },
        { key: 'id3', text: 'Crystal IT Park', value: 'Crystal IT Park' },
      ];
      this.setState({ dropUpOptions: dropUpOptions });
    }
  }

  render() {
    const { modalOpen, busDetailsData } = this.props;
    const {
      startDate,
      pickDropVisible,
      showBusDetailsGrid,
      paymentModalOpen,
      sourceSelectedValue,
      destinationSelectedValue,
      sourceDestErrorCheck,
      sourceDestErrorMessage,
      pickUpOptions,
      dropUpOptions,
      busName,
      departureTime,
      arrivalTime,
      fare,
      seatAvailable,
      totalDuration,
      busType,
      pickupPointSelectedValue,
      dropupPointSelectedValue,
      pickDropErrorCheck,
      pickDropErrorMessage,
      noBusAvailableMessage,
    } = this.state;
    const busDetails = busDetailsData && busDetailsData.data;

    const sourceOptions =
      busDetails &&
      busDetails.map(item => {
        return {
          key: item.sourceStation.stationId,
          text: item.sourceStation.stationName,
          value: item.sourceStation.stationName,
        };
      });

    const destinationOptions =
      busDetails &&
      busDetails.map(item => {
        return {
          key: item.destinationStation.stationId,
          text: item.destinationStation.stationName,
          value: item.destinationStation.stationName,
        };
      });
    return (
      <div>
        <Modal open={modalOpen} closeIcon onClose={this.Reset}>
          <Modal.Header>Search Buses</Modal.Header>
          <ModalContent>
            {sourceDestErrorMessage.length !== 0 && (
              <div>
                <b>
                  <Label style={{ color: 'red', fontSize: '14px' }}>{sourceDestErrorMessage}</Label>
                </b>
              </div>
            )}
            <Dropdown
              className="source-city"
              search
              placeholder="Select Source City..."
              selection
              onChange={this.handleSourceChange}
              value={sourceSelectedValue}
              options={sourceOptions}
              error={sourceDestErrorCheck}
            />

            <Dropdown
              className="destination-city"
              search
              placeholder="Select Destination City..."
              selection
              options={destinationOptions}
              onChange={this.handleDestinationChange}
              value={destinationSelectedValue}
              error={sourceDestErrorCheck}
            />

            <DatePicker
              dateFormat="dd-MMM-YYYY"
              selected={startDate}
              onChange={this.handleDate}
              placeholderText="Journey Date..."
              value={startDate}
            />

            <Button onClick={this.searchBusModule}>
              <ButtonContent>
                <Icon name="bus" size="large" />
                Search Buses
              </ButtonContent>
            </Button>

            {noBusAvailableMessage.length !== 0 && (
              <div>
                <b>
                  <Label style={{ color: 'red', fontSize: '16px' }}>{noBusAvailableMessage}</Label>
                </b>
              </div>
            )}

            {pickDropErrorMessage.length !== 0 && (
              <div>
                <b>
                  <Label style={{ color: 'red', fontSize: '14px', marginLeft: '190px' }}>{pickDropErrorMessage}</Label>
                </b>
              </div>
            )}
            {pickDropVisible && (
              <Dropdown
                className="boarding-point"
                search
                placeholder="Select Boarding Point..."
                selection
                options={pickUpOptions}
                onChange={this.handlePickUpPoint}
                value={pickupPointSelectedValue}
                error={pickDropErrorCheck}
              />
            )}
            {pickDropVisible && (
              <Dropdown
                className="drop-point"
                search
                placeholder="Select DropOff Point..."
                selection
                options={dropUpOptions}
                onChange={this.handleDropUpPoint}
                value={dropupPointSelectedValue}
                error={pickDropErrorCheck}
              />
            )}
          </ModalContent>
          {showBusDetailsGrid && (
            <Grid celled className="bus-details-grid">
              <Grid.Row>
                <Grid.Column>
                  <b>Bus Name</b>
                </Grid.Column>
                <Grid.Column>
                  <b>Bus Type</b>
                </Grid.Column>
                <Grid.Column>
                  <b>Departure Time</b>
                </Grid.Column>
                <Grid.Column>
                  <b>Total Duration</b>
                </Grid.Column>
                <Grid.Column>
                  <b>Arrival</b>
                </Grid.Column>
                <Grid.Column>
                  <b>Fare</b>
                </Grid.Column>
                <Grid.Column>
                  <b>Seat Available</b>
                </Grid.Column>
                <Grid.Column>
                  <b>Booking</b>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <b>{busName}</b>
                </Grid.Column>
                <Grid.Column>{busType}</Grid.Column>
                <Grid.Column>{departureTime}</Grid.Column>
                <Grid.Column>{totalDuration}</Grid.Column>
                <Grid.Column>{arrivalTime}</Grid.Column>
                <Grid.Column>{fare}</Grid.Column>
                <Grid.Column>
                  <b>{seatAvailable}</b>
                </Grid.Column>
                <Grid.Column>
                  <Button className="bus-details-btn" onClick={this.onBookBusClick}>
                    Book
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          )}
        </Modal>
        <BusTicketPayment
          paymentModalOpen={paymentModalOpen}
          paymentModalClose={this.onPaymentModalClose}
          sourcePoint={sourceSelectedValue}
          destinationPoint={destinationSelectedValue}
          pickupPoint={pickupPointSelectedValue}
          dropupPoint={dropupPointSelectedValue}
          totalAmount={fare}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  busDetailsData: state.busDetails.busDetailsData,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestBusDetails,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBusModal);
