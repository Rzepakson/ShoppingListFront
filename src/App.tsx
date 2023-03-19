import React from 'react';
import {Header} from "./Components/layout/Header";
import {AddShoppingList} from "./Components/AddShoppingList/AddShoppingList";
import {Route, Routes} from "react-router-dom";
import {ViewLists} from "./Components/ViewLists/ViewLists";
import {ViewProductsList} from "./Components/ViewProductsList/ViewProductsList";

import "./App.css";

const App = () => {
    return (
        <div className="wrapper">
            <Header/>
            <Routes>
                <Route path="/" element={<AddShoppingList/>}/>
                <Route path="/list" element={<ViewLists/>}/>
                <Route path="/productList/:listId" element={<ViewProductsList/>}/>
            </Routes>
        </div>
    );
}

export default App;
