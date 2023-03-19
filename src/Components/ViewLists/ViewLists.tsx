import {ListEntity} from "types";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import './ViewLists.css';

export const ViewLists = () => {
    const [list, setList] = useState<ListEntity[] | null>(null);

    useEffect(() => {

        (async () => {
            const res = await fetch('http://localhost:3001/list');
            const data: ListEntity[] = await res.json();
            setList(data);
        })();
    }, []);

    if (list === null) {
        return <h2>Trwa wczytywanie list...</h2>;
    }

    const viewLists = list.map(oneList =>
        <li key={oneList.createdAt}>
            <Link className="lists" to={`http://localhost:3000/productList/${oneList.id}`}>{oneList.name}</Link>
        </li>
    )

    return (
        <ul>{viewLists}</ul>
    )
}