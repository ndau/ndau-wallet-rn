const create64ByteRealmEncryptionKey = () => {
  let chars = '23456789ABCDEFGHJKLMNPQRSTUVWXTZabcdefghkmnopqrstuvwxyz';
  let string_length = 64;
  let randomString = '';
  for (let i = 0; i < string_length; i++) {
    let rNum = Math.floor(Math.random() * chars.length);
    randomString += chars.substring(rNum, rNum + 1);
  }

  return randomString;
};

module.exports = {
  create64ByteRealmEncryptionKey
};
