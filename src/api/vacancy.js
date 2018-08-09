import firebase from 'firebase/app';
import { vacancyHelpers } from '@/api/helpers';

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
        createdTime: vacancyHelpers.now(),
        publishedTime: vacancyHelpers.getPublishedTime(null, data),
        topTime: vacancyHelpers.getTopTime(null, data),
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
        publishedTime: vacancyHelpers.getPublishedTime(id, data),
        topTime: vacancyHelpers.getTopTime(id, data),
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
