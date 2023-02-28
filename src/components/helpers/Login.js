import { Link } from "react-router-dom";
import { POP_UP_LOG, POP_UP_REG } from "../../redux/slices/popupSlice";
import { useSelector, useDispatch } from "react-redux";

// MUI imports
import CloseIcon from "@mui/icons-material/Close";

const Login = () => {

  const dispatch = useDispatch()

  const handlePropagation = (e) => {
    // e.preventDefault();
    e.stopPropagation();
  };
  const handleLoginClose = () => {
    dispatch(POP_UP_LOG(false))
  }
  const handleRegPopup = () => {
    dispatch(POP_UP_LOG(false));
    dispatch(POP_UP_REG(true));
  }
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
          <label htmlFor="name">Name or Email*</label>
          <input id="name" type="text" />
        </div>
        <div className="loginPassword">
          <label htmlFor="password">Password*</label>
          <input id="password" type="password" />
        </div>
      </form>
      <div className="loginOptions">
        <div className="remember">
          <input id="rememberMe" type="checkbox" />
          <label htmlFor="rememberMe">Keep me logged in</label>
        </div>
        <a href="#">Forgot password?</a>
      </div>
      <button className="loginButton buttonSquareGreen">login</button>
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
}
export default Login;
