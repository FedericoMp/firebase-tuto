import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  constructor(public afAuth: AngularFireAuth) { }

  getUser(): Observable<any> {
    return this.afAuth.user;
  }

  loginEmail(email, pass) {
    this.afAuth.auth.signInWithEmailAndPassword(email, pass);
  }
  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  loginFacebook() {
    this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
