import axios from 'axios';
import firebase from 'firebase/app';

const api = {
  async loadCompanies() {
    try {
      const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/users',
      );
      return data;
    } catch (e) {
      throw e;
    }
  },
  async signin(email, password) {
    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      return user;
    } catch (e) {
      throw e;
    }
  },
  async signout() {
    try {
      await firebase.auth().signOut();
    } catch (e) {
      throw e;
    }
  },
};

export default api;
