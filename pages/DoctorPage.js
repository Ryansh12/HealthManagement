import React, { Component } from 'react';
import { Button, Grid, Segment } from 'semantic-ui-react';
import { Form, Header, Tab,  Icon,  Message,  Modal } from 'semantic-ui-react';
import Layout from '../components/layout';
import doctor from '../ethereum/build/Doctor';
import medRec from '../ethereum/build/MedicalRecord';
import addMap from '../ethereum/build/AddressMapping';
import web3 from '../ethereum/web3';
import validator from 'validator';
import MedicalRecordForm from './MedicalRecordForm';
import ShowMedicalRecord from './ShowMedicalRecord';


import { Link } from '../routes';


export default class DoctorPage extends Component {
  constructor(props) {
    super(props);
    this.state = { patientData: null, searchPatientAadhar: '', searchPatientAadharError: false ,aadhar: '', aadharError: false, name: '', nameError: false, details: '', detailsError: false, errorMessage: '', newDoctorLoading: false, newDoctorErrorMessage: '', searchLoading: false, searchErrorMessage: '', isSearchPatientActive: true, isModalOpen: false, modalContent: '', modalHeader: '', modalIconColor: 'red', modalIconName: 'clock' };
  }

  modalTopple = () => {
    alert('changes done');
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  searchTopple = () => {
    this.setState({ isSearchPatientActive: !this.state.isSearchPatientActive });
  }

  searchPatient = async (event) => {
    event.preventDefault();
    let errorFlag= false;

    if( (!validator.isNumeric(this.state.searchPatientAadhar)) ||  (validator.isEmpty(this.state.searchPatientAadhar)) || (this.state.searchPatientAadhar.length != 12)) {
      this.setState( { searchPatientAadharError: 'Enter Correct Aadhar Number' } );
      errorFlag=true;
    }else {
        this.setState( { searchPatientAadharError:  false } )
    }

    let dd = true;
    if(dd) {
      this.setState({ searchLoading: true, searchErrorMessage: 'sanket' });
      let accounts = await web3.eth.getAccounts();
      let output, medRecAdd;

      try {
          const address = new web3.eth.Contract(addMap.abi, '0xA0Ca43D1AF9d4B5471a19E922690118ACf9588c5');
          medRecAdd = await address.methods.getRecordAddress(this.state.searchPatientAadhar).call();
          console.log('1');
      } catch (err) {
          this.setState({ searchErrorMessage: err.message });
      }
      console.log(medRecAdd);
      if(medRecAdd == 0x0000000000000000000000000000000000000000) {
          this.setState( { modalHeader: 'Error', modalContent: 'No Record Exists', modalIconColor: 'red', modalIconName: 'cancel', isModalOpen: true } )
          return;
      }
      else {
        console.log('2');
        try {
          const address1 = new web3.eth.Contract(medRec.abi, medRecAdd);
          output = await address1.methods.getPatientData().call( { from: accounts[0] } );
          console.log('1');
        } catch (err) {
            this.setState({ searchErrorMessage: err.message });
        }
      }

      if( output[0] == false ) {
        this.setState( { modalHeader: 'Error', modalContent: 'You Are Not Authorized', modalIconColor: 'red', modalIconName: 'cancel', isModalOpen: true } )
        return;
      }
      else {
        this.setState( { patientData: output, isSearchPatientActive: false} );
        console.log(output);
      }
    }

  }

  addNewDoctor = async (event) => {

    try {
      const address = new web3.eth.Contract(doctor.abi, '0xE34AFD25c1D10e6b4eb532aC0C2E7Bb4BB78B03b');
      console.log(accounts[0]);
      isDoctor = await address.methods.isDoctor(accounts[0]).call();
  } catch (err) {
      this.setState({ updateNonDemographicData: err.message });
  }

    let errorFlag= false;

    if( (!validator.isNumeric(this.state.aadhar)) ||  (validator.isEmpty(this.state.aadhar)) || (this.state.aadhar.length != 12)) {
      this.setState( { aadharError: 'Enter Correct Aadhar Number' } );
      errorFlag=true;
    }else {
        this.setState( { aadharError:  false } )
    }

    if( (!validator.isAlpha(this.state.name)) || (validator.isEmpty(this.state.name)) ) {
      this.setState( { nameError: 'Incorrect Name' } );
      errorFlag=true;
    }else {
        this.setState( { nameError:  false } )
    }

    if( (validator.isEmpty(this.state.details)) || (!this.state.details.length > 10) ) {
      this.setState( { detailsError: 'Enter Details' } );
      errorFlag=true;
    }else {
        this.setState( { detailsError:  false } )
    }

    let ff = true;
      if(ff) {
      this.setState({ newDoctorLoading: true, newDoctorErrorMessage: '' });

      try {
        const accounts = await web3.eth.getAccounts();
        const address = new web3.eth.Contract(doctor.abi, '0xE34AFD25c1D10e6b4eb532aC0C2E7Bb4BB78B03b');
        await address.methods
          .addDoctor(this.state.aadhar, this.state.name, this.state.details)
          .send({
            from: accounts[0],
            gas: 999999
        });
      } catch (err) {
        this.setState({ newDoctorErrorMessage: err.message });
      }
    }

    this.setState({ newDoctorLoading: false });
  }

  getPanesData = () => {
    const panes = [
      { menuItem: 'New Doctor', render: () => 
      <Tab.Pane inverted>
        <Header as='h4' color='grey'>
          Add Doctor
        </Header>
        <Form inverted error={!!this.state.errorMessage} onSubmit={ this.addNewDoctor }>
          <Form.Field>
              <label style={ { color: '#808080' } }>Aadhar</label>
              <Form.Input
                  fluid
                  value={this.state.aadhar}
                  onChange={event =>
                  this.setState({ aadhar: event.target.value })}
                  placeholder='Aadhar'
                  error={this.state.aadharError}
              />
          </Form.Field>
          <Form.Field>
            <label style={ { color: '#808080' } }>Name</label>
            <Form.Input
                fluid
                value={this.state.name}
                onChange={event =>
                this.setState({ name: event.target.value })}
                placeholder='Name'
                error={this.state.nameError}
            />
          </Form.Field>

          <label style={ { color: '#808080' } }>Details</label>
          <Form.TextArea error={ this.state.detailsError } value={this.state.details} onChange={event => this.setState({ details: event.target.value })} placeholder='Tell us more about you...' />

          <Message hidden={!this.state.newDoctorErrorMessage.length != 0} header="Oops!" content={this.state.newDoctorErrorMessage} />
          <Button type='submit' loading={this.state.newDoctorLoading} primary>
            Create
          </Button>
        </Form>
      </Tab.Pane>
      },
      { menuItem: 'Search Patient', render: () =>
      <Tab.Pane inverted>
      {this.state.isSearchPatientActive ?
      <div>
        <Header style={ { color: 'white' } } textAlign='center' icon>
          <Icon color='white' name='search' />
          Search Patient
        </Header>
        <Form inverted error={!!this.state.errorMessage} onSubmit={ this.searchPatient }>
          <Form.Field>
            <label style={ { color: '#808080' } }>Aadhar</label>
            <Form.Input
                fluid
                value={this.state.searchPatientAadhar}
                onChange={event =>
                this.setState({ searchPatientAadhar: event.target.value })}
                placeholder='Aadhar'
                error={this.state.searchPatientAadharError}
            />
          </Form.Field>
          <Button type='submit' loading={this.state.searchLoading} primary>
          Search
          </Button>
        </Form>
        <Button color='blue'>
      <Icon name='facebook' /> Facebook
    </Button>
      </div>:
      <div>
        <ShowMedicalRecord data={ this.state.patientData }></ShowMedicalRecord>
        <Grid stackable style={ { marginLeft: '2px' } }>
          <Grid.Row>
              <Grid.Column>
                <Button onClick={this.searchTopple} style={ { marginTop: '4px' } } color='blue'><Icon name='arrow left' /> Back</Button>
              </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      }
      </Tab.Pane>
      },
      { menuItem: 'New Patient', render: () => 
      <Tab.Pane inverted>
      <MedicalRecordForm></MedicalRecordForm>
      </Tab.Pane>
      }
    ]
    return panes;
  }

  render() {
    return (
        <Layout>
          <Modal open={this.state.isModalOpen} inverted>
              <Header><Icon color={ this.state.modalIconColor } name={ this.state.modalIconName } size='big'/>{ this.state.modalHeader }</Header>
              <Modal.Content>{ this.state.modalContent }</Modal.Content>
              <Modal.Actions>
                  <Button color='blue' onClick={this.modalTopple} inverted>
                  <Icon name='checkmark' /> Ok
                  </Button>
              </Modal.Actions>
          </Modal>
          <Segment inverted style={ { height: '100vh' } }>
            <Tab
              defaultActiveIndex= '1'
              menu={{ color: 'red', inverted: true}}
              panes={ this.getPanesData() }
            />
          </Segment>
        </Layout>
    )
  }
}
