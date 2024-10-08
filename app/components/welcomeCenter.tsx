import "./welcomeCenter.css";

export default function WelcomeCenter() {
    return (
        <div className = "welcomeCenter">
            <div className = "texture" />
            <div className = "logo">
                <img src = "app/assets/logo/sobremesa.svg" alt = "Sobremesa logo" />
            </div>
            <div className = "welcomeText">
                <h1>Sobremesa</h1>
                <p>A new way to movie night</p>
            </div>
        </div>
    );
}