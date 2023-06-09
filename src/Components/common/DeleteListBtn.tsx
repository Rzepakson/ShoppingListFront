import {SyntheticEvent, useContext} from "react";
import {DeleteListContext} from "../../contexts/deleteList.context";
import {apiUrl} from "../../config/api";

interface listIdProps {
    listId: string | undefined;
    className: string;
}

export const DeleteListBtn = (props: listIdProps) => {

    const {setDeleteList} = useContext(DeleteListContext);

    const deleteList = async (e: SyntheticEvent) => {
        e.preventDefault();

        const listId = props.listId;
        const res = await fetch(`${apiUrl}/list/${listId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                listId,
            }),
        });

        setDeleteList(await res.json());
    }

    return (
        <button className="delete-list-btn" onClick={deleteList}><span className="text-in-btn">Usuń</span></button>
    )
};