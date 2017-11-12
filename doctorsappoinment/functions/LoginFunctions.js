import firebase from 'firebase';


export function loginUser(email, password) {
  let loginBool = false;
  var uid;
  let x = firebase.auth().signInWithEmailAndPassword(email, password)
  .then(function(result) {
    uid = result.uid;
    return (result.uid);
  });
  console.log(uid);
}
