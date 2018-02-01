import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as AuthActions from './auth.actions';
import * as firebase from 'firebase';
import { fromPromise } from 'rxjs/observable/fromPromise';  // converts Promise to Observable
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class AuthEffects {
  @Effect()   // expects an Observable to be returned
  authSignup = this.actions$
    .ofType(AuthActions.ATTEMPT_SIGN_UP)   // this sets up a listener for the action
    .map((action: AuthActions.AttemptSignUp) => {
      return action.payload
    })  // this returns an Observable, so we can chain more Observable operators
    .switchMap((authData: {email: string, password: string}) => {
      return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.email, authData.password));
    })
    .switchMap(() => {   // don't care about what firebase returns
      return fromPromise(firebase.auth().currentUser.getIdToken());
    })
    .mergeMap((token: string) => {  // We would use map if we just wanted to dispatch one action, we want to dispatch two though, and this merges the two Observables into one
      return [  // The Effect module expects this special object to be returned, with an action type and payload to be dispatched
        {
          type: AuthActions.SIGNED_UP
        },
        {
          type: AuthActions.SET_TOKEN,
          payload: token
        }
      ];
    });

  @Effect()
  authSignin = this.actions$
    .ofType(AuthActions.ATTEMPT_SIGN_IN)
    .map((action: AuthActions.AttemptSignIn) => {
      return action.payload
    })
    .switchMap((authData: {email: string, password: string}) => {
      return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.email, authData.password));
    })
    .switchMap(() => {
      return fromPromise(firebase.auth().currentUser.getIdToken());
    })
    .mergeMap((token: string) => {
      this.router.navigate(['/']);
      return [
        {
          type: AuthActions.SIGNED_IN
        },
        {
          type: AuthActions.SET_TOKEN,
          payload: token
        }
      ];
    });

    @Effect({dispatch: false})
    authLogout = this.actions$
      .ofType(AuthActions.LOG_OUT)
      .do(() => {
        this.router.navigate(['/']);
      });

  // ngrx can automatically retrieve the actions from the app with this injector
  constructor(private actions$: Actions,       // $ often used to denote observables
              private router: Router) {}   
}