import firebase from 'firebase/app';

function now() {
  return firebase.database.ServerValue.TIMESTAMP;
}

async function getList(companyId) {
  const vacancies = await firebase
    .database()
    .ref('vacancies')
    .orderByChild('companyId')
    .equalTo(companyId)
    .once('value');

  return vacancies.val();
}

async function create(companyId, data) {
  try {
    await firebase
      .database()
      .ref('vacancies')
      .push({
        ...data,
        companyId,
        createdTime: now(),
        publishedTime: now(),
      });
  } catch (e) {
    throw e;
  }
}

async function update(id, data) {
  try {
    await firebase
      .database()
      .ref(`vacancies/${id}`)
      .update({
        ...data,
        publishedTime: now(),
      });
  } catch (e) {
    throw e;
  }
}

export default {
  getList,
  create,
  update,
};
