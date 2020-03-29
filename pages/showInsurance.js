import React, { Component } from 'react';
import web3 from '../ethereum/web3';
import Layout from '../components/layout';
import axios from 'axios';
import Insurance from '../ethereum/build/Insurance';
import RequestInsRequests from '../components/RequestRequests';
import { Segment, Header, Grid, Statistic, Message, Button, Tab, Divider, Form, Input, Progress, Card } from 'semantic-ui-react';


export class showInsurance extends Component {
    constructor(props) {
        super(props);
        this.state = { owner: 'jhjhgj', deployedAddress: 'jhjghgj', name: 'hghgf', aadhar: 'jhbjhg', details: 'jhgh', documents: '',
            amount: 0, newTitle: '', newDetails: '', newFileHash: '', bills: '', selectedFile: null, loadingFile: false, loaded: 0, requests: null,
        }
    }

    async componentDidMount() {
        const accounts = await web3.eth.getAccounts();
        console.log(";;;;;;;;;;;;;;;;;;;;;");
        // const instance1 = new web3.eth.Contract(AddMap.abi, );
        // const instance2 = new web3.eth.Contract(Owner.abi, await instance1.methods.getOwner().call() );
        // const da = await instance.methods.isPasswordCorrect().call( { from: accounts[0] } );
        const instance2 = new web3.eth.Contract(Insurance.abi, '0x046ABD4666E6fe0E6B54Dd40953B435E22a8b3BC' );
        const da = await instance2.methods.getData().call( { from: accounts[0] } );
        this.setState( { deployedAddress: da[0], owner: da[1], name: da[2], aadhar: da[3], details: da[4], documents: da[5], amount: da[6], requests: da[7] } );
        console.log('ooooooooooooooooooooooooooooooooooooooo');
        console.log(da);
    }

    fileInputRef = React.createRef();

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


        axios.post("http://localhost:3000/upload", data, {
            onUploadProgress: ProgressEvent => {
                this.setState( {
                    loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
                } )
            }
        })
        .then(res => { // then print response status
            this.setState({ bills: res.data, selectedFile: null, loadingFile: false });
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

    renderRequests = () => {
        if( this.state.requests != null ) {
            console.log( 'sanket uttarwar' );
            console.log(this.state.requests);
            return this.state.requests.map((req, index) => {
                return (
                  <RequestInsRequests
                    key={index}
                    request={req}
                  />
                );
            });
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
                        <Form onSubmit={this.onFormSubmit} inverted error={!!this.state.errorMessage}>
                        <Form.Field required>
                            <label style={ { color: '#767676' } }>Title</label>
                            <Input
                                placeholder='Title'
                                label="Title"
                                labelPosition="left"
                                value={this.state.newTitle}
                                onChange={event =>
                                this.setState({ newTitle: event.target.value })}
                            />
                        </Form.Field>
                        <Form.Field required>
                            <label style={ { color: '#767676' } }>Details</label>
                                <Input
                                    placeholder='Details'
                                    label="Details"
                                    labelPosition="left"
                                    value={this.state.newDetails}
                                    onChange={event =>
                                    this.setState({ newDetails: event.target.value })}
                                />
                        </Form.Field>
                        <Form.Field required>
                            <label style={ { color: '#767676' } }>Bills</label>
                            <Input
                                placeholder='Bills'
                                label="Bills"
                                labelPosition="left"
                                value={this.state.bills}
                                onChange={event =>
                                this.setState({ bills: event.target.value })}
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
                                    onChange={this.onFileSelect}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Button loading={this.state.loadingFile} color='green' onClick={this.uploadDocuments}>
                                Upload Files and Generate Hash
                                </Button>
                            </Form.Field>
                        </Form.Group>
                        <Progress percent={this.state.loaded} progress success>
                                success
                        </Progress>
                        <Button
                            type='submit'
                            loading={this.state.loadingIns}
                            content='Submit Request'
                            primary
                        />
                        </Form>
                    </Grid.Column>
                </Grid>
            </Tab.Pane>
            },
            { menuItem: 'Requests', render: () =>
            <Tab.Pane inverted>
                <Card.Group centered >
                    { this.renderRequests() }
                </Card.Group>
            </Tab.Pane>
            },
            { menuItem: 'Pending', render: () =>
            <Tab.Pane inverted>

            </Tab.Pane>
            },
            { menuItem: 'Approved', render: () =>
            <Tab.Pane inverted>
            </Tab.Pane>
            },
            { menuItem: 'Rejected', render: () =>
            <Tab.Pane inverted>
            </Tab.Pane>
            },
        ]

        return panes;
    }
    render() {
        return (
            <Layout>
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
        )
    }
}

export default showInsurance
