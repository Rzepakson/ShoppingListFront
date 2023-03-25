import {useContext, useEffect, useState} from "react";
import {ListEntity, ProductListEntity} from "types";
import {useParams} from "react-router-dom";
import {formatDate} from "../../utils/formatDate";
import {AddProduct} from "../AddProduct/AddProduct";
import {NewProductContext} from "../../contexts/newProduct.context";
import {DeleteProductBtn} from "../common/DeleteProductBtn";
import {DeleteProductContext} from "../../contexts/deleteProduct.context";

import './ViewProductsList.css';


type initState = {
    [index: number]: boolean
}

const getInitialState = () => {
    const clicked = localStorage.getItem('clicked');
    return clicked ? JSON.parse(clicked) : {};
}

export const ViewProductsList = () => {
    const [oneList, setOneList] = useState<ListEntity | null>(null);
    const [productsList, setProductsList] = useState<ProductListEntity[] | null>(null);
    const [clicked, setClicked] = useState<initState>(getInitialState);
    const [isAlertShown, setIsAlertShown] = useState(false);
    const {listId} = useParams();
    const {newProduct} = useContext(NewProductContext);
    const {deleteProduct} = useContext(DeleteProductContext);

    useEffect(() => {
        localStorage.setItem('clicked', JSON.stringify(clicked));
    }, [clicked]);

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

    const checkZeroAtEnd = (count: number) => {
        const stringCount = count.toFixed(2).toString();

        if (stringCount.slice(-2) === '00') {
            return Number(stringCount).toFixed();
        } else if (stringCount.slice(-1) === '0') {
            return Number(stringCount).toFixed(1);
        } else {
            return Number(stringCount).toFixed(2);
        }
    };

    const clearLocalStorage = (): void => {
        window.localStorage.clear();
        setClicked({});
    }

    const showAlert = () => {
        setIsAlertShown(true);
        setTimeout(() => {
            setIsAlertShown(false);
        }, 2500)

    };

    const viewProducts = productsList.map((oneProduct, index) => <li key={oneProduct.id}>
        <p>
            <span className="product-items" onClick={handleClick(index)}>
                {clicked[index]
                    ? '✅ '
                    : '🔲 '
                }
                {`${oneProduct.name} `}
                {checkZeroAtEnd(oneProduct.count)}
                {oneProduct.unit}
            </span>
            <span className="delete-btns">
                {clicked[index]
                    ? (<>
                            <button className="disabled" onClick={showAlert}>Usuń</button>
                            {isAlertShown && (
                                <span className='alert'>Najpierw musisz odznaczyć produkt, aby móc go usunąć.</span>
                            )}
                        </>
                    )
                    : <DeleteProductBtn listId={listId} id={oneProduct.id}/>
                }
            </span>
        </p>
    </li>)

    return (
        <>
            <h2>{oneList.name} <span>Utworzono {formatDate(oneList.createdAt)}</span></h2>
            <ul>{viewProducts}</ul>
            <AddProduct listId={oneList.id}/>
            <button onClick={clearLocalStorage}>Wyczyść zaznaczenia</button>
        </>
    )
}