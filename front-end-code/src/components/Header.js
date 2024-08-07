import '../App.css';

const Header = () => {
    return (
        <div className="header-container">
            <div className="logo-container">
                <img className="logo-image" src="/download.png" alt="Foodie Delight Logo" />
            </div>
            <div className="title-container">
                <h1 className="title-text">Foodie Delight's</h1>
            </div>
        </div>
    );
}

export default Header;
