import { Action } from '@ngrx/store';

export const ATTEMPT_SIGN_UP = 'ATTEMPT_SIGN_UP';
export const SIGNED_UP = 'SIGNED_UP';
export const ATTEMPT_SIGN_IN = 'ATTEMPT_SIGN_IN';
export const SIGNED_IN = 'SIGNED_IN';
export const LOG_OUT = 'LOG_OUT';
export const SET_TOKEN = 'SET_TOKEN';

export class AttemptSignUp implements Action {
  readonly type = ATTEMPT_SIGN_UP;
  constructor(public payload: {email: string, password: string}) {}
}

export class SignedUp implements Action {
  readonly type = SIGNED_UP;
}

export class AttemptSignIn implements Action {
  readonly type = ATTEMPT_SIGN_IN;
  constructor(public payload: {email: string, password: string}) {}
}

export class SignedIn implements Action {
  readonly type = SIGNED_IN;
}

export class LogOut implements Action {
  readonly type = LOG_OUT;
}

export class SetToken implements Action {
  readonly type = SET_TOKEN;
  constructor(public payload: string) {}
}

export type AuthActions = 
  AttemptSignUp |
  SignedUp |
  AttemptSignIn |
  SignedIn |
  LogOut |
  SetToken;