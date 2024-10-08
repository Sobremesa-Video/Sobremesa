import "./accountCenter.css";
import { Link } from "react-router-dom";

export default function AccountCenter() {
  return (
    <div className="accountCenter">
      <Link to="/login" className="loginButton">
        Log in
      </Link>
      <Link to="/signup" className="signupButton">
        Sign up
      </Link>
    </div>
  );
}
