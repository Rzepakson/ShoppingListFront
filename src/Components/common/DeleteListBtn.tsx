import {SyntheticEvent, useContext} from "react";
import {DeleteListContext} from "../../contexts/deleteList.context";

interface listIdProps {
    listId: string | undefined;
    className: string;
}

export const DeleteListBtn = (props: listIdProps) => {

    const {setDeleteList} = useContext(DeleteListContext);

    const deleteList = async (e: SyntheticEvent) => {
        e.preventDefault();

        const listId = props.listId;
        const res = await fetch(`http://localhost:3001/list/${listId}`, {
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
        <button className={'delete-list-btn'} onClick={deleteList}><span className="text-in-btn">Usuń</span></button>
    )
};