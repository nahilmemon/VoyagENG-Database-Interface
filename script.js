// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAjJoBjXhukyCrTUUnHDWlXo6g5SllDGto",
    authDomain: "sissi-voyageng.firebaseapp.com",
    databaseURL: "https://sissi-voyageng-default-rtdb.firebaseio.com",
    projectId: "sissi-voyageng",
    storageBucket: "sissi-voyageng.appspot.com",
    messagingSenderId: "489914893913",
    appId: "1:489914893913:web:1fcf09322e547ed8401348"
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const dbRef = firebase.database().ref();
let dbRefCitiesList = dbRef.child('cities');
let citiesList = [];
// Attach an asynchronous callback to read the data at our posts reference
dbRefCitiesList.on('value', (snapshot) => {
    // Save the resulting snapshot value from referencing the database's cities node into citiesList
    citiesList = snapshot.val();
    console.log(citiesList);
}, (errorObject) => {
    console.log('The read failed: ' + errorObject.name);
});

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// Add the email provider ID to the list of FirebaseUI signInOptions.
ui.start('#firebaseui-auth-container', {
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false
    }
  ]
});

// Initialize the FirebaseUI Widget using Firebase.
// var ui = new firebaseui.auth.AuthUI(firebase.auth());

// Specify the FirebaseUI configuration (providers supported and UI customizations as well as success callbacks, etc).
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
  signInSuccessUrl: 'modify-data.html',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>',
  // Privacy policy url.
  privacyPolicyUrl: '<your-privacy-policy-url>'
};

// Render the FirebaseUI Auth interface:
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);