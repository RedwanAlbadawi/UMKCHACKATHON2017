
module.exports = function (req, res) {
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
    var datebase = firebase.datebase().ref('messages');
    datebase.on('value').then(function (snapchot) {
        res.send(snapchot.exportVal())
    });



    if (req.body.chat_ID) {

        
        for (var i = 0; i < database.messages.lenght, i++;)
        {
            if (req.body.chat_ID === database.messages[i])

                datebase.messages.push({
                    message_ID: {
                        "text": req.t,
                        "date": req.d
                    }

                });
        }

    } else {
        datebase.messages.push({
            "chat_ID": req.c_ID,
            "user_ID": req.u_ID,
            "doctor_ID": req.d_ID,
            "messeges": {
                message_ID: {
                    "text": req.t,
                    "date": req.d
                }


            }
        });

    }

}
   