import React, { Component } from 'react';
import { Button, Confirm, Grid, Segment, Container, GridColumn } from 'semantic-ui-react';
import { Form, Header, Tab, Divider, Icon, Search, Image, Message, Input } from 'semantic-ui-react';
import Layout from '../components/layout';
import doctor from '../ethereum/build/Doctor';
import web3 from '../ethereum/web3';
import validator from 'validator';
import MedicalRecordForm from './MedicalRecordForm';
import ShowMedicalRecord from './ShowMedicalRecord';

import { Link } from '../routes';


export default class DoctorPage extends Component {
  constructor(props) {
    super(props);
    this.state = { searchPatientAadhar: '', searchPatientAadharError: false ,aadhar: '', aadharError: false, name: '', nameError: false, details: '', detailsError: false, errorMessage: '', newDoctorLoading: false, newDoctorErrorMessage: '', searchLoading: false, searchErrorMessage: '', isSearchPatientActive: true, isModalOpen: true, modalContent: '', modalHeader: '', modalIconColor: 'red', modalIconName: 'clock' };
  }

  searchPatient = async () => {
    let errorFlag= false;

    if( (!validator.isNumeric(this.state.searchPatientAadhar)) ||  (validator.isEmpty(this.state.searchPatientAadhar)) || (this.state.searchPatientAadhar.length != 12)) {
      this.setState( { searchPatientAadharError: 'Enter Correct Aadhar Number' } );
      errorFlag=true;
    }else {
        this.setState( { searchPatientAadharError:  false } )
    }

    if(!errorFlag) {

    }

  }

  addNewDoctor = async event => {

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
      </div>:
      <ShowMedicalRecord></ShowMedicalRecord>
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
