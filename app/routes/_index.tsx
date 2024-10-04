import type { MetaFunction } from "@remix-run/node";
import "app\\assets\\logo\\sobremesa.svg";
import "app/styles/default.css";
import { Link } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [
    { title: "Sobremesa" },
    { name: "description", content: "Welcome to Sobremesa!" },
  ];
};

export default function Index() {
  return (
    <div className = "background">
    <div className = "mainGrid">
      <div className = "welcomeCenter">
        <div className = "texture" />
        <div className = "logo">
          <img src = "app/assets/logo/sobremesa.svg" alt = "Sobremesa logo" />
        </div>
        <div className = "welcomeText">
          <h1>Sobremesa</h1>
          <p>A new way to movie night</p>
        </div>
      </div>
      <div className = "accountCenter">
        <Link to="/login" className = 'loginButton'>Log in</Link>
        <Link to="/signup" className = 'signupButton'>Sign up</Link>
      </div>
    </div>
    </div>
  );
}
