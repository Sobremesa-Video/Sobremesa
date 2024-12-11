//Login.tsx page

import { redirect } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";


import Footer from "~/components/footer";

import "app/styles/forgetPW.css";


export const meta: MetaFunction = () => {
  return [
    { title: "Sobremesa" },
  ];
};

export let action: ActionFunction = async ({ request }) => {
  // Perform login logic here, e.g., authenticate the user

  // After successful login, redirect to the main page
  return redirect("/main");
};

export default function Login() {
  return (
<div className="background">
  <div className="flex justify-center items-center min-h-screen">
    <form method="post" className="bg-gray-100 dark:bg-gray-800 p-16 rounded-lg shadow-md w-128 h-auto">
      <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 text-center mb-8 leading-tight">
        Reset Password
      </h2>

      <div className="mb-8">
        <label htmlFor="usernameOrEmail" className="block text-lg font-medium text-gray-700 dark:text-gray-300">Username or Email</label>
        <input
          type="text"
          id="usernameOrEmail"
          name="usernameOrEmail"
          className="mt-1 block w-full px-6 py-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
          placeholder="Enter your username or email"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-8 rounded-md hover:from-blue-600 hover:to-purple-700"
      >
        Reset Password
      </button>
    </form>
  </div>
  <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white py-4 text-center">
      <Footer />
    </div>
</div>

  );
}
