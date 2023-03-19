import {Btn} from "../common/Btn";

import './Header.css'


export const Header = () => {
    return (
        <nav>
            <Btn className="viewLists" text="Moje listy" to="/list"></Btn>
            <h1>Moje zakupy</h1>
        </nav>
    );
};