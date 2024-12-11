import { useState } from 'react';
import { useActionData } from '@remix-run/react';

interface ActionData {
  errors?: {
    username?: string;
    password?: string;
    general?: string;
  };
}

export default function Login() {
  const [errors, setErrors] = useState<ActionData['errors']>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username")?.toString();
    const password = formData.get("password")?.toString();

    // Client-side validation
    const newErrors: ActionData['errors'] = {};
    if (!username) newErrors.username = "Username is required";
    if (!password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          pass: password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrors({
          general: errorData.message || "Invalid username or password",
        });
        return;
      } else {
        // Success - redirect to main page
        window.location.href = '/main';
      }
    } catch (error) {
      setErrors({
        general: "Error connecting to server. Please try again.",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-950">
      <form onSubmit={handleSubmit} className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md w-80">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 text-center mb-6">
          Login
        </h2>
        
        {errors?.general && (
          <div className="mb-4 text-red-500 text-sm text-center">{errors.general}</div>
        )}

        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className={`mt-1 block w-full px-3 py-2 border ${errors?.username ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            placeholder="Enter your username"
          />
          {errors?.username && (
            <div className="text-red-500 text-sm mt-1">{errors.username}</div>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className={`mt-1 block w-full px-3 py-2 border ${errors?.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            placeholder="Enter your password"
          />
          {errors?.password && (
            <div className="text-red-500 text-sm mt-1">{errors.password}</div>
          )}
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