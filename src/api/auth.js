import firebase from 'firebase/app';

async function getUserRole(userId) {
  const role = await firebase
    .database()
    .ref(`users/${userId}/role`)
    .once('value');

  return role.val();
}
async function signin(email, password) {
  try {
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    return user;
  } catch (e) {
    throw e;
  }
}
async function signout() {
  try {
    await firebase.auth().signOut();
  } catch (e) {
    throw e;
  }
}

export default { getUserRole, signin, signout };
