import {Btn} from "../common/Btn";

import './Header.css'
import {Link} from "react-router-dom";


export const Header = () => {
    return (
        <header>
            <Link className="home" to="/">🏠</Link>
            <h1 className="site-title">Zakupsy</h1>
            <span className="my-lists-span"><Btn className="btn" text="Moje listy" to="/list"/></span>
        </header>
    );
};