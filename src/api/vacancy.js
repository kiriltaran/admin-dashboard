import firebase from 'firebase/app';

async function getList(companyId) {
  const vacancies = await firebase
    .database()
    .ref('vacancies')
    .orderByChild('companyId')
    .equalTo(companyId)
    .once('value');

  return vacancies.val();
}
async function getItem(id) {
  const vacancy = await firebase
    .database()
    .ref(`vacancies/${id}`)
    .once('value');

  return vacancy.val();
}
async function create(companyId, data) {
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
}
async function update(id, data) {
  try {
    await firebase
      .database()
      .ref(`vacancies/${id}`)
      .update(data);
  } catch (e) {
    throw e;
  }
}
export default {
  getList,
  getItem,
  create,
  update,
};
