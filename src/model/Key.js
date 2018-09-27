class Key {
  constructor() {
    this.key = '';
    this.path = '';
    this.derivedFromRoot = '';
  }

  setKey = (key) => {
    this.key = key;
  };

  setPath = (path) => {
    this.path = path;
  };

  setDerivedFromRoot = (derivedFromRoot) => {
    this.derivedFromRoot = derivedFromRoot;
  };

  toJSON = () => {
    return {
      key: this.key,
      path: this.path,
      derivedFromRoot: this.derivedFromRoot
    };
  };
}

export default Key;
