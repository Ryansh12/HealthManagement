import React, { Component } from 'react';
import web3 from '../ethereum/web3';
import Layout from '../components/layout';
import axios from 'axios';
import ins from '../ethereum/build/Insurance';
import validator from 'validator';
// import { InputFile } from 'semantic-ui-react-input-file';
import RequestInsRequests from '../components/RequestInsRequests';
import { Segment, Header, Icon, Loader, Modal, Dimmer, Grid, Statistic, Message, Button, Tab, Divider, Form,  Progress, Card } from 'semantic-ui-react';


export class showInsurance extends Component {
    constructor(props) {
        super(props);
        this.state = { owner: 'jhjhgj', deployedAddress: 'jhjghgj', name: 'hghgf', aadhar: 'jhbjhg', details: 'jhgh', documents: '',
            amount: 0, newTitle: '', newTitleError: false, newDetails: '', newDetailsError: false, newFileHash: '', newFileHashError: false, selectedFile: null, loadingFile: false, loaded: 0, requests: null,
            newRequestFormLoading: false, errorMessage: '', isModalOpen: false, modalContent: '', modalHeader: '', modalIconColor: 'red', modalIconName: 'clock', isLoaderDimmerActive: false, loadderDimmerContent: 'asdasd'
        }
    }

    modalTopple = () => {
        alert('asdasd');
        this.setState({ isModalOpen: !this.state.isModalOpen });
    }

    componentWillMount() {

    }

    newInsuranceForm = async (e) => {
        let dta = 'QmY2Z3DftKwdc79MdJBCj2PQT5dMTpzvX5kUFefd5AHc9B';
        console.log(dta);
        axios.get("https://blockchainhealthmanagement.herokuapp.com/download",  {
            params: {
              data: dta
            }
          })
        .then(res => { // then print response status
            this.setState({ newFileHash: res.data, selectedFile: null, loadingFile: false });
        })
        .catch(err => { // then print response status
        })

        e.preventDefault();
        let errorFlag
        if( (validator.isEmpty(this.state.newTitle))) {
            this.setState( { newTitleError: 'Enter Title' } );
            errorFlag=true;
        }else {
            this.setState( { newTitleError:  false } )
        }

        if( (validator.isEmpty(this.state.newDetails))) {
            this.setState( { newDetailsError: 'Enter Details' } );
            errorFlag=true;
        }else {
            this.setState( { newDetailsError:  false } )
        }

        if( (validator.isEmpty(this.state.newFileHash))) {
            this.setState( { newFileHashError: 'Upload File' } );
            errorFlag=true;
        }else {
            this.setState( { newFileHashError:  false } )
        }

        if(!errorFlag) {
            this.setState( { newRequestFormLoading: true, errorMessage: '' } );

            try {
                const address = new web3.eth.Contract(ins.abi, deployedAddress);
                console.log(accounts[0]);
                isDoctorAllowed = await address.methods.applyClaim(this.state.newTitle, this.state.newDetails, this.state.newFileHash).send( { from: accounts[0] } );
            } catch (err) {
                this.setState({ errorMessage: err.message });
            }
            this.setState( { newRequestFormLoading: false } );
        }
    }

    onFileSelect=(event)=>{
        var files = event.target.files;
        this.setState({
                selectedFile: files
        })
    }

    uploadFiles = () => {
        console.log(this.state.selectedFile.length);
        const data = new FormData();
        for(var x = 0; x<this.state.selectedFile.length; x++) {
            data.append('file', this.state.selectedFile[x])
        }


        axios.post("https://blockchainhealthmanagement.herokuapp.com/upload", data, {
            onUploadProgress: ProgressEvent => {
                this.setState( {
                    loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
                } )
            }
        })
        .then(res => { // then print response status
            this.setState({ newFileHash: res.data, selectedFile: null, loadingFile: false });
        })
        .catch(err => { // then print response status
        })
    }

    getDocuments = async () => {

    }

    uploadDocuments = async () => {
        if( this.state.selectedFile != null && this.state.loadingFile == false ) {
            this.setState( { 
                loadingFile: true
            } )
            this.uploadFiles();
        }
    }

    renderRequests = (input) => {
        if( input == 'pending' ) {
            if( this.state.requests != null ) {
                console.log( 'sanket uttarwar' );
                console.log(this.state.requests);
                return this.state.requests.filter((req) => {
                    return (req[8] == false)
                }).map((req, index) => {
                    console.log(req);
                    return (
                      <RequestInsRequests
                        key={index}
                        requestData={req}
                      />
                    );
                });
            }
        } else if( input == 'approved' ) {
            if( this.state.requests != null ) {
                console.log( 'sanket uttarwar' );
                console.log(this.state.requests);
                return this.state.requests.filter((req) => {
                    return ((req[8] == true) && (req[5] == true))
                }).map((req, index) => {
                    console.log(req);
                    return (
                      <RequestInsRequests
                        key={index}
                        requestData={req}
                      />
                    );
                });
            }
        }else {
            if( this.state.requests != null ) {
                console.log( 'sanket uttarwar' );
                console.log(this.state.requests);
                return this.state.requests.filter((req) => {
                    return ((req[8] == true) && (req[5] == false))
                }).map((req, index) => {
                    console.log(req);
                    return (
                      <RequestInsRequests
                        key={index}
                        requestData={req}
                      />
                    );
                });
            }
        }
    }

    getPanesData = () => {
        const panes = [
            { menuItem: 'New', render: () =>
            <Tab.Pane inverted>
                <Grid textAlign='left' style={ { height: '100vh' } } verticalAlign='top' columns={1}>
                    <Grid.Column>
                        <Header color='grey' size='huge' as='h1' textAlign='center' style={ { marginTop: '45px', color: 'white' } }>Insurance</Header>
                        <Divider horizontal>
                            <Header color='grey' as='h4' style={ { color: 'white' } }>
                                New Request
                            </Header>
                        </Divider>
                        <Form onSubmit={this.newInsuranceForm} inverted error={!!this.state.errorMessage}>
                        <Form.Field>
                            <label style={ { color: '#808080' } }>Title</label>
                            <Form.Input
                                fluid
                                value={this.state.newTitle}
                                onChange={event =>
                                this.setState({ newTitle: event.target.value })}
                                placeholder='Title'
                                error={this.state.newTitleError}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label style={ { color: '#808080' } }>Details</label>
                            <Form.Input
                                fluid
                                value={this.state.newDetails}
                                onChange={event =>
                                this.setState({ newDetails: event.target.value })}
                                placeholder='Details'
                                error={this.state.newDetailsError}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label style={ { color: '#808080' } }>Bills</label>
                            <Form.Input
                                fluid
                                value={this.state.newFileHash}
                                onChange={event =>
                                this.setState({ newFileHash: event.target.value })}
                                placeholder='FileHash'
                                error={this.state.newFileHashError}
                            />
                        </Form.Field>
                        <Form.Group>
                            <Form.Field>

                            <Button floated style={ { height: '36.5px' } } color='red' as="label" htmlFor="file" type="button">
                            <Icon name='upload' size='large' />Select Files For Upload
</Button>
<input type="file" id="file" style={{ visibility: "hidden", display: 'none' }} multiple onChange={this.onFileSelect} />
                            </Form.Field>
                            <Form.Field>
                                <Button disabled={this.state.loadingFile} loading={this.state.loadingFile} color='green' onClick={this.uploadDocuments}>
                                Upload Files and Generate Hash
                                </Button>
                            </Form.Field>
                        </Form.Group>
                        <Progress percent={this.state.loaded} progress success>
                                success
                        </Progress>
                        <Message hidden={!this.state.errorMessage.length != 0} header="Oops!" content={this.state.errorMessage} />
                        <Button
                            type='submit'
                            loading={this.state.newRequestFormLoading}
                            disabled={this.state.newRequestFormLoading}
                            content='Submit Request'
                            primary
                        />
                        </Form>
                    </Grid.Column>
                </Grid>
                <style jsx>
    {
        `
        .inputfile {
            visibility: hidden;
        }
        `
    }
</style>
            </Tab.Pane>
            },
            { menuItem: 'Pending', render: () =>
            <Tab.Pane inverted>
                <Card.Group centered >
                    { this.renderRequests('pending') }
                </Card.Group>
            </Tab.Pane>
            },
            { menuItem: 'Approved', render: () =>
            <Tab.Pane inverted>
                <Card.Group centered >
                    { this.renderRequests('approved') }
                </Card.Group>
            </Tab.Pane>
            },
            { menuItem: 'Rejected', render: () =>
            <Tab.Pane inverted>
                <Card.Group centered >
                    { this.renderRequests('rejected') }
                </Card.Group>
            </Tab.Pane>
            },
        ]

        return panes;
    }
    render() {
        return (
            <div>
                <Layout>
                <Dimmer active={this.state.isLoaderDimmerActive}>
                    <Loader>{this.state.loadderDimmerContent}</Loader>
                </Dimmer>
                <Modal open={this.state.isModalOpen} inverted>
                    <Header><Icon color={ this.state.modalIconColor } name={ this.state.modalIconName } size='big'/>{ this.state.modalHeader }</Header>
                    <Modal.Content>{ this.state.modalContent }</Modal.Content>
                    <Modal.Actions>
                        <Button color='blue' onClick={this.modalTopple} inverted>
                        <Icon name='checkmark' /> Ok
                        </Button>
                    </Modal.Actions>
                </Modal>
                <Segment stackable color='black' inverted style={ { height: '100vh' } }>
                    <Header color={"grey"}  as='h1'>Insurance</Header>                    
                    <Grid inverted stackable>
                        <Grid.Column>
                            <Grid.Row style={ { marginBottom: '4px' } }>
                                <Statistic inverted size='tiny' color='blue' inverted>
                                    <Statistic.Value>{ this.state.owner }</Statistic.Value>
                                    <label style={ { color: '#767676' } }>Owner</label>
                                </Statistic>
                            </Grid.Row>
                            <Grid.Row style={ { marginBottom: '4px' } }>
                                <Statistic inverted size='tiny' color='blue' inverted>
                                    <Statistic.Value>{ this.state.deployedAddress }</Statistic.Value>
                                    <label style={ { color: '#767676' } }>Deployed Address</label>
                                </Statistic>
                            </Grid.Row>
                        </Grid.Column>
                    </Grid>

                    <Grid stackable>
                        <Grid.Row columns={3}>
                            <Grid.Column>
                                <label style={ { color: '#767676' } }>Name</label>
                                <Message content={ this.state.name } style={ { background: '#767676' } }></Message>
                            </Grid.Column>
                            <Grid.Column>
                                <label style={ { color: '#767676' } }>Aadhar</label>
                                <Message content={ this.state.aadhar } style={ { background: '#767676' } }></Message>
                            </Grid.Column>
                            <Grid.Column>
                                <label style={ { color: '#767676' } }>Amount</label>
                                <Message content={ this.state.amount } style={ { background: '#767676' } }></Message>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <label style={ { color: '#767676' } }>Details</label>
                                <Message content={ this.state.details } style={ { background: '#767676' } }></Message>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Button onClick={ this.getDocuments } style={ { marginBottom: '4px' } } color='blue'>
                                    Get Documents
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Tab defaultActiveIndex={1} menu={{ color: 'purple', inverted: true }} inverted style={ { marginTop: '4px' } } panes={this.getPanesData()} onTabChange={this.handleChange} />
                </Segment>
            </Layout>
<style jsx>
    {
        `
        .inputfile {
            width: 0.1px;
            height: 0.1px;
            opacity: 0;
            overflow: hidden;
            position: absolute;
            z-index: -1;
        }
        `
    }
</style>
            </div>
            )
    }
}

export default showInsurance
