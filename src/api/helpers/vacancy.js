import firebase from 'firebase/app';

async function getVacancy(id) {
  const vacancy = await firebase
    .database()
    .ref(`vacancies/${id}`)
    .once('value');

  return vacancy.val();
}

function now() {
  return firebase.database.ServerValue.TIMESTAMP;
}

function isPublished(vacancy) {
  return vacancy.status === 'regular' || vacancy.status === 'top';
}

function isTop(vacancy) {
  return vacancy.status === 'top';
}

async function getPublishedTime(vacancyId, vacancy) {
  let result = null;
  if (!vacancy || !vacancyId) {
    return result;
  }

  const oldVacancy = await getVacancy(vacancyId);
  if (isPublished(vacancy)) {
    result = now();
    if (oldVacancy && isPublished(oldVacancy)) {
      result = oldVacancy.publishedTime;
    }
  }

  return result;
}

async function getTopTime(vacancyId, vacancy) {
  let result = null;

  if (!vacancy || !vacancyId) {
    return result;
  }

  const oldVacancy = await getVacancy(vacancyId);
  if (isTop(vacancy)) {
    result = now();
    if (isTop(oldVacancy)) {
      result = oldVacancy.publishedTime;
    }
  }

  return result;
}

export default {
  getVacancy,
  now,
  isPublished,
  isTop,
  getPublishedTime,
  getTopTime,
};
