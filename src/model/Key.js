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
