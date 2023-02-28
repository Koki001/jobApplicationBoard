import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { POP_UP_LOG, POP_UP_REG } from "../../redux/slices/popupSlice";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";


// MUI imports
import CloseIcon from "@mui/icons-material/Close";

const Signup = () => {
  const sliderRef = useRef();
  const [passwordPopup, setPasswordPopup] = useState(false)
  const [accountType, setAccountType] = useState("candidate");
  const [newCandidate, setNewCandidate] = useState({
    name: {
      first: "",
      last: "",
    },
    email: "",
    password: "",
  });
  const [newCompany, setNewCompany] = useState({
    name: "",
    email: "",
    password: "",
  });
  // pass must be 6 characters
  // include uppercase

  const regex = new RegExp(
    "^((?=.*[a-z])(?=.*[0-9]))(?=.{8,})"
  );
  // console.log(regex.test(""))
  const regexLength = new RegExp(
    "^((?=.*[a-z])(?=.*[0-9]))(?=.{8,})"
  );
  const regexNum = new RegExp(
    "^(?=.*[0-9])"
  );

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
    setNewCandidate((prev) => ({
      ...prev,
      name: {
        ...prev.name,
        first: e.target.value,
      },
    }));
  };
  const handleLName = (e) => {
    setNewCandidate((prev) => ({
      ...prev,
      name: {
        ...prev.name,
        last: e.target.value,
      },
    }));
  };
  const handleCompanyName = (e) => {
    setNewCompany((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };
  const handleEmail = (e) => {
    if (accountType === "candidate") {
      setNewCandidate((prev) => ({
        ...prev,
        email: e.target.value,
      }));
    } else if (accountType === "company") {
      setNewCompany((prev) => ({
        ...prev,
        email: e.target.value,
      }));
    }
  };
  const handlePass = (e) => {
    if (accountType === "candidate") {
      setNewCandidate((prev) => ({
        ...prev,
        password: e.target.value,
      }));
    } else if (accountType === "company") {
      setNewCompany((prev) => ({
        ...prev,
        password: e.target.value,
      }));
    }
    if (newCandidate.password || newCompany.password){

    }
  };

  const handlePassConfirm = () => {};

  const handleSignup = async () => {
    const generateDisplayName = "";
    try {
      // await createUserWithEmailAndPassword(
      //   auth,
      //   newCandidate.email,
      //   newCandidate.password
      // )
      //   .then((userCredential) => {
      //     // Signed in
      //     const user = userCredential.user;
      //     // updateProfile(user, {
      //     //   displayName: "HELLO???"
      //     // })
      //     console.log(user);
      //   })
      //   .catch((error) => {
      //     const errorCode = error.code;
      //     const errorMessage = error.message;
      //     console.log(error);
      //     // ..
      //   });
    } catch (error) {
      console.log(error);
    }
  };
  const handleAccountType = (e) => {
    setAccountType(e.target.value)
    if (e.target.id === "candidateAcc") {
      sliderRef.current.style.left = 0;
    } else if (e.target.id === "employerAcc") {
      sliderRef.current.style.left = "50%";
    }
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
      <form action="">
        {accountType === "candidate" ? (
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
        ) : (
          <div className="nameGroupCompany">
            <div className="signupCompanyName">
              <label htmlFor="signupCompanyName">Company Name*</label>
              <input
                onChange={handleCompanyName}
                id="signupCompanyName"
                type="text"
              />
            </div>
          </div>
        )}
        <div className="signupEmail">
          <label htmlFor="signupEmail">Email*</label>
          <input onChange={handleEmail} id="signupEmail" type="text" />
        </div>
        <div className="signupPassword">
          <div className="passwordPopup"></div>
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
        Sign Up
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
