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
  async uploadLogo(name, blob) {
    try {
      const task = await firebase
        .storage()
        .ref(`images/logos/${name}`)
        .put(blob)
        .on(
          firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
          snapshot => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
              default:
                break;
            }
          },
          error => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;

              case 'storage/canceled':
                // User canceled the upload
                break;

              case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;

              default:
                break;
            }
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            task.snapshot.ref.getDownloadURL().then(downloadURL => downloadURL);
          },
        );
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
  async getUserRole() {
    const userId = await firebase.auth().currentUser.uid;
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
