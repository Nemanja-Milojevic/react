import { takeLatest, put, all, call } from 'redux-saga/effects';

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  getCurrentUser,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  signOutUser
} from '../../utils/firebase/firebase.utils';
import {
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutSuccess,
  signUpFailed,
  signUpSuccess
} from './user.action';
import { USER_ACTION_TYPES } from './user.types';

export function* getSnapshotFromUserAuth(userAuth, additionalInfo) {
  try {
    const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalInfo);
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;

    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    put(signInFailed(error));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* signInWithEmailAndPassword(action) {
  try {
    const { email, password } = action.payload;
    const { user } = yield call(signInAuthUserWithEmailAndPassword, email, password);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* onEmailAndPasswordSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmailAndPassword);
}

export function* signOut() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailed(error));
  }
}

export function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* signUpUser(action) {
  try {
    const { email, password, displayName } = action.payload;
    const { user } = yield call(createAuthUserWithEmailAndPassword, email, password);
    yield put(signUpSuccess(user, { displayName }));
  } catch (error) {
    yield put(signUpFailed());
  }
}

export function* onSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUpUser);
}

export function* signInAfterSignUp(action) {
  const { user, additionalInfo } = action.payload;
  yield call(getSnapshotFromUserAuth, user, additionalInfo);
}

export function* onSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailAndPasswordSignInStart),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess)
  ]);
}
