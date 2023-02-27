import { useState } from "react";
import { useDispatch } from "react-redux";
import { POP_UP_LOG, POP_UP_REG } from "../../redux/slices/popupSlice";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";

// MUI imports
import CloseIcon from "@mui/icons-material/Close";

const Signup = () => {
  const [newUser, setNewUser] = useState({
    name: {
      first: "",
      last: "",
    },
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const handleLoginRedirect = () => {
    dispatch(POP_UP_LOG(true));
    dispatch(POP_UP_REG(false));
  };
  const handlePropagation = (e) => {
    e.stopPropagation();
  };
    const handleLoginClose = () => {
      dispatch(POP_UP_REG(false));
    };
  const handleFName = (e) => {
    setNewUser((prev) => ({
      ...prev,
      name: {
        ...prev.name,
        first: e.target.value,
      },
    }));
  };
  const handleLName = (e) => {
    setNewUser((prev) => ({
      ...prev,
      name: {
        ...prev.name,
        last: e.target.value,
      },
    }));
  };
  const handleEmail = (e) => {
    setNewUser((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };
  const handlePass = (e) => {
    setNewUser((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  };

  const handlePassConfirm = () => {};

  const handleSignup = async () => {
    const generateDisplayName = "";
    try {
      await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // updateProfile(user, {
          //   displayName: "HELLO???"
          // })
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error);
          // ..
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div onClick={handlePropagation} className="signupMain">
      <div onClick={handleLoginClose} className="closeIcon">
        <CloseIcon />
      </div>
      <h2>Create Account</h2>
      <form action="">
        <div className="nameGroup">
          <div className="signupFName">
            <label htmlFor="signupFName">First Name*</label>
            <input onChange={handleFName} id="signupFName" type="text" />
          </div>
          <div className="signupLName">
            <label htmlFor="signupLName">Last Name*</label>
            <input onChange={handleLName} id="signupLName" type="text" />
          </div>
        </div>
        <div className="signupEmail">
          <label htmlFor="signupEmail">Email*</label>
          <input onChange={handleEmail} id="signupEmail" type="text" />
        </div>
        <div className="signupPassword">
          <label htmlFor="signupPassword">Password*</label>
          <input onChange={handlePass} id="signupPassword" type="password" />
        </div>
        <div className="signupConfirm">
          <label htmlFor="signupPasswordConfirm">Password*</label>
          <input
            onChange={handlePassConfirm}
            id="signupPasswordConfirm"
            type="password"
          />
        </div>
      </form>
      <button onClick={handleSignup} className="signupButton buttonSquareGreen">
        Create
      </button>
      <div className="signupBreak">
        <p>or</p>
      </div>
      <div className="authSignup">
        <button className="buttonSquareClear">google</button>
        <button className="buttonSquareClear">facebook</button>
      </div>
      <p>
        Already have an account?{" "}
        <button className="buttonRoundGreen" onClick={handleLoginRedirect}>
          Login
        </button>{" "}
      </p>
    </div>
  );
};

export default Signup;
