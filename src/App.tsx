import React, {useState} from 'react';
import {Route, Routes} from "react-router-dom";
import {ViewLists} from "./Components/ViewLists/ViewLists";
import {ViewProductsList} from "./Components/ViewProductsList/ViewProductsList";

import "./App.css";
import {NewProductContext} from "./contexts/newProduct.context";
import {DeleteListContext} from "./contexts/deleteList.context";
import {DeleteProductContext} from "./contexts/deleteProduct.context";
import {NotFoundView} from "./Components/NotFoundView/NotFoundView";
import {Login} from "./Components/Login/Login";
import {Register} from "./Components/Register/Register";
import {UserIdContext} from "./contexts/userId.context";

export const App = () => {
    const [newProduct, setNewProduct] = useState('');
    const [deleteList, setDeleteList] = useState('');
    const [deleteProduct, setDeleteProduct] = useState('');
    const [userId, setUserId] = useState('');
    return (
        <UserIdContext.Provider value={{userId, setUserId}}>
            <NewProductContext.Provider value={{newProduct, setNewProduct}}>
                <DeleteListContext.Provider value={{deleteList, setDeleteList}}>
                    <DeleteProductContext.Provider value={{deleteProduct, setDeleteProduct}}>
                        <div className="wrapper">
                            <Routes>
                                <Route path="*" element={<NotFoundView/>}/>
                                <Route path="/" element={<Login/>}/>
                                <Route path="/register" element={<Register/>}/>
                                <Route path="/list" element={<ViewLists/>}/>
                                <Route path="/productList/:listId" element={<ViewProductsList/>}/>
                            </Routes>
                        </div>
                    </DeleteProductContext.Provider>
                </DeleteListContext.Provider>
            </NewProductContext.Provider>
        </UserIdContext.Provider>
    );
}

export default App;
