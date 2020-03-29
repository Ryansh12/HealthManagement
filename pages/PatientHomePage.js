import React, { Component } from 'react';
import Layout from '../components/layout';
import validator from 'validator';
import ShowMedicalRecord from './ShowMedicalRecord';
import { Segment, Form, Header, Tab, Button, Divider, Icon, Search, Image, Message, Input } from 'semantic-ui-react';

export class PatientHomePage extends Component {
    constructor(props) {
        super(props);
        this.state = { searchPatientAadhar: '', searchPatientAadharError: false, searchPatientPassword: '', searchPatientPasswordError: false ,emergencyAadhar: '', emergencyAadharError: false ,aadhar: '', aadharError: false, docAadhar: '', docAadharError: false, password: '', passwordError: false, searchPatientLoading: false, emergencyLoading: false, addDoctorLoading: false, errorMessage: '', isSearchPatientActive: true };
    }

    addDoctor = async () => {
        let errorFlag= false;

        if( (!validator.isNumeric(this.state.aadhar)) ||  (validator.isEmpty(this.state.aadhar)) || (this.state.aadhar.length != 12)) {
          this.setState( { aadharError: 'Enter Correct Aadhar Number' } );
          errorFlag=true;
        }else {
            this.setState( { aadharError:  false } )
        }

        if( (!validator.isNumeric(this.state.docAadhar)) ||  (validator.isEmpty(this.state.docAadhar)) || (this.state.docAadhar.length != 12)) {
            this.setState( { docAadharError: 'Enter Correct Aadhar Number' } );
            errorFlag=true;
          }else {
              this.setState( { docAadharError:  false } )
          }

        if( (!this.state.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)) ||  (validator.isEmpty(this.state.password))) {
            this.setState( { passwordError: 'Password must contain 1 lowercase, 1 uppercase, 1 numeric, 1 special char and length greater than 7' } );
            errorFlag=true;
        }else {
            this.setState( { passwordError:  false } )
        }
    
        if(!errorFlag) {
    
        }
    }

    getEmergency = async () => {
        let errorFlag= false;

        if( (!validator.isNumeric(this.state.emergencyAadhar)) ||  (validator.isEmpty(this.state.emergencyAadhar)) || (this.state.emergencyAadhar.length != 12)) {
          this.setState( { emergencyAadharError: 'Enter Correct Aadhar Number' } );
          errorFlag=true;
        }else {
            this.setState( { emergencyAadharError:  false } )
        }

        if(!errorFlag) {
    
        }
    }

    searchPatient = async () => {
        let errorFlag= false;

        if( (!validator.isNumeric(this.state.searchPatientAadhar)) ||  (validator.isEmpty(this.state.searchPatientAadhar)) || (this.state.searchPatientAadhar.length != 12)) {
          this.setState( { searchPatientAadharError: 'Enter Correct Aadhar Number' } );
          errorFlag=true;
        }else {
            this.setState( { searchPatientAadharError:  false } )
        }

        if( (!this.state.searchPatientPassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)) ||  (validator.isEmpty(this.state.searchPatientPassword))) {
            this.setState( { searchPatientPasswordError: 'Password must contain 1 lowercase, 1 uppercase, 1 numeric, 1 special char and length greater than 7' } );
            errorFlag=true;
        }else {
            this.setState( { searchPatientPasswordError:  false } )
        }
    
        if(!errorFlag) {
    
        }
    }

    getPanesData = () => {
        const panes = [
            { menuItem: 'Search Patient', render: () =>
            <Tab.Pane inverted>
            {this.state.isSearchPatientActive ?
            <div>
                <Header as='h4' color='grey'>
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
                <Form.Field>
                    <label style={ { color: '#808080' } }>Password</label>
                    <Form.Input
                        fluid
                        value={this.state.searchPatientPassword}
                        onChange={event =>
                        this.setState({ searchPatientPassword: event.target.value })}
                        placeholder='Password'
                        error={this.state.searchPatientPasswordError}
                    />
                </Form.Field>

                <Message error header="Oops!" content={this.state.errorMessage} />
                <Button type='submit' loading={this.state.searchPatientLoading} primary>
                    Search
                </Button>
                </Form>
            </div> :
            <ShowMedicalRecord></ShowMedicalRecord>
            }
            </Tab.Pane>
            },
            { menuItem: 'Emergency', render: () =>
            <Tab.Pane inverted>
                <Header as='h4' color='grey'>
                Get Emergency Details
                </Header>
                <Form inverted error={!!this.state.errorMessage} onSubmit={ this.getEmergency }>
                <Form.Field>
                    <label style={ { color: '#808080' } }>Aadhar</label>
                    <Form.Input
                        fluid
                        value={this.state.emergencyAadhar}
                        onChange={event =>
                        this.setState({ emergencyAadhar: event.target.value })}
                        placeholder='Aadhar'
                        error={this.state.emergencyAadharError}
                    />
                </Form.Field>
                <Message error header="Oops!" content={this.state.errorMessage} />
                <Button type='submit' loading={this.state.emergencyLoading} primary>
                    Search
                </Button>
                </Form>
            </Tab.Pane>
            },
            { menuItem: 'Add Doctor', render: () => 
            <Tab.Pane inverted>
                <Header as='h4' color='grey'>
                Add Doctor
                </Header>
                <Form inverted error={!!this.state.errorMessage} onSubmit={ this.addDoctor }>
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
                    <label style={ { color: '#808080' } }>Doctor Aadhar</label>
                    <Form.Input
                        fluid
                        value={this.state.docAadhar}
                        onChange={event =>
                        this.setState({ docAadhar: event.target.value })}
                        placeholder='Aadhar'
                        error={this.state.docAadharError}
                    />
                </Form.Field>
                <Form.Field>
                    <label style={ { color: '#808080' } }>Password</label>
                    <Form.Input
                        fluid
                        value={this.state.password}
                        onChange={event =>
                        this.setState({ password: event.target.value })}
                        placeholder='Password'
                        error={this.state.passwordError}
                    />
                </Form.Field>
                <Message error header="Oops!" content={this.state.errorMessage} />
                <Button type='submit' loading={this.state.addDoctorLoading} primary>
                    Add
                </Button>
                </Form>
            </Tab.Pane>
            },
        ]
        return panes;
    }

    render() {
        return (
            <Layout>
                <Segment inverted style={ { height: '100vh' } }>
                    <Tab
                    defaultActiveIndex= '1'
                    menu={{ color: 'red', inverted: true, attached: false, tabular: false }}
                    panes={ this.getPanesData() }
                    />
                </Segment>
            </Layout>
        )
    }
}

export default PatientHomePage
