import React, { Component } from 'react';
// import Layout from '../components/layout';
import axios from 'axios';
import validator from 'validator';
import web3 from '../ethereum/web3';
import doctor from '../ethereum/build/Doctor';
import { Form, Input,  Progress, Header, Button, Grid, Dropdown, Divider } from 'semantic-ui-react';

export default class MedicalRecordForm extends Component {
    constructor(props) {
        super(props);
        this.state = { name: '', nameError:  false, gender: '', genderError:  false, dob: '', dobError:  false, mobile: '', mobileError:  false, aadhar: '', aadharError:  false, paddress: '', paddressError:  false,
        postalcode: '', postalcodeError:  false, country: '', countryError:  false, password: '', passwordError: false, medicalHistory: '', medicalHistoryError:  false, diagnosis: '', diagnosisError:  false, medications: '', medicationsError:  false, allergies: '', allergiesError:  false, progressNotes: '', progressNotesError:  false, vitalSigns: '', vitalSignsError:  false, immunizationDates: '', immunizationDatesError:  false,
        emergency: '', emergencyError:  false, billingData: '', radiologyImages: '', labResults: '', errorMessage: '', selectedFile: null, billingDataLoad: false, radiologyImagesLoad: false, labResultsLoad: false, createNewMedicalRecordLoading: false, updateFilesLoading: false, updateNonDemographicDataLoading: false };
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


        axios.post("https://blockchainhealthmanagement.herokuapp.com/upload", data, {
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

        let errorFlag = false;

        if( (!validator.isAlpha(this.state.name)) || (validator.isEmpty(this.state.name)) ) {
            this.setState( { nameError: 'Incorrect Name' } );
            errorFlag=true;
        }else {
            this.setState( { nameError:  false } )
        }

        if( this.state.gender == undefined ) {
            this.setState( { genderError: 'Select Gender' } );
            errorFlag=true;
        }else {
            this.setState( { genderError:  false } )
        }

        if( (!this.state.dob.match(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/)) ||  (validator.isEmpty(this.state.dob))) {
            this.setState( { dobError: 'Enter in dd/mm/yyyy or dd-mm-yyyy Format' } );
            errorFlag=true;
        }else {
            this.setState( { dobError:  false } )
        }

        if( !this.state.mobile.match(/^\+[0-9]{2,3}-[0-9]\d{10}/) ) {
            this.setState( { mobileError: 'Enter Correct Mobile Number' } );
            errorFlag=true;
        }else {
            this.setState( { mobileError:  false } )
        }

        if( (!validator.isNumeric(this.state.aadhar)) ||  (validator.isEmpty(this.state.aadhar)) || (this.state.aadhar.length != 12)) {
            this.setState( { aadharError: 'Enter Correct Aadhar Number' } );
            errorFlag=true;
        }else {
            this.setState( { aadharError:  false } )
        }

        if( (!this.state.paddress.match(/^[a-zA-Z0-9\s,.'-]{3,}$/)) ||  (validator.isEmpty(this.state.paddress))) {
            this.setState( { paddressError: 'Enter Correct Address' } );
            errorFlag=true;
        }else {
            this.setState( { paddressError:  false } )
        }

        if( (!this.state.postalcode.match(/^\d{5}$|^\d{5}-\d{4}$/)) ||  (validator.isEmpty(this.state.postalcode))) {
            this.setState( { postalcodeError: 'Enter Correct PostalCode' } );
            errorFlag=true;
        }else {
            this.setState( { postalcodeError:  false } )
        }

        if( this.state.country == undefined ) {
            this.setState( { countryError: 'Select Country' } );
            errorFlag=true;
        }else {
            this.setState( { countryError:  false } )
        }

        if( (validator.isEmpty(this.state.medicalHistory)) || (!this.state.medicalHistory.length < 10) ) {
            this.setState( { medicalHistoryError: 'Enter Medical History' } );
            errorFlag=true;
        }else {
            this.setState( { medicalHistoryError:  false } )
        }

        if( (validator.isEmpty(this.state.diagnosis)) || (!this.state.diagnosis.length < 10) ) {
            this.setState( { diagnosisError: 'Enter Diagnosis' } );
            errorFlag=true;
        }else {
            this.setState( { diagnosisError:  false } )
        }

        if( (validator.isEmpty(this.state.medications)) || (!this.state.medications.length < 10) ) {
            this.setState( { medicationsError: 'Enter Medications' } );
            errorFlag=true;
        }else {
            this.setState( { medicationsError:  false } )
        }

        if( (validator.isEmpty(this.state.allergies)) || (!this.state.allergies.length < 10) ) {
            this.setState( { aadharError: 'Enter Allergies' } );
            errorFlag=true;
        }else {
            this.setState( { aadharError:  false } )
        }

        if( (validator.isEmpty(this.state.progressNotes)) || (!this.state.progressNotes.length < 10) ) {
            this.setState( { progressNotesError: 'Enter Progress Notes' } );
            errorFlag=true;
        }else {
            this.setState( { progressNotesError:  false } )
        }

        if( (validator.isEmpty(this.state.vitalSigns)) || (!this.state.vitalSigns.length < 10) ) {
            this.setState( { vitalSignsError: 'Enter Vital Signs' } );
            errorFlag=true;
        }else {
            this.setState( { vitalSignsError:  false } )
        }

        if( (validator.isEmpty(this.state.immunizationDates)) || (!this.state.immunizationDates.length < 10) ) {
            this.setState( { immunizationDatesError: 'Enter Immunization Dates' } );
            errorFlag=true;
        }else {
            this.setState( { immunizationDatesError:  false } )
        }

        if( (validator.isEmpty(this.state.emergency)) || (!this.state.emergency.length < 10) ) {
            this.setState( { emergencyError: 'Enter Emergency' } );
            errorFlag=true;
        }else {
            this.setState( { emergencyError:  false } )
        }

        if( (!this.state.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)) ||  (validator.isEmpty(this.state.password))) {
            this.setState( { passwordError: 'Password must contain 1 lowercase, 1 uppercase, 1 numeric, 1 special char and length greater than 7' } );
            errorFlag=true;
        }else {
            this.setState( { passwordError:  false } )
        }

        if( !errorFlag ) {
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
        }
        this.setState({ loading: false });
    };

    render() {
        return (
            <div>
                <Grid stackable textAlign='left' style={ { marginLeft: '2px' } } verticalAlign='top' columns={1}>
                    <Grid.Column>
                        <Header color= 'grey' size='huge' as='h1' textAlign='center' style={ { fontSize: '40px', fontFamily: '"Arial Black", Gadget, sans-serif', marginTop: '45px', color: 'white' } }>Electronic Health Record</Header>
        
                        <Divider horizontal>
                            <Header as='h4' color='grey'>
                                Patient Demographics
                            </Header>
                        </Divider>
                        <Form onSubmit={this.createNewMedicalRecord} inverted error={!!this.state.errorMessage}>
                        <label style={ { color: '#808080' } }>Patient Name</label>
                        <Form.Input
                            required
                            fluid
                            value={this.state.name}
                            onChange={event =>
                            this.setState({ name: event.target.value })}
                            placeholder='Name'
                            error={this.state.nameError}
                        />
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <label style={ { color: '#808080' } }>Gender</label>
                                <Dropdown
                                    error={this.state.genderError}
                                    placeholder='Gender'
                                    fluid
                                    selection
                                    options={this.genderOptions}
                                    onChange={event =>
                                    this.setState({ gender: event.target.value })}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label style={ { color: '#808080' } }>Date Of Birth</label>
                                <Form.Input
                                    fluid
                                    value={this.state.dob}
                                    onChange={event =>
                                    this.setState({ dob: event.target.value })}
                                    placeholder='dd/mm/yyyy'
                                    error={this.state.dobError}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label style={ { color: '#808080' } }>Mobile</label>
                                <Form.Input
                                    fluid
                                    value={this.state.mobile}
                                    onChange={event =>
                                    this.setState({ mobile: event.target.value })}
                                    placeholder='Mobile'
                                    error={this.state.mobileError}
                                />
                            </Form.Field>
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
                        </Form.Group>
                        <label style={ { color: '#808080' } }>Address</label>
                        <Form.TextArea error={this.state.paddressError} value={this.state.paddress} onChange={event => this.setState({ paddress: event.target.value })} placeholder='Address...' />
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <label style={ { color: '#808080' } }>Postal Code</label>
                                <Form.Input
                                    fluid
                                    value={this.state.postalcode}
                                    onChange={event =>
                                    this.setState({ postalcode: event.target.value })}
                                    placeholder='Postal Code'
                                    error={this.state.postalcodeError}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label style={ { color: '#808080' } }>Country</label>
                                <Dropdown
                                    error={this.state.countryError}
                                    placeholder="Country"
                                    fluid
                                    selection
                                    options={this.countryOptions}
                                    search
                                    onChange={event =>
                                    this.setState({ country: event.target.value })}
                                />
                            </Form.Field>
                        </Form.Group>
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
                        <Button
                            type='submit'
                            loading={this.state.createNewMedicalRecordLoading}
                            content='Create Contract'
                            primary
                        />
                        </Form>
                        <Divider horizontal>
                            <Header as='h4' color='grey'>
                                Medical Information
                            </Header>
                        </Divider>
                        <Form onSubmit={this.updateNonDemographicData} inverted error={!!this.state.errorMessage}>
                            <label style={ { color: '#808080' } }>Medical History</label>
                            <Form.TextArea error={this.state.medicalHistoryError}  value={this.state.medicalHistory} onChange={event => this.setState({ medicalHistory: event.target.value })}   placeholder='Medical History...' />
                            <label style={ { color: '#808080' } }>Diagnosis</label>
                            <Form.TextArea error={this.state.diagnosisError} value={this.state.diagnosis} onChange={event => this.setState({ diagnosis: event.target.value })}   placeholder='Diagnosis...' />
                            <label style={ { color: '#808080' } }>Medications</label>
                            <Form.TextArea error={this.state.medicationsError} value={this.state.medications} onChange={event => this.setState({ medications: event.target.value })}   placeholder='Medications...' />
                            <label style={ { color: '#808080' } }>Allergies</label>
                            <Form.TextArea error={this.state.allergiesError} value={this.state.allergies} onChange={event => this.setState({ allergies: event.target.value })}   placeholder='Allergies...' />
                            <label style={ { color: '#808080' } }>Progress Notes</label>
                            <Form.TextArea error={this.state.progressNotesError} value={this.state.progressNotes} onChange={event => this.setState({ progressNotes: event.target.value })}   placeholder='Progress Notes...' />
                            <label style={ { color: '#808080' } }>Vital Signs</label>
                            <Form.TextArea error={this.state.vitalSignsError} value={this.state.vitalSigns} onChange={event => this.setState({ vitalSigns: event.target.value })}   placeholder='VitalSigns...' />
                            <label style={ { color: '#808080' } }>Immunization Dates</label>
                            <Form.TextArea error={this.state.immunizationDatesError} value={this.state.immunizationDates} onChange={event => this.setState({ immunizationDates: event.target.value })}  placeholder='Immunization Dates...' />
                            <label style={ { color: '#808080' } }>Emergency</label>
                            <Form.TextArea error={this.state.emergencyError} value={this.state.emergency} onChange={event => this.setState({ emergency: event.target.value })}   placeholder='Emergency...' />
                            <Button
                                type='submit'
                                loading={this.state.updateNonDemographicDataLoading}
                                content='Upload NonDemographics Data'
                                primary
                            />
                        </Form>
                        <Divider horizontal>
                        <Header color= 'grey' as='h4'>
                            Files
                        </Header>
                        </Divider>
                    <Form onSubmit={this.updateFiles} inverted error={!!this.state.errorMessage}>
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
                        <Button
                            type='submit'
                            loading={this.state.updateFilesLoading}
                            content='Upload Files'
                            primary
                        />
                    </Form>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}
