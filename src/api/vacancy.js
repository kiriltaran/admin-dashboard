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
    const publishedTime = await vacancyHelpers.getPublishedTime(null, data);
    const topTime = await vacancyHelpers.getTopTime(null, data);
    const createdTime = vacancyHelpers.now();

    await firebase
      .database()
      .ref('vacancies')
      .push({
        ...data,
        companyId,
        createdTime,
        publishedTime,
        topTime,
      });
  } catch (e) {
    throw e;
  }
}

async function update(id, data) {
  try {
    const publishedTime = await vacancyHelpers.getPublishedTime(id, data);
    const topTime = await vacancyHelpers.getTopTime(id, data);

    await firebase
      .database()
      .ref(`vacancies/${id}`)
      .update({
        ...data,
        publishedTime,
        topTime,
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
