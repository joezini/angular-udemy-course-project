import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase';
import * as fromApp from './../store/app.reducers';
import * as AuthActions from './store/auth.actions'
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  constructor(private store: Store<fromApp.AppState>,
              private router: Router) {}

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => {
      this.store.dispatch(new AuthActions.SignUp());
      firebase.auth().currentUser.getToken()
        .then(
          (token: string) => {
            this.store.dispatch(new AuthActions.SetToken(token));
          }
        )
    })
    .catch(
      (error) => console.log(error)
    )
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(
      (response) => {
        this.store.dispatch(new AuthActions.SignIn());
        this.router.navigate(['/']);
        firebase.auth().currentUser.getToken()
        .then(
          (token: string) => {
            this.store.dispatch(new AuthActions.SetToken(token));
          }
        )
      }
    )
    .catch(
      (error) => console.log(error)
    );
  }

  logout() {
    firebase.auth().signOut();
    this.store.dispatch(new AuthActions.LogOut());
  }
}