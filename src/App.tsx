import React, {useState} from 'react';
import {Header} from "./Components/layout/Header";
import {AddShoppingList} from "./Components/AddShoppingList/AddShoppingList";
import {Route, Routes} from "react-router-dom";
import {ViewLists} from "./Components/ViewLists/ViewLists";
import {ViewProductsList} from "./Components/ViewProductsList/ViewProductsList";

import "./App.css";
import {NewProductContext} from "./contexts/newProduct.context";
import {DeleteListContext} from "./contexts/deleteList.context";

export const App = () => {
    const [newProduct, setNewProduct] = useState('');
    const [deleteList, setDeleteList] = useState('');
    return (
        <NewProductContext.Provider value={{newProduct, setNewProduct}}>
            <DeleteListContext.Provider value={{deleteList, setDeleteList}}>
                <div className="wrapper">
                    <Header/>
                    <Routes>
                        <Route path="/" element={<AddShoppingList/>}/>
                        <Route path="/list" element={<ViewLists/>}/>
                        <Route path="/productList/:listId" element={<ViewProductsList/>}/>
                    </Routes>
                </div>
            </DeleteListContext.Provider>
        </NewProductContext.Provider>
    );
}

export default App;
