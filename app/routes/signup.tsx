import { redirect } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";

// export const meta: MetaFunction = () => {
//   return [
//     { title: "Sobremesa" },
//   ];
// };

// export let action: ActionFunction = async ({ request }) => {
//   // Perform signup logic here, e.g., create a user in your database

//   // After successful signup, redirect to the main page
//   return redirect("/main");
// };

// export default function Signup() {
//   return (
//     <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-950">
//       <form method="post" className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md w-80">
//         <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 text-center mb-6">
//           Sign Up
//         </h2>
        
//         <div className="mb-4">
//           <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             placeholder="Enter your email"
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
//           <input
//             type="text"
//             id="username"
//             name="username"
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             placeholder="Create a username"
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             placeholder="Create a password"
//           />
//         </div>

//         <div className="mb-6">
//           <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
//           <input
//             type="password"
//             id="confirm-password"
//             name="confirm-password"
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             placeholder="Confirm your password"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-md hover:from-blue-600 hover:to-purple-700"
//         >
//           Sign Up
//         </button>
//       </form>
//     </div>
//   );
// }
import React from 'react';
import "app/styles/signupalt.css";

export const meta: MetaFunction = () => {
  return [
    { title: "Sobremesa" },
  ];
};
export default function SignUpAlt() {

  return (
    <div className="sign-up-alt">
      <div className="form-container">
        <h1 className="title">Create your account</h1>
        <form className="form">
          <input className="input" placeholder="Username" type="text" />
          <input className="input" placeholder="Full Name" type="text" />
          <input className="input" placeholder="Email" type="email" />
          <input className="input" placeholder="Password" type="password" />
          <div className="terms">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">Yes I agree to the <a href="#">Terms & Conditions</a></label>
          </div>
          <button className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};