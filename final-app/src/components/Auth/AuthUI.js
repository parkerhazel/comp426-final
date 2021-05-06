import './AuthUI.css'
import firebase from 'firebase/app'
import * as firebaseui from 'firebaseui'

// var firebase = require('firebase');
// var firebaseui = require('firebaseui');
var firebaseConfig = {
  apiKey: "AIzaSyB3AtoaMQJ_pbWee_EBeG53vaufootQryg",
  authDomain: "comp426-final-phazel.firebaseapp.com",
  databaseURL: "https://comp426-final-phazel-default-rtdb.firebaseio.com",
  projectId: "comp426-final-phazel",
  storageBucket: "comp426-final-phazel.appspot.com",
  messagingSenderId: "271337286164",
  appId: "1:271337286164:web:21471fe847bcc963839501",
  measurementId: "G-FZBNX488C6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var ui = new firebaseui.auth.AuthUI(firebase.auth());

ui.start('#firebaseui-auth-container', {
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  // Other config options...
});

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    // firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  // // Terms of service url.
  // tosUrl: '<your-tos-url>',
  // // Privacy policy url.
  // privacyPolicyUrl: '<your-privacy-policy-url>'
};

ui.start('#firebaseui-auth-container', uiConfig);

function AuthUI() {
  return (<div className='AuthUI'>
            <h1>Welcome to My Awesome App</h1>
            <div id="firebaseui-auth-container"></div>
            <div id="loader">Loading...</div>
          </div>
          );
}


export default AuthUI;