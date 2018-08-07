/* eslint-disable */

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const secureCompare = require('secure-compare');
const subDays = require('date-fns/sub_days');
const getTime = require('date-fns/get_time');

admin.initializeApp();

function getVacanciesListByDays(days) {
  const time = getTime(subDays(new Date(), days));

  return admin
    .database()
    .ref('vacancies')
    .orderByChild('createdTime')
    .endAt(time)
    .once('value');
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
        .update({ status: 'unpublished' }));

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
