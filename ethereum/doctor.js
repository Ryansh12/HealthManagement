import web3 from './web3';
import doctor from '../ethereum/build/Doctor';

export default address => {
  return new web3.eth.Contract(doctor.abi, '0x38c1163217a5aF0Ef8239b8901063C2c727D99aa');
};
