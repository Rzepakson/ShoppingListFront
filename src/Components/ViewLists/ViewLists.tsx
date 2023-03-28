import {ListEntity} from "types";
import {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {DeleteListBtn} from "../common/DeleteListBtn";
import {DeleteListContext} from "../../contexts/deleteList.context";
import {apiUrl} from "../../config/api";
import {Btn} from "../common/Btn";

import './ViewLists.css';

export const ViewLists = () => {
    const [list, setList] = useState<ListEntity[] | null>(null);
    const {deleteList} = useContext(DeleteListContext);

    useEffect(() => {

        (async () => {
            const res = await fetch(`${apiUrl}/list`);
            const data: ListEntity[] = await res.json();
            setList(data);
        })();
    }, [deleteList]);

    if (list === null) {
        return <h2>Trwa wczytywanie list...</h2>;
    }

    const viewLists = list.map(oneList =>
        <li key={oneList.createdAt} className="item-line">
            <Link className="lists" to={`/productList/${oneList.id}`}>{oneList.name}</Link>
            <DeleteListBtn className="btn" listId={oneList.id}/>
        </li>
    )

    const whatToView = list.length === 0
        ? <>
            <h2 className="section-title">Brak list do wyświetlenia!</h2>
            <Btn className="btn" text="Utwórz nową!" to="/"/>
        </>
        :
        <>
            <h1 className="section-title">Listy zakupowe</h1>
            <ul className="one-list">{viewLists}</ul>
        </>


    return (
        <div className="background">
            <span>{whatToView}</span>
        </div>
    )
}