import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Sobremesa" },
    { name: "description", content: "Welcome to Sobremesa!" },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white dark:bg-gray-950">
      <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 drop-shadow-lg mb-8">
        Sobremesa
      </h1>
      <div className="flex flex-row gap-4">
        <a
          href="/signup"
          className="bg-white text-gray-800 border border-gray-300 rounded-lg px-6 py-3 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 transition"
        >
          Sign Up
        </a>
        <a
          href="/login"
          className="bg-white text-gray-800 border border-gray-300 rounded-lg px-6 py-3 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 transition"
        >
          Log In
        </a>
      </div>
    </div>
  );
}
