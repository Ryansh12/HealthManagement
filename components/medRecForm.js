import React, { Component } from 'react';
import { Link } from '../routes';
import { Form, Input, Image, Progress, Header, Message, Icon, Label, Button, Grid, Dropdown, Divider } from 'semantic-ui-react';


class medRecForm extends Component {
    constructor(props) {
        super(props);
        this.state = {errorMessage: '', selectedFile: null, billingDataLoad: false, radiologyImagesLoad: false, labResultsLoad: false};
    }
    render() {
        return (
            <Grid textAlign='left' style={ { height: '100vh' } } verticalAlign='top' columns={1}>
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
                    <Button
                        type='submit'
                        loading={this.state.loading}
                        content='Create Contract'
                        primary
                    />
                </Form>
                </Grid.Column>
            </Grid>
        );
    }
}

export default medRecForm;