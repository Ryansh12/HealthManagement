import React, { Component } from 'react';
import web3 from '../ethereum/web3';
import axios from 'axios';
import Layout from '../components/layout';
import Owner from '../ethereum/build/Owner';
// import AddMap from '../ethereum/build/AddressMapping';
// import {Router} from '../routes';
import validator from 'validator';

import RequestRequests from '../components/RequestRequests';
import { Segment, Statistic, Tab, Form, Table, Card, Confirm, Input,  Progress, Header,  Icon,  Button, Grid,  Divider } from 'semantic-ui-react';

class OwnerHomePage extends Component {
    constructor(props) {
        super(props);
        this.state = { owner: '', insurancesIssuedNum: 234234, pendingRequestsNum: 34, approvedRequestsNum: 0, rejectedRequestsNum: 333,
            insurancesIssued: null, pendingRequests: null,
            insName: '', insNameError: false, insAadhar: '', insAadharError: false, insAmount: '', insAmountError: false, insDetails: '', insDetailsError: false, insDocuments: '', insDocumentsError: false, loaded: 0, selectedFile: null, loadingFile: false,
            loadingIns: false, isDashBoardActive: true, isLoginActive: false, password: 'jhbjh', passwordModal: false
        }
    }

    async componentDidMount() {

        console.log(this.props.slug);
        console.log("sasasas")
        this.setState( { 
            owner: 'asdsadsadsadasd',
         } )
    }

    onFileSelect=(event)=>{
        var files = event.target.files;
        this.setState({
                selectedFile: files
        })
    }

    passwordModalFun= () => {
        this.setState( { passwordModal: !this.state.passwordModal } );
    }

    handleDateChangeRaw = (e) => {
        e.preventDefault();
    }

    onFormSubmit = async () => {
        let errorFlag = false;

        if( (!validator.isAlpha(this.state.insName)) || (validator.isEmpty(this.state.insName)) ) {
            this.setState( { insNameError: 'Incorrect Name' } );
            errorFlag=true;
        }else {
            this.setState( { insNameError:  false } )
        }

        if( (!validator.isNumeric(this.state.insAadhar)) ||  (validator.isEmpty(this.state.insAadhar)) || (this.state.insAadhar.length != 12)) {
            this.setState( { insAadharError: 'Enter Correct Aadhar Number' } );
            errorFlag=true;
        }else {
            this.setState( { insAadharError:  false } )
        }

        if( (this.state.insAmount > 100000000) || (validator.isEmpty(this.state.insAmount)) ) {
            this.setState( { insAmountError: 'Enter Correct Amount' } );
            errorFlag=true;
        }else {
            this.setState( { insAmountError:  false } )
        }

        if( (this.state.insDocuments.length !== 46) || (validator.isEmpty(this.state.insDocuments)) ) {
            this.setState( { insDocumentsError: 'Enter Correct Amount' } );
            errorFlag=true;
        }else {
            this.setState( { insDocumentsError:  false } )
        }

        if( !errorFlag ) {

        }
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

    renderRequests = () => {
        let filteredPendingRequests = this.state.pendingRequests.filter(function(request) {
            return (request[0] != '0x0000000000000000000000000000000000000000');
        });
        return filteredPendingRequests.map((req, index) => {
            return (
              <RequestRequests
                key={index}
                request={req}
              />
            );
        });
    }

    renderTable = () => {
        // console.log('inside');
        // console.log(this.state.insurancesIssued);
        // const { Row, Cell } = Table;
        // return this.state.insurancesIssued.map( ( n, i ) => {
        //     return (
        //         <Row>
        //             <Cell><div>{ n }</div></Cell>
        //         </Row>
        //     );
        // } );
    }

    fileInputRef = React.createRef();

    getPanesData = () => {
        const panes = [
            { menuItem: 'New', render: () =>
            <Tab.Pane inverted>
                <Grid textAlign='left' style={ { height: '100vh' } } verticalAlign='top' columns={1}>
                    <Grid.Column>
                    <Header color= 'grey' size='huge' as='h1' textAlign='center' style={ { fontSize: '40px', fontFamily: '"Arial Black", Gadget, sans-serif', marginTop: '45px', color: 'white' } }>Insurance</Header>
                        <Divider horizontal>
                            <Header color='grey' as='h4' style={ { color: 'white' } }>
                                Details
                            </Header>
                        </Divider>
                        <Form onSubmit={this.onFormSubmit} inverted error={!!this.state.errorMessage}>
                        <Form.Field>
                            <label style={ { color: '#767676' } }>Patient Name</label>
                            <Form.Input
                                fluid
                                value={this.state.insName}
                                onChange={event =>
                                this.setState({ insName: event.target.value })}
                                placeholder='Name'
                                error={this.state.insNameError}
                            />
                        </Form.Field>
                        <Form.Group widths='equal'>
                            <Form.Field>
                                <label style={ { color: '#767676' } }>Aadhar</label>
                                <Form.Input
                                    fluid
                                    value={this.state.insAadhar}
                                    onChange={event =>
                                    this.setState({ insAadhar: event.target.value })}
                                    placeholder='Aadhar'
                                    error={this.state.insAadharError}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label style={ { color: '#767676' } }>Amount</label>
                                <Form.Input
                                    fluid
                                    value={this.state.insAmount}
                                    onChange={event =>
                                    this.setState({ insAmount: event.target.value })}
                                    placeholder='Amount'
                                    error={this.state.insAmountError}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Field>
                            <label style={ { color: '#767676' } }>Documents</label>
                            <Form.Input
                                fluid
                                value={this.state.insDocuments}
                                onChange={event =>
                                this.setState({ insDocuments: event.target.value })}
                                placeholder='Name'
                                error={this.state.insDocumentsError}
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
                <Table color='violet' inverted>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Insurance Issued</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        { this.renderTable() }
                    </Table.Body>
                </Table>
            </Tab.Pane>
            },
            { menuItem: 'Pending', render: () =>
            <Tab.Pane inverted>
                <Card.Group centered >
                    { this.renderRequests() }
                </Card.Group>
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

    ownerSignin = async () => {
        const accounts = await web3.eth.getAccounts();
        console.log(";;;;;;;;;;;;;;;;;;;;;dddddddddddd");
        // const instance1 = new web3.eth.Contract(AddMap.abi, );
        // const instance2 = new web3.eth.Contract(Owner.abi, await instance1.methods.getOwner().call() );
        // const da = await instance.methods.isPasswordCorrect().call( { from: accounts[0] } );
        const instance2 = new web3.eth.Contract(Owner.abi, '0xB68F268aCB52bfC3732b1126e859EFE008e6A336' );
        console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhh');
        const da = await instance2.methods.getData().call( { from: accounts[0] } );
        console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhh');

        if(da[0] == false) {
            this.setState( { passwordModal: true } );
        }
        this.setState( { insurancesIssuedNum: da[1], pendingRequestsNum: da[2], approvedRequestsNum: da[3], rejectedRequestsNum: da[4], insurancesIssued: da[5], pendingRequests: da[6] } );
        this.setState( { isLoginActive: false, isDashBoardActive: true } );
        console.log('ooooooooooooooooooooooooooooooooooooooo');
        console.log(da);
    }

    ownerSignup= () => {

    }

    handleChange = (e, data) => this.setState(data);

    render() {
        return (
            <Layout>
                {this.state.isDashBoardActive?
                <Segment stacked inverted style={ { height: '100vh' } }>
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
                                    <Statistic.Value>{ this.state.insurancesIssuedNum }</Statistic.Value>
                                    <label style={ { color: '#767676' } }>Insurances Issued</label>
                                </Statistic>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Statistic inverted size='tiny' color='green' inverted>
                                    <Statistic.Value>{ this.state.pendingRequestsNum }</Statistic.Value>
                                    <label style={ { color: '#767676' } }>Requests Pending</label>
                                </Statistic>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row  columns={2}>
                            <Grid.Column width={3}>
                                <Statistic inverted size='tiny' color='teal' inverted>
                                    <Statistic.Value>{ this.state.approvedRequestsNum }</Statistic.Value>
                                    <label style={ { color: '#767676' } }>Requests Approved</label>
                                </Statistic>
                            </Grid.Column>
                            <Grid.Column width={3}>
                                <Statistic inverted size='tiny' color='violet' inverted>
                                    <Statistic.Value>{ this.state.rejectedRequestsNum }</Statistic.Value>
                                    <label style={ { color: '#767676' } }>Requests Rejected</label>
                                </Statistic>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <Tab defaultActiveIndex={1} menu={{ color: 'purple', inverted: true }} inverted style={ { marginTop: '4px' } } panes={this.getPanesData()} onTabChange={this.handleChange} />
                </Segment>:null
                }
                {this.state.isLoginActive?
                <Segment stacked inverted style={ { height: '100vh' } }>
                    <Grid textAlign='center' style={{ height: '80vh' }} verticalAlign='middle'>
                        <Grid.Column style={{ maxWidth: 450 }}>
                            <Header as='h2' color='teal' textAlign='center'>
                                Log-in to your account
                            </Header>
                                <Input label='Password' fluid onChange={event => this.setState({ password: event.target.value })} value={ this.state.password } type='password' placeholder='Password' style={ { marginBottom: '4px' } }></Input>
                                <Button onClick={this.ownerSignin} color='blue' type='submit'><Icon name='sign-in' />Sign-In</Button>
                                <Button onClick={this.ownerSignup} color='green' c type='submit'><Icon name='signup' />Create</Button>
                        </Grid.Column>
                    </Grid>
                </Segment>:null}
                <Confirm
                    open={this.state.passwordModal}
                    onCancel={this.passwordModalFun}
                    onConfirm={this.passwordModalFun}
                    content='Incorrect Password'
                />
            </Layout>
        )
    }
}

export default OwnerHomePage;
