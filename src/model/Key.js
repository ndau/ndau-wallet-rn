//Please be aware that to remain backwards compatible we must
//always add to or deprecate items. We CANNOT remove anything
//from this class. If you feel it shuold be removed please check
//with KP before doing so.
class Key {
  constructor() {
    this.publicKey = '';
    this.privateKey = '';
    this.path = '';
    this.derivedFromRoot = '';
  }

  toJSON = () => {
    return {
      publicKey: this.publicKey,
      privateKey: this.privateKey,
      path: this.path,
      derivedFromRoot: this.derivedFromRoot
    };
  };
}

export default Key;
