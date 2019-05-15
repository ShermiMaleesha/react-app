import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyDQ_JmBO4NvoN0H3uu-e0-yA4wHCKHcGLY",
    authDomain: "react-project-f5073.firebaseapp.com",
    databaseURL: "https://react-project-f5073.firebaseio.com",
    projectId: "react-project-f5073",
    storageBucket: "react-project-f5073.appspot.com",
    messagingSenderId: "61487637060",
    appId: "1:61487637060:web:599104b045e05f25"
  };

  class Firebase {
    constructor() {
      app.initializeApp(config);
      this.auth = app.auth();
      this.db = app.database();
    }
      // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
  this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
      this.auth.currentUser.updatePassword(password);

       // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next, fallback) =>
  this.auth.onAuthStateChanged(authUser => {
    if (authUser) {
      this.user(authUser.uid)
        .once('value')
        .then(snapshot => {
          const dbUser = snapshot.val();

          // default empty roles
          if (!dbUser.roles) {
            dbUser.roles = {};
          }

          // merge auth and db user
          authUser = {
            uid: authUser.uid,
            email: authUser.email,
            ...dbUser,
          };

          next(authUser);
        });
    } else {
      fallback();
    }
  });


       // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');
  }
  
  export default Firebase;
  