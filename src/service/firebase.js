import firebase from 'firebase'

let config = {
    apiKey: 'yourapikey',
    authDomain: 'yourdomain',
    databaseURL: 'yourdatabase',
    projectId: 'yourprojectid',
    storageBucket: 'yourstoragebucket',
    messagingSenderId: 'yoursendiriid'
}
firebase.initializeApp(config)

export default {
    auth: firebase.auth(),
    database: firebase.database()
}
