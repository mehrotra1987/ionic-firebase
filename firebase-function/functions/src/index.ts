import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
//import * as cors from 'cors';

admin.initializeApp();

export const addAdminRole = functions.https.onCall((data: any, context: any) => {
    // get user and add admin custom claim
    return admin.auth().getUserByEmail(data.email).then(user => {
		console.log(user.uid, "s")
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true
        })
    }).then(() => {
        return {
            message: `Success! ${data.email} has been made an admin.`
        }
    }).catch(err => {
        return err;
    });
});
