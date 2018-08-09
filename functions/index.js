/* eslint-disable */

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const secureCompare = require('secure-compare');
const subDays = require('date-fns/sub_days');
const getTime = require('date-fns/get_time');
const parse = require('date-fns/parse');
const differenceInDays = require('date-fns/difference_in_days');

const PUBLISHED_TIME_FIELD = 'publishedTime';
const TOP_TIME_FIELD = 'topTime';
const UNPUBLISHED_STATUS = 'unpublished';
const REGULAR_STATUS = 'regular';

admin.initializeApp();

function getVacanciesListByDays(days) {
  const time = getTime(subDays(new Date(), days));

  return admin
    .database()
    .ref('vacancies')
    .orderByChild(PUBLISHED_TIME_FIELD)
    .endAt(time)
    .once('value');
}

function getVacanciesListByStatus(status) {
  return admin
    .database()
    .ref('vacancies')
    .orderByChild('status')
    .equalTo(status)
    .once('value');
}

function isTopVacancyOld(vacancy) {
  return differenceInDays(parse(vacancy[TOP_TIME_FIELD]), new Date()) > 7;
}

exports.unpublish = functions.https.onRequest((req, res) => {
  const key = req.query.key;
  if (!secureCompare(key, functions.config().cron.key)) {
    console.log('The key provided in the request does not match');
    res.status(403).send('Security key does not match.');
    return null;
  }

  getVacanciesListByDays(30)
    .then(snapshot => {
      const vacancies = snapshot.toJSON();
      // prettier-ignore
      const promises = Object.keys(vacancies).map(id => admin
        .database()
        .ref('vacancies/' + id)
        .update({ status: UNPUBLISHED_STATUS }));

      Promise.all(promises)
        .then(() => res.send('ok'))
        .catch(err => res.status(400).send(err));

      return null;
    })
    .catch(err => {
      res.send(err);
      return null;
    });
});

exports.untop = functions.https.onRequest((req, res) => {
  const key = req.query.key;
  if (!secureCompare(key, functions.config().cron.key)) {
    console.log('The key provided in the request does not match');
    res.status(403).send('Security key does not match.');
    return null;
  }

  getVacanciesListByStatus('top')
    .then(snapshot => {
      const vacancies = snapshot.toJSON();
      const oldTopVacancies = vacancies.filter(v => isTopVacancyOld(v));
      // prettier-ignore
      const promises = oldTopVacancies.map(id =>
        admin
          .database()
          .ref('vacancies/' + id)
          .update({ status: REGULAR_STATUS }));

      Promise.all(promises)
        .then(() => res.send('ok'))
        .catch(err => res.status(400).send(err));

      return null;
    })
    .catch(err => {
      res.send(err);
      return null;
    });
});
