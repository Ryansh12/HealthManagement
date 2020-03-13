import React, { Component } from 'react';
import web3 from '../ethereum/web3';
import axios from 'axios';
import medRec from '../ethereum/build/MedicalRecord';
import { Segment, Form, Input, Image, Progress, Header, Message, Icon, Label, Button, Grid, Dropdown, Divider } from 'semantic-ui-react';
import Layout from '../components/layout';

export default class ShowMedicalRecord extends Component {
    constructor(props) {
        super(props);
        this.state = { name: '', gender: '', dob: '', mobile: '', aadhar: '', paddress: '',
        postalcode: '', country: '', password: '', medicalHistory: '', diagnosis: '', medications: '', allergies: '', progressNotes: '', vitalSigns: '', immunizationDates: '',
        emergency: '', billingData: '', radiologyImages: '', labResults: '', fileChangesLoading: false, nonDemDataChangesLoading: false, errorMessage: '', selectedFile: null, billingDataLoad: false, radiologyImagesLoad: false, labResultsLoad: false, isShowActive: false, isEditActive: true};
    }

    handleShowShow = ()=>{
        this.setState({
            isShowActive: true
        })
    }

    handleShowHide = () =>{
        this.setState({
            isShowActive: false
        })
    }

    handleEditShow = ()=>{
        this.setState({
            isEditActive: true
        })
    }

    handleEditHide = () =>{
        this.setState({
            isEditActive: false
        })
    }

    fileInputRef = React.createRef();

    onFileSelect=(event)=>{
        var files = event.target.files;
            this.setState({
                selectedFile: files,
        })
    }

    uploadFiles = (buttonType) => {
        console.log(this.state.selectedFile.length);
        const data = new FormData();
        for(var x = 0; x<this.state.selectedFile.length; x++) {
            data.append('file', this.state.selectedFile[x])
        }


        axios.post("http://localhost:3000/upload", data, {
            onUploadProgress: ProgressEvent => {
                if(buttonType == "billing") {
                    this.setState( {
                        billingLoadedPercent: (ProgressEvent.loaded / ProgressEvent.total*100),
                    } )
                }else if(buttonType == "radiology") {
                    this.setState( { 
                        radiologyLoadedPercent: (ProgressEvent.loaded / ProgressEvent.total*100),
                    } )
                }else {
                    this.setState( { 
                        labresultsLoadedPercent: (ProgressEvent.loaded / ProgressEvent.total*100),
                    } )
                }

                if( ( this.state.billingLoadedPercent == 100 ) || ( this.state.radiologyLoadedPercent == 100 ) || ( this.state.labresultsLoadedPercent == 100 ) ) {
                    this.setState( { 
                        selectedFile: null,
                    } )
                }
            },
        })
        .then(res => { // then print response status
            if(buttonType == "billing") {
                this.setState({ billingData: res.data, billingDataLoad: false, selectedFile: null });
            }else if(buttonType == "radiology") {
                this.setState({ radiologyImages: res.data, radiologyImagesLoad: false, selectedFile: null });
            }else {
                this.setState({ labResults: res.data, labResultsLoad: false, selectedFile: null });
            }
            this.setState( { selectedFile: null } );
        })
        .catch(err => { // then print response status
        })
    }

    uploadBillingData = () => {
        if( ( this.state.selectedFile != null ) && ( this.state.radiologyImagesLoad == false ) && ( this.state.labResultsLoad == false ) ) {
            console.log("pppppprrrrrrrrrrrrrr rrrrrrrrrrr rrrrrrrrrrr");
            this.setState({ billingDataLoad: true });
            this.uploadFiles("billing");
        }
    }

    uploadRadiologyImages = () => {
        if( ( this.state.selectedFile != null ) && ( this.state.billingDataLoad == false ) && ( this.state.labResultsLoad == false ) ) {
            this.setState({ radiologyImagesLoad: true });
            this.uploadFiles("radiology")
        }
    }

    uploadLabresults = () => {
        if( ( this.state.selectedFile != null ) && ( this.state.radiologyImagesLoad == false ) && ( this.state.billingDataLoad == false ) ) {
            this.setState({ labResultsLoad: true });
            this.uploadFiles("labresults")
        }
    }

    onFormSubmit = async event => {
        event.preventDefault();
        this.setState({ loading: true, errorMessage: '' });

        try {

        } catch (err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loading: false });
    };

    async componentDidMount() {
        this.setState( { name: 'sanket', gender: 'male', medicalHistory: 'sdfsfdsfsdf', diagnosis: 'asdasdsad', labResults: 'sadsafdsfdsf' } );
        const accounts = await web3.eth.getAccounts();
        const mr = new web3.eth.Contract(medRec.abi, '0x7f94d11a648211b6ac67e749e10d78b2ba0afe8a');
        const demographicsData = await mr.methods
        .password()
        .call();

        const nonDemographicsData = await mr.methods
        .getNonDemographicsData()
        .call();

        const files = await mr.methods
        .getAllFiles()
        .call();
        this.setState( { name: demographicsData } );
        console.log(demographicsData);
    }

    applyFileChanges = async () => {
        this.setState({ fileChangesLoading: true, errorMessage: '' });

        try {
          const accounts = await web3.eth.getAccounts();
          const address = new web3.eth.Contract(medRec.abi, '0x38c1163217a5aF0Ef8239b8901063C2c727D99aa');
          await address.methods
            .addDoctor(this.state.aadhar, this.state.name, this.state.details)
            .send({
              from: accounts[0],
              gas: 999999
          });
        } catch (err) {
          this.setState({ errorMessage: err.message });
        }
        this.setState({ fileChangesLoading: false });
    }

    applyNonDemChanges = async () => {
        this.setState({ nonDemDataChangesLoading: true, errorMessage: '' });

        try {
          const accounts = await web3.eth.getAccounts();
          const address = new web3.eth.Contract(medRecs.abi, '0x38c1163217a5aF0Ef8239b8901063C2c727D99aa');
          await address.methods
            .addDoctor(this.state.aadhar, this.state.name, this.state.details)
            .send({
              from: accounts[0],
              gas: 999999
          });
        } catch (err) {
          this.setState({ errorMessage: err.message });
        }
        this.setState({ nonDemDataChangesLoading: false });
    }
    render() {
        return (
            <Layout>
                {this.state.isShowActive ? <Segment>
                <Header dividing  as='h1'>Electronic Health Record</Header>
                <Grid stackable style={ { marginLeft: '2px' } }>
                    <Grid.Row>
                        <Grid.Column>
                            <Divider horizontal>
                                <Header as='h3'>
                                    Patient Demographics
                                </Header>
                            </Divider>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column width='16'>
                            <Header dividing color='blue' as='h2'>
                                NAME :-
                                <Header.Subheader style={ { fontSize: '20px' } } color='red' >
                                { this.state.name }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={4}>
                        <Grid.Column>
                            <Header dividing color='blue' as='h2'>
                                GENDER :-
                                <Header.Subheader style={ { fontSize: '20px' } } color='red' >
                                { this.state.gender }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                        <Grid.Column>
                            <Header dividing color='blue' as='h2'>
                                DOB :-
                                <Header.Subheader style={ { fontSize: '20px' } } color='red' >
                                { this.state.dob }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                        <Grid.Column>
                            <Header dividing color='blue' as='h2'>
                                Mobile :-
                                <Header.Subheader style={ { fontSize: '20px' } } color='red' >
                                { this.state.mobile }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                        <Grid.Column>
                            <Header dividing color='blue' as='h2'>
                                AADHAR :-
                                <Header.Subheader style={ { fontSize: '20px' } } color='red' >
                                { this.state.aadhar }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column>
                            <Header dividing color='blue' as='h2'>
                                ADDRESS :-
                                <Header.Subheader style={ { fontSize: '20px' } } color='red' >
                                { this.state.paddress }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <Header dividing color='blue' as='h2'>
                                POSTALCODE :-
                                <Header.Subheader style={ { fontSize: '20px' } } color='red' >
                                { this.state.postalcode }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                        <Grid.Column>
                            <Header dividing color='blue' as='h2'>
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
                                <Header as='h3'>
                                    Medical Information
                                </Header>
                            </Divider>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column width='16'>
                            <Header dividing color='blue' as='h2'>
                                MEDICAL HISTORY :-
                                <Header.Subheader style={ { fontSize: '20px' } } color='red' >
                                { this.state.medicalHistory }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column width='16'>
                            <Header dividing color='blue' as='h2'>
                                DIAGNOSIS :-
                                <Header.Subheader style={ { fontSize: '20px' } } color='red' >
                                { this.state.diagnosis }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column width='16'>
                            <Header dividing color='blue' as='h2'>
                                MEDICATIONS :-
                                <Header.Subheader style={ { fontSize: '20px' } } color='red' >
                                { this.state.medications }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column width='16'>
                            <Header dividing color='blue' as='h2'>
                                ALLERGIES :-
                                <Header.Subheader style={ { fontSize: '20px' } } color='red' >
                                { this.state.allergies }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column width='16'>
                            <Header dividing color='blue' as='h2'>
                                PROGRESS NOTES :-
                                <Header.Subheader style={ { fontSize: '20px' } } color='red' >
                                { this.state.progressNotes }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column width='16'>
                            <Header dividing color='blue' as='h2'>
                                VITAL SIGNS :-
                                <Header.Subheader style={ { fontSize: '20px' } } color='red' >
                                { this.state.vitalSigns }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column width='16'>
                            <Header dividing color='blue' as='h2'>
                                IMMUNIZATION DATES :-
                                <Header.Subheader style={ { fontSize: '20px' } } color='red' >
                                { this.state.immunizationDates }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column width='16'>
                            <Header dividing color='blue' as='h2'>
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
                                <Header as='h3'>
                                    Files
                                </Header>
                            </Divider>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column width='16'>
                            <Header dividing color='blue' as='h2'>
                                BILLING :-
                                <Header.Subheader style={ { fontSize: '20px' } } color='red' >
                                { this.state.emergency }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column width='16'>
                            <Header dividing color='blue' as='h2'>
                                RADIOLOGY :-
                                <Header.Subheader style={ { fontSize: '20px' } } color='red' >
                                { this.state.emergency }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column width='16'>
                            <Header dividing color='blue' as='h2'>
                                LABRESULTS :-
                                <Header.Subheader style={ { fontSize: '20px' } } color='red' >
                                { this.state.emergency }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column width='16'>
                            <Header dividing color='blue' as='h2'>
                                INSURANCE :-
                                <Header.Subheader style={ { fontSize: '20px' } } color='red' >
                                { this.state.emergency }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                </Segment>
                : null}

                {this.state.isEditActive ? <Grid textAlign='left' style={ { height: '100vh' } } verticalAlign='top' columns={1}>
                <Grid.Column>
                    <Header size='huge' as='h1' textAlign='center' style={ { marginTop: '45px', color: 'white' } }>Electronic Health Record</Header>
                    <Form onSubmit={this.onFormSubmit} inverted error={!!this.state.errorMessage}>
                    <Divider horizontal>
                        <Header as='h4' style={ { color: 'white' } }>
                            Medical Information
                        </Header>
                    </Divider>
                    <Form.TextArea value={this.state.medicalHistory} onChange={event => this.setState({ medicalHistory: event.target.value })}  label='Medical History' placeholder='Medical History...' />
                    <Form.TextArea value={this.state.diagnosis} onChange={event => this.setState({ diagnosis: event.target.value })}  label='Diagnosis' placeholder='Diagnosis...' />
                    <Form.TextArea value={this.state.medications} onChange={event => this.setState({ medications: event.target.value })}  label='Medications' placeholder='Medications...' />
                    <Form.TextArea value={this.state.allergies} onChange={event => this.setState({ allergies: event.target.value })}  label='Allergies' placeholder='Allergies...' />
                    <Form.TextArea value={this.state.progressNotes} onChange={event => this.setState({ progressNotes: event.target.value })}  label='Progress Notes' placeholder='Progress Notes...' />
                    <Form.TextArea value={this.state.vitalSigns} onChange={event => this.setState({ vitalSigns: event.target.value })}  label='Vitalsigns' placeholder='VitalSigns...' />
                    <Form.TextArea value={this.state.immunizationDates} onChange={event => this.setState({ immunizationDates: event.target.value })}  label='Immunization Dates' placeholder='Immunization Dates...' />
                    <Form.TextArea value={this.state.emergency} onChange={event => this.setState({ emergency: event.target.value })}  label='Emergency' placeholder='Emergency...' />

                    <Button
                        onClick={this.applyNonDemChanges}
                        type='submit'
                        loading={this.state.loading}
                        disabled={this.state.loading}
                        content='Apply Changes'
                        primary
                    />
                    </Form>

                    <Form onSubmit={this.onFormSubmit} inverted error={!!this.state.errorMessage}>
                    <Divider horizontal>
                        <Header as='h4' style={ { color: 'white' } }>
                            Files
                        </Header>
                    </Divider>
                    <Form.Field>
                        <Input
                            placeholder='Billing'
                            value={this.state.billingData}
                            onChange={event =>
                            this.setState({ billingData: event.target.value })}
                        />
                    </Form.Field>
                    <Form.Group>
                        <Form.Field>
                            <Button
                                content="Choose File"
                                labelPosition="left"
                                icon="upload"
                                onClick={() => this.fileInputRef.current.click()}
                            />
                            <input
                                ref={this.fileInputRef}
                                type="file"
                                hidden
                                multiple
                                onChange={this.onFileSelect}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Button disabled={this.state.billingDataLoad} loading={this.state.billingDataLoad} color='green' onClick={this.uploadBillingData}>
                            Upload Files and Generate Hash
                            </Button>
                        </Form.Field>
                    </Form.Group>
                    <Progress progress success percent={this.state.billingLoadedPercent} >
                            success
                    </Progress>
                    <Form.Field>
                            <label>Radioloy</label>
                            <Input
                                placeholder='Radiology'
                                value={this.state.radiologyImages}
                                onChange={event =>
                                this.setState({ radiologyImages: event.target.value })}
                            />
                    </Form.Field>
                    <Form.Group>
                        <Form.Field>
                            <Button
                                content="Choose File"
                                labelPosition="left"
                                icon="upload"
                                onClick={() => this.fileInputRef.current.click()}
                            />
                            <input
                                ref={this.fileInputRef}
                                type="file"
                                multiple
                                hidden
                                onChange={this.onFileSelect}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Button disabled={this.state.radiologyImagesLoad} loading={this.state.radiologyImagesLoad} color='green' onClick={this.uploadRadiologyImages}>
                            Upload Files and Generate Hash
                            </Button>
                        </Form.Field>
                    </Form.Group>
                    <Progress progress success percent={this.state.radiologyLoadedPercent} >
                            success
                    </Progress>
                    <Form.Field>
                            <label>Labresults</label>
                            <Input
                                placeholder='Labresults'
                                value={this.state.labResults}
                                onChange={event =>
                                this.setState({ labResults: event.target.value })}
                            />
                    </Form.Field>
                    <Form.Group>
                    <Form.Field>
                        <Button
                            content="Choose File"
                            labelPosition="left"
                            icon="upload"
                            onClick={() => this.fileInputRef.current.click()}
                        />
                        <input
                            ref={this.fileInputRef}
                            type="file"
                            multiple
                            hidden
                            onChange={this.onFileSelect}
                        />
                        </Form.Field>
                        <Form.Field>
                            <Button disabled={this.state.labResultsLoad}  loading={this.state.labResultsLoad}  color='green' onClick={this.uploadLabresults}>
                            Upload Files and Generate Hash
                            </Button>
                        </Form.Field>
                    </Form.Group>
                    <Progress progress success percent={this.state.labresultsLoadedPercent} >
                            success
                    </Progress>
                    <Button
                        onClick={ this.applyFileChanges }
                        type='submit'
                        loading={this.state.fileChangesLoading}
                        disabled={this.state.fileChangesLoading}
                        content='Apply Changes'
                        primary
                    />
                </Form>
                </Grid.Column>
                </Grid>
                : null}
            </Layout>
        )
    }
}
