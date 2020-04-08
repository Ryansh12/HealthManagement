const web3 = require('../ethereum/web3');
const owner = require('../ethereum/build/Owner');
deploy = async () => {
    let res = await new web3.eth.Contract(
        JSON.parse(owner.interface)
    )
    .deploy({ data: owner.evm.bytecode })
    .send({ gas: '1000000', from: accounts[0] });
    console.log( res );
}

deploy();