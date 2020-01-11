if (typeof firebase === 'undefined') throw new Error('hosting/init-error: Firebase SDK not detected. You must include it before /__/firebase/init.js');
var firebaseConfig = {
  "projectId": "charitytrust-58a66",
  "appId": "1:827673180015:web:cb649dac7e8443d0eb5a9a",
  "databaseURL": "https://charitytrust-58a66.firebaseio.com",
  "storageBucket": "charitytrust-58a66.appspot.com",
  "apiKey": "AIzaSyAsz7WXa5qAcSSM3EOcxUbwr6e6MILhJ5M",
  "authDomain": "charitytrust-58a66.firebaseapp.com",
  "messagingSenderId": "827673180015",
  "measurementId": "G-C9RNNCX0FE"
};
if (firebaseConfig) {
  firebase.initializeApp(firebaseConfig);
}