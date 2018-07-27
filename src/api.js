// import axios from 'axios';
import firebase from 'firebase/app';

const api = {
  async fetchCompanies() {
    const companies = await firebase
      .database()
      .ref('companies')
      .once('value');

    return companies.val();
  },
  async fetchCompanyById(id) {
    const company = await firebase
      .database()
      .ref(`companies/${id}`)
      .once('value');

    return company.val();
  },
  async createCompany(data) {
    try {
      await firebase
        .database()
        .ref('companies')
        .push(data);
    } catch (e) {
      throw e;
    }
  },
  async updateCompany(id, data) {
    try {
      await firebase
        .database()
        .ref(`companies/${id}`)
        .update(data);
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
