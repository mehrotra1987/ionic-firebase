import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
//import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
//import * as functions from 'firebase-functions';
//  import * as admin from 'firebase-admin';
import { Observable, of } from 'rxjs';
import { AngularFireFunctions } from '@angular/fire/functions';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  userProfileData: AngularFireList<any>;

  constructor(public afAuth: AngularFireAuth, private db: AngularFireDatabase, private afs: AngularFireFunctions, private http: HttpClient) { }

  registerUser(registerData): Observable<any> {
    let auth = this.afAuth.createUserWithEmailAndPassword(registerData.email, registerData.password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        // this.SendVerificationMail();
        // this.SetUserData(result.user);
        this.userData = {
          email: result.user.email,
          name: registerData.name,
          phoneNumber: registerData.phone,
          uid: result.user.uid,
          city: registerData.city,
          state: registerData.state,
          country: registerData.country
        };
        this.storeUserData();
      }).catch((error) => {
        window.alert(error.message);
      });
    return of(auth);
  }

  storeUserData() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const data = this.db.list('userProfile').push(this.userData);
      }
    });
  }

  login(email: string, password: string): Observable<any> {
    const user = this.afAuth.signInWithEmailAndPassword(email, password);
    this.getAuthstate();
    return of(true);
  }

  makeAdmin(data): Observable<any> {
    let msg: String;
    const callable = this.afs.httpsCallable('addAdminRole');
    callable({ email: data.email, role: data.role })
      .subscribe((result) => {
        console.log(result, "result");
        msg = result;
      });
    return of(msg)
  }


  getAuthstate() {
    this.afAuth.onAuthStateChanged(data => {
      if (data) {
        data.getIdTokenResult().then(idTokenResult => {
          console.log(idTokenResult, "idTokenResult");
          console.log(idTokenResult.claims.admin, "admin")
          const userData = {token: idTokenResult.token, user_id: idTokenResult.claims.user_id, isAdmin: idTokenResult.claims.admin}
          localStorage.setItem('isLoggedIn', JSON.stringify(userData));
        });
      }
    })
  }

  getUserData(uid) {
    this.userProfileData = this.db.list('userProfile', ref => ref.orderByChild("uid").equalTo(uid));
    return this.userProfileData.snapshotChanges();
  }

  isLoggedIn() {
    return (localStorage.getItem('isLoggedIn')) ? true : false;
  }

  logout(){
    this.afAuth.signOut();
    localStorage.removeItem('isLoggedIn');
  }
}
