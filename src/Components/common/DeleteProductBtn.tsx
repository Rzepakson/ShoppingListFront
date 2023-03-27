import {SyntheticEvent, useContext} from "react";
import {DeleteProductContext} from "../../contexts/deleteProduct.context";

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
        const res = await fetch(`http://localhost:3001/productList/${listId}/${id}`, {
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