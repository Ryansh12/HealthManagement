import React, { Component } from 'react';
import web3 from '../ethereum/web3';
import axios from 'axios';
import medRec from '../ethereum/build/MedicalRecord';
import { Segment, Form, Input, Image, Progress, Header, List, Message, Popup, Icon, Label, Button, Grid, Dropdown, Divider } from 'semantic-ui-react';
import Layout from '../components/layout';

export default class ShowMedicalRecord extends Component {
    constructor(props) {
        super(props);
        this.state = { name: '', gender: '', dob: '', mobile: '', aadhar: '', paddress: '',
        postalcode: '', country: '', password: '', medicalHistory: '', diagnosis: '', medications: '', allergies: '', progressNotes: '', vitalSigns: '', immunizationDates: '',
        emergency: '', billingData: '', radiologyImages: '', labResults: '', insurances: ''};
    }

    async componentDidMount() {
        this.setState( { name: 'sanket', gender: 'male', medicalHistory: 'sdfsfdsfsdf', diagnosis: 'asdasdsad', labResults: 'sadsafdsfdsf' } );
        const accounts = await web3.eth.getAccounts();
        const mr = new web3.eth.Contract(medRec.abi, '0x7f94d11a648211b6ac67e749e10d78b2ba0afe8a');
        const demographicsData = await mr.methods
        .password()
        .call();


        this.setState( { name: demographicsData } );
        console.log(demographicsData);
    }

    renderListHandle = (e) => {
        console.log(e.target.innerText);
    }

    renderBilling = () => {
        let data = [6756, 87687, 8787687];
        const items = data.map(function(val,index) {
            return {
              content: val,
              as: 'a'
            }
        });
        return <Popup content='Download Corresponding Files' trigger={<List items={items} onClick={this.renderListHandle} size='large' divided inverted relaxed ordered/>} />
    }

    renderRadiology = () => {
        let data = [6756, 87687, 8787687];
        const items = data.map(function(val,index) {
            return {
              content: val,
              as: 'a'
            }
        });

        return <List items={items} onClick={this.renderListHandle} size='large' divided inverted relaxed ordered/>
    }

    renderLabresults = () => {
        let data = [6756, 87687, 8787687];
        const items = data.map(function(val,index) {
            return {
              content: val,
              as: 'a'
            }
        });

        return <List items={items} onClick={this.renderListHandle} size='large' divided inverted relaxed ordered/>
    }

    renderInsuranceHandle = () => {

    }

    renderInsurance = () => {
        let data = [6756, 87687, 8787687];
        const items = data.map(function(val,index) {
            return {
              content: val,
              as: 'a'
            }
        });

        return <List items={items} onClick={this.renderInsuranceHandle} size='large' divided inverted relaxed ordered/>
    }

    render() {
        return (
            <div>
                <div>
                <Grid stackable style={ { marginLeft: '2px' } }>
                    <Grid.Row>
                        <Grid.Column>
                            <Header color= 'grey' size='huge' as='h1' textAlign='center' style={ { fontSize: '40px', fontFamily: '"Arial Black", Gadget, sans-serif', marginTop: '45px', color: 'white' } }>Electronic Health Record</Header>
                            <Divider horizontal>
                                <Header as='h4' color= 'grey'>
                                    Patient Demographics
                                </Header>
                            </Divider>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column width='16'>
                            <Header dividing color='grey' as='h2'>
                                NAME :-
                                <Header.Subheader style={ { fontSize: '20px', color: 'white' } } color='red' >
                                { this.state.name }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={4}>
                        <Grid.Column>
                            <Header dividing color='grey' as='h2'>
                                GENDER :-
                                <Header.Subheader style={ { fontSize: '20px', color: 'white' } } >
                                { this.state.gender }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                        <Grid.Column>
                            <Header dividing color='grey' as='h2'>
                                DOB :-
                                <Header.Subheader style={ { fontSize: '20px' } } color='red' >
                                { this.state.dob }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                        <Grid.Column>
                            <Header dividing color='grey' as='h2'>
                                Mobile :-
                                <Header.Subheader style={ { fontSize: '20px' } } color='red' >
                                { this.state.mobile }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                        <Grid.Column>
                            <Header dividing color='grey' as='h2'>
                                AADHAR :-
                                <Header.Subheader style={ { fontSize: '20px' } } color='red' >
                                { this.state.aadhar }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column>
                            <Header dividing color='grey' as='h2'>
                                ADDRESS :-
                                <Header.Subheader style={ { fontSize: '20px' } } color='red' >
                                { this.state.paddress }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <Header dividing color='grey' as='h2'>
                                POSTALCODE :-
                                <Header.Subheader style={ { fontSize: '20px' } } color='red' >
                                { this.state.postalcode }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                        <Grid.Column>
                            <Header dividing color='grey' as='h2'>
                                COUNTRY :-
                                <Header.Subheader style={ { fontSize: '20px' } } color='red' >
                                { this.state.country }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Divider horizontal>
                                <Header color='grey' as='h4'>
                                    Medical Information
                                </Header>
                            </Divider>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column width='16'>
                            <Header dividing color='grey' as='h2'>
                                MEDICAL HISTORY :-
                                <Header.Subheader style={ { fontSize: '20px' } } color='red' >
                                { this.state.medicalHistory }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column width='16'>
                            <Header dividing color='grey' as='h2'>
                                DIAGNOSIS :-
                                <Header.Subheader style={ { fontSize: '20px' } } color='red' >
                                { this.state.diagnosis }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column width='16'>
                            <Header dividing color='grey' as='h2'>
                                MEDICATIONS :-
                                <Header.Subheader style={ { fontSize: '20px' } } color='red' >
                                { this.state.medications }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column width='16'>
                            <Header dividing color='grey' as='h2'>
                                ALLERGIES :-
                                <Header.Subheader style={ { fontSize: '20px' } } color='red' >
                                { this.state.allergies }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column width='16'>
                            <Header dividing color='grey' as='h2'>
                                PROGRESS NOTES :-
                                <Header.Subheader style={ { fontSize: '20px' } } color='red' >
                                { this.state.progressNotes }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column width='16'>
                            <Header dividing color='grey' as='h2'>
                                VITAL SIGNS :-
                                <Header.Subheader style={ { fontSize: '20px' } } color='red' >
                                { this.state.vitalSigns }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column width='16'>
                            <Header dividing color='grey' as='h2'>
                                IMMUNIZATION DATES :-
                                <Header.Subheader style={ { fontSize: '20px' } } color='red' >
                                { this.state.immunizationDates }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column width='16'>
                            <Header dividing color='grey' as='h2'>
                                EMERGENCY :-
                                <Header.Subheader style={ { fontSize: '20px' } } color='red' >
                                { this.state.emergency }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Divider horizontal>
                                <Header color='grey' as='h4'>
                                    Files
                                </Header>
                            </Divider>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column width='16'>
                            <Header dividing color='grey' as='h2'>
                                BILLING :-
                            </Header>
                            { this.renderBilling() }
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column width='16'>
                            <Header dividing color='grey' as='h2'>
                                RADIOLOGY :-
                            </Header>
                            { this.renderRadiology() }
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column width='16'>
                            <Header dividing color='grey' as='h2'>
                                LABRESULTS :-
                            </Header>
                            { this.renderLabresults() }
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column width='16'>
                            <Header dividing color='grey' as='h2'>
                                INSURANCE :-
                            </Header>
                            { this.renderInsurance }
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Button onClick={ this.toggle } color='green'><Icon name='edit' />Edit</Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                </div>
            </div>
        )
    }
}
