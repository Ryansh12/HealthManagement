import React, { Component } from 'react';
import Layout from '../components/layout';
import { Link } from '../routes';
import { Button, Confirm, Divider, Grid, Segment, Container } from 'semantic-ui-react';
import { Form, Header, Image, Message, Modal, Icon } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import doctor from '../ethereum/build/Doctor';
import Owner from '../ethereum/build/Owner';


export default class InsurancePage extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false, loading: false, modalContent: '', modalOpen: false, modalIcon: '', modalIconColor: ''}
    }


    open = () => this.setState({ open: true });
    close = () => this.setState({ open: false });
    handleOpen = () => this.setState({ modalOpen: true })
    handleClose = () => this.setState({ modalOpen: false })


    onCreateNew = async() => {
        this.setState({ loading: true});
        const accounts = await web3.eth.getAccounts();
        const address = new web3.eth.Contract(Owner.abi, '0xdfB83EdB42502348319816F87bAb4aA58Cd2E8f7');
        console.log(await address.methods.gerPendingRequests().call());

        // const address = new web3.eth.Contract(addressMapping.abi, '0x8B22aE72F7527eD02CAC361eC4e17fE1a21ac81e');
        // let output = await address.methods.ownerMapCheck(accounts[0]).call();
        // this.setState({ loading: false });
        // if(output == true) {
        //     this.setState({ modalContent: 'You already own a account', modalIcon: 'circle', modalIconColor: 'red' });
        //     this.handleOpen();
        // } else {
        //     await address.methods.createOwner().call({ from: accounts[0] });
        //     this.setState({ modalContent: 'You smart contract address is :-' + await address.methods.ownerMap(accounts[0]).call(), modalIcon: 'thumbs up', modalIconColor: 'green' });
        //     this.handleOpen();
        // }
        // this.setState({ addressReturned: output[1] + output[0] });
    }

    onManage = async () => {

    }

    render() {
        const isOpen = this.state.open;
        let message;

        if (isOpen) {
          message = <Confirm open={this.state.open} content={`${this.state.content}`} onConfirm={this.close} />;
        }
        return (
            <Layout>
                { message };
                <Grid textAlign='center' style={ { height:'100vh' } } verticalAlign='middle' columns={1}>
                    <Grid.Column>
                        <Button.Group size='massive' width='3'>
                            <Button color='green'  textAlign='center' icon='sign-in' content='Manage' onClick={this.onManage}></Button>
                            <Button.Or />
                            <Button loading={this.state.loading} color='blue'  textAlign='center' icon='signup' content='Create' onClick={this.onCreateNew}></Button>
                        </Button.Group>
                    </Grid.Column>
                </Grid>
                <Modal
                    trigger={<Button onClick={this.handleOpen}>Show Modal</Button>}
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    basic
                    size='small'
                >
                    <Header icon={ `${this.state.modalIcon}` } color={ `${this.state.modalIconColor}` } />
                    <Modal.Content>
                    <h3>{ `${this.state.modalContent}` } </h3>
                    </Modal.Content>
                    <Modal.Actions>
                    <Button color='green' onClick={this.handleClose} inverted>
                        <Icon name='checkmark' /> Got it
                    </Button>
                    </Modal.Actions>
                </Modal>
            </Layout>
        )
    }
}
