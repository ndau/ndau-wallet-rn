//Please be aware that to remain backwards compatible we must
//always add to or deprecate items. We CANNOT remove anything
//from this class. If you feel it shuold be removed please check
//with KP before doing so.
class Account {
  constructor() {
    this.address = '';
    this.addressData = {};
  }

  toJSON = () => {
    return {
      address: this.address,
      addressData: this.addressData
    };
  };
}

export default Account;
