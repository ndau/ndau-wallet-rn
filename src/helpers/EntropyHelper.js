import Randal from '../helpers/randal.js';
import SetupStore from '../model/SetupStore';
import Base64 from 'base-64';

const generateEntropy = () => {
  this.randal = new Randal();
  this.randal
    .init()
    .then(() => {
      const entropy = Base64.encode(this.randal.getHash().substr(0, 16));
      SetupStore.entropy = entropy;
      return entropy;
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
};

export default {
  generateEntropy
};
