import { Link, useNavigate } from "react-router-dom";
import { POP_UP_LOG, POP_UP_REG } from "../../redux/slices/popupSlice";
import { ACC_TYPE } from "../../redux/slices/accTypeSlice";
import { USER, PHOTO } from "../../redux/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db, storage } from "../../firebase";
import { ref, child, get, onValue, update } from "firebase/database";
import { getDownloadURL } from "firebase/storage";
import { ref as sRef } from "firebase/storage";
import React, { useState } from "react";
import Swal from "sweetalert2";
// MUI imports
import CloseIcon from "@mui/icons-material/Close";

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
        onValue(ref(db, "users/" + auth.currentUser.uid), (snapshot) => {
          if (snapshot.val() !== null) {
            dispatch(ACC_TYPE(snapshot.val().type));
          }
        });
      })
      .then(() => {
        getDownloadURL(
          sRef(storage, `companyLogos/${auth.currentUser.uid}/logo`)
        )
          .then((url) => {
            dispatch(PHOTO(url));
          })
          .catch((error) => {});
      })
      .then(() => {
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/invalid-email") {
          Swal.fire({
            text: "Please enter a valid email",
            icon: "error",
            confirmButtonText: "Ok",
            confirmButtonColor: "green",
          });
        } else if (error.code === "auth/internal-error") {
          Swal.fire({
            text: "Please enter your password",
            icon: "error",
            confirmButtonText: "Ok",
            confirmButtonColor: "green",
          });
        } else if (error.code === "auth/user-not-found") {
          Swal.fire({
            text: "User not found in database",
            icon: "error",
            confirmButtonText: "Ok",
            confirmButtonColor: "green",
          });
        } else if (error.code === "auth/wrong-password") {
          Swal.fire({
            text: "Wrong password",
            icon: "error",
            confirmButtonText: "Ok",
            confirmButtonColor: "green",
          });
        }
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
