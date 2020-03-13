import React, { Component } from 'react';
import web3 from '../ethereum/web3';
import axios from 'axios';
import Layout from '../components/layout';
import { Segment, Statistic, Tab, Form, Input, Image, Progress, Header, Message, Icon, Label, Button, Grid, Dropdown, Divider } from 'semantic-ui-react';

class OwnerHomePage extends Component {
    constructor(props) {
        super(props);
        this.state = { owner: '', insurancesIssued: 234234, pendingRequests: 34, approvedRequests: 0, rejectedRequests: 333,
            insName: '', insAadhar: 0, insAmount: 0, insDetails: '', insDocuments: '',loaded: 0, selectedFile: null, loadingFile: false,
            loadingIns: false
        }

    }

    onFileSelect=(event)=>{
        var files = event.target.files;
        this.setState({
                selectedFile: files
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
                this.setState( {
                    loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
                } )
            }
        })
        .then(res => { // then print response status
            this.setState({ insDocuments: res.data, selectedFile: null, loadingFile: false });
        })
        .catch(err => { // then print response status
        })
    }

    uploadDocuments = () => {
        if( this.state.selectedFile != null ) {
            this.setState( { 
                loadingFile: true
            } )
            this.uploadFiles();
        }
    }

    fileInputRef = React.createRef();

    getPanesData = () => {
        const panes = [
            { menuItem: 'New', render: () =>
            <Tab.Pane inverted>
                <Grid textAlign='left' style={ { height: '100vh' } } verticalAlign='top' columns={1}>
                    <Grid.Column>
                        <Header color='grey' size='huge' as='h1' textAlign='center' style={ { marginTop: '45px', color: 'white' } }>Insurance</Header>
                        <Divider horizontal>
                            <Header color='grey' as='h4' style={ { color: 'white' } }>
                                Details
                            </Header>
                        </Divider>
                        <Form onSubmit={this.onFormSubmit} inverted error={!!this.state.errorMessage}>
                        <Form.Field required>
                            <label style={ { color: '#767676' } }>Patient Name</label>
                            <Input
                                placeholder='Name'
                                label="Patient Name"
                                labelPosition="left"
                                value={this.state.insName}
                                onChange={event =>
                                this.setState({ insName: event.target.value })}
                            />
                        </Form.Field>
                        <Form.Group widths='equal'>
                            <Form.Field required>
                                <label style={ { color: '#767676' } }>Aadhar</label>
                                <Input
                                    placeholder='Aadhar'
                                    label="Aadhar"
                                    labelPosition="left"
                                    value={this.state.insAadhar}
                                    onChange={event =>
                                    this.setState({ insAadhar: event.target.value })}
                                />
                            </Form.Field>
                            <Form.Field required>
                                <label style={ { color: '#767676' } }>Amount</label>
                                <Input
                                    placeholder='Amount'
                                    label="Amount"
                                    labelPosition="left"
                                    value={this.state.insAmount}
                                    onChange={event =>
                                    this.setState({ insAmount: event.target.value })}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Field>
                            <Input
                                placeholder='Documents'
                                value={this.state.insDocuments}
                                onChange={event =>
                                this.setState({ insDocuments: event.target.value })}
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
                            content='Create Insurance'
                            primary
                        />
                        </Form>
                    </Grid.Column>
                </Grid>
            </Tab.Pane>
            },
            { menuItem: 'Insurances Issued', render: () =>
            <Tab.Pane inverted>
                Tab 2 Content
            </Tab.Pane>
            },
            { menuItem: 'Tab 3', render: () =>
            <Tab.Pane inverted>
                Tab 3 Content
            </Tab.Pane>
            },
        ]

        return panes;
    }

    handleChange = (e, data) => this.setState(data);

    componentDidMount() {
        this.setState( { 
            owner: 'asdsadsadsadasd',
         } )
    }

    render() {
        return (
            <Layout>
                <Segment stacked inverted>
                    <Header color={"grey"}  as='h1'>Dashboard</Header>
                    <Grid inverted stackable>
                        <Grid.Row>
                            <Grid.Column columns={1}>
                            <Statistic inverted size='tiny' color='red' inverted>
                                <Statistic.Value>{ this.state.owner }</Statistic.Value>
                                <label style={ { color: '#767676' } }>Owner</label>
                            </Statistic>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row  columns={2}>
                            <Grid.Column width={3}>
                                <Statistic inverted size='tiny' color='orange' inverted>
                                    <Statistic.Value>{ this.state.insurancesIssued }</Statistic.Value>
                                    <label style={ { color: '#767676' } }>Insurances Issued</label>
                                </Statistic>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Statistic inverted size='tiny' color='green' inverted>
                                    <Statistic.Value>{ this.state.pendingRequests }</Statistic.Value>
                                    <label style={ { color: '#767676' } }>Requests Pending</label>
                                </Statistic>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row  columns={2}>
                            <Grid.Column width={3}>
                                <Statistic inverted size='tiny' color='teal' inverted>
                                    <Statistic.Value>{ this.state.approvedRequests }</Statistic.Value>
                                    <label style={ { color: '#767676' } }>Requests Approved</label>
                                </Statistic>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Statistic inverted size='tiny' color='violet' inverted>
                                    <Statistic.Value>{ this.state.rejectedRequests }</Statistic.Value>
                                    <label style={ { color: '#767676' } }>Requests Rejected</label>
                                </Statistic>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Tab defaultActiveIndex={1} menu={{ color: 'purple', inverted: true }} inverted style={ { marginTop: '4px' } } panes={this.getPanesData()} onTabChange={this.handleChange} />
                </Segment>
            </Layout>
        )
    }
}

export default OwnerHomePage;
