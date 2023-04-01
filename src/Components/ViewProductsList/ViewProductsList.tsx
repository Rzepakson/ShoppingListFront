import {useContext, useEffect, useState} from "react";
import {ListEntity, ProductListEntity} from "types";
import {useNavigate, useParams} from "react-router-dom";
import {formatDate} from "../../utils/formatDate";
import {AddProduct} from "../AddProduct/AddProduct";
import {NewProductContext} from "../../contexts/newProduct.context";
import {DeleteProductBtn} from "../common/DeleteProductBtn";
import {DeleteProductContext} from "../../contexts/deleteProduct.context";
import {apiUrl} from "../../config/api";
import {Header} from "../layout/Header";

import './ViewProductsList.css';

type initState = {
    [index: number]: boolean
}

const getInitialState = (): initState => {
    const clicked = localStorage.getItem('clicked');
    return clicked ? JSON.parse(clicked) : {};
}

export const ViewProductsList = () => {
    const [oneList, setOneList] = useState<ListEntity | null>(null);
    const [productsList, setProductsList] = useState<ProductListEntity[] | null>(null);
    const [clicked, setClicked] = useState<initState>(getInitialState);
    const [isErrorShown, setIsErrorShown] = useState(false);
    const {listId} = useParams();
    const {newProduct} = useContext(NewProductContext);
    const {deleteProduct} = useContext(DeleteProductContext);

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('clicked', JSON.stringify(clicked));
        setIsErrorShown(false);
    }, [clicked]);

    useEffect(() => {
        (async () => {
            const res = await fetch(`${apiUrl}/list/oneList/${listId}`);
            const data: ListEntity = await res.json();

            setOneList(data);

        })();
    }, [listId]);

    useEffect(() => {
        (async () => {
            const res = await fetch(`${apiUrl}/productList/${listId}`);
            const data: ProductListEntity[] = await res.json();

            setProductsList(data);
        })();
    }, [newProduct, listId, deleteProduct, navigate]);

    if (productsList === null || oneList === null) {
        return <h2 className="background background-loading">Trwa wczytywanie produktów...</h2>;
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
        window.localStorage.removeItem("clicked");
        setClicked({});
    }

    const showError = () => {
        setIsErrorShown(true);
    };

    const viewProducts = productsList.map((oneProduct, index) => <li key={oneProduct.id} className="item-line">
            <span onClick={handleClick(index)} className="product-item">
                <span className="check-box">
                    {clicked[index]
                        ? '✅ '
                        : '🔲 '
                    }
                </span>
                <span className="product-name">{`${oneProduct.name} `}</span>
                <span className="product-count">
                    {checkZeroAtEnd(oneProduct.count)}
                    {oneProduct.unit}
                </span>
            </span>
        <span>
                {Object.values(clicked).indexOf(true) > -1
                    ? (<>
                            <button className="disabled-btn" onClick={showError}><span
                                className="text-in-btn">Usuń</span>
                            </button>
                        </>
                    )
                    : <DeleteProductBtn listId={listId} id={oneProduct.id}/>
                }
            </span>
        </li>
    )

    const viewClearChecked = productsList.length !== 0
        ? <button className="clear-checked" onClick={clearLocalStorage}><span className="text-in-btn">Wyczyść zaznaczenia</span>
        </button>
        : null

    return (
        <>
            <Header/>
            <div className="background">
                <span className="created-at">{formatDate(oneList.createdAt)}</span>
                <h2 className="list-title">{oneList.name}</h2>
                <ul className="items-list">{viewProducts}</ul>
                {isErrorShown && (
                    <p className='error'>Najpierw musisz odznaczyć wszystkie produkty, by móc je usuwać!</p>
                )}
                <span>{viewClearChecked}</span>
                <AddProduct listId={oneList.id}/>
            </div>
        </>
    )
}