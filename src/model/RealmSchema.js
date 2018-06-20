import Realm from 'realm';

const UserSchema = {
  name: 'User',
  properties: {
    setupStep: { type: 'string', default: 'ndau.SetupMain' },
    userToken: 'string',
    password: 'string',
    twelveWorldPhrase: 'string',
    eaiNode: 'string'
  }
};

const openRealm = () => {
  // const realmEncryptionKey = Int8Array.from(
  //   'bHdDDA0xc2i1qD9x0RePlr2kUv8X/ytoe4nG5cP/vId6QOLmiXLsqmio/FNujYJh'
  // );
  const realmEncryptionKey = new Int8Array(64);
  //TODO: Android does not seem to support Int8Array methods
  // realmEncryptionKey.fill(34, 21, 58);

  return Realm.open({ schema: [ UserSchema ], encryptionKey: realmEncryptionKey });
};

module.exports = {
  openRealm
};
