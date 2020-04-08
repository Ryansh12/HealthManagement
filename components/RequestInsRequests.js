import React, { Component } from 'react';
import { Segment, Statistic, Tab, Form, Table, Card, Step, Input, Image, Progress, Header, Message, Icon, Label, Button, Grid, Dropdown, Divider } from 'semantic-ui-react';
import Owner from '../ethereum/build/Owner';
import web3 from '../ethereum/web3';


export class RequestInsRequests extends Component {
    constructor(props) {
        super(props);
        this.state = { request: null };
    }

    componentWillMount() {
        console.log('================');
        console.log(this.props.requestData);
        this.setState( { request: this.props.requestData } )
    }

    render() {
        const { Content, Header, Meta, Description } = Card;
        return (
            <Card style={ { backgroundColor: '#ffffe6' } }>
                <Content>
                    <Header>{ this.state.request[2] }</Header>
                    <Description>{ this.state.request[3] }</Description>
                </Content>
                <Content extra>
                    <div className='ui two buttons'>
                        <Button onClick={ this.getDocuments } style={ { marginBottom: '4px' } } color='blue'>
                            Get Documents
                        </Button>
                    </div>
                    {((this.state.request[8])==false)?
                    <Label as='a' color='teal' tag>
                        <Icon disabled name='hourglass end' color='white' />Pending
                    </Label>: null}

                    <Label as='a' color='teal' tag>
                        <Icon disabled name='check' color='white' />Doctor
                    </Label>


                    {(((this.state.request[5])==true)&&((this.state.request[8])==true))?
                    <Label as='a' color='teal' tag>
                        <Icon disabled name='check' color='white' />Owner
                    </Label>: null}

                    {(((this.state.request[5])==false)&&((this.state.request[8])==true))?
                    <Label as='a' color='teal' tag>
                        <Icon disabled name='close' color='white' />Owner
                    </Label>: null}
                </Content>
            </Card>
        )
    }
}

export default RequestInsRequests
