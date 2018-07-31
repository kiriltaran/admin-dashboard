import firebase from 'firebase/app';

const api = {
  // COMPANY
  async fetchCompanies() {
    const companies = await firebase
      .database()
      .ref('companies')
      .once('value');

    return companies.val();
  },
  async fetchCompany(id) {
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
  // VACANCY
  async fetchVacancies(companyId) {
    const vacancies = await firebase
      .database()
      .ref('vacancies')
      .orderByChild('companyId')
      .equalTo(companyId)
      .once('value');

    return vacancies.val();
  },
  async fetchVacancy(id) {
    const vacancy = await firebase
      .database()
      .ref(`vacancies/${id}`)
      .once('value');

    return vacancy.val();
  },
  async createVacancy(companyId, data) {
    try {
      await firebase
        .database()
        .ref('vacancies')
        .push({
          ...data,
          companyId,
          createdTime: firebase.database.ServerValue.TIMESTAMP,
        });
    } catch (e) {
      throw e;
    }
  },
  async updateVacancy(id, data) {
    try {
      await firebase
        .database()
        .ref(`vacancies/${id}`)
        .update(data);
    } catch (e) {
      throw e;
    }
  },
  // AUTH
  getUserId() {
    const userId = firebase.auth().currentUser.uid;
    return userId;
  },
  async getUserRole() {
    const userId = this.getUserId();
    const role = await firebase
      .database()
      .ref(`users/${userId}/role`)
      .once('value');

    return role.val();
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
