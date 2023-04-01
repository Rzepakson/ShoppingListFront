import {Btn} from "../common/Btn";
import {useNavigate} from "react-router-dom";

import './NotFoundView.css'

export const NotFoundView = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        window.localStorage.removeItem('isLoggedIn');
        navigate("/");
    }

    return (
        <div className="background background-not-found-view">
            <p className="section-title">Strona o podanym adresie nie istnieje!</p>
            <Btn className="btn" text="Powrót do strony logowania" onClick={handleClick}/>
        </div>
    )
};