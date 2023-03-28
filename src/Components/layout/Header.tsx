import {Btn} from "../common/Btn";

import './Header.css'

export const Header = () => {
    return (
        <header>
            <Btn className="home-btn" text="🏠" to="/"/>
            <h1 className="site-title">Zakupsy</h1>
            <span className="my-lists-btn-span"><Btn className="btn" text="Moje listy" to="/list"/></span>
        </header>
    );
};