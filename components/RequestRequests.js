import React, { Component } from 'react';
import { Segment, Statistic, Tab, Form, Table, Card, Step, Input, Image, Progress, Header, Message, Icon, Label, Button, Grid, Dropdown, Divider } from 'semantic-ui-react';
import Owner from '../ethereum/build/Owner';
import web3 from '../ethereum/web3';


export class RequestRequests extends Component {
    getDocuments = async () => {
        console.log(this.props.request[6]);
    }

    approveRequest = async () => {
        const accounts = await web3.eth.getAccounts();
        console.log("pppppppppppppppiiiiiiiiiiiiiii         j");
        // const instance1 = new web3.eth.Contract(AddMap.abi, );
        // const instance2 = new web3.eth.Contract(Owner.abi, await instance1.methods.getOwner().call() );
        // const da = await instance.methods.isPasswordCorrect().call( { from: accounts[0] } );
        console.log(this.props.request[8])
        const instance2 = new web3.eth.Contract(Owner.abi, this.props.request[0] );
        const da = await instance2.methods.approveCancelRequest( [ this.props.request[8] ], [ true ] ).send( { from: accounts[0] } );
        if(da == true) {
            alert("SAdasdasdas");
        }
    }

    render() {
        const { Content, Header, Meta, Description } = Card;
        const { key, request } = this.props;
        return (
            <Card style={ { backgroundColor: '#ffffe6' } }>
                <Content>
                    <Header>{ request[2] }</Header>
                    <Meta>Friends of Elliot</Meta>
                    <Description>{ request[3] }</Description>
                </Content>
                <Content extra>
                    <div className='ui two buttons'>
                        <Button onClick={ this.getDocuments } style={ { marginBottom: '4px' } } color='blue'>
                            Get Documents
                        </Button>
                    </div>
                    <div className='ui two buttons'>
                        <Button.Group style={ { width: '100%', marginBottom: '4px' } }>
                            <Button onClick={ this.approveRequest } color='green' size='large'>Approve</Button>
                            <Button.Or />
                            <Button onClick={ this.rejectRequest } color='red' size='large'>Reject</Button>
                        </Button.Group>
                    </div>
                    <Label icon='hourglass end' as='a' color='teal' tag>
                        <Icon disabled name='check' color='white' />Doctor
                    </Label>
                    <Label icon='hourglass end' as='a' color='teal' tag>
                        <Icon disabled name='hourglass end' color='white' />Owner
                    </Label>
                </Content>
            </Card>
        )
    }
}

export default RequestRequests
