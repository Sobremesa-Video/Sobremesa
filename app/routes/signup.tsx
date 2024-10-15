import { redirect } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";

import "app/styles/signupalt.css";
import { Link } from '@remix-run/react';

export const meta = () => {
  return [{ title: "Sobremesa" }];
};

export default function SignUpAlt() {
  return (
    <div className="sign-up-alt">
      {/* Header with logo and title */}
      <header className="header">
        <img className="logo" src="app/assets/logo/sobremesa.svg" alt="Sobremesa Logo" />
        <h2 className="header-title">Sobremesa</h2>
      </header>

      {/* Form inside a rounded box */}
      <div className="form-box">
        <h1 className="title">Create your account</h1>
        <form className="form">
          <input className="input" placeholder="Username" type="text" />
          <input className="input" placeholder="Full Name" type="text" />
          <input className="input" placeholder="Email" type="email" />
          <input className="input" placeholder="Password" type="password" />
          <div className="terms">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">
              Yes I agree to the <a href="#">Terms & Conditions</a>
            </label>
          </div>
          {/* <button className="submit-button">Submit</button> */}
          <button><Link to="/main" className="submit-button">Submit</Link></button>
        </form>
      </div>
    </div>
  );
}
