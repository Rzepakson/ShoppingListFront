import {SyntheticEvent, useContext} from "react";
import {DeleteProductContext} from "../../contexts/deleteProduct.context";
import {apiUrl} from "../../config/api";

interface listAndProductIdProps {
    listId: string | undefined;
    id: string | undefined;
}

export const DeleteProductBtn = (props: listAndProductIdProps) => {

    const {setDeleteProduct} = useContext(DeleteProductContext);

    const deleteProduct = async (e: SyntheticEvent) => {
        e.preventDefault();

        const listId = props.listId;
        const id = props.id;
        const res = await fetch(`${apiUrl}/api/productList/${listId}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                listId,
                id,
            }),
        });

        setDeleteProduct(await res.json());
    }

    return (
        <button className='delete-product-btn' onClick={deleteProduct}><span className="text-in-btn">Usuń</span>
        </button>
    )
};