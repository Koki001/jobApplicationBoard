import { Link, useNavigate } from "react-router-dom";
import { POP_UP_LOG, POP_UP_REG } from "../../redux/slices/popupSlice";
import { ACC_TYPE } from "../../redux/slices/accTypeSlice";
import { useSelector, useDispatch } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { ref, child, get, onValue, update } from "firebase/database";

// MUI imports
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePropagation = (e) => {
    // e.preventDefault();
    e.stopPropagation();
  };
  const handleLoginClose = () => {
    dispatch(POP_UP_LOG(false));
  };
  const handleRegPopup = () => {
    dispatch(POP_UP_LOG(false));
    dispatch(POP_UP_REG(true));
  };
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, userEmail, userPass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch(POP_UP_LOG(false));
      })
      .then(() => {
        onValue(
          ref(db, "users/candidates/" + auth.currentUser.uid),
          (snapshot) => {
            if (snapshot.val() !== null) {
              dispatch(ACC_TYPE("candidates"));
            } else {
              dispatch(ACC_TYPE("employers"));
            }
          }
        );
      })
      .then(() => {
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  return (
    <div onClick={handlePropagation} className="loginMain">
      <div onClick={handleLoginClose} className="closeIcon">
        <CloseIcon />
      </div>
      <div className="loginHeadings">
        <h2>Please Log In</h2>
        <p>
          New user?{" "}
          <button className="buttonSignUp" onClick={handleRegPopup}>
            Create Account
          </button>{" "}
        </p>
      </div>
      <form className="popupForm" action="">
        <div className="loginName">
          <label htmlFor="name">Email*</label>
          <input
            onChange={(e) => setUserEmail(e.target.value)}
            id="name"
            type="text"
          />
        </div>
        <div className="loginPassword">
          <label htmlFor="password">Password*</label>
          <input
            onChange={(e) => setUserPass(e.target.value)}
            id="password"
            type="password"
          />
        </div>
      </form>
      <div className="loginOptions">
        <div className="remember">
          <input id="rememberMe" type="checkbox" />
          <label htmlFor="rememberMe">Keep me logged in</label>
        </div>
        <a href="#">Forgot password?</a>
      </div>
      <button onClick={handleLogin} className="loginButton buttonSquareGreen">
        login
      </button>
      <div className="loginBreak">
        <p>or</p>
      </div>
      <div className="authLogin">
        <button className="buttonSquareClear">google</button>
        <button className="buttonSquareClear">facebook</button>
      </div>
      <p className="noAcc">
        Don't have an account?{" "}
        <button className="buttonSquareBrown" onClick={handleRegPopup}>
          Sign up
        </button>{" "}
      </p>
    </div>
  );
};
export default Login;
