import {ListEntity} from "types";
import {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {DeleteListBtn} from "../common/DeleteListBtn";
import {DeleteListContext} from "../../contexts/deleteList.context";

import './ViewLists.css';

export const ViewLists = () => {
    const [list, setList] = useState<ListEntity[] | null>(null);
    const {deleteList} = useContext(DeleteListContext);

    useEffect(() => {

        (async () => {
            const res = await fetch('http://localhost:3001/list');
            const data: ListEntity[] = await res.json();
            setList(data);
        })();
    }, [deleteList]);

    if (list === null) {
        return <h2>Trwa wczytywanie list...</h2>;
    }

    const viewLists = list.map(oneList =>
        <li key={oneList.createdAt} className="item-line">
            <Link className="lists" to={`http://localhost:3000/productList/${oneList.id}`}>{oneList.name}</Link>
            <DeleteListBtn className="btn" listId={oneList.id}/>
        </li>
    )

    return (
        <div className="background">
            <ul className="one-list">{viewLists}</ul>
        </div>
    )
}