import React, { Component } from 'react';
import web3 from '../ethereum/web3';
import axios from 'axios';
import medRec from '../ethereum/build/MedicalRecord';
import { Form, Input, Progress, Header, Dimmer, Loader, List, Popup, Icon, Button, Grid, Divider } from 'semantic-ui-react';
import ShowInsurance from './showInsurance';
import ins from '../ethereum/build/Insurance';


export default class ShowMedicalRecord extends Component {
    constructor(props) {
        super(props);
        this.state = { name: [], gender: [], dob: [], mobile: [], aadhar: [], paddress: [],
        postalcode: [], country: [], password: [], medicalHistory: [], diagnosis: [], medications: [], allergies: [], progressNotes: [], vitalSigns: [], immunizationDates: [],
        emergency: [], billingData: [], radiologyImages: [], labResults: [], insurances: [], fileChangesLoading: false, nonDemDataChangesLoading: false, errorMessage: [], selectedFile: null, billingDataLoad: false, radiologyImagesLoad: false, labResultsLoad: false, isShowActive: true, isEditActive: false, isLoaderDimmerActive: false, insuranceData: null};
    }

    toggle = () => {
        this.setState( { 
            isEditActive: !this.state.isEditActive,
            isShowActive: !this.state.isShowActive
         } )
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

    // componentWillMount() {
    //     // this.setState( { name: 'sanket', gender: 'male', medicalHistory: 'sdfsfdsfsdf', diagnosis: 'asdasdsad', labResults: 'sadsafdsfdsf' } );
    //     // const accounts = await web3.eth.getAccounts();
    //     // const mr = new web3.eth.Contract(medRec.abi, '0x7f94d11a648211b6ac67e749e10d78b2ba0afe8a');
    //     // const demographicsData = await mr.methods
    //     // .password()
    //     // .call();


    //     // this.setState( { name: demographicsData } );
    //     // console.log(demographicsData);
    //     this.setState( { name: this.props.data[1][0], gender: this.props.data[1][1], dob : this.props.data[1][2], mobile: this.props.data[1][3], aadhar: this.props.data[1][4], paddress: this.props.data[1][5], postalcode: this.props.data[1][6], country: this.props.data[1][7],
    //     medicalHistory: this.props.data[2][0], diagnosis: this.props.data[2][1], medications: this.props.data[2][2], allergies: this.props.data[2][3], progressNotes: this.props.data[2][4], vitalSigns: this.props.data[2][5], immunizationDates: this.props.data[2][6], emergency: this.props.data[2][7],
    //     billingData: this.props.data[3][0], radiologyImages: this.props.data[3][1], labResults: this.props.data[3][2], insurances: this.props.data[3][3]
    //     } )
    // }

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

    renderListHandle = (e) => {
        console.log(e.target.innerText);
    }

    renderBilling = () => {
        const items = this.state.billingData.map(function(val,index) {
            return {
              content: val,
              as: 'a'
            }
        });
        return <Popup content='Download Corresponding Files' trigger={<List items={items} onClick={this.renderListHandle} size='large' divided inverted relaxed ordered/>} />
    }

    renderRadiology = () => {
        const items = this.state.radiologyImages.map(function(val,index) {
            return {
              content: val,
              as: 'a'
            }
        });

        return <List items={items} onClick={this.renderListHandle} size='large' divided inverted relaxed ordered/>
    }

    renderLabresults = () => {
        const items = this.state.labResults.map(function(val,index) {
            return {
              content: val,
              as: 'a'
            }
        });

        return <List items={items} onClick={this.renderListHandle} size='large' divided inverted relaxed ordered/>
    }

    renderInsuranceHandle = async (e) => {
        this.setState({ isLoaderDimmerActive: true });
        let output;
        try {
            let address = new web3.eth.Contract(ins.abi, '0xb45b443af641086922D4DC50f7fD04a8b0A1d66d');
            output = await address.methods.getData().call();
            console.log('1');
        } catch (err) {
        }
        console.log(ins.abi);
        console.log('kkkkkkk bb *************8');
        console.log(output);
        this.setState({ insuranceData: output, isLoaderDimmerActive: false, isShowActive: false, isInsuranceActive: true });
    }

    renderInsurance = () => {
        const items = this.state.insurances.map(function(val,index) {
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
                <Dimmer active={this.state.isLoaderDimmerActive}>
                    <Loader active={ this.state.isLoaderDimmerActive }></Loader>
                </Dimmer>
                {this.state.isShowActive ? <div>
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
                                <Header.Subheader style={ { fontSize: '20px', color: 'white' } } color='red' >
                                { this.state.dob }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                        <Grid.Column>
                            <Header dividing color='grey' as='h2'>
                                Mobile :-
                                <Header.Subheader style={ { fontSize: '20px', color: 'white' } } color='red' >
                                { this.state.mobile }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                        <Grid.Column>
                            <Header dividing color='grey' as='h2'>
                                AADHAR :-
                                <Header.Subheader style={ { fontSize: '20px', color: 'white' } } color='red' >
                                { this.state.aadhar }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column>
                            <Header dividing color='grey' as='h2'>
                                ADDRESS :-
                                <Header.Subheader style={ { fontSize: '20px', color: 'white' } } color='red' >
                                { this.state.paddress }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <Header dividing color='grey' as='h2'>
                                POSTALCODE :-
                                <Header.Subheader style={ { fontSize: '20px', color: 'white' } } color='red' >
                                { this.state.postalcode }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                        <Grid.Column>
                            <Header dividing color='grey' as='h2'>
                                COUNTRY :-
                                <Header.Subheader style={ { fontSize: '20px', color: 'white' } } color='red' >
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
                                <Header.Subheader style={ { fontSize: '20px', color: 'white' } } color='red' >
                                { this.state.medicalHistory }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column width='16'>
                            <Header dividing color='grey' as='h2'>
                                DIAGNOSIS :-
                                <Header.Subheader style={ { fontSize: '20px', color: 'white' } } color='red' >
                                { this.state.diagnosis }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column width='16'>
                            <Header dividing color='grey' as='h2'>
                                MEDICATIONS :-
                                <Header.Subheader style={ { fontSize: '20px', color: 'white' } } color='red' >
                                { this.state.medications }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column width='16'>
                            <Header dividing color='grey' as='h2'>
                                ALLERGIES :-
                                <Header.Subheader style={ { fontSize: '20px', color: 'white' } } color='red' >
                                { this.state.allergies }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column width='16'>
                            <Header dividing color='grey' as='h2'>
                                PROGRESS NOTES :-
                                <Header.Subheader style={ { fontSize: '20px', color: 'white' } } color='red' >
                                { this.state.progressNotes }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column width='16'>
                            <Header dividing color='grey' as='h2'>
                                VITAL SIGNS :-
                                <Header.Subheader style={ { fontSize: '20px', color: 'white' } } color='red' >
                                { this.state.vitalSigns }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column width='16'>
                            <Header dividing color='grey' as='h2'>
                                IMMUNIZATION DATES :-
                                <Header.Subheader style={ { fontSize: '20px', color: 'white' } } color='red' >
                                { this.state.immunizationDates }
                                </Header.Subheader>
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                        <Grid.Column width='16'>
                            <Header dividing color='grey' as='h2'>
                                EMERGENCY :-
                                <Header.Subheader style={ { fontSize: '20px', color: 'white' } } color='red' >
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
                            { this.renderInsurance() }
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Button onClick={ this.toggle } color='green'><Icon name='edit' />Edit</Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                </div>
                : null}

                {this.state.isEditActive ? <Grid textAlign='left' style={ { height: '100vh' } } verticalAlign='top' columns={1}>
                <Grid.Column>
                    <Header color= 'grey' size='huge' as='h1' textAlign='center' style={ { fontSize: '40px', fontFamily: '"Arial Black", Gadget, sans-serif', marginTop: '45px', color: 'white' } }>Electronic Health Record</Header>
                    <Form onSubmit={this.onFormSubmit} inverted error={!!this.state.errorMessage}>
                    <Divider horizontal>
                        <Header as='h4' color='grey'>
                            Medical Information
                        </Header>
                    </Divider>
                    <label style={ { color: '#808080' } }>Medical History</label>
                    <Form.TextArea value={this.state.medicalHistory} onChange={event => this.setState({ medicalHistory: event.target.value })} placeholder='Medical History...' />
                    <label style={ { color: '#808080' } }>Diagnosis</label>
                    <Form.TextArea value={this.state.diagnosis} onChange={event => this.setState({ diagnosis: event.target.value })}  placeholder='Diagnosis...' />
                    <label style={ { color: '#808080' } }>Medications</label>
                    <Form.TextArea value={this.state.medications} onChange={event => this.setState({ medications: event.target.value })} placeholder='Medications...' />
                    <label style={ { color: '#808080' } }>Allergies</label>
                    <Form.TextArea value={this.state.allergies} onChange={event => this.setState({ allergies: event.target.value })} placeholder='Allergies...' />
                    <label style={ { color: '#808080' } }>Progress Notes</label>
                    <Form.TextArea value={this.state.progressNotes} onChange={event => this.setState({ progressNotes: event.target.value })} placeholder='Progress Notes...' />
                    <label style={ { color: '#808080' } }>Vital Signs</label>
                    <Form.TextArea value={this.state.vitalSigns} onChange={event => this.setState({ vitalSigns: event.target.value })}  placeholder='VitalSigns...' />
                    <label style={ { color: '#808080' } }>Immunization Dates</label>
                    <Form.TextArea value={this.state.immunizationDates} onChange={event => this.setState({ immunizationDates: event.target.value })} placeholder='Immunization Dates...' />
                    <label style={ { color: '#808080' } }>Emergency</label>
                    <Form.TextArea value={this.state.emergency} onChange={event => this.setState({ emergency: event.target.value })} placeholder='Emergency...' />

                    <Button onClick={this.applyNonDemChanges} type='submit' loading={this.state.loading} disabled={this.state.loading} primary><Icon name='gavel' />Apply Changes</Button>
                    <Button onClick={ this.toggle } color='red'><Icon name='cancel' />cancel</Button>
                    </Form>

                    <Form onSubmit={this.onFormSubmit} inverted error={!!this.state.errorMessage}>
                    <Divider horizontal>
                        <Header color= 'grey' as='h4'>
                            Files
                        </Header>
                    </Divider>
                    <Form.Field>
                        <label style={ { color: '#808080' } }>Billing</label>
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
                            <label style={ { color: '#808080' } }>Radiology</label>
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
                            <label style={ { color: '#808080' } }>Lab Results</label>
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
                    <Button onClick={this.applyFileChanges} type='submit' loading={this.state.loading} disabled={this.state.loading} primary><Icon name='gavel' />Apply Changes</Button>
                    <Button onClick={ this.toggle } color='red'><Icon name='cancel' />cancel</Button>
                </Form>
                </Grid.Column>
                </Grid>
                : null}

                {this.state.isInsuranceActive ?
                <div>
                    <ShowInsurance data={this.state.insuranceData}></ShowInsurance>
                </div>:null}
            </div>
        )
    }
}
