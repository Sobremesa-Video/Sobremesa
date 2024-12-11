import { json, redirect } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import { useActionData } from '@remix-run/react';
import { useState } from 'react';
import "app/styles/signupalt.css";

export const meta: MetaFunction = () => {
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

export default function SignUpAlt() {
  const actionData = useActionData<ActionData>();
  const [errors, setErrors] = useState<ActionData['errors']>({});
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({});
    
    // Get form data
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username")?.toString();
    const fullName = formData.get("fullName")?.toString();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const terms = formData.get("terms");

    // Client-side validation
    const newErrors: ActionData['errors'] = {};
    if (!username) newErrors.username = "Username is required";
    if (!fullName) newErrors.fullName = "Full name is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (!terms) newErrors.terms = "You must accept the terms and conditions";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      console.log("Sending request to backend...");
      const response = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          full_name: fullName,
          email,
          pass: password,
        }),
      });
      
      console.log("Response received:", response);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Signup failed:", errorData);
        setErrors({
          general: errorData.message || "Error creating account. Please try again.",
        });
        return;
      } else{
          // Success - redirect to main page
          window.location.href = '/main';
      }
    } catch (error) {
      console.error("Detailed signup error:", {
        message: error instanceof Error ? error.message : 'Unknown error',
        error
      });
      setErrors({
        general: "Error connecting to server. Please try again.",
      });
    }
  };

  return (
    <div className="sign-up-alt">
      <header className="header">
        <img className="logo" src="app/assets/logo/sobremesa.svg" alt="Sobremesa Logo" />
        <h2 className="header-title">Sobremesa</h2>
      </header>

      <div className="form-box">
        <h1 className="title">Create your account</h1>
        {errors?.general && (
          <div className="error-message">{errors.general}</div>
        )}
        <form onSubmit={handleSubmit} className="form">
          <div className="input-group">
            <input 
              name="username" 
              className={`input ${errors?.username ? 'error' : ''}`}
              placeholder="Username" 
              type="text" 
            />
            {errors?.username && (
              <div className="error-message">{errors.username}</div>
            )}
          </div>

          <div className="input-group">
            <input 
              name="fullName" 
              className={`input ${errors?.fullName ? 'error' : ''}`}
              placeholder="Full Name" 
              type="text" 
            />
            {errors?.fullName && (
              <div className="error-message">{errors.fullName}</div>
            )}
          </div>

          <div className="input-group">
            <input 
              name="email" 
              className={`input ${errors?.email ? 'error' : ''}`}
              placeholder="Email" 
              type="email" 
            />
            {errors?.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </div>

          <div className="input-group">
            <input 
              name="password" 
              className={`input ${errors?.password ? 'error' : ''}`}
              placeholder="Password" 
              type="password" 
            />
            {errors?.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </div>

          <div className="terms">
            <input 
              type="checkbox" 
              id="terms" 
              name="terms"
            />
            <label htmlFor="terms">
              Yes I agree to the <a href="#">Terms & Conditions</a>
            </label>
            {errors?.terms && (
              <div className="error-message">{errors.terms}</div>
            )}
          </div>

          <button type="submit" className="submit-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
}