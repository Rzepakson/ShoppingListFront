import {Link} from "react-router-dom";

import "./Btn.css";


interface BtnProps {
    text: string;
    to?: string;
    className: string;
}

export const Btn = (props: BtnProps) => (
    props.to
        ? <Link className="btn" to={props.to}>{props.text}</Link>
        : <button>{props.text}</button>
);