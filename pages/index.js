// import Layout from '../components/layout';
import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
// import { Link } from '../routes';
import web3 from '../ethereum/web3';
import doctor from '../ethereum/build/Owner';


class index extends Component {
    onSubmit = async()=>{
        console.log("ggggggggggggggggg");
        const accounts = await web3.eth.getAccounts();

        console.log('Attempting to deploy from account', accounts[0]);
        const result = await new web3.eth.Contract(
          doctor.abi
        )
          .deploy({ data: '0x'+doctor.evm.bytecode.object, arguments: [accounts[0]] })
          .send({ gas: '9000000', from: accounts[0] });
        console.log('Contract deployed to', result.options.address);
    }
    render() {
        return (
        <div>
            <Button onClick={this.onSubmit}>sdfjhsdhgfsjdf</Button>
        </div>
        );
    }
}

export default index;
