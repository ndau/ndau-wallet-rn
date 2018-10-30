//Please be aware that to remain backwards compatible we must
//always add to or deprecate items. We CANNOT remove anything
//from this class. If you feel it shuold be removed please check
//with KP before doing so.
class PhoneData {
  constructor() {
    //a map of users containing the userId as a key
    this.users = {};
  }

  toJSON = () => {
    return {
      users: this.users
    };
  };
}

export default PhoneData;
