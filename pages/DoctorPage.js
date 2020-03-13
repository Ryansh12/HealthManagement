import React, { Component } from 'react';
import { Button, Confirm, Grid, Segment, Container } from 'semantic-ui-react';
import { Form, Header, Divider, Icon, Search, Image, Message, Input } from 'semantic-ui-react';
import Layout from '../components/layout';
import doctor from '../ethereum/build/Doctor';
import web3 from '../ethereum/web3';
import { Link } from '../routes';


export default class DoctorPage extends Component {
  constructor(props) {
    super(props);
    this.state = { aadhar: '', name: '', details: '', errorMessage: '', loading: false };
  }

  addNewDoctor = async event => {

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      const address = new web3.eth.Contract(doctor.abi, '0x38c1163217a5aF0Ef8239b8901063C2c727D99aa');
      await address.methods
        .addDoctor(this.state.aadhar, this.state.name, this.state.details)
        .send({
          from: accounts[0],
          gas: 999999
      });

    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <Grid onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} textAlign='left' style={ { height:'100vh', marginTop: '20px' } } verticalAlign='top' columns={1}>
            <Grid.Column>
              <Divider horizontal>
                <Header as='h4' style={ { color: 'white' } }>
                    Add Doctor
                </Header>
              </Divider>
              <Form inverted error={!!this.state.errorMessage} onSubmit={ this.addNewDoctor }>
                <Form.Field>
                    <label>Aadhar</label>
                    <Input
                      placeholder='Aadhar'
                      label="Aadhar"
                      labelPosition="left"
                      value={this.state.aadhar}
                      onChange={event =>
                        this.setState({ aadhar: event.target.value })}
                    />
                </Form.Field>
                <Form.Field>
                  <label>Doctor Name</label>
                  <Input
                    placeholder='Name'
                    label="Name"
                    labelPosition="left"
                    value={this.state.name}
                    onChange={event =>
                      this.setState({ name: event.target.value })}
                  />
                </Form.Field>

                <Form.TextArea label='Details' placeholder='Tell us more about you...' />

                <Message error header="Oops!" content={this.state.errorMessage} />
                <Button loading={this.state.loading} primary>
                  Create!
                </Button>
              </Form>
              <Divider horizontal>
                <Header as='h4' style={ { color: 'white' } }>
                    Search Patient
                </Header>
              </Divider>
              <Header style={ { color: 'white' } } textAlign='center' icon>
                    <Icon color='white' name='search' />
                    Find Country
              </Header>
              <Grid columns={2}>
                <Grid.Column>
                  <Input
                    placeholder='Name'
                    label="Name"
                    labelPosition="left"
                    value={this.state.name}
                    onChange={event =>
                      this.setState({ name: event.target.value })}
                  />
                <Button loading={this.state.loading} primary>
                  Create!
                </Button>
                </Grid.Column>
              </Grid>
              <Divider horizontal>
                  <Header as='h4' style={ { color: 'white' } }>
                    Add New Patient
                  </Header>
              </Divider>
              <Link route={`/MedicalRecordForm/${this.aadhar, this.details}`} prefetch>
                    <Button primary>
                      Create New
                    </Button>
              </Link>
            </Grid.Column>
        </Grid>
    </Layout>
    )
  }
}
