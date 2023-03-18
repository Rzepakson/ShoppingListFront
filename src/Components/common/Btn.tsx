import {Link} from "react-router-dom";

import "./Btn.css";

export interface Props {
    text: string;
    to?: string;
    className: string;
}

export const Btn = (props: Props) => (
    props.to
        ? <Link className="btn" to={props.to}>{props.text}</Link>
        : <button>{props.text}</button>
);