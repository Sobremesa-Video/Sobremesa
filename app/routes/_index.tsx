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
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-black animate-gradient-x">
      <h1
        className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-500 drop-shadow-glow mb-12 animate-colorFlow"
        style={{ backgroundSize: '200% 200%' }}
        >
        Sobremesa
      </h1>
      <div className="flex flex-col gap-6 items-center">
        <div className="flex flex-row gap-6">
        {/* Button 1: Log In */}
        <div>
          <LargeButton
            href="/login"
            label="Log In"
          />
        </div>

        {/* Button 2: Sign Up */}
        <div>
          <LargeButton
            href="/signup"
            label="Sign Up"
          />
        </div>
        </div>

        {/* Guest Link */}
        <a
          href="/guest"
          className="text-sm text-blue-400 hover:text-white transition-colors duration-300 mt-4"
        >
          No Thanks (Use as guest)
        </a>
      </div>
    </div>
  );
}
