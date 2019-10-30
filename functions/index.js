const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then(user => {
      return admin
        .auth()
        .setCustomUserClaims(user.uid, { admin: true, teacher: true });
    })
    .then(() => {
      return { message: `${data.email} has been make an admin` };
    })
    .catch(err => {
      return err;
    });
});

exports.addTeacherRole = functions.https.onCall((data, context) => {
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then(user => {
      return admin.auth().setCustomUserClaims(user.uid, { teacher: true });
    })
    .then(() => {
      return { message: `${data.email} has been make a teacher` };
    })
    .catch(err => {
      return err;
    });
});
