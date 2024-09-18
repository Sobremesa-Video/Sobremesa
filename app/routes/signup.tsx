import { redirect } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";

export let action: ActionFunction = async ({ request }) => {
  // Perform signup logic here, e.g., create a user in your database
  
  // After successful signup, redirect to the main page
  return redirect("/main");  // assuming /main is your main page route
};

export default function Signup() {
  return (
    <form method="post">
      {/* Your signup form here */}
      <button type="submit">Sign Up</button>
    </form>
  );
}
