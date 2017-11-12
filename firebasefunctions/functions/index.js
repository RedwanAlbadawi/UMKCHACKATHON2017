    const firebase = require('firebase');
    const functions = require('firebase-functions');

    var config = {
        apiKey: "AIzaSyBlyvBEct-StmV-DVSLPoHf1voair-6aSw",
        authDomain: "doctorappointment-2a6ef.firebaseapp.com",
        databaseURL: "https://doctorappointment-2a6ef.firebaseio.com",
        projectId: "doctorappointment-2a6ef",
        storageBucket: "doctorappointment-2a6ef.appspot.com",
        messagingSenderId: "481515514891"
    };
    firebase.initializeApp(config);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    const val = firebase.database().ref();

    val.once('value').then(function(snapshot){
        response.send(snapshot.exportVal())
    });
    
 });
