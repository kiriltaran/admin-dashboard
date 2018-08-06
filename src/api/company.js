import firebase from 'firebase/app';

async function getList() {
  const companies = await firebase
    .database()
    .ref('companies')
    .once('value');

  return companies.val();
}

async function getItem(id) {
  const company = await firebase
    .database()
    .ref(`companies/${id}`)
    .once('value');

  return company.val();
}

async function create(data) {
  try {
    await firebase
      .database()
      .ref('companies')
      .push(data);
  } catch (e) {
    throw e;
  }
}

async function update(id, data) {
  try {
    await firebase
      .database()
      .ref(`companies/${id}`)
      .update(data);
  } catch (e) {
    throw e;
  }
}

function uploadLogo(name, blob) {
  return new Promise((resolve, reject) => {
    const storageRef = firebase.storage().ref();
    const task = storageRef.child(`images/logos/${name}`).put(blob);

    task.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {},
      error => {
        reject(new Error(error));
      },
      () => {
        task.snapshot.ref.getDownloadURL().then(downloadURL => {
          resolve(downloadURL);
        });
      },
    );
  });
}

export default {
  getList,
  getItem,
  create,
  update,
  uploadLogo,
};
