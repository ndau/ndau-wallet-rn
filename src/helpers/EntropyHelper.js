import Randal from '../helpers/randal.js';
import SetupStore from '../model/SetupStore';
import Base64 from 'base-64';
import ErrorDialog from '../components/ErrorDialog';

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
      ErrorDialog.showError(`Problem generating entropy: ${error}`);
      return null;
    });
};

export default {
  generateEntropy
};
