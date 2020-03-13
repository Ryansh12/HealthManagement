import React, { Component } from 'react';
import Layout from '../components/layout';
import axios from 'axios';
import web3 from '../ethereum/web3';
import doctor from '../ethereum/build/Doctor';
import { Form, Input, Image, Progress, Header, Message, Icon, Label, Button, Grid, Dropdown, Divider } from 'semantic-ui-react';

export default class MedicalRecordForm extends Component {
    constructor(props) {
        super(props);
        this.state = { name: '', gender: '', dob: '', mobile: '', aadhar: '', paddress: '',
        postalcode: '', country: '', password: '', medicalHistory: '', diagnosis: '', medications: '', allergies: '', progressNotes: '', vitalSigns: '', immunizationDates: '',
        emergency: '', billingData: '', radiologyImages: '', labResults: '',  loading: false, errorMessage: '', selectedFile: null, billingDataLoad: false, radiologyImagesLoad: false, labResultsLoad: false };
        this.genderOptions = [
            { key: 'male', text: 'Male', value: 'Male' },
            { key: 'female', text: 'Female', value: 'Female' },
            { key: 'other', text: 'Other', value: 'Other' }
        ]
        this.countryOptions = [
            { key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' },
            { key: 'ax', value: 'ax', flag: 'ax', text: 'Aland Islands' },
            { key: 'al', value: 'al', flag: 'al', text: 'Albania' },
            { key: 'dz', value: 'dz', flag: 'dz', text: 'Algeria' },
            { key: 'as', value: 'as', flag: 'as', text: 'American Samoa' },
            { key: 'ad', value: 'ad', flag: 'ad', text: 'Andorra' },
            { key: 'ao', value: 'ao', flag: 'ao', text: 'Angola' },
            { key: 'ai', value: 'ai', flag: 'ai', text: 'Anguilla' },
            { key: 'ag', value: 'ag', flag: 'ag', text: 'Antigua' },
            { key: 'ar', value: 'ar', flag: 'ar', text: 'Argentina' },
            { key: 'am', value: 'am', flag: 'am', text: 'Armenia' },
            { key: 'aw', value: 'aw', flag: 'aw', text: 'Aruba' },
            { key: 'au', value: 'au', flag: 'au', text: 'Australia' },
            { key: 'at', value: 'at', flag: 'at', text: 'Austria' },
            { key: 'az', value: 'az', flag: 'az', text: 'Azerbaijan' },
            { key: 'bs', value: 'bs', flag: 'bs', text: 'Bahamas' },
            { key: 'bh', value: 'bh', flag: 'bh', text: 'Bahrain' },
            { key: 'bd', value: 'bd', flag: 'bd', text: 'Bangladesh' },
            { key: 'bb', value: 'bb', flag: 'bb', text: 'Barbados' },
            { key: 'by', value: 'by', flag: 'by', text: 'Belarus' },
            { key: 'be', value: 'be', flag: 'be', text: 'Belgium' },
            { key: 'bz', value: 'bz', flag: 'bz', text: 'Belize' },
            { key: 'bj', value: 'bj', flag: 'bj', text: 'Benin' },
          ]
    }



    fileInputRef = React.createRef();

    checkMimeType=(event)=>{
        //getting file object
        let files = event.target.files 
        //define message container
        let err = []
        // list allow mime type
       const types = ['image/png', 'image/jpeg', 'image/gif']
        // loop access array
        for(var x = 0; x<files.length; x++) {
         // compare file type find doesn't matach
             if (types.every(type => files[x].type !== type)) {
             // create error message and assign to container   
             err[x] = files[x].type+' is not a supported format\n';
           }
         };
         for(var z = 0; z<err.length; z++) {// if message not same old that mean has error 
             // discard selected file
            event.target.value = null
        }
       return true;
    }
    maxSelectFile=(event)=>{
        let files = event.target.files
            if (files.length > 3) { 
               const msg = 'Only 3 images can be uploaded at a time'
               event.target.value = null
               return false;
          }
        return true;
    }
    checkFileSize=(event)=>{
      let files = event.target.files
      let size = 2000000
      let err = [];
      for(var x = 0; x<files.length; x++) {
      if (files[x].size > size) {
       err[x] = files[x].type+'is too large, please pick a smaller file\n';
     }
    };
    for(var z = 0; z<err.length; z++) {// if message not same old that mean has error 
      // discard selected file
     event.target.value = null
    }
    return true;
    }
    onFileSelect=(event)=>{
      var files = event.target.files;
      console.log("kkkkkkkkkkkk");
      if(this.maxSelectFile(event) && this.checkMimeType(event) &&    this.checkFileSize(event)){ 
      // if return true allow to setState
      console.log("sankettttttttt");
         this.setState({
         selectedFile: files,
         loaded:0
      })
    }
    }
    uploadFiles = (buttonType) => {
      const data = new FormData() 
      for(var x = 0; x<this.state.selectedFile.length; x++) {
        data.append('file', this.state.selectedFile[x])
      }
      axios.post("http://localhost:3000/upload", data, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
          })
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
        })
        .catch(err => { // then print response status
        })
    }

    uploadBillingData = () => {
        this.setState({ billingDataLoad: true });
        this.uploadFiles("billing");
    }

    uploadRadiologyImages = () => {
        this.setState({ radiologyImagesLoad: true });
        this.uploadFiles("radiology")
    }

    uploadLabresults = () => {
        this.setState({ labResultsLoad: true });
        this.uploadFiles("labresults")
    }

    onFormSubmit = async event => {
        event.preventDefault();
        console.log("eeeeeeeeee");
        this.setState({ loading: true, errorMessage: '' });

        try {
        console.log("eeeeeeeeeetttttttttttttttt");
            const accounts = await web3.eth.getAccounts();
            const address = new web3.eth.Contract(doctor.abi, '0x7535a91cFB4ac53Aac459CC911A2064ca271dA0e');
            console.log(this.state.aadhar);
            let output = await address.methods
            .createMedicalRecord(this.state.name, this.state.gender, this.state.dob, this.state.mobile, this.state.aadhar, this.state.paddress,
                this.state.postalcode, this.state.country, this.state.password)
            .send({
                from: accounts[0]
            });
            console.log(output);

        } catch (err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loading: false });
    };


    render() {
        return (
            <Layout>

                <Grid textAlign='left' style={ { height: '100vh' } } verticalAlign='top' columns={1}>
                    <Grid.Column>
                        <Header size='huge' as='h1' textAlign='center' style={ { marginTop: '45px', color: 'white' } }>Electronic Health Record</Header>
                        <Divider horizontal>
                            <Header as='h4' style={ { color: 'white' } }>
                                Patient Demographics
                            </Header>
                        </Divider>
                        <Form onSubmit={this.onFormSubmit} inverted error={!!this.state.errorMessage}>
                        <Form.Field required>
                            <label>Patient Name</label>
                            <Input
                                placeholder='Name'
                                label="Patient Name"
                                labelPosition="left"
                                value={this.state.name}
                                onChange={event =>
                                this.setState({ name: event.target.value })}
                            />
                        </Form.Field>
                        <Form.Group widths='equal'>
                            <Form.Field required>
                                <label>Gender</label>
                                <Dropdown
                                    placeholder='Gender'
                                    fluid
                                    selection
                                    options={this.genderOptions}
                                    value={this.state.gender}
                                    onChange={event =>
                                    this.setState({ gender: event.target.value })}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Date Of Birth</label>
                                <Input
                                    placeholder='DOB'
                                    label="DOB"
                                    labelPosition="left"
                                    value={this.state.dob}
                                    onChange={event =>
                                    this.setState({ dob: event.target.value })}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Mobile</label>
                                <Input
                                    placeholder='Mobile'
                                    label="Mobile"
                                    labelPosition="left"
                                    value={this.state.mobile}
                                    onChange={event =>
                                    this.setState({ mobile: event.target.value })}
                                />
                            </Form.Field>
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
                        </Form.Group>
                        <Form.TextArea value={this.state.paddress} onChange={event => this.setState({ paddress: event.target.value })}  label='Address' placeholder='Address...' />
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <label>Postal Code</label>
                                <Input
                                    placeholder='Postal Code'
                                    label="Postal Code"
                                    labelPosition="left"
                                    value={this.state.postalcode}
                                    onChange={event =>
                                    this.setState({ postalcode: event.target.value })}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Gender</label>
                                <Dropdown
                                    placeholder="Country"
                                    fluid
                                    selection
                                    options={this.countryOptions}
                                    search
                                    value={this.state.country}
                                    onChange={event =>
                                    this.setState({ country: event.target.value })}
                                />
                            </Form.Field>
                        </Form.Group>
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
                                    onChange={this.fileChange}
                                    onClick={this.onFileSelect}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Button loading={this.state.billingDataLoad} color='green' onClick={this.uploadBillingData}>
                                Upload Files and Generate Hash
                                </Button>
                            </Form.Field>
                        </Form.Group>
                        <Progress percent={400} progress success>
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
                                    hidden
                                    onChange={this.fileChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Button loading={this.state.radiologyImagesLoad} color='green' onClick={this.uploadRadiologyImages}>
                                Upload Files and Generate Hash
                                </Button>
                            </Form.Field>
                        </Form.Group>
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
                                <Button loading={this.state.labResultsLoad} color='green' onClick={this.uploadLabresults}>
                                Upload Files and Generate Hash
                                </Button>
                            </Form.Field>
                        </Form.Group>
                        <Divider horizontal>
                            <Header as='h4' style={ { color: 'white' } }>
                                Password
                            </Header>
                        </Divider>
                        <Form.Field>
                                <label>Password</label>
                                <Input
                                    placeholder='Password'
                                    value={this.state.password}
                                    onChange={event =>
                                    this.setState({ password: event.target.value })}
                                />
                        </Form.Field>
                        <Button
                            type='submit'
                            loading={this.state.loading}
                            content='Create Contract'
                            primary
                        />
                        </Form>
                    </Grid.Column>
                </Grid>
            </Layout>
        )
    }
}
