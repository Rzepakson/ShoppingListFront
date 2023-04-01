import {Btn} from "../common/Btn";
import {useNavigate} from "react-router-dom";

import './Header.css'

export const Header = () => {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.setItem('isLoggedIn', JSON.stringify(false));
        navigate('/');
        window.location.reload();
    }

    return (
        <header>
            <Btn className="home-btn" text="🏠" to="/"/>
            <h1 className="site-title">Zakupsy</h1>
            <div className="wrapper-btns">
                <Btn className="btn my-lists" text="Moje listy" to="/list"/>
                <Btn className="btn logout" text="Wyloguj" onClick={logout}/>
            </div>
        </header>
    );
};