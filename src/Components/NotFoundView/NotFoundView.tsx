import {Btn} from "../common/Btn";

import './NotFoundView.css'

export const NotFoundView = () => (
    <div className="background">
        <p className="section-title">Strona o podanym adresie nie istnieje!</p>
        <br/>
        <Btn className="btn" text="Powrót do strony głównej" to="/"/>
    </div>
);