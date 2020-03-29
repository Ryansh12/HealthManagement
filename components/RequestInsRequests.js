import React, { Component } from 'react';
import { Segment, Statistic, Tab, Form, Table, Card, Step, Input, Image, Progress, Header, Message, Icon, Label, Button, Grid, Dropdown, Divider } from 'semantic-ui-react';
import Owner from '../ethereum/build/Owner';
import web3 from '../ethereum/web3';


export class RequestInsRequests extends Component {
    getDocuments = async () => {
        console.log(this.props.request[6]);
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

export default RequestInsRequests
