import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="loginContainer">
      <div className="loginHeadings">
        <h2>Hi, Welcome Back!</h2>
        <p>
          Still don't have an account? <Link to={"/register"}>Sign up</Link>{" "}
        </p>
      </div>
      <form action="">
        <div className="loginName">
          <label htmlFor="name">Name*</label>
          <input id="name" type="text" />
        </div>
        <div className="loginPassword">
          <label htmlFor="password">Password*</label>
          <input id="password" type="text" />
        </div>
      </form>
      <div className="loginOptions">
        <div className="remember">
          <input id="rememberMe" type="checkbox" />
          <label htmlFor="rememberMe">Keep me logged in</label>
        </div>
        <a href="#">Forget password?</a>
      </div>
      <button className="loginButton">login</button>
      <p className="loginBreak">or</p>
      <div className="authLogin">
        <p>google</p>
        <p>facebook</p>
      </div>
      <p>
        Don't have an account?<Link to={"/register"}>Sign up</Link>{" "}
      </p>
    </div>
  );
};

export default Login;
