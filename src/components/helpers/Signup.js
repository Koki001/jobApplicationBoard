import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { POP_UP_LOG, POP_UP_REG } from "../../redux/slices/popupSlice";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";

// MUI imports
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Signup = () => {
  const sliderRef = useRef();
  const [passwordPopup, setPasswordPopup] = useState(false);
  const [passConfirm, setPassConfirm] = useState("");
  const [accountType, setAccountType] = useState("candidate");
  const [passVisibility, setPassVisibility] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  // pass must be 6 characters
  // include uppercase

  const regex = new RegExp("^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]))(?=.{8,})");
  // console.log(regex.test(""))
  const regexLower = new RegExp("^(?=.*[a-z])");
  const regexNum = new RegExp("^(?=.*[0-9])");
  const regexUpper = new RegExp("^(?=.*[A-Z])");

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
  const handleName = (e) => {
    setNewUser((prev) => ({
      ...prev,
      name: e.target.value,
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
  const handlePassConfirm = (e) => {
    setPassConfirm(e.target.value);
  };

  const handleSignup = async () => {
    // const generateDisplayName = "";
    if (
      regex.test(newUser.password) &&
      newUser.password === passConfirm &&
      newUser.name.length > 1
    ) {
      await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          updateProfile(user, {
            displayName: "username",
            accountType: accountType
          })
          setNewUser((prev) => ({
            ...prev,
            name: "",
            email: "",
            password: "",
          }));
          setPassConfirm("")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          if (errorCode === "auth/missing-email") {
            alert("missing email");
          } else if (errorCode === "auth/invalid-email") {
            alert("invalid email");
          }
        });
    } else if (!regex.test(newUser.password)) {
      alert("pass weak");
    } else if (newUser.password !== passConfirm) {
      alert("pass doesn't match");
    } else if (newUser.name.length <= 1) {
      alert("name too short");
    }
  };
  const handleAccountType = (e) => {
    setAccountType(e.target.value);
    setNewUser((prev) => ({
      ...prev,
      name: "",
      email: "",
      password: "",
    }));
    setPassConfirm("")
    if (e.target.id === "candidateAcc") {
      sliderRef.current.style.left = 0;
      sliderRef.current.style.backgroundColor = "#00BF58";
    } else if (e.target.id === "employerAcc") {
      sliderRef.current.style.left = "50%";
      sliderRef.current.style.backgroundColor = "#755146";
    }
  };
  const handleUnfocus = () => {
    setPasswordPopup(false);
  };
  const handlePassVisibility = () => {
    setPassVisibility(!passVisibility);
  };
  return (
    <div onClick={handlePropagation} className="signupMain">
      <div onClick={handleLoginClose} className="closeIcon">
        <CloseIcon />
      </div>
      <h3>Account Type</h3>
      <div className="accountType">
        <div ref={sliderRef} className="slider"></div>
        <div className="accountCandidate">
          <input
            value={"candidate"}
            defaultChecked
            onChange={handleAccountType}
            className="sr-only"
            name="accountSwap"
            type="radio"
            id="candidateAcc"
          />
          <label htmlFor="candidateAcc">Candidate</label>
        </div>
        <div className="accountEmployer">
          <input
            value={"employer"}
            onChange={handleAccountType}
            className="sr-only"
            name="accountSwap"
            type="radio"
            id="employerAcc"
          />
          <label htmlFor="employerAcc">Employer</label>
        </div>
      </div>
      <form className="popupForm" action="">
        {accountType === "candidate" ? (
          <div className="signupFName">
            <label htmlFor="signupFName">Name*</label>
            <input
              onChange={handleName}
              value={newUser.name}
              id="signupFName"
              type="text"
            />
          </div>
        ) : (
          <div className="signupCompanyName">
            <label htmlFor="signupCompanyName">Company Name*</label>
            <input
              onChange={handleName}
              value={newUser.name}
              id="signupCompanyName"
              type="text"
            />
          </div>
        )}
        <div className="signupEmail">
          <label htmlFor="signupEmail">Email*</label>
          <input
            onChange={handleEmail}
            value={newUser.email}
            id="signupEmail"
            type="text"
          />
        </div>
        <div className="signupPassword">
          {passwordPopup && (
            <div className="passwordPopup">
              <div className="passwordPopupItem">
                <span
                  style={
                    newUser.password.length >= 8
                      ? { color: "green" }
                      : { color: "red" }
                  }
                >
                  Minimum 8 characters
                </span>
                {newUser.password.length >= 8 ? (
                  <CheckIcon
                    sx={{ width: "15px", height: "15px", color: "green" }}
                  />
                ) : (
                  <CloseIcon
                    sx={{ width: "15px", height: "15px", color: "red" }}
                  />
                )}
              </div>
              <div className="passwordPopupItem">
                <span
                  style={
                    regexUpper.test(newUser.password)
                      ? { color: "green" }
                      : { color: "red" }
                  }
                >
                  Contains uppercase letter
                </span>
                {regexUpper.test(newUser.password) ? (
                  <CheckIcon
                    sx={{ width: "15px", height: "15px", color: "green" }}
                  />
                ) : (
                  <CloseIcon
                    sx={{ width: "15px", height: "15px", color: "red" }}
                  />
                )}
              </div>
              <div className="passwordPopupItem">
                <span
                  style={
                    regexLower.test(newUser.password)
                      ? { color: "green" }
                      : { color: "red" }
                  }
                >
                  Contains lowercase letter
                </span>
                {regexLower.test(newUser.password) ? (
                  <CheckIcon
                    sx={{ width: "15px", height: "15px", color: "green" }}
                  />
                ) : (
                  <CloseIcon
                    sx={{ width: "15px", height: "15px", color: "red" }}
                  />
                )}
              </div>
              <div className="passwordPopupItem">
                <span
                  style={
                    regexNum.test(newUser.password)
                      ? { color: "green" }
                      : { color: "red" }
                  }
                >
                  Contains a number
                </span>
                {regexNum.test(newUser.password) ? (
                  <CheckIcon
                    sx={{ width: "15px", height: "15px", color: "green" }}
                  />
                ) : (
                  <CloseIcon
                    sx={{ width: "15px", height: "15px", color: "red" }}
                  />
                )}
              </div>
            </div>
          )}
          <label htmlFor="signupPassword">Password*</label>
          <input
            onFocus={() => setPasswordPopup(true)}
            onBlur={handleUnfocus}
            onChange={handlePass}
            id="signupPassword"
            type={passVisibility ? "text" : "password"}
            value={newUser.password}
          />
          <div onClick={handlePassVisibility} className="passVisibility">
            <VisibilityIcon
              sx={
                passVisibility
                  ? { color: "green" }
                  : { color: "rgb(170, 170, 170)" }
              }
            />
          </div>
        </div>
        <div className="signupConfirm">
          <label
            style={
              passConfirm !== newUser.password && passConfirm !== ""
                ? { color: "red" }
                : passConfirm === ""
                ? null
                : { color: "green" }
            }
            htmlFor="signupPasswordConfirm"
          >
            Confirm Password*
          </label>
          <input
            disabled={regex.test(newUser.password) ? false : true}
            onChange={handlePassConfirm}
            id="signupPasswordConfirm"
            type={passVisibility ? "text" : "password"}
            value={passConfirm}
          />
        </div>
      </form>
      <button onClick={handleSignup} className="signupButton buttonSquareGreen">
        Create Account
      </button>
      <div className="signupBreak">
        <p>or</p>
      </div>
      <div className="authSignup">
        <button className="buttonSquareClear">google</button>
        <button className="buttonSquareClear">facebook</button>
      </div>
      <p className="redirectText">
        Already have an account?{" "}
        <button className="buttonSquareBrown" onClick={handleLoginRedirect}>
          Login
        </button>{" "}
      </p>
    </div>
  );
};

export default Signup;
