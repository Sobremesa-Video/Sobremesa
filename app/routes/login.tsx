import { redirect } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";

export let action: ActionFunction = async ({ request }) => {
  // Perform login logic here, e.g., authenticate the user

  // After successful login, redirect to the main page
  return redirect("/main");
};

export default function Login() {
  return (
    <form method="post">
      {/* Your login form here */}
      <button type="submit">Log In</button>
    </form>
  );
}
