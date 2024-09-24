import { redirect } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";

export let action: ActionFunction = async ({ request }) => {
  // Perform login logic here, e.g., authenticate the user

  // After successful login, redirect to the main page
  return redirect("/main");
};

export default function Login() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-950">
      <form method="post" className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md w-80">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 text-center mb-6">
          Login
        </h2>
        
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-md hover:from-blue-600 hover:to-purple-700"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
