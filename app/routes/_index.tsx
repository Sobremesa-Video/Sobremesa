import type { MetaFunction } from "@remix-run/node";
import "app/assets/logo/sobremesa.svg";
import "app/styles/default.css";
import WelcomeCenter from "~/components/welcomeCenter";
import AccountCenter from "~/components/accountCenter";

export const meta: MetaFunction = () => {
  return [
    { title: "Sobremesa" },
    { name: "description", content: "Welcome to Sobremesa!" },
  ];
};

export default function Index() {
  return (
    <div className="background">
      <div className="mainGrid">
        <div className="welcome">
          <WelcomeCenter />
        </div>
        <div className="account">
          <AccountCenter />
        </div>
      </div>
    </div>
  );
}
