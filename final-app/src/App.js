import React, {useState} from 'react';
import './App.css';
import firebase from 'firebase/app'
import * as firebaseui from 'firebaseui'
import '../node_modules/firebaseui/dist/firebaseui.css'
import Photo from './Photo';
import RandomJoke from './RandomJoke'

export let globalUser = null;

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

// let view;

const navOptions = ['Home', 'Random Joke','Sign In', 'Sign Out']


function App() {
  let [user, setUser] = useState(null);
  let [selected, setSelected] = useState('Home');
  let [view, setView] = useState(null);

  const handleNavButtonClick = ({target}) => {
    setSelected((prevSelected) => {
      if (prevSelected === target.value) {
          return prevSelected;
      } else {
          return target.value;
      }
    })
  }

  if (selected === 'Sign In' && globalUser === null) {
    var uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          setUser(() => {
            globalUser = authResult.user;
            return authResult.user;
          });
          setSelected(() => {
            return 'Home';
          })
          setView(() => {
            return <Photo />
          })
          return false;
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
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID
      ],
    };
    
    view = (<div className='AuthUI'>
              <h1>Please Sign In or Create an Account!</h1>
              <div id="firebaseui-auth-container"></div>
              <div id="loader">Loading...</div>
            </div>)

    setTimeout(function(){ ui.start('#firebaseui-auth-container', uiConfig); }, 500);

  } else if (selected === 'Sign Out' && globalUser !== null) {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      setUser(() => {
        globalUser = null;
        return null;
      });
      setSelected(() => {
        return 'Home';
      })
      setView(() => {
        return <Photo />
      })
    }).catch((error) => {
      // An error happened.
      alert(`Unsuccessful Sign Out\n ${error}`)
    });
  } else if (selected === 'Home') {
    
    view = <Photo />

  } else {
    view = <RandomJoke />
  }
  let userName = ''
  if (user !== null) {
    userName = user.displayName;
  }
  if (selected === 'Random Joke') {
    return (
      <div className='app'>
        <div className='navbar'>
          <div className='buttonHolder'>
            {navOptions.map(option => {
                if (option === 'Sign In' && user !== null) {
                  return null;
                }
                if (option === 'Sign Out' && user === null) {
                  return null;
                }
                return <button className='navButton' value={option} onClick={handleNavButtonClick} id={option} key={option} disabled={selected === option}>{option}</button>
            })}      
          </div>
        </div>
        {/* <h1>Welcome to my Random Photos Page!</h1> */}
        <h1 style={{marginLeft: 'auto', marginRight: 'auto', width: '50%'}}>Welcome {userName} to my Random Joke Page!</h1>
        {view}
      </div>
    )
  } else if (selected !== 'Sign In') {
    return (
      <div className='app'>
        <div className='navbar'>
          <div className='buttonHolder'>
            {navOptions.map(option => {
                if (option === 'Sign In' && user !== null) {
                  return null;
                }
                if (option === 'Sign Out' && user === null) {
                  return null;
                }
                return <button className='navButton' value={option} onClick={handleNavButtonClick} id={option} key={option} disabled={selected === option}>{option}</button>
            })}      
          </div>
        </div>
        {/* <h1>Welcome to my Random Photos Page!</h1> */}
        <h1 style={{marginLeft: 'auto', marginRight: 'auto', width: '50%'}}>Welcome {userName} to my Random Photos Page!</h1>
        {view}
      </div>
    )
  } else {
    return (
      <div className='app'>
        <div className='navbar'>
        {navOptions.map(option => {
            if (option === 'Sign In') {
              return <button className='navButton' style={{all: 'none'}} value={option} onClick={handleNavButtonClick} id={option} key={option} disabled={selected === option}>Sign Out</button>
            }
            if (option === 'Sign Out' && user === null) {
              return null
            }
            return <button className='navButton' style={{all: 'none'}} value={option} onClick={handleNavButtonClick} id={option} key={option} disabled={selected === option}>{option}</button>
        })}  
          {/* <h2 style={{position : 'absolute', top : '0', right : '0'}}>Logout</h2> */}
        </div>
        {view}
      </div>
    );
  }
}

export default App;
