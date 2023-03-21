import {useContext, useEffect, useState} from "react";
import {ListEntity, ProductListEntity} from "types";
import {useParams} from "react-router-dom";
import {formatDate} from "../../utils/formatDate";
import {AddProduct} from "../AddProduct/AddProduct";
import {NewProductContext} from "../../contexts/newProduct.context";
import {DeleteProductBtn} from "../common/DeleteProductBtn";
import {DeleteProductContext} from "../../contexts/deleteProduct.context";

import './ViewProductsList.css';

type tplotOptions = {
    [index: number]: boolean
}

export const ViewProductsList = () => {
    const [oneList, setOneList] = useState<ListEntity | null>(null);
    const [productsList, setProductsList] = useState<ProductListEntity[] | null>(null);
    const [clicked, setClicked] = useState<tplotOptions>({});
    const {listId} = useParams();
    const {newProduct} = useContext(NewProductContext);
    const {deleteProduct} = useContext(DeleteProductContext);

    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:3001/list/${listId}`);
            const data: ListEntity = await res.json();

            setOneList(data);

        })();
    }, [listId]);

    useEffect(() => {
        (async () => {
            const res = await fetch(`http://localhost:3001/productList/${listId}`);
            const data: ProductListEntity[] = await res.json();

            setProductsList(data);
        })();
    }, [newProduct, listId, deleteProduct]);

    if (productsList === null || oneList === null) {
        return <h2>Trwa wczytywanie produktów...</h2>;
    }

    const handleClick = (index: number) => () => {
        setClicked(state => ({
            ...state,
            [index]: !state[index]
        }));
    };

    const viewProducts = productsList.map((oneProduct, index) => <li key={oneProduct.id}>
        <p>
            <span className="product-item" onClick={handleClick(index)}>
                {clicked[index]
                    ? '✅ '
                    : '🔲 '
                }
                {oneProduct.name} {oneProduct.count} szt.
            </span>
            <DeleteProductBtn listId={listId} id={oneProduct.id}/>
        </p>
    </li>)

    return (
        <>
            <h2>{oneList.name} <span>Utworzono {formatDate(oneList.createdAt)}</span></h2>
            <ul>{viewProducts}</ul>
            <AddProduct listId={oneList.id}/>
        </>
    )
}