import { json, redirect } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";

import "app/styles/signupalt.css";
import { Link } from '@remix-run/react';

export const meta = () => {
  return [{ title: "Sobremesa" }];
};

interface ActionData {
  errors?: {
    username?: string;
    fullName?: string;
    email?: string;
    password?: string;
    terms?: string;
    general?: string;
  };
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const username = formData.get("username")?.toString();
  const fullName = formData.get("fullName")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const terms = formData.get("terms");

  const errors: ActionData["errors"] = {};

  // Basic validation
  if (!username) errors.username = "Username is required";
  if (!fullName) errors.fullName = "Full name is required";
  if (!email) errors.email = "Email is required";
  if (!password) errors.password = "Password is required";
  if (!terms) errors.terms = "You must accept the terms and conditions";

  if (Object.keys(errors).length > 0) {
    return json<ActionData>({ errors });
  }

  try {
    // Send signup data to Go backend
    const response = await fetch('http://localhost:8080/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        full_name: fullName,
        email,
        pass: password, // matches the 'pass' column in your Go schema
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return json<ActionData>({
        errors: {
          general: errorData.message || "Error creating account. Please try again.",
        },
      });
    }

    // Redirect to main page after successful signup
    return redirect("/main");
  } catch (error) {
    console.error("Signup error:", error);
    return json<ActionData>({
      errors: {
        general: "Error connecting to server. Please try again.",
      },
    });
  }
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
