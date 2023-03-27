import {Btn} from "../common/Btn";

import './NotFoundView.css'

export const NotFoundView = () => (
    <div className="background">
        <p className="not-found-message">Strona o podanym adresie nie istnieje!</p>
        <br/>
        <Btn className="home" text="Powrót do strony głównej" to="/"/>
    </div>
);