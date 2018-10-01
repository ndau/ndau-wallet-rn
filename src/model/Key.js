//Please be aware that to remain backwards compatible we must
//always add to or deprecate items. We CANNOT remove anything
//from this class. If you feel it shuold be removed please check
//with KP before doing so.
class Key {
  constructor() {
    this.key = '';
    this.path = '';
    this.derivedFromRoot = '';
  }

  toJSON = () => {
    return {
      key: this.key,
      path: this.path,
      derivedFromRoot: this.derivedFromRoot
    };
  };
}

export default Key;
