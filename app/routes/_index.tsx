import type { MetaFunction } from "@remix-run/node";
import LargeButton from "../components/LargeButton";

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
      <div className="flex flex-col gap-4 items-center">
        <div className="flex flex-row gap-4">
          <LargeButton href="/login" label="Log In" />
          <LargeButton href="/signup" label="Sign Up" />
        </div>
        <a href="/player" className="text-sm text-blue-500 hover:text-gray-100 ">
          No Thanks (Use as guest)
        </a>
      </div>
    </div>
  );
}
