import firebase from 'firebase';


export function loginUser(email, password) {
  let x = firebase.auth().signInWithEmailAndPassword(email, password)
  .then(user => return { loginBool: true, user });
  console.log(x);
  let value = x.i;
  return(
    value
  );
}
