import "./header.css";
import AccountCenter from "./accountCenter";

interface HeaderProps {
    pageName: string;
}

const Header: React.FC<HeaderProps> = ({ pageName } : HeaderProps) => {
    const logoVisible = pageName !== "_index";
    const nameVisible = pageName !== "_index";
    const loginVisible = pageName !== "";
    return (
        <div className="Header">
            {logoVisible && (
                <div className="logo">
                    <img src="app/assets/logo/sobremesa.svg" alt="sobremesa logo" />    
                </div>
            )}
            {nameVisible && (
                <div className="name">
                    Sobremesa
                </div>
            )}
            {loginVisible && (
                <div className="login">
                    <AccountCenter />
                </div>
            )}
        </div>
    );
};

export default Header;
