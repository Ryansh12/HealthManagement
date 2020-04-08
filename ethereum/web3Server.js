const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const provider = new HDWalletProvider(
    'practice middle fabric snap initial vibrant sign subway purpose wine track fiscal',
    'rinkeby.infura.io/v3/21a0b5726da24d4896ee2852293e642a'
)

const web3 = new Web3(provider);
module.exports = web3;