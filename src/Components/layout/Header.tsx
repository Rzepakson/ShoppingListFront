import {Btn} from "../common/Btn";
import {Link} from "react-router-dom";

import './Header.css'


export const Header = () => {
    return (
        <nav>
            <Btn className="viewLists" text="Moje listy" to="/list"></Btn>
            <h1><Link className="home-btn" to={'/'}>Moje zakupy</Link></h1>
        </nav>
    );
};