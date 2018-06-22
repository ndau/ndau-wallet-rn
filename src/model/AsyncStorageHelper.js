import User from './User';
import { AsyncStorage } from 'react-native';

const getUser = async (callback) => {
  try {
    const user = await AsyncStorage.getItem('@NdauAsyncStorage:user', callback);
    if (user !== null) {
      console.log(`user from AsyncStorage is: ${user}`);
      return user;
    } else {
      const user = new User();
      setUser(user);
      console.log(`Created a new user: ${user}`);
    }
  } catch (error) {
    console.error(error);
  }
};

const setUser = async (user) => {
  try {
    await AsyncStorage.setItem('@NdauAsyncStorage:user', JSON.stringify(user));
    console.log(`Successfully set user to: ${JSON.stringify(user, null, 2)}`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getUser,
  setUser
};
