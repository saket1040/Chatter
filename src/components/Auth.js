import { db, auth, provider } from "../firebase.js";
import { signInWithPopup } from "firebase/auth";
import "../styles/Auth.css";
import Cookies from "universal-cookie";
import {
  collection,
  addDoc,
  where,
  onSnapshot,
  query,
} from "firebase/firestore";

const cookies = new Cookies();

export const Auth = ({ setIsAuth }) => {
  const usersRef = collection(db, "users");

  //sign in through google using firebase auth 

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);

      //adding users to user collection of firebase cloud storage

      const queryMessage = query(
        usersRef,
        where("email", "==", auth.currentUser.email),
      )
      onSnapshot(queryMessage, (snapshot) => {
        let users = [];
        snapshot.forEach((doc) => {
          users.push({ ...doc.data(), id: doc.id });
        });
        if (!users.length) {
          addDoc(usersRef, {
            username: auth.currentUser.displayName,
            email: auth.currentUser.email,
            userId: result.user.uid,
            timestamp: new Date(),
          });
        }
      })

      setIsAuth(true);

    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="auth">
      <p> Sign In With Google To Continue </p>
      <button onClick={signInWithGoogle}> Sign In With Google </button>
    </div>
  );
};