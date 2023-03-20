import {useContext, useEffect, useState} from "react";
import {ListEntity, ProductListEntity} from "types";
import {useParams} from "react-router-dom";
import {formatDate} from "../../utils/formatDate";
import {AddProduct} from "../AddProduct/AddProduct";
import {NewProductContext} from "../../contexts/newProduct.context";

export const ViewProductsList = () => {
    const [oneList, setOneList] = useState<ListEntity | null>(null);
    const [productsList, setProductsList] = useState<ProductListEntity[] | null>(null);
    const {listId} = useParams();
    const {newProduct} = useContext(NewProductContext);

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
    }, [newProduct, listId]);

    if (productsList === null || oneList === null) {
        return <h2>Trwa wczytywanie produktów...</h2>;
    }

    const viewProducts = productsList.map(oneProduct => <li key={oneProduct.id}>
        <p><span>{oneProduct.name} </span><span>{oneProduct.count}szt.</span></p>
    </li>)

    return (
        <>
            <h2>{oneList.name} <span>Utworzono {formatDate(oneList.createdAt)}</span></h2>
            <ul>{viewProducts}</ul>
            <AddProduct listId={oneList.id}/>
        </>
    )
}