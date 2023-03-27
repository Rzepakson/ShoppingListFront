import {Link} from "react-router-dom";

import "./Btn.css";


interface BtnProps {
    text: string;
    to?: string;
    className: string;
    onClick?: () => void;
}

export const Btn = (props: BtnProps) => (
    props.to
        ? <Link className="btn" to={props.to}><span className="text-in-btn">{props.text}</span></Link>
        : <button onClick={props.onClick}><span className="text-in-btn">{props.text}</span></button>
);