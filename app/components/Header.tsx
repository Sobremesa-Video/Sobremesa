import React from 'react';
import './Header.css';

interface HeaderProps {
    text?: string;
}

const Header: React.FC<HeaderProps> = ({ text }) => {
    return (
        <header className="header">
            <div className="logoContainer">
                <img src="app\assets\logo\sobremesa.svg" height={45} width={45} alt="sobremesa logo"/>
            </div>
            {text && <h1 className='text'>{text}</h1>}
        </header>
    );
};

export default Header;