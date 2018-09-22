import Randal from '../helpers/randal.js';
import SetupStore from '../model/SetupStore';
import Base64 from 'base-64';

const generateEntropy = () => {
  this.randal = new Randal();
  this.randal
    .init()
    .then(() => {
      SetupStore.setEntropy(Base64.encode(this.randal.getHash().substr(0, 16)));
    })
    .catch((error) => {
      console.error(error);
    });
};

export default {
  generateEntropy
};
